import { titleCase } from "./title-case";

describe("titleCase", () => {
  test.each([
    ["", ""],
    [null, ""],
    [undefined, ""],
    ["lowercase", "Lowercase"],
    ["UPPERCASE", "Uppercase"],
    ["capitalized", "Capitalized"],
    ["snake_case", "Snake Case"],
    ["camelCase", "Camelcase"],
  ])("should convert '%s' to '%s'", (value, expected) => {
    expect(titleCase(value)).toEqual(expected);
  });
});
