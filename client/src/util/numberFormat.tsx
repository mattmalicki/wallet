function getNumberFormat(number: number) {
  return new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  }).format(number);
}

export { getNumberFormat };
