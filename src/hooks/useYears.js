import { useEffect, useState } from "react";

export default function UseYears() {
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const years = [];
    for (let y = currentYear; y >= currentYear - 50; y--) {
      years.push(y.toString());
    }
    setYearOptions(years);
  }, []);

  return yearOptions;
}
