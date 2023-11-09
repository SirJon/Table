export const convertToLocalDate = (time: string) => {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (date.getHours() !== 0 && date.getTime() !== 0) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return date.toLocaleString('ru-Ru', options);
};