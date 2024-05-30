const adorationLinks: HTMLIFrameElement[] = [
  <iframe src="https://www.youtube.com/embed/live_stream?channel=UCTv8s3mfmdIIXNcw_5Pdv_w&autoplay=1" /> as HTMLIFrameElement,
  <iframe src="https://www.youtube.com/embed/live_stream?channel=UChmNZQg06jCB5xXHSAQQNpA&autoplay=1" /> as HTMLIFrameElement,
];

const blessedSacramentImage = <img src="./blessedsacrament.png" />;

document.getElementById('root')!.append(<>
  <div id="top">
    {blessedSacramentImage}
  </div>

  <div id="bottom">

    <div id="navlinks" class="box">

      {adorationLinks.map((iframe, i) => (
        <a onclick={(e: Event) => {
          e.preventDefault();
          document.getElementById('top')!.replaceChildren(iframe);
        }} href={iframe.src}>Adoration {i + 1}</a>
      ))}

      <a href="#" onclick={(e: Event) => {
        e.preventDefault();
        document.getElementById('top')!.replaceChildren(blessedSacramentImage);
      }}>Static image</a>

      <a hidden href="#" onclick={(e: Event) => {
        e.preventDefault();
        changelocation();
      }}>Set location</a>

    </div>

    <div id="info">
      <div id="timeinfo">
        <div id="time">12:54 PM</div>
        <div id="date">09/19/2021</div>
        <div id="day">Saturday, September 19</div>
      </div>
      <div>
        <div id="temprow">
          <div id="temperature">87 Fº</div>
          <img id="weather-icon" />
          <div id="weather-glimpse">
            <div id="weather-glimpse-desc"></div>
            <div id="weather-glimpse-max"></div>
            <div id="weather-glimpse-min"></div>
          </div>
        </div>
        <div id="weather-full">It's gonna rain or somethin.</div>
      </div>
      <FeastDay />
    </div>

  </div>
</>);


// Time
const timeEl = document.getElementById('time')!;
const dateEl = document.getElementById('date')!;
const dayEl = document.getElementById('day')!;
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

function FeastDay() {
  const feastDayEl = <div id="feastday">Saint of the Day</div> as HTMLDivElement;

  // Feast day
  const calendar = (window as any).Romcal.Calendar.calendarFor({ country: 'unitedStates' });
  function updateFeastDay() {
    const today = new Date().toISOString().split('T')[0];
    const feastDay = calendar.find((day: any) => day.moment.split('T')[0] === today);
    feastDayEl.innerText = feastDay.name;
  }
  updateFeastDay();
  setInterval(updateFeastDay, 1000 * 60 * 60 * 5);

  return feastDayEl;
}

// Weather
const params = new URLSearchParams(location.search);
const apiKey = '0adc97ca15785c49faffe4b60d623350';
const weatherQuery = 'lon=-88.4487&lat=42.3147';
const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&${weatherQuery}&exclude=minutely&units=imperial`;
const weatherIconEl = document.getElementById('weather-icon') as HTMLImageElement;
const temperatureEl = document.getElementById('temperature')!;
const weatherGlimpseDescEl = document.getElementById('weather-glimpse-desc')!;
const weatherGlimpseMinEl = document.getElementById('weather-glimpse-min')!;
const weatherGlimpseMaxEl = document.getElementById('weather-glimpse-max')!;
const weatherFullEl = document.getElementById('weather-full')!;
const hourFormatter = new Intl.DateTimeFormat('en', { hour12: true, hour: 'numeric' });
function updateWeather() {
  fetch(url).then(res => res.json()).then(json => {
    weatherIconEl.src = `http://openweathermap.org/img/wn/${json.current.weather[0].icon}@2x.png`;
    const temps = Object.values<any>(json.daily[1].feels_like);
    temperatureEl.innerText = `${Math.round(json.current.feels_like)} Fº`;
    weatherGlimpseDescEl.innerText = json.current.weather[0].main;
    weatherGlimpseMaxEl.innerText = `High: ${Math.round(Math.max(...temps))}`;
    weatherGlimpseMinEl.innerText = `Low:  ${Math.round(Math.min(...temps))}`;
    weatherFullEl.innerText = makeDescription(json.hourly);
    // TODO: handle alerts
    // json.alerts may or may not exist
    // If it does, it looks like:
    // https://openweathermap.org/api/one-call-api#hist_parameter (sample above it)
  });
}
updateWeather();
setInterval(updateWeather, 1000 * 60 * 3 /* 3 minutes */);
function makeDescription(list: any[]) {
  list = list.slice(0, 12).map(item => item.weather[0].description);
  list.push(null);
  let hour = 0;
  let count = 0;
  let current = '';
  const overall = [];
  for (const item of list) {
    if (item !== current) {
      let desc;
      if (current.match(/rain|snow|storm/i)) {
        const now = new Date();
        now.setHours(now.getHours() + hour);
        const start = hourFormatter.format(now);
        now.setHours(now.getHours() + count);
        const end = hourFormatter.format(now);
        desc = `${current} from ${start} to ${end}`;
      }
      else {
        const hours = count > 1 ? 'hours' : 'hour';
        desc = `${count} ${hours} of ${current}`;
      }
      overall.push(desc);
      current = item;
      hour += count;
      count = 0;
    }
    count++;
  }
  return overall.slice(1).join(', ');
}

function changelocation() {
}
