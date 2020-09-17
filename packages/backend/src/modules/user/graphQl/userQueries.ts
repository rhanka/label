import { GraphQLString } from 'graphql';
import { resolveLogin } from './resolvers/resolveLogin';
import { tokenGraphQLType } from './types';

export { loginQuery };

const loginQuery = {
  resolve: resolveLogin,
  type: tokenGraphQLType,
  args: {
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
};
