const { makeExecutableSchema } = require('graphql-tools');

const directive = require('../lib/index.js');

// load mocked data for our example server
const mockedData = require('./data.js');

// define schema, let's use our brand new directive
const typeDefs = `
  type Person {
    id: Int 
    name: String @upper 
  }

  type Query {
    persons: [Person]
  }
`;

// force resolver to return the mocked data
const resolvers = {
  Query: {
    persons: () => mockedData,
  },
};

// let the magic begin
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    upper: directive,
  },
});

module.exports = schema;
