import faker from "faker";
import { Container } from "typedi";
import {
  createConnection,
  useContainer,
  getConnection,
  Connection
} from "typeorm";

useContainer(Container);

beforeEach(() => {
  faker.seed(666);
  faker.locale = "en";
});

beforeEach(async () => {
  Container.reset();

  const connection = await createConnection();
  Container.set(Connection, connection);
});

afterEach(() => getConnection().close());
