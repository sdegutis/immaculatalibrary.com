export const FormatDate: JSX.Component<{ date: string }> = (attrs, children) => {
  return <>{formatDate(attrs.date)}</>;
};

const formatter = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(date: string) {
  return formatter.format(new Date(date));
}
