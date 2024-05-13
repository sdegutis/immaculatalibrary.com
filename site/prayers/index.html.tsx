export default <>

  {'<!DOCTYPE html>'}
  <html lang="en">
    <Head />

    <body class="uk-light uk-padding">

      <ul uk-tab>
        <li class="uk-active"><a href="#">Morning</a></li>
        <li><a href="#">Noon</a></li>
        <li><a href="#">Night</a></li>
      </ul>
      <div class="uk-switcher uk-margin">

        <Slideshow>
          <AngelMorning />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <Memorare />
        </Slideshow>

        <Slideshow>
          <Intro />
        </Slideshow>

        <Slideshow>
          <AngelNight />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <Memorare />
        </Slideshow>

      </div>

    </body>

  </html>

</>;

function Intro() {
  return <div class="uk-container uk-container-xsmall uk-text-large">

    <p>
      <span style="color: crimson">V.</span> Our help is in the name of the Lord.
    </p>

    <p>
      <span style="color: crimson">R.</span> Who made heaven and earth.
    </p>

    <p>Most gracious Virgin Mary, thou who wouldst crush the head of the
      serpent, protect us from the vengeance of the evil one. We offer our prayers,
      supplications, sufferings and good works to thee so that thou may purify them,
      sanctify them and present them to thy Son as a perfect offering. May this offering
      be given so that the demons that influence or seek to influence the members of the
      Auxilium Christianorum do not know the source of their expulsion and blindness.
      Blind them so that they know not our good works. Blind them so that they know
      not on whom to take vengeance. Blind them so that they may receive the just
      sentence for their works. Cover us with the Precious Blood of thy Son so that we
      may enjoy the protection which flows from His Passion and Death. Amen.
    </p>

  </div>;
}

function AngelMorning() {
  return makePrayer("./images/angel-morning.jpg", `
  Angel of God, my Guardian dear
    To Whom God's love commits me here
  Ever this day be at my side
    To light and guard, to rule and guide
  Amen
`);
}

function AngelNight() {
  return makePrayer("./images/angel-night.jpg", `
  Angel of God, my Guardian dear
    To Whom God's love commits me here
  Ever this night be at my side
    To light and guard, to rule and guide
  Amen
`);
}

function OurFather() {
  return makePrayer("./images/jesus-sacred-heart.jpg", `
  Our Father
    Who art in Heaven
      Hallowed be Thy Name
      Thy Kingdome come
      Thy Will be done
        On Earth as it is in Heaven
    Give us this day our daily bread
      And forgive us our trespasses
        As we forgive those who trespass against us
      And lead us not into temptation
      But deliver us from evil
  Amen
`);
}

function HailMary() {
  return makePrayer("./images/mary-angels.jpg", `
  Hail Mary
    Full of Grace
      The Lord is with thee
    Blessed art thou among women
      And blessed is the fruit of thy womb, Jesus
    Holy Mary, Mother of God
      Pray for us sinners now
        And at the hour of our death
  Amen
`);
}

function GloryBe() {
  return makePrayer("./images/holy-trinity.jpg", `
  Glory be
    To the Father
    And to the Son
    And to the Holy Spirit
  As it was
    In the beginning
    Is now
    And ever shall be
      World without end
  Amen
`);
}

function PreciousBlood() {
  return makePrayer("./images/precious-blood.jpg", `
  Eternal Father
    I offer Thee
      The Most Precious Blood
      Of Thy Divine Son, Jesus
    In union with
      The Masses said
      Throughout the world today
    For
      All the Holy Souls in Purgatory
      For sinners everywhere
      For sinners in the universal Church
      Those in my own home
      And within my family
  Amen
`);
}

function SaintMichael() {
  return makePrayer("./images/michael.jpg", `
  St. Michael the Archangel
    Defend us in battle
      Be our protection against
      The wickedness and snares
      Of the devil
        May God rebuke him
        We humbly pray
    And do thou
      O Prince of the Heavenly Hosts
      By the power of God
      Cast into Hell
        Satan, and all the evil spirits
        Who prowl about the world
        Seeking the ruin of souls
  Amen
`);
}

function Memorare() {
  return makePrayer("../sidebar/pic.jpg", `
  Holy Family
    Save our family
      Amen
`);
}

function makePrayer(img: string, text: string) {
  return <>
    <HalfGrid>
      <Img src={img} />
      <div class='uk-align-center'>
        <div class='uk-text-lead uk-width-1-4' style='white-space: pre; text-align: left'>
          {text}
        </div>
      </div>
    </HalfGrid>
  </>;
}

function Img(attrs: { src: string }, children: any) {
  return <div style='height:100%'><img src={attrs.src} alt="" style='height: 100%' /></div>;
}

function HalfGrid(attrs: any, children: any) {
  return <div class="uk-child-width-expand@s uk-text-center" uk-grid>
    {children}
  </div>;
}

function Slideshow(attrs: any, children: any) {
  return <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow>
    <div class="uk-slideshow-items" style='height: 80vh'>
      {children}
    </div>
    <a class="uk-slidenav-large uk-position-center-left" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
    <a class="uk-slidenav-large uk-position-center-right" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
  </div>;
}

function Head() {
  return <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prayers</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.20.5/dist/css/uikit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.20.5/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.20.5/dist/js/uikit-icons.min.js"></script>
    <style>{`
      html,
      body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: #222 !important;
      }
    `}</style>
  </head>;
}
