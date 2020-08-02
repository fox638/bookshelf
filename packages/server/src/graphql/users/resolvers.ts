import { User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UserService } from "./UserService";

const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, { id }, { connection }) =>
      connection.manager.findOneOrFail(User, id)
  },

  Mutation: {
    createUser: async (rootValue, args, { container }) => {
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      try {
        // TODO: Add validations for userAttributes, like email, password min length etc
        const user = await container
          .get(UserService)
          .createWithAvatar(userAttributes, avatarAttributes);

        return {
          success: true,
          message: "User was successfully created.",
          user
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    updateUser: async (rootValue, args, { container }) => {
      const { id, ...userAttributes } = args.input;
      const user = await container.get(UserService).update(id, userAttributes);

      return {
        success: true,
        message: "User was successfully updated.",
        user
      };
    },

    deleteUser: async (rootValue, { id }, { container }) => {
      await container.get(UserService).delete(id);

      return {
        success: true,
        message: "User was successfully deleted."
      };
    }
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
