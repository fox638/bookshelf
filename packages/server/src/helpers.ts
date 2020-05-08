import { SecureId } from "@bookshelf/secure-id";

type EntityTypes = "Author" | "Book" | "User";

export const secureId = new SecureId<EntityTypes>({
  separator: "-"
});
