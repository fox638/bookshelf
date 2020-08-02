import { Container } from "typedi";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

export interface Context {
  container: typeof Container;
  // TODO: Get rid of connection
  connection: Connection;
  assetsBaseUrl: string;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}

export const buildContext = (contextExtra: Partial<Context>): Context => ({
  container: Container,
  connection: Container.get(Connection),
  assetsBaseUrl: ASSETS_BASE_URL,
  authorsLoader: buildAuthorsLoader(),
  currentUser: undefined,
  ...contextExtra
});
