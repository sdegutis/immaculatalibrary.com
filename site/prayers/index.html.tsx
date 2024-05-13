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
          <SaintMichael />
          <AngelMorning />
          <OurFather />
          <HailMary />
          <GloryBe />
          <Litany />
          <Sunday />
          <Monday />
          <Tuesday />
          <Wednesday />
          <Thursday />
          <Friday />
          <Saturday />
          <Conclusion />
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
  return <div>
    <div class="uk-container uk-container-xsmall uk-text-large">
      <p><span style="color: crimson">V.</span> Our help is in the name of the Lord.</p>
      <p><span style="color: crimson">R.</span> Who made heaven and earth.</p>
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
    </div>
  </div>;
}

function Conclusion() {
  return <div>
    <div class="uk-container uk-container-xsmall uk-text-large">

      <p>August Queen of the Heavens, heavenly Sovereign of the Angels, Thou who from
        the beginning hast received from God the power and the mission to crush the head
        of Satan, we humbly beseech Thee to send thy holy legions, so that under Thy
        command and through Thy power, they may pursue the demons and combat them
        everywhere, suppress their boldness, and drive them back into the abyss. O good
        and tender Mother, Thou wilt always be our love and hope! O Divine Mother, send
        Thy Holy Angels to defend us and to drive far away from us the cruel enemy. Holy
        Angels and Archangels, defend us, guard us. Amen.
      </p>

      <p>
        Most Sacred Heart of Jesus, <i style='color:crimson;font-style:italic'>have mercy on us.</i><br />
        Mary, Help of Christians, <i style='color:crimson;font-style:italic'>pray for us.</i><br />
        Virgin Most Powerful, <i style='color:crimson;font-style:italic'>pray for us.</i><br />
        St. Joseph, <i style='color:crimson;font-style:italic'>pray for us.</i><br />
        St. Michael the Archangel, <i style='color:crimson;font-style:italic'>pray for us.</i><br />
        All You Holy Angels, <i style='color:crimson;font-style:italic'>pray for us.</i><br />
      </p>

      <p>In the name of the Father, the Son and the Holy Spirit. Amen.</p>

    </div>
  </div>;
}

function Sunday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-xsmall uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Sunday</p>
      <p>
        O Glorious Queen of Heaven and Earth, Virgin Most Powerful, thou who hast the
        power to crush the head of the ancient serpent with thy heel, come and exercise this
        power flowing from the grace of thine Immaculate Conception. Shield us under the
        mantle of thy purity and love, draw us into the sweet abode of thy heart and
        annihilate and render impotent the forces bent on destroying us. Come Most
        Sovereign Mistress of the Holy Angels and Mistress of the Most Holy Rosary, thou
        who from the very beginning hast received from God the power and the mission to
        crush the head of Satan. Send forth thy holy legions, we humbly beseech thee, that
        under thy command and by thy power they may pursue the evil spirits, counter them
        on every side, resist their bold attacks and drive them far from us, harming no one
        on the way, binding them to the foot of the Cross to be judged and sentenced by
        Jesus Christ Thy Son and to be disposed of by Him as He wills.
      </p>
      <p>
        St. Joseph, Patron of the Universal Church, come to our aid in this grave
        battle against the forces of darkness, repel the attacks of the devil and free the
        members of the Auxilium Christianorum, and those for whom the priests of the
        Auxilium Christianorum pray, from the strongholds of the enemy.
      </p>
      <p>
        St. Michael, summon the entire heavenly court to engage their forces in this
        fierce battle against the powers of hell. Come O Prince of Heaven with thy mighty
        sword and thrust into hell Satan and all the other evil spirits. O Guardian Angels,
        guide and protect us. Amen.
      </p>
    </div>
  </div>;
}

function Monday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-xsmall uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Monday</p>
      <p>
        In Thy name, Lord Jesus Christ, we pray that Thou cover us, our families, and all
        of our possessions with Thy love and Thy Most Precious Blood and surround us
        with Thy Heavenly Angels, Saints and the mantle of Our Blessed Mother. Amen.
      </p>
    </div>
  </div>;
}

function Tuesday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-xsmall uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Tuesday</p>
      <p>
        Lord Jesus Christ, we beg Thee for the grace to remain guarded beneath the
        protective mantle of Mary, surrounded by the holy briar from which was taken the
        Holy Crown of Thorns, and saturated with Thy Precious Blood in the power of the
        Holy Spirit, with our Guardian Angels, for the greater glory of the Father. Amen.
      </p>
    </div>
  </div>;
}

function Wednesday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-xsmall uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Wednesday</p>
      <p>
        In the Name of Jesus Christ, Our Lord and God, we ask Thee to render all spirits
        impotent, paralyzed and ineffective in attempting to take revenge against anyone
        of the members of the Auxilium Christianorum, our families, friends, communities,
        those who pray for us and their family members, or anyone associated with us and
        for whom the priests of the Auxilium Christianorum pray. We ask Thee to bind all
        evil spirits, all powers in the air, the water, the ground, the fire, under ground, or
        wherever they exercise their powers, any satanic forces in nature and any and all
        emissaries of the satanic headquarters. We ask Thee to bind by Thy Precious Blood
        all of the attributes, aspects and characteristics, interactions, communications and
        deceitful games of the evil spirits. We ask Thee to break any and all bonds, ties and
        attachments in the Name of the Father, and of the Son and of the Holy Spirit. Amen.
      </p>
    </div>
  </div>;
}

function Thursday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-small uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Thursday</p>
      <p>
        My Lord, Thou art all powerful, Thou art God, Thou art our Father. We beg Thee
        through the intercession and help of the Archangels Sts. Michael, Raphael, and
        Gabriel for the deliverance of our brothers and sisters who are enslaved by the evil
        one. All Saints of Heaven, come to our aid.
      </p>
      <p>
        From anxiety, sadness and obsessions, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From hatred, fornication, and envy, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From thoughts of jealousy, rage, and death, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From every thought of suicide and abortion, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From every form of sinful sexuality, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From every division in our family, and every harmful friendship, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
        From every sort of spell, malefice, witchcraft, and every form of the occult, <i style='font-style:italic;color:crimson'>We implore Thee, deliver us, O Lord.</i><br />
      </p>
      <p>
        Thou who said, "Peace I leave with you, my peace I give unto you." Grant that,
        through the intercession of the Virgin Mary, we may be liberated from every
        demonic influence and enjoy Thy peace always. In the Name of Christ, our Lord.
        Amen.
      </p>
    </div>
  </div>;
}

function Friday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-small uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Friday</p>
      <p>
        (Litany of Humility)
      </p>
    </div>
  </div>;
}

function Saturday() {
  return <div class='day-prayer'>
    <div class="uk-container uk-container-small uk-text-medium">
      <p class='uk-text-lead uk-text-success'>Saturday</p>
      <p>
        O God and Father of our Lord Jesus Christ, we call upon Thy holy Name and
        humbly beseech Thy clemency, that, through the intercession of the ever
        immaculate Virgin, our Mother Mary, and of the glorious Archangel Saint Michael,
        thou wouldst vouchsafe to help us against Satan and all the other unclean spirits that
        are prowling about the world to the great peril of the human race and the loss of
        souls. Amen.
      </p>
    </div>
  </div>;
}

function Litany() {
  return <HalfGrid>
    <div class='uk-width-1-3@m'>
      <Img src='./images/precious-blood-litany.jpg' />
    </div>

    <div style='height: 80vh; overflow: auto' class='uk-width-expand@m'>
      <div class="uk-container uk-container-large uk-text-large uk-text-left">
        <p>
          Lord have mercy.<br />
          Christ have mercy.<br />
          Lord have mercy.<br />
          Christ hear us.<br />
          Christ graciously hear us.<br />
          <br />
          God the Father of Heaven, <i style="color: crimson">have mercy on us.</i><br />
          God the Son, Redeemer of the world, <i style="color: crimson">have mercy on us.</i><br />
          God the Holy Spirit, <i style="color: crimson">have mercy on us.</i><br />
          Holy Trinity, One God, <i style="color: crimson">have mercy on us.</i><br />
          <br />
          Blood of Christ, only-begotten Son of the Eternal Father, <i style="color: crimson">save us.</i><br />
          Blood of Christ, Incarnate Word of God, <i style="color: crimson">save us.</i><br />
          Blood of Christ, of the New and Eternal Testament, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, falling upon the earth in the Agony, <i style="color: crimson">save us.</i><br />
          Blood of Christ, shed profusely in the Scourging, <i style="color: crimson">save us.</i><br />
          Blood of Christ, flowing forth in the Crowning with Thorns, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, poured out on the Cross, <i style="color: crimson">save us.</i><br />
          Blood of Christ, price of our salvation, <i style="color: crimson">save us.</i><br />
          Blood of Christ, without which there is no forgiveness, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, Eucharistic drink and refreshment of souls, <i style="color: crimson">save us.</i><br />
          Blood of Christ, stream of mercy, <i style="color: crimson">save us.</i><br />
          Blood of Christ, victor over demons, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, courage of Martyrs, <i style="color: crimson">save us.</i><br />
          Blood of Christ, strength of Confessors, <i style="color: crimson">save us.</i><br />
          Blood of Christ, bringing forth Virgins, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, help of those in peril, <i style="color: crimson">save us.</i><br />
          Blood of Christ, relief of the burdened, <i style="color: crimson">save us.</i><br />
          Blood of Christ, solace in sorrow, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, hope of the penitent, <i style="color: crimson">save us.</i><br />
          Blood of Christ, consolation of the dying, <i style="color: crimson">save us.</i><br />
          Blood of Christ, peace and tenderness of hearts, <i style="color: crimson">save us.</i><br />
          <br />
          Blood of Christ, pledge of eternal life, <i style="color: crimson">save us.</i><br />
          Blood of Christ, freeing souls from purgatory, <i style="color: crimson">save us.</i><br />
          Blood of Christ, most worthy of all glory and honor, <i style="color: crimson">save us.</i><br />
          <br />
          Lamb of God, Who takest away the sins of the world, <i style="color: crimson">spare us, O Lord.</i><br />
          Lamb of God, Who takest away the sins of the world, <i style="color: crimson">graciously hear us, O Lord.</i><br />
          Lamb of God, Who takest away the sins of the world, <i style="color: crimson">have mercy on us.</i><br />
        </p>
        <p>
          <i style="color: crimson">V.</i> Thou hast redeemed us with Thy Blood, O Lord.<br />
          <i style="color: crimson">R.</i> And made of us a kingdom for our God.
        </p>
        <p style='text-align:center; font-style:italic'>Let us pray.</p>
        <p>
          Almighty, and everlasting God, Who hast appointed Thine only-begotten Son to be
          the Redeemer of the world, and hast been pleased to be reconciled unto us by His
          Blood, grant us, we beseech Thee, so to venerate with solemn worship the price of
          our salvation, that the power thereof may here on earth keep us from all things
          hurtful, and the fruit of the same may gladden us for ever hereafter in heaven.
          Through the same Christ our Lord. <i style="color: crimson">Amen.</i>
        </p>
      </div>
    </div>
  </HalfGrid>;
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
        color-scheme: dark;
      }
    `}</style>
  </head>;
}
