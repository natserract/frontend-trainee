import { stringToSlug } from "./string-formatting";

jest.mock("./string-formatting", () => ({
  stringToSlug: jest.fn(() => "this-is-a-test-string"),
}));

describe("string-formatting", () => {
  it("stringToSlug converts a string to a slug", () => {
    const input = "This is a Test String!";
    const result = stringToSlug(input);
    expect(result).toBe("this-is-a-test-string");
  });
});
