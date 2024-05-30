// Time
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const dayEl = document.getElementById('day');
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

// Feast day
const feastDayEl = document.getElementById('feastday');
const calendar = Romcal.Calendar.calendarFor({ country: 'unitedStates' });
function updateFeastDay() {
  const today = new Date().toISOString().split('T')[0];
  const feastDay = calendar.find(day => day.moment.split('T')[0] === today);
  feastDayEl.innerText = feastDay.name;
}
updateFeastDay();
setInterval(updateFeastDay, 1000 * 60 * 60 * 5);

// Weather
const params = new URLSearchParams(location.search);
const apiKey = '0adc97ca15785c49faffe4b60d623350';
const weatherQuery = 'lon=-88.4487&lat=42.3147';
const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&${weatherQuery}&exclude=minutely&units=imperial`;
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const weatherGlimpseDescEl = document.getElementById('weather-glimpse-desc');
const weatherGlimpseMinEl = document.getElementById('weather-glimpse-min');
const weatherGlimpseMaxEl = document.getElementById('weather-glimpse-max');
const weatherFullEl = document.getElementById('weather-full');
const hourFormatter = new Intl.DateTimeFormat('en', { hour12: true, hour: 'numeric' });
function updateWeather() {
  fetch(url).then(res => res.json()).then(json => {
    weatherIconEl.src = `http://openweathermap.org/img/wn/${json.current.weather[0].icon}@2x.png`;
    const temps = Object.values(json.daily[1].feels_like);
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
function makeDescription(list) {
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

function makelive(/** @type {Event} */ e) {
  const link = /** @type {HTMLAnchorElement} */(e.target);
  document.getElementById('top').innerHTML = `
    <iframe name="ifr"
      src="${link.href}"
      frameborder="0"></iframe>
  `;

  e.preventDefault();
}

function makestatic(/** @type {Event} */ e) {
  document.getElementById('top').innerHTML = `
    <img src="blessedsacrament.png">
  `;

  e.preventDefault();
}

function changelocation(/** @type {Event} */ e) {
  e.preventDefault();
}
