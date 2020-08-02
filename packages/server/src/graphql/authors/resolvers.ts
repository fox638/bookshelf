import { Connection } from "typeorm";

import { Author } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { container }) =>
      container.get(Connection).manager.find(Author),

    author: (rootValue, { id }, { authorsLoader }) => authorsLoader.load(id)
  },

  Author: {
    photo: ({ photoPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
