function getFormatDate(date: Date) {
  const year = date?.getFullYear();
  const month = date?.getMonth() + 1
  const day = date?.getDate()

  return `${year}-${month}-${day}`;
}
export function getRecent(date: Date, days: number) {
  return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() - days);
}
export default getFormatDate;
