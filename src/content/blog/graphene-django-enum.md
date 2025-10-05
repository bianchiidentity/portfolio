---
title: "graphene-djangoでのenum.Enumの扱い"
date: 2019-03-14
summary: "graphene-djangoでenum.Enumを引数に使う際はfrom_enum()で明示的に実体化し、同じEnumを複数回変換するとスキーマ重複エラーになるため共通化が必要"
tags: ["Python", "GraphQL", "Django"]
---

djangoでmodelを書いていてchoiceFieldでは普通enumを用いる。

これをmutationなどの引数にしたいとする。

通常以下の様にgraphene.Enumを用いる事になるが、
graphene-djangoはpythonのenumをgraphene.enumを書かずに自動で変換してくれる。


```python
import graphene

class BarEnum(graphene.Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

```

[graphene-djangoでのEnumsの説明](https://docs.graphene-python.org/en/latest/types/enums/)

このgrapheneのEnumsの説明ではpythonのEnum.enumは次のように使えるとなっている。

```python

import enum

# pythonのenum
class BarEnum(enum.Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

class CreateFoo(graphene.Mutation):
    Foo = graphene.Field(FooType)

    class Arguments:
        bar = graphene.Enum.from_enum(BarEnum)

    def mutate(self, info, **kwargs):
        pass
```

だがこれだと以下のエラーが出る。

```
ValueError: Unknown argument "bar"
```


正しくは以下

```python:
class CreateFoo(graphene.Mutation):
    Foo = graphene.Field(FooType)

    class Arguments:
        bar = graphene.Enum.from_enum(BarEnum)(required=True)

```


また、二つ同じenumを変換するとエラーとなる。

```
AssertionError: Found different types with the same name in the schema: FooEnum, FooEnum.
```

これを回避するには

```python
class EnumInput():
    Foo = graphene.Enum.from_enum(FooEnum)


class AInput(graphene.InputObjectType):
    foo = EnumInput.Foo(required=True)
    baz = graphene.String(required=False)


class BInput(graphene.InputObjectType):
    foo = EnumInput.Foo(required=True)
    baz = graphene.Int(required=False)


class CreateFoo(graphene.Mutation):
    bar = graphene.Field(BarType)

    class Arguments:
        a = graphene.Argument(AInput)
        b = graphene.Argument(BInput)

```
