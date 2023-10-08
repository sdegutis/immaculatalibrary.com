export const FormatDate: JSX.Component<{ date: string }> = (attrs, children) => {
  return <>
    <span class='format-date'>{formatDate(attrs.date)}</span>
  </>;
};

const formatter = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(date: string) {
  return formatter.format(new Date(date));
}
