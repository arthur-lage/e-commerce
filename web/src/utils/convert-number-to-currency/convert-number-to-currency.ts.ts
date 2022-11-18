export const convertNumberToCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  if(typeof value != "number") {
    return null;
  }

  const newValue = formatter.format(value);

  return newValue;
};
