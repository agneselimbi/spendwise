function getDateRange(key) {
  const now = new Date();
  let firstDay, lastDay;

  switch (key) {
    case "thisday":
      firstDay = now;
      lastDay = now;
      break;

    case "thisweek":
      const date = new Date(now);
      const day = date.getDay();
      // find Monday
      date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
      firstDay = new Date(date);
      // Sunday = Monday + 6 days
      lastDay = new Date(date);
      lastDay.setDate(firstDay.getDate() + 6);
      break;
    case "thismonth":
      firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "threemonths":
      firstDay = new Date(now.getFullYear(), now.getMonth() - 3 + 1, 1);
      lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      break;
    case "sixmonths":
      firstDay = new Date(now.getFullYear(), now.getMonth() - 6 + 1, 1);
      lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "oneyear":
      firstDay = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    default:
      firstDay = new Date(now);
      lastDay = new Date(now);
  }

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(23, 59, 59, 59);

  return { firstDay, lastDay };
}

export function filterByDate(Tx, dateRange) {
  //   console.log(Tx);
  if (!Array.isArray(Tx)) return [];
  const { firstDay, lastDay } = getDateRange(dateRange);
  if (!firstDay || !lastDay) return Tx;

  return Tx.filter((tx) => {
    const tx_date = new Date(tx.date);
    return tx_date >= firstDay && tx_date <= lastDay;
  });
}
