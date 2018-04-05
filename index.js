const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

class convertToLowerCase extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = 'upper') {
    return new GraphQLDirective({
      // register directive name
      name: directiveName,
      // register a description
      description: 'Converts (string) field to upper case form',
      // register where this directive can be used
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    // eslint-disable-next-line
    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }

      return result;
    };
  }
}

module.exports = convertToLowerCase;
