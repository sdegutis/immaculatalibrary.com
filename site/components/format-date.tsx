const formatter = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date: string) {
  return formatter.format(new Date(date));
}
