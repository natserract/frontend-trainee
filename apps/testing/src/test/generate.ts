import { faker } from "@faker-js/faker";

export function buildUser(overrides: Record<string, any>) {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
}
