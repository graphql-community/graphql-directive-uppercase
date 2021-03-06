# graphql-directive-uppercase

## Table of Contents

* [Introduction](#introduction)
* [Install](#install)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

## Introduction

This is simple directive how to make you String fields UPPERCASED. On top of it, this could be a good start point for anyone interested in building their own one.

## Install

`yarn add graphql-directive-uppercase`

_This package requires [graphql](https://www.npmjs.com/package/graphql) and [graphql-tools](https://www.npmjs.com/package/graphql-tools) as peer dependency_

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools';
import uppercaseDirective from 'graphql-directive-uppercase';
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: uppercaseDirective,
    uppercase: uppercaseDirective
  },
});
GraphQL schema:
```

```graphql
type Person {
  id: Int
  name: String @upper
}

type Query {
  persons: [Person]
}
```

## Contributing

I would love to see your contribution. ❤️

For local development (and testing), all you have to do is to run `yarn` and then `yarn dev`. This will start the Apollo server and you are ready to contribute 🎉

Run yarn test (try --watch flag) for unit tests (we are using Jest)

## License

The MIT License (MIT) 2018 - Jakub Beneš
