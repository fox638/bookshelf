import { Container } from "typedi";

import { generateAuthToken } from "../../common/authentication";
import { UsersService } from "../../database/UsersService";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
    login: async (rootValue, { input: { email, password } }) => {
      const usersService = Container.get(UsersService);
      const user = await usersService.findByEmailAndPassword(email, password);

      const authToken = user ? generateAuthToken(user) : null;

      return {
        success: !!authToken,
        message: authToken ? "Login success!" : "Invalid email or password!",
        authToken
      };
    }
  }
};

export default resolvers;
