class MonthsAndYears {
  years: number[];
  months: string[];
  constructor() {
    const currentYear = new Date().getFullYear();
    this.years = [
      currentYear - 3,
      currentYear - 2,
      currentYear - 1,
      currentYear,
      currentYear + 1,
      currentYear + 2,
      currentYear + 3,
    ];

    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }
  addYearsBefore() {
    for (let index = 0; index < 5; index++) {
      const year = this.years[0];
      this.years.unshift(year - 1);
    }
  }

  addYearsAfter() {
    for (let index = 0; index < 5; index++) {
      const year = this.years[0];
      this.years.push(year + 1);
    }
  }

  getOnlyMonths() {
    return this.months;
  }
}

export { MonthsAndYears };
