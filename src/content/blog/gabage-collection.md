---
title: "ガベージコレクションのアルゴリズムと実装: 読書メモ"
date: 2023-06-28
summary: "読書メモ"
tags: ["GC", "読書メモ"]
---


## 2.1.3 スイープフェーズ

```c
sweep() {
  sweeping = $heap_start
  while (sweeping < $heap_end) {
    if (sweeping.mark == TRUE) {
      sweeping.mark = FALSE
    } else {
      sweeping.next = $free_list
      $free_list = sweeping
    }
    sweeping += sweeping.size
  }
}
```

sizeはオブジェクトのバイト数
オブジェクトを回収するという意味で、free_listと呼ばれる片方向リンクリストにチャンクとして連結する。
後でアロケーションの際に、このフリーリストをたどり、チャンクを見つける

7行目のnextフィールドはフリーリストを生成する際、およびそのフリーリストからチャンクを取り出す際に使用する。ここではnextと書いているが、任意のフィールドを上書きして使用する。既に死んでいるオブジェクトなのでフィールドの書き換えを行っても良い。

## 2.1.4 アロケーション
```c
new_obj(size) {
  chunk = pickup_chunk(size, $free_list)
  if (chunk != NULL) {
    return chunk
  } else {
    allocation_fail()
  }
}
```
free_listをたどり、size以上のサイズをもつチャンクを探す
もし大きい場合、sizeと残りに分割され、残りチャンクをフリーリストに再度戻す

## 疑問
死んでいるオブジェクトを見つけた時点でfree()をせず、自分のアプリケーションで保持し続けるのか。
つまりフリーリストの意義がわかっていない。


## なぜフリーリストという概念があるのか
参考にさせていただきました。以下引用です
http://matsu-www.is.titech.ac.jp/~endo/gc/gc.pdf

> 関数 free(p) が行なうべき仕事は、指定されたオブジェクト p を空き領域 (=将来の allocate のために利用できる領域) にすることである。プログラムは飛び飛びに存在するオブジェクトを free するかもしれない ため、一般に空き領域はヒープ上に通常は散らばってしまっている。

> これらを将来再利用するために、リストにつないで管理 (フリーリスト) するのが一般的である。結局、freeが行なう仕事は、p から始まる領域 をフリーリストへつなぐということである。

> 一方 allocate(n) が行なうべき仕事は、様々な空き領域がつまったフリーリストから、要求された大きさ以上の箇所を見つける、ということになる。

ちょっとまだわかっていない。具体的に空き領域というのは誰がどう管理しているのかが不明。
cでmallocとfreeするものを別言語上から呼び出すという認識なのだが、違っているのだろうか
個人的予想では普通にos管理下に戻すべきで、フリーリストに繋いで自分が書いたアプリが常にヒープの保持をするべきではないのでは？と思ってしまう。普通言語作る時ってcとかで書くでしょう？

https://samwho.dev/memory-allocation/
> In order to free memory, we need to keep better track of memory. We can do this by saving the address and size of all allocations, and the address and size of blocks of free memory. We'll call these an "allocation list" and a "free list" respectively.

あーなるほどと思った。このフリーリストとは違う概念だが、若干なるほど感はある

https://nodamushi.hatenablog.com/entry/2018/12/11/213258

非常によくわかった。これに悩んでいた。OK
