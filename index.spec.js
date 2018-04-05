const { graphql } = require('graphql');
const directive = require('./index.js');
const schema = require('./example/schema');

expect.extend({
  toBeUppercase(received) {
    if (typeof received !== 'string')
      return {
        message: () => `expected to be a string`,
        pass: false,
      };

    return {
      message: () => `expected ${received.toUpperCase()} got ${received}`,
      pass: received.toUpperCase() === received,
    };
  },
});

it('has defined initial declaration', () => {
  expect(directive.getDirectiveDeclaration()).toMatchSnapshot();
});

it('should change given String field to UPPER version', () => {
  const instance = new directive('upper');
  const field = {};

  instance.visitFieldDefinition(field);

  return expect(
    field.resolve(
      { personId: 5, name: 'vaclav brown' },
      {},
      {},
      { fieldName: 'name' }
    )
  ).resolves.toEqual('VACLAV BROWN');
});

it('should ignore any other type then String', () => {
  const instance = new directive('upper');
  const field = {};

  instance.visitFieldDefinition(field);

  return expect(
    field.resolve({ personId: 5, id: 0 }, {}, {}, { fieldName: 'id' })
  ).resolves.toEqual(0);
});

it('graphql query should return correctly modified entity', async () => {
  const response = await graphql(
    schema,
    `
      query persons {
        persons {
          name
        }
      }
    `
  );

  response.data.persons.forEach(({ name }) => {
    expect(name).toBeUppercase();
  });
});
