export function TimeArea() {
  // Time
  const timeEl = <div id="time">12:54 PM</div> as HTMLElement;
  const dateEl = <div id="date">09/19/2021</div> as HTMLElement;
  const dayEl = <div id="day">Saturday, September 19</div> as HTMLElement;
  const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
  const dateFormatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  function updateTime() {
    const now = new Date();
    timeEl.innerText = timeFormatter.format(now);
    dateEl.innerText = dateFormatter.format(now);
    dayEl.innerText = dayFormatter.format(now);
  }
  updateTime();
  setInterval(updateTime, 30_000);

  return <div id="timeinfo">
    <link rel='stylesheet' href='./time.css' />
    {timeEl}
    {dateEl}
    {dayEl}
  </div>;
}
