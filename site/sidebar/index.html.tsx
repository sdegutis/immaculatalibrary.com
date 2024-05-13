export default <>
  {'<!DOCTYPE html>'}
  <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sidebar</title>
      <link rel="stylesheet" href="./style.css" />
      <script src="https://unpkg.com/romcal@1.3.0/dist/romcal.bundle.min.js"></script>
      <link rel="icon" type="image/png" sizes="32x32" href='./app.ico' />
    </head>

    <body>

      <div id="root">

        <div id="top">
          <img src="./blessedsacrament.png" style="max-width: 100%; max-height: 100%; aspect-ratio: 496 / 279;" />
        </div>


        <div id="bottom">
          <div id="navlinks" class="box">
            <a onclick="makelive(event)"
              href="https://www.youtube.com/embed/live_stream?channel=UCTv8s3mfmdIIXNcw_5Pdv_w&autoplay=1"
              target="ifr">Adoration 1</a>
            <a onclick="makelive(event)"
              href="https://www.youtube.com/embed/live_stream?channel=UChmNZQg06jCB5xXHSAQQNpA&autoplay=1"
              target="ifr">Adoration 2</a>
            <a href="#" onclick="makestatic(event)">Static</a>
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
            <div id="feastday">Saint of the Day</div>
          </div>
        </div>

      </div>

      <script src="./client.js" defer></script>
    </body>

  </html>
</>;
