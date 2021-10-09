export const getTimeAgo = dateStr => {
  const yearsAgo = new Date().getFullYear() - new Date(dateStr).getFullYear();
  const monthsAgo = new Date().getMonth() - new Date(dateStr).getMonth();
  const daysAgo = new Date().getDay() - new Date(dateStr).getDay();

  if (yearsAgo < 1) {
    if (monthsAgo < 1) {
      return daysAgo <= 2 ? `a few days ago` : `${daysAgo} days ago`;
    }
    return monthsAgo === 1 ? `a month ago` : `${monthsAgo} months ago`;
  }
  return yearsAgo === 1 ? `a year ago` : `${yearsAgo} years ago`;
};
