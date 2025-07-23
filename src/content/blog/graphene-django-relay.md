---
title: "graphene-djangoではrelayを使う前提であるので注意"
date: 2019-03-14
summary: "graphene-djangoではrelayが必須"
---
## 背景

`graphene-django`でGraphQL APIを実装していると、**filterの実装にRelayの使用が前提**になっていることに気づく。

## よくあるハマりポイント
他のチームと協業している場合、Relayを採用するかしないか議論がある。そこでRelayを使わないと決めて実装を進めている時の備忘録である。

順調に `query` や `mutation` をRelayを使わずに実装していたとしても、filterを実装しようとした際に公式チュートリアルに出てくるのは以下のようなコード。

---

### 公式チュートリアルの例（Relay使用）

```python
# cookbook/ingredients/schema.py
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from ingredients.models import Category, Ingredient

class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = ['name', 'ingredients']
        interfaces = (relay.Node, )

class IngredientNode(DjangoObjectType):
    class Meta:
        model = Ingredient
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'notes': ['exact', 'icontains'],
            'category': ['exact'],
            'category__name': ['exact'],
        }
        interfaces = (relay.Node, )

class Query(object):
    category = relay.Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)

    ingredient = relay.Node.Field(IngredientNode)
    all_ingredients = DjangoFilterConnectionField(IngredientNode)
```

### RelayありのGraphQLクエリ例

```graphql
query {
  allCategories {
    edges {
      node {
        name,
        ingredients {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
```

これは正直あんまりイケてない。Relayを使うとこうなるのかもしれないが、**Relayを使っていないのにこの形式で返ってくるのは避けたい**。

### 本当はこうしたい（Relayなしのクエリ例）

```graphql
query {
  allCategories {
    name,
    ingredients {
      name
    }
  }
}
```

## Issueを確認してみると

「Relayを使わずにfilterを実装できないのか？」と思い、Issueを確認すると以下のような声が。

> **Separating django-filter from relay connection**

> _Did you have any feedback on whether your propose is valid? It would be awesome to have that baked in graphene-django (I really don't want to use relay)._

> _I still do not understand why graphene-django only focuses on the implementation of graphql with Relay since Django can be used with any frontend framework_

みんな困っているみたいだ。
（**"I really don't want to use relay"** に共感）

## 解決法：`graphene-django-extras`を使う

### graphene-django-extrasとは？

`graphene-django`に以下のような機能を追加するライブラリ：

- Relayなしでのページネーション・フィルタリングのサポート
- Django REST FrameworkのSerializerベースのMutation定義
- GraphQLクエリやFragmentに対するDirectiveの使用

### 特に重要な点：

> **Relayを使わずにfilterやpaginationを実装できる！**

5000円寄付しました。ありがとう `eamigo86`。
