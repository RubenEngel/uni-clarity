// Computer string formatted date - yyyy-mm-dd
export function formatDateComp(date: Date) {
  const dt = new Date(date);
  let day: number = dt.getDate();
  let monthStr: string = '';
  let dayStr: string = '';
  if (day < 10) {
    const dayStr = '0' + day.toString();
  }
  let month: number = dt.getMonth() + 1;
  if (month < 10) {
    const monthStr = '0' + month.toString();
  }
  const year = dt.getFullYear().toString();
  return year + '-' + monthStr + '-' + dayStr;
}

// UK string formatted date - dd/mm/yyyy
export function formatDateUk(date: number) {
  const dt = new Date(date);
  const day = dt.getDate();
  const month = dt.getMonth() + 1;
  const year = dt.getFullYear();
  return `${day}/${month}/${year}`;
}
