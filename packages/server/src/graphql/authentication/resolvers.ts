import { Container } from "typedi";

import { generateAuthToken } from "../../common/authentication";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { AuthenticationService } from "./AuthenticationService";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
    login: async (rootValue, { input: { email, password } }) => {
      const user = await Container.get(
        AuthenticationService
      ).findUserByEmailAndPassword(email, password);

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
