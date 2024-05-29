import { Font } from '../components/fonts.js';
import martel from '../fonts/martel/';

export default <>
  <Html>
    <Tabs tabs={{
      "Morning":
        <Slideshow>
          <AngelMorning />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <Memorare />
        </Slideshow>,
      "Noon":
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
        </Slideshow>,
      "Night":
        <Slideshow>
          <AngelNight />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <Memorare />
        </Slideshow>
    }} />
  </Html>
</>;

function Line(attrs: any, children: any) {
  return <span class='highlightable-line'>{children}{'\n'}</span>;
}

function Intro() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title'>Auxilium Christianorum</p>
      <p class='spaced-small'>
        Our help is in the name of the Lord.<br />
        <Red>Who made heaven and earth.</Red>
      </p>
      <div class='column wider'>
        <p class='spaced-small'>
          <Line>Most gracious Virgin Mary,</Line>
          <Line>  thou who wouldst crush the head of the serpent,</Line>
          <Line>    protect us from the vengeance of the evil one.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We offer our prayers, supplications, sufferings and good works to thee</Line>
          <Line>  so that thou may purify them, sanctify them and present them</Line>
          <Line>    to thy Son as a perfect offering.</Line>
        </p>
        <p class='spaced-small'>
          <Line>May this offering be given so that</Line>
          <Line>  the demons that influence or seek to influence the members of the Auxilium Christianorum</Line>
          <Line>    do not know the source of their expulsion and blindness.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Blind them so that they know not our good works.</Line>
          <Line>  Blind them so that they know not on whom to take vengeance.</Line>
          <Line>    Blind them so that they may receive the just sentence for their works.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Cover us with the Precious Blood of thy Son</Line>
          <Line>  so that we may enjoy the protection</Line>
          <Line>    which flows from His Passion and Death.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Amen</Line>
        </p>
      </div>
    </div>
  </Panel>;
}

function Conclusion() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title'>Conclusion</p>
      <p class='column spaced-small'>August Queen of the Heavens, heavenly Sovereign of the Angels, Thou who from
        the beginning hast received from God the power and the mission to crush the head
        of Satan, we humbly beseech Thee to send thy holy legions, so that under Thy
        command and through Thy power, they may pursue the demons and combat them
        everywhere, suppress their boldness, and drive them back into the abyss. O good
        and tender Mother, Thou wilt always be our love and hope! O Divine Mother, send
        Thy Holy Angels to defend us and to drive far away from us the cruel enemy. Holy
        Angels and Archangels, defend us, guard us. Amen.
      </p>
      <p class='spaced-small two-cols'>
        <span>Most Sacred Heart of Jesus,</span><Red>have mercy on us.</Red>
        <span>Mary, Help of Christians,</span><Red>pray for us.</Red>
        <span>Virgin Most Powerful,</span><Red>pray for us.</Red>
        <span>St. Joseph,</span><Red>pray for us.</Red>
        <span>St. Michael the Archangel,</span><Red>pray for us.</Red>
        <span>All You Holy Angels,</span><Red>pray for us.</Red>
      </p>
      <p class='spaced-small'>
        <Red>In the name of the Father, the Son and the Holy Spirit. Amen.</Red>
      </p>
    </div>
  </Panel>;
}

function Sunday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Sunday</p>
      <p class='column spaced-small'>
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
      <p class='column spaced-small'>
        St. Joseph, Patron of the Universal Church, come to our aid in this grave
        battle against the forces of darkness, repel the attacks of the devil and free the
        members of the Auxilium Christianorum, and those for whom the priests of the
        Auxilium Christianorum pray, from the strongholds of the enemy.
      </p>
      <p class='column spaced-small'>
        St. Michael, summon the entire heavenly court to engage their forces in this
        fierce battle against the powers of hell. Come O Prince of Heaven with thy mighty
        sword and thrust into hell Satan and all the other evil spirits. O Guardian Angels,
        guide and protect us. Amen.
      </p>
    </div>
  </Panel>;
}

function Monday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Monday</p>
      <p class='column spaced-small'>
        In Thy name, Lord Jesus Christ, we pray that Thou cover us, our families, and all
        of our possessions with Thy love and Thy Most Precious Blood and surround us
        with Thy Heavenly Angels, Saints and the mantle of Our Blessed Mother. Amen.
      </p>
    </div>
  </Panel>;
}

function Tuesday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Tuesday</p>
      <p class='column spaced-small'>
        Lord Jesus Christ, we beg Thee for the grace to remain guarded beneath the
        protective mantle of Mary, surrounded by the holy briar from which was taken the
        Holy Crown of Thorns, and saturated with Thy Precious Blood in the power of the
        Holy Spirit, with our Guardian Angels, for the greater glory of the Father. Amen.
      </p>
    </div>
  </Panel>;
}

function Wednesday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Wednesday</p>
      <p class='column spaced-small'>
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
        attachments <Red>in the Name of the Father, and of the Son and of the Holy Spirit. Amen.</Red>
      </p>
    </div>
  </Panel>;
}

function Thursday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Thursday</p>
      <p class='column spaced-small'>
        My Lord, Thou art all powerful, Thou art God, Thou art our Father. We beg Thee
        through the intercession and help of the Archangels Sts. Michael, Raphael, and
        Gabriel for the deliverance of our brothers and sisters who are enslaved by the evil
        one. All Saints of Heaven, come to our aid.
      </p>
      <p class='two-cols spaced-small'>
        <span>From anxiety, sadness and obsessions,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From hatred, fornication, and envy,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From thoughts of jealousy, rage, and death,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From every thought of suicide and abortion,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From every form of sinful sexuality,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From every division in our family, and every harmful friendship,</span><Red>We implore Thee, deliver us, O Lord.</Red>
        <span>From every sort of spell, malefice, witchcraft, and every form of the occult,</span><Red>We implore Thee, deliver us, O Lord.</Red>
      </p>
      <p class='column spaced-small'>
        Thou who said, "Peace I leave with you, my peace I give unto you." Grant that,
        through the intercession of the Virgin Mary, we may be liberated from every
        demonic influence and enjoy Thy peace always. In the Name of Christ, our Lord.
        Amen.
      </p>
    </div>
  </Panel>;
}

function Friday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Friday</p>
      <p class='title spaced-small'>Litany of Humility</p>
      <p class='two-cols spaced-small'>
        <span>O Jesus meek and humble,</span><Red>hear me.</Red>
      </p>
      <p class='two-cols spaced-small'>
        <span>From the desire of being esteemed,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being loved,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being extolled,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being honored,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being praised,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being preferred to others,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being consulted,</span><Red>deliver me Jesus.</Red>
        <span>From the desire of being approved,</span><Red>deliver me Jesus.</Red>
      </p>
      <p class='two-cols spaced-small'>
        <span>From the fear of being humiliated,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being despised,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of suffering rebukes,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being calumniated,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being forgotten,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being ridiculed,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being wronged,</span><Red>deliver me Jesus.</Red>
        <span>From the fear of being suspected,</span><Red>deliver me Jesus.</Red>
      </p>
      <p class='two-cols spaced-small'>
        <span>That others may be loved more than I,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That others may be esteemed more than I,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That in the opinion of the world, others may increase and I may decrease,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That others may be chosen and I set aside,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That others may be praised and I go unnoticed,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That others may be preferred to me in everything,</span><Red>Jesus, grant me the grace to desire it.</Red>
        <span>That others may become holier than I, provided that I become as holy as I should,</span><Red>Jesus, grant me the grace to desire it.</Red>
      </p>
    </div>
  </Panel>;
}

function Saturday() {
  return <Panel>
    <div class='centered spaced-big'>
      <p class='title show-today'>Saturday</p>
      <p class='column spaced-small'>
        O God and Father of our Lord Jesus Christ, we call upon Thy holy Name and
        humbly beseech Thy clemency, that, through the intercession of the ever
        immaculate Virgin, our Mother Mary, and of the glorious Archangel Saint Michael,
        thou wouldst vouchsafe to help us against Satan and all the other unclean spirits that
        are prowling about the world to the great peril of the human race and the loss of
        souls. Amen.
      </p>
    </div>
  </Panel>;
}

function Litany() {
  return <Panel>
    <div class='centered spaced-big' id='litany'>

      <p class='title'>Litany of the Precious Blood</p>

      <div class='two-cols spaced-small'>
        <span>Lord have mercy,</span><Red>Lord have mercy.</Red>
        <span>Christ have mercy,</span><Red>Christ have mercy.</Red>
        <span>Lord have mercy,</span><Red>Lord have mercy.</Red>
        <span>Christ hear us,</span><Red>Christ graciously hear us.</Red>
      </div>

      <div class='two-cols spaced-small'>
        <span>God the Father of Heaven,</span><Red>have mercy on us.</Red>
        <span>God the Son, Redeemer of the world,</span><Red>have mercy on us.</Red>
        <span>God the Holy Spirit,</span><Red>have mercy on us.</Red>
        <span>Holy Trinity, One God,</span><Red>have mercy on us.</Red>
      </div>

      <div class='two-cols spaced-small'>
        <span>Blood of Christ, only-begotten Son of the Eternal Father,</span><Red>save us.</Red>
        <span>Blood of Christ, Incarnate Word of God,</span><Red>save us.</Red>
        <span>Blood of Christ, of the New and Eternal Testament,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, falling upon the earth in the Agony,</span><Red>save us.</Red>
        <span>Blood of Christ, shed profusely in the Scourging,</span><Red>save us.</Red>
        <span>Blood of Christ, flowing forth in the Crowning with Thorns,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, poured out on the Cross,</span><Red>save us.</Red>
        <span>Blood of Christ, price of our salvation,</span><Red>save us.</Red>
        <span>Blood of Christ, without which there is no forgiveness,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, Eucharistic drink and refreshment of souls,</span><Red>save us.</Red>
        <span>Blood of Christ, stream of mercy,</span><Red>save us.</Red>
        <span>Blood of Christ, victor over demons,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, courage of Martyrs,</span><Red>save us.</Red>
        <span>Blood of Christ, strength of Confessors,</span><Red>save us.</Red>
        <span>Blood of Christ, bringing forth Virgins,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, help of those in peril,</span><Red>save us.</Red>
        <span>Blood of Christ, relief of the burdened,</span><Red>save us.</Red>
        <span>Blood of Christ, solace in sorrow,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, hope of the penitent,</span><Red>save us.</Red>
        <span>Blood of Christ, consolation of the dying,</span><Red>save us.</Red>
        <span>Blood of Christ, peace and tenderness of hearts,</span><Red>save us.</Red>
        <span class='spaced-mini' /><span />
        <span>Blood of Christ, pledge of eternal life,</span><Red>save us.</Red>
        <span>Blood of Christ, freeing souls from purgatory,</span><Red>save us.</Red>
        <span>Blood of Christ, most worthy of all glory and honor,</span><Red>save us.</Red>
      </div>

      <div class='two-cols spaced-small'>
        <span>Lamb of God, Who takest away the sins of the world,</span><Red>spare us, O Lord.</Red>
        <span>Lamb of God, Who takest away the sins of the world,</span><Red>graciously hear us, O Lord.</Red>
        <span>Lamb of God, Who takest away the sins of the world,</span><Red>have mercy on us.</Red>
      </div>

      <p class='spaced-small'>
        Thou hast redeemed us with Thy Blood, O Lord.<br />
        <Red>And made of us a kingdom for our God.</Red>
      </p>

      <p class='spaced-medium' style='text-align:center; font-style:italic'>Let us pray.</p>

      <p class='column spaced-small'>
        Almighty, and everlasting God, Who hast appointed Thine only-begotten Son to be
        the Redeemer of the world, and hast been pleased to be reconciled unto us by His
        Blood, grant us, we beseech Thee, so to venerate with solemn worship the price of
        our salvation, that the power thereof may here on earth keep us from all things
        hurtful, and the fruit of the same may gladden us for ever hereafter in heaven.
        Through the same Christ our Lord. <Red>Amen.</Red>
      </p>
    </div>
  </Panel>;
}

function AngelMorning() {
  return <Prayer img="./images/angel-morning.jpg">
    <Line>Angel of God, my Guardian dear</Line>
    <Line>  To Whom God's love commits me here</Line>
    <Line>Ever this day be at my side</Line>
    <Line>  To light and guard, to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function AngelNight() {
  return <Prayer img="./images/angel-night.jpg">
    <Line>Angel of God, my Guardian dear</Line>
    <Line>  To Whom God's love commits me here</Line>
    <Line>Ever this night be at my side</Line>
    <Line>  To light and guard, to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function OurFather() {
  return <Prayer img="./images/jesus-sacred-heart.jpg">
    <Line>Our Father</Line>
    <Line>  Who art in Heaven</Line>
    <Line>    Hallowed be Thy Name</Line>
    <Line>    Thy Kingdome come</Line>
    <Line>    Thy Will be done</Line>
    <Line>      On Earth as it is in Heaven</Line>
    <Line>  Give us this day our daily bread</Line>
    <Line>    And forgive us our trespasses</Line>
    <Line>      As we forgive those who trespass against us</Line>
    <Line>    And lead us not into temptation</Line>
    <Line>    But deliver us from evil</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function HailMary() {
  return <Prayer img="./images/mary-angels.jpg">
    <Line>Hail Mary</Line>
    <Line>  Full of Grace</Line>
    <Line>    The Lord is with thee</Line>
    <Line>  Blessed art thou among women</Line>
    <Line>    And blessed is the fruit of thy womb, Jesus</Line>
    <Line>  Holy Mary, Mother of God</Line>
    <Line>    Pray for us sinners now</Line>
    <Line>      And at the hour of our death</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function GloryBe() {
  return <Prayer img="./images/holy-trinity.jpg">
    <Line>Glory be</Line>
    <Line>  To the Father</Line>
    <Line>  And to the Son</Line>
    <Line>  And to the Holy Spirit</Line>
    <Line>As it was</Line>
    <Line>  In the beginning</Line>
    <Line>  Is now</Line>
    <Line>  And ever shall be</Line>
    <Line>    World without end</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function PreciousBlood() {
  return <Prayer img="./images/precious-blood.jpg">
    <Line>Eternal Father</Line>
    <Line>  I offer Thee</Line>
    <Line>    The Most Precious Blood</Line>
    <Line>    Of Thy Divine Son, Jesus</Line>
    <Line>  In union with</Line>
    <Line>    The Masses said</Line>
    <Line>    Throughout the world today</Line>
    <Line>  For</Line>
    <Line>    All the Holy Souls in Purgatory</Line>
    <Line>    For sinners everywhere</Line>
    <Line>    For sinners in the universal Church</Line>
    <Line>    Those in my own home</Line>
    <Line>    And within my family</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function SaintMichael() {
  return <Prayer img="./images/michael.jpg">
    <Line>St. Michael the Archangel</Line>
    <Line>  Defend us in battle</Line>
    <Line>    Be our protection against</Line>
    <Line>    The wickedness and snares</Line>
    <Line>    Of the devil</Line>
    <Line>      May God rebuke him</Line>
    <Line>      We humbly pray</Line>
    <Line>  And do thou</Line>
    <Line>    O Prince of the Heavenly Hosts</Line>
    <Line>    By the power of God</Line>
    <Line>    Cast into Hell</Line>
    <Line>      Satan, and all the evil spirits</Line>
    <Line>      Who prowl about the world</Line>
    <Line>      Seeking the ruin of souls</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function Memorare() {
  return <Prayer img='../sidebar/pic.jpg'>
    <Line>Holy Family</Line>
    <Line>  Save our family</Line>
    <Line>    Amen</Line>
  </Prayer>;
}

function Prayer(attrs: { img: string }, children: any) {
  return (
    <Panel>
      <div class='half-grid'>
        <div class='centered'>
          <img src={attrs.img} alt="" />
        </div>
        <div class='centered'>
          {children}
        </div>
      </div>
    </Panel>
  );
}

function Red(attrs: any, children: any) {
  return <span class='red'>{children}</span>;
}

function Panel(attrs: any, children: any) {
  return <div class="panel">
    <div class='panel-body'>
      {children}
    </div>
  </div>;
}

function Slideshow(attrs: any, children: any) {
  return <div class="slideshow">
    {children}
  </div>;
}

function Tabs(attrs: { tabs: Record<string, JSX.Element> }) {
  return <>
    <div id='tab-container'>
      <div id='tabs-names'>
        {Object.keys(attrs.tabs).map((tabName, i) => (
          <a href="#">{tabName}</a>
        ))}
      </div>
      <div id='tabs-bodies'>
        {Object.values(attrs.tabs)}
      </div>
    </div>
  </>;
}

function Html(attrs: any, children: any) {
  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Prayers</title>
        <link href='./style.css' rel='stylesheet' />
        <script src='./client.js' type='module' />
        <link rel="icon" type="image/png" sizes="32x32" href='./favicon.ico' />
      </head>
      <body>
        <Font use={martel} fallback="serif">
          {children}
        </Font>
      </body>
    </html>
  </>;
}
