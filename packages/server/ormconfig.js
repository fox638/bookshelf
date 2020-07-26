const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

// TODO: Setup typeorm cli
const defaults = {
  type: "postgres",
  entities: [path.join(__dirname, "src/database/entity/**/*.ts")],
  synchronize: false,
  logging: false
};

if (NODE_ENV === "test") {
  module.exports = {
    ...defaults,
    type: "sqlite",
    database: ":memory:",
    synchronize: true
  };
}

if (NODE_ENV === "development") {
  module.exports = {
    ...defaults,
    url: "postgres://localhost:5432/bookshelf_development",
    logging: true
  };
}

if (NODE_ENV === "production") {
  module.exports = [
    {
      ...defaults,
      url: process.env.DATABASE_URL,
      entities: [path.join(__dirname, "dist/src/database/entity/**/*.js")],

      // TODO: A workaround for heroku and ssl issues,
      //  see https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  ];
}
