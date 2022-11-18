import { convertNumberToCurrency } from "./convert-number-to-currency.ts";

describe("Test the convert number to currency function", () => {
  it("should convert 7 to $7.00", () => {
    const result = convertNumberToCurrency(7);

    expect(result).toBe("$7.00");
  });

  it("should not convert null to $7.00", () => {
    // @ts-ignore
    const result = convertNumberToCurrency(null);

    expect(result).toBe(null);
  });
});
