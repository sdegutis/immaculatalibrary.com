import { $ } from "../util/jsx-dom.js";

const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
const dateFormatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

function Interval(attrs: { sec: number, fn: () => string }) {
  const span = $<HTMLSpanElement>(<span>{attrs.fn()}</span>);
  setInterval(() => {
    span.replaceChildren(attrs.fn());
  }, attrs.sec * 1000);
  return span;
}

export function TimeArea() {
  // Time
  const dateEl = $<HTMLElement>(<div id="date">09/19/2021</div>);
  const dayEl = $<HTMLElement>(<div id="day">Saturday, September 19</div>);
  function updateTime() {
    const now = new Date();
    dateEl.innerText = dateFormatter.format(now);
    dayEl.innerText = dayFormatter.format(now);
  }
  updateTime();
  setInterval(updateTime, 30_000);

  return <div id="timeinfo">
    <link rel='stylesheet' href='./time.css' />
    <div id="time">
      <Interval sec={30} fn={() => timeFormatter.format(new Date())} />
    </div>
    {dateEl}
    {dayEl}
  </div>;
}
