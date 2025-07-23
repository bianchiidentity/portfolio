---
title: "WindowsAPIのCryptAPIをWindows以外で再現する方法"
date: 2023-06-03
summary: "CryptAPIについての覚書"
---

## 概要
WindowsAPIのCryptAPIをWindows以外で再現する方法

## 目的
WindowsAPIの暗号化をWindowsAPIが存在しないマシン上で動かしたいと思う場合があります。その時の備忘録です。

目標としては以下のシステムの暗号化部分をpythonに置き換えることです。また詳細説明も素晴らしく、良い記事だと思います。
[トラストソフトウェアシステム様](https://www.trustss.co.jp/smnEncrypt010.html)

以下のソースコードを対象とします。
[対象ソースコード](https://www.trustss.co.jp/Other/Enc001.txt)

使うpythonのライブラリはpycryptodome 3.18.0です。
[PyCryptodome](https://pypi.org/project/pycryptodome/)

### キーコンテナの準備
#### CryptAcquireContext
暗号化方式をここで指定します。

```cpp
  //CSPのハンドル
  if(!CryptAcquireContext(&hProv, NULL, MS_ENHANCED_PROV, PROV_RSA_FULL, 0))
    if(!CryptAcquireContext(&hProv, NULL, MS_ENHANCED_PROV, PROV_RSA_FULL, CRYPT_NEWKEYSET))
    {
      fprintf(stderr, "CryptAcquireContext error\n");
      return 1;
    }
```

##### MS_ENHANCED_PROVについて
`MS_ENHANCED_PROV`により、key長は128bitということがわかります。
これが非常に重要です。後でしっかり効いてくるのでこの存在を覚えておきましょう。

[Microsoft Enhanced Cryptographic Provider](https://learn.microsoft.com/ja-jp/windows/win32/seccrypto/microsoft-enhanced-cryptographic-provider)

##### PROV_RSA_FULLについて
暗号化についてはRC2orRC4で、ハッシュ関数はMD5orSHAということがわかります。
今回のトラストソフトウェアシステム様のブログではSHAを使っております。

[PROV_RSA_FULL](https://learn.microsoft.com/ja-jp/windows/win32/seccrypto/prov-rsa-full)

目的 | サポートされているアルゴリズム
-- | --
キー交換 | RSA
署名 | RSA
暗号化 | RC2 or RC4
ハッシュ | MD5 or SHA


### Hash計算
#### CryptCreateHash
ここではハッシュ計算の方式を決めます。
特に注意することはありません。CALG_SHAでSHA-1ハッシュが使われていることがわかります。

```cpp
	//	ハッシュ計算のインスタンス
	if(!CryptCreateHash(hProv, CALG_SHA, 0, 0, &hHash))
	{
		fprintf(stderr, "CryptCreateHash error\n");
		return 2;
	}
```

### CryptHashData
ここも特に記載することはありません。passwordに対してSHA-1ハッシュを当てるという意味です。
```cpp
	// ハッシュ値の計算
  #define	PASSWORD	"password"

	if(!CryptHashData(hHash, (BYTE*)PASSWORD, (DWORD)strlen(PASSWORD), 0))
	{
		fprintf(stderr, "CryptHashData error\n");
		return 3;
	}
```

#### 対応するPythonのコード
ここまでのpythonのコードは以下のようになります。
```python
  from Crypto.Hash import SHA


  key = b'password'
  hash = SHA.new(key).digest()
  # hash.hex() => 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8: 20*8 160bits
```
ここで気を付けるポイントとして、hash関数からは160bitsが返ってくるという事です。
C++とpythonの出力をデバッガで比べていただければ一致することがわかります。

### 鍵の生成
ここがとても重要です。
```cpp
	//	鍵生成
  #define	KEYLENGTH_128	0x0080 * 0x10000	// 128-bit長

	if(!CryptDeriveKey(hProv, CALG_RC4, hHash, KEYLENGTH_128, &hKey))
	{
		fprintf(stderr, "CryptDeriveKey error\n");
		return 4;
	}
```

#### KEYLENGTH_128	0x0080 * 0x10000
ここが非常に苦しんだ点で、CryptDeriveKeyの第4引数として、鍵の長さ(上位１６bits)と生成法(下位１６bits)を指定してあります。
で、なんとデバッグしたところ160bitsのhash値を128bitsまで切り捨ててあげれば正常に動作することがわかりました。
まあ指定した桁数以上は見ないということでしょう。
つまり以下のpythonコードで動作します。
下位16bitsの0x10000の指定は元のC++のコードでも不必要なのではないでしょうか？128bitsギッチリ指定してあるように見えます。
```python
  truncated_key = hash[:-4] # 160 - 4 * 8 = 128
```

[CryptDeriveKey 関数 (wincrypt.h)](https://learn.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptderivekey)

#### CALG_RC4
RC4のstream encryptionが指定してあります。
CALG_RC4 | RC4 stream encryption algorithm | Key length: 40 bits.Salt length: 88 bits.
-- | -- | --

[Base Provider Algorithms](https://learn.microsoft.com/en-us/windows/win32/seccrypto/base-provider-algorithms)

#### 対応するPythonのコード
で、ようやく完成したコードが以下です。
```python
  from Crypto.Cipher import ARC4

  truncated_hash = hash[:-4] # 160 - 4 * 8 = 128
  cipher = ARC4.new(truncated_hash)
```

### 暗号化
```cpp
	//	暗号化
	BYTE	pbData[100] = "This is a test data.";
	DWORD	dwDataLen = (DWORD)strlen((char*)pbData) + 1;

	if(!CryptEncrypt(hKey, 0, TRUE, 0, pbData, &dwDataLen, 100))
	{
		fprintf(stderr, "CryptEncrypt error\n");
		return 5;
	}

```
ここも特にいうことはありません。

#### 対応するPythonのコード
```python
  msg = cipher.encrypt(data)
```

## 完成したソースコード
```python
def encrypt(data: bytes) -> bytes:
  key = b'password'
  hash = SHA.new(key).digest()

  truncated_hash = hash[:-4]
  cipher = ARC4.new(truncated_hash)
  msg = cipher.encrypt(data)
  return msg
```

c++のデバッガのおかげで128bitsに切り詰める部分が分かりました。どっか公式見落としてるだけですかね？ひとまず以上です。

## 参考文献
[トラストソフトウェアシステム様](https://www.trustss.co.jp/smnEncrypt010.html)
[対象ソースコード](https://www.trustss.co.jp/Other/Enc001.txt)
[Microsoft Enhanced Cryptographic Provider](https://learn.microsoft.com/ja-jp/windows/win32/seccrypto/microsoft-enhanced-cryptographic-provider)
[文字列の暗号化、復号化をするには（AES-128-ECB)](https://www.hiramine.com/programming/windows/encryptdecryptstring_aes128ecb.html)
