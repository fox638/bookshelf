import faker from "faker";
import { Container } from "typedi";
import { createConnection, useContainer, getConnection } from "typeorm";

useContainer(Container);

beforeEach(() => {
  faker.seed(666);
  faker.locale = "en";
});

beforeEach(async () => {
  Container.reset();
  await createConnection();
});

afterEach(() => getConnection().close());
