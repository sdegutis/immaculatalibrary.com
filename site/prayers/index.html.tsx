import { Navlinks } from '../components/navlinks.js';
import { EmptyPage } from '../components/page.js';
import gloriousList from './rosary/glorious/';
import joyfulList from './rosary/joyful/';
import luminousList from './rosary/luminous/';
import sorrowfulList from './rosary/sorrowful/';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'] as const;
type DAY = typeof DAYS[number];

export default <>
  <EmptyPage favicons={<link rel="icon" type="image/png" sizes="32x32" href='./favicon.ico' />}>
    <link rel='stylesheet' href='./style.css' />
    <script src='./$client.js' type='module' />

    <Tabs tabs={{
      "Morning":
        <Slideshow>
          <AngelMorning />
          <MorningPrayers />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <HolyFamilyPrayer />
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
          <HolyFamilyPrayer />
        </Slideshow>,
      "Rosary":
        <Slideshow>
          <ApostlesCreed />
          <OurFather />
          <HailMary />
          <HailMary />
          <HailMary />
          <GloryBe />
          <Mystery name='Joyful' list={joyfulList} days={['SAT', 'MON']} mysteries={[
            'The Annunciation',
            'Visitation to Elizabeth',
            'Nativity / Christmas',
            'Presentation at the Temple',
            'Finding at the Temple']} />
          <Mystery name='Luminous' list={luminousList} days={['THUR']} mysteries={[
            'Baptism in the Jordan',
            'Wedding Feast at Cana',
            'Proclamation of the Kingdom',
            'Transfiguration',
            'Institution of the Eucharist']} />
          <Mystery name='Sorrowful' list={sorrowfulList} days={['TUE', 'FRI']} mysteries={[
            'Agony in the Garden',
            'Scourging at the Pillar',
            'Crowning with Thorns',
            'Carrying of the Cross',
            'Crucifixion']} />
          <Mystery name='Glorious' list={gloriousList} days={['WED', 'SUN']} mysteries={[
            'Resurrection',
            'Ascension',
            'Descent of the Holy Spirit',
            'Assumption of Mary',
            'Crowning of Mary as Queen of Heaven and Earth']} />
          <HailHolyQueen />
          <RosaryPrayer />
          <SaintMichael />
          <OurFather />
          <HailMary />
          <GloryBe />
        </Slideshow>,
    }} />
  </EmptyPage>
</>;

function Mystery(attrs: { name: string, list: FsFile[], mysteries: string[], days: DAY[] }) {
  const dayClasses = attrs.days.map(day => `day-${DAYS.indexOf(day)}`).join(' ');
  const labels = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  const mysteries = Object.values(Object.groupBy(attrs.list, f => f.path.match(/\/\d/)?.[0]!));
  return <>{mysteries.map((mystery, i) =>
    <Panel>
      {mystery!.map(file => <>
        <div class={`half-grid highlightable-line mystery ${dayClasses}`}>
          <div class='centered'>
            <img src={file.path} loading='lazy' />
          </div>
          <div class='centered'>
            <h1>{labels[i]} {attrs.name} Mystery</h1>
            <h2>{attrs.mysteries[i]}</h2>
          </div>
        </div>
      </>)}
    </Panel>
  )}</>;
}

function Line(attrs: any, children: any) {
  return <span class='highlightable-line'>{children}{'\n'}</span>;
}

function Intro() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Auxilium Christianorum</h1>
      <a href='http://auxiliumchristianorum.org/'>Official website</a>
      <p class='spaced-small'>
        <Line>Our help is in the name of the Lord.</Line>
        <Line><Red>Who made heaven and earth.</Red></Line>
      </p>
      <div>
        <p class='spaced-small'>
          <Line>Most gracious Virgin Mary,</Line>
          <Line>    thou who wouldst crush the head of the serpent,</Line>
          <Line>        protect us from the vengeance of the evil one.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We offer our prayers, supplications, sufferings and good works to thee</Line>
          <Line>    so that thou may purify them, sanctify them and present them</Line>
          <Line>        to thy Son as a perfect offering.</Line>
        </p>
        <p class='spaced-small'>
          <Line>May this offering be given so that</Line>
          <Line>    the demons that influence or seek to influence the members of the Auxilium Christianorum</Line>
          <Line>        do not know the source of their expulsion and blindness.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Blind them so that they know not our good works.</Line>
          <Line>    Blind them so that they know not on whom to take vengeance.</Line>
          <Line>        Blind them so that they may receive the just sentence for their works.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Cover us with the Precious Blood of thy Son</Line>
          <Line>    so that we may enjoy the protection</Line>
          <Line>        which flows from His Passion and Death.</Line>
        </p>
        <p class='spaced-small'>
          <Line><Red>Amen</Red></Line>
        </p>
      </div>
    </div>
  </Panel>;
}

function Conclusion() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Conclusion</h1>
      <p class='spaced-small'>
        <Line>August Queen of the Heavens,</Line>
        <Line>  heavenly Sovereign of the Angels,</Line>
        <Line>    Thou who from the beginning</Line>
        <Line>      hast received from God the power and the mission</Line>
        <Line>        to crush the head of Satan,</Line>
        <Line>we humbly beseech Thee to send thy holy legions,</Line>
        <Line>  so that under Thy command and through Thy power,</Line>
        <Line>    they may pursue the demons</Line>
        <Line>      and combat them everywhere,</Line>
        <Line>        suppress their boldness,</Line>
        <Line>          and drive them back into the abyss.</Line>
        <Line>O good and tender Mother,</Line>
        <Line>  Thou wilt always be our love and hope!</Line>
        <Line>    O Divine Mother, send Thy Holy Angels to defend us</Line>
        <Line>      and to drive far away from us the cruel enemy.</Line>
        <Line>        Holy Angels and Archangels, defend us, guard us.</Line>
        <Line>Amen.</Line>
      </p>
      <p class='spaced-small two-cols'>
        <span><Line>Most Sacred Heart of Jesus,</Line></span><Line><Red>have mercy on us.</Red></Line>
        <span><Line>Mary, Help of Christians,</Line></span><Line><Red>pray for us.</Red></Line>
        <span><Line>Virgin Most Powerful,</Line></span><Line><Red>pray for us.</Red></Line>
        <span><Line>St. Joseph,</Line></span><Line><Red>pray for us.</Red></Line>
        <span><Line>St. Michael the Archangel,</Line></span><Line><Red>pray for us.</Red></Line>
        <span><Line>All You Holy Angels,</Line></span><Line><Red>pray for us.</Red></Line>
      </p>
      <p class='spaced-small'>
        <Line><Red>In the name of the Father, the Son and the Holy Spirit. Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function MorningPrayers() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Morning Prayers</h1>
      <p class='spaced-small'>
        <Line>Dear Lord, thank you for today.</Line>
        <Line>    Bless our family,</Line>
        <Line>        [name all the members].</Line>
        <br />
        <Line>Have mercy on us</Line>
        <Line>    forgive us our sins</Line>
        <Line>        and bring us to eternal life.</Line>
        <br />
        <Line>Unblind us from all spiritual blindness</Line>
        <Line>    soften our hardened hearts</Line>
        <Line>        and free us from all slavery to sin.</Line>
        <br />
        <Line>Protect us from</Line>
        <Line>    the world, the devil, and the flesh</Line>
        <Line>        and the seven deadly sins.</Line>
        <br />
        <Line>Fill us with faith,</Line>
        <Line>    hope,</Line>
        <Line>        and love.</Line>
        <br />
        <Line>Help us to love you,</Line>
        <Line>    know you,</Line>
        <Line>        and serve you.</Line>
        <br />
        <Line>Help us to love you</Line>
        <Line>    with our whole heart, mind, soul, and strength</Line>
        <Line>        because you are all good and deserve all our love.</Line>
        <br />
        <Line>Help us to do our prayers</Line>
        <Line>    holy reading</Line>
        <Line>        and devotions.</Line>
        <br />
        <Line><Red>Amen</Red></Line>
      </p>
      <p class='spaced-small two-cols'>
        <span><Line>St. Jane Frances de Chantal</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Therese of Lisieux</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. John Bosco</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Joan of Arc</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Teresa of Avila</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. Catherine of Siena</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Rose of Lima</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. John Paul II</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Cecilia</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. Philomena</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Jude</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Augustine</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. Benedict</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Francis of Assisi</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Monica</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. Rita</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Dymphna</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>St. Francis de Sales</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> St. Vincent de Paul</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  St. Thomas More</Line></span><Line><Red>Pray for us.</Red></Line>
        <span /><span class='spaced-small' />
        <span><Line>Patron Saints</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> Guardian Angels</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  Holy Souls in Purgatory</Line></span><Line><Red>Pray for us.</Red></Line>
      </p>
      <p class='spaced-small two-cols'>
        <span><Line>Most Chaste Heart of Blessed St. Joseph</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line> Most Immaculate Heart of the Blessed Virgin Mary</Line></span><Line><Red>Pray for us.</Red></Line>
        <span><Line>  Most Sacred Heart of Jesus</Line></span><Line><Red>Have mercy on us.</Red></Line>
        <span><Line>  Most Sacred Heart of Jesus</Line></span><Line><Red>Have mercy on us.</Red></Line>
        <span><Line>  Most Sacred Heart of Jesus</Line></span><Line><Red>Have mercy on us.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Sunday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Sunday</h1>
      <p class='spaced-small'>
        <Line>O Glorious Queen of Heaven and Earth,</Line>
        <Line>    Virgin Most Powerful,</Line>
        <Line>    thou who hast the power</Line>
        <Line>    to crush the head of the ancient serpent with thy heel,</Line>
        <Line>        come and exercise this power</Line>
        <Line>        flowing from the grace of thine Immaculate Conception.</Line>
        <Line>Shield us under the mantle of thy purity and love,</Line>
        <Line>    draw us into the sweet abode of thy heart</Line>
        <Line>    and annihilate and render impotent</Line>
        <Line>        the forces bent on destroying us.</Line>
        <Line>Come Most Sovereign Mistress of the Holy Angels</Line>
        <Line>    and Mistress of the Most Holy Rosary, </Line>
        <Line>    thou who from the very beginning hast received from God</Line>
        <Line>        the power and the mission to crush the head of Satan.</Line>
        <Line>Send forth thy holy legions, we humbly beseech thee,</Line>
        <Line>    that under thy command and by thy power</Line>
        <Line>    they may pursue the evil spirits,</Line>
        <Line>    counter them on every side,</Line>
        <Line>    resist their bold attacks</Line>
        <Line>    and drive them far from us,</Line>
        <Line>        harming no one on the way,</Line>
        <Line>        binding them to the foot of the Cross</Line>
        <Line>            to be judged and sentenced by Jesus Christ Thy Son</Line>
        <Line>            and to be disposed of by Him as He wills.</Line>
        <br />
        <Line>St. Joseph, Patron of the Universal Church,</Line>
        <Line>    come to our aid in this grave battle</Line>
        <Line>    against the forces of darkness,</Line>
        <Line>repel the attacks of the devil</Line>
        <Line>    and free the members of the Auxilium Christianorum,</Line>
        <Line>    and those for whom the priests of the Auxilium Christianorum pray,</Line>
        <Line>        from the strongholds of the enemy.</Line>
        <br />
        <Line>St. Michael, summon the entire heavenly court</Line>
        <Line>    to engage their forces in this fierce battle</Line>
        <Line>        against the powers of hell.</Line>
        <Line>Come O Prince of Heaven</Line>
        <Line>    with thy mighty sword</Line>
        <Line>    and thrust into hell</Line>
        <Line>        Satan and all the other evil spirits.</Line>
        <Line>O Guardian Angels,</Line>
        <Line>    guide and protect us.</Line>
        <Line>Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Monday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Monday</h1>
      <p class='spaced-small'>
        <Line>In Thy name, Lord Jesus Christ,</Line>
        <Line>  we pray that Thou cover</Line>
        <Line>    us, our families, and all of our possessions</Line>
        <Line>      with Thy love and Thy Most Precious Blood</Line>
        <Line>        and surround us with</Line>
        <Line>          Thy Heavenly Angels, Saints</Line>
        <Line>            and the mantle of Our Blessed Mother.</Line>
        <Line>              Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Tuesday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Tuesday</h1>
      <p class='spaced-small'>
        <Line>Lord Jesus Christ, we beg Thee for the grace</Line>
        <Line>  to remain guarded beneath the protective mantle of Mary,</Line>
        <Line>    surrounded by the holy briar from which was taken the Holy Crown of Thorns,</Line>
        <Line>      and saturated with Thy Precious Blood</Line>
        <Line>        in the power of the Holy Spirit,</Line>
        <Line>          with our Guardian Angels,</Line>
        <Line>            for the greater glory of the Father.</Line>
        <Line>              Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Wednesday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Wednesday</h1>
      <div>
        <p class='spaced-small'>
          <Line>In the Name of Jesus Christ, Our Lord and God,</Line>
          <Line>    we ask Thee to render all spirits</Line>
          <Line>        impotent, paralyzed and ineffective</Line>
        </p>
        <p class='spaced-small'>
          <Line>in attempting to take revenge against</Line>
          <Line>    anyone of the members of the Auxilium Christianorum,</Line>
          <Line>    our families, friends, communities,</Line>
          <Line>    those who pray for us and their family members,</Line>
          <Line>    or anyone associated with us</Line>
          <Line>    and for whom the priests of the Auxilium Christianorum pray.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to bind</Line>
          <Line>    all evil spirits,</Line>
          <Line>    all powers in the air,</Line>
          <Line>    the water,</Line>
          <Line>    the ground,</Line>
          <Line>    the fire,</Line>
          <Line>    under ground,</Line>
          <Line>        or wherever they exercise their powers,</Line>
          <Line>    any satanic forces in nature</Line>
          <Line>        and any and all emissaries of the satanic headquarters.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to bind by Thy Precious Blood</Line>
          <Line>    all of the attributes,</Line>
          <Line>    aspects</Line>
          <Line>    and characteristics,</Line>
          <Line>    interactions,</Line>
          <Line>    communications and deceitful games</Line>
          <Line>        of the evil spirits.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to break any and all</Line>
          <Line>    bonds, ties and attachments</Line>
          <Line><Red>in the Name of the Father,</Red></Line>
          <Line><Red>    and of the Son</Red></Line>
          <Line><Red>        and of the Holy Spirit.</Red></Line>
        </p>
        <p class='spaced-small'>
          <Line><Red>Amen.</Red></Line>
        </p>
      </div>
    </div>
  </Panel>;
}

function Thursday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Thursday</h1>
      <p class='spaced-small'>
        <Line>My Lord,</Line>
        <Line>  Thou art all powerful,</Line>
        <Line>    Thou art God,</Line>
        <Line>      Thou art our Father.</Line>
        <Line>We beg Thee through the intercession and help</Line>
        <Line>  of the Archangels Sts. Michael, Raphael, and Gabriel</Line>
        <Line>    for the deliverance of our brothers and sisters</Line>
        <Line>      who are enslaved by the evil one.</Line>
        <Line>All Saints of Heaven,</Line>
        <Line>  come to our aid.</Line>
      </p>
      <p class='two-cols spaced-small'>
        <span><Line>From anxiety, sadness and obsessions,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From hatred, fornication, and envy,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From thoughts of jealousy, rage, and death,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From every thought of suicide and abortion,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From every form of sinful sexuality,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From every division in our family, and every harmful friendship,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
        <span><Line>From every sort of spell, malefice, witchcraft, and every form of the occult,</Line></span><Red><Line>We implore Thee, deliver us, O Lord.</Line></Red>
      </p>
      <p class='spaced-small'>
        <Line>Thou who said, "Peace I leave with you, my peace I give unto you."</Line>
        <Line>  Grant that, through the intercession of the Virgin Mary,</Line>
        <Line>    we may be liberated from every demonic influence</Line>
        <Line>      and enjoy Thy peace always.</Line>
        <Line>        In the Name of Christ, our Lord.</Line>
        <Line><Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Friday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Friday</h1>
      <h2>Litany of Humility</h2>
      <p class='two-cols spaced-small'>
        <span><Line>O Jesus meek and humble,</Line></span><Red><Line>hear me.</Line></Red>
      </p>
      <p class='two-cols spaced-small'>
        <span><Line>From the desire of being esteemed,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being loved,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being extolled,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being honored,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being praised,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being preferred to others,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being consulted,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the desire of being approved,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
      </p>
      <p class='two-cols spaced-small'>
        <span><Line>From the fear of being humiliated,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being despised,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of suffering rebukes,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being calumniated,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being forgotten,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being ridiculed,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being wronged,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
        <span><Line>From the fear of being suspected,</Line></span><Red><Line>deliver me Jesus.</Line></Red>
      </p>
      <p class='two-cols spaced-small'>
        <span><Line>That others may be loved more than I,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That others may be esteemed more than I,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That in the opinion of the world, others may increase and I may decrease,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That others may be chosen and I set aside,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That others may be praised and I go unnoticed,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That others may be preferred to me in everything,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
        <span><Line>That others may become holier than I, provided that I become as holy as I should,</Line></span><Red><Line>Jesus, grant me the grace to desire it.</Line></Red>
      </p>
    </div>
  </Panel>;
}

function Saturday() {
  return <Panel>
    <div class='centered spaced-big show-today'>
      <h1>Saturday</h1>
      <p class='spaced-small'>
        <Line>O God and Father of our Lord Jesus Christ,</Line>
        <Line>  we call upon Thy holy Name</Line>
        <Line>    and humbly beseech Thy clemency,</Line>
        <Line>that, through the intercession</Line>
        <Line>  of the ever immaculate Virgin, our Mother Mary,</Line>
        <Line>    and of the glorious Archangel Saint Michael,</Line>
        <Line>thou wouldst vouchsafe to help us against Satan</Line>
        <Line>  and all the other unclean spirits</Line>
        <Line>    that are prowling about the world</Line>
        <Line>      to the great peril of the human race</Line>
        <Line>        and the loss of souls.</Line>
        <Line><Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Litany() {
  return <Panel>
    <div class='centered spaced-big' id='litany'>

      <h1>Litany of the Precious Blood</h1>

      <div class='two-cols spaced-small'>
        <span><Line>Lord have mercy,</Line></span><Line><Red>Lord have mercy.</Red></Line>
        <span><Line>Christ have mercy,</Line></span><Line><Red>Christ have mercy.</Red></Line>
        <span><Line>Lord have mercy,</Line></span><Line><Red>Lord have mercy.</Red></Line>
        <span><Line>Christ hear us,</Line></span><Line><Red>Christ graciously hear us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <span><Line>God the Father of Heaven,</Line></span><Line><Red>have mercy on us.</Red></Line>
        <span><Line>God the Son, Redeemer of the world,</Line></span><Line><Red>have mercy on us.</Red></Line>
        <span><Line>God the Holy Spirit,</Line></span><Line><Red>have mercy on us.</Red></Line>
        <span><Line>Holy Trinity, One God,</Line></span><Line><Red>have mercy on us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <span><Line>Blood of Christ, only-begotten Son of the Eternal Father,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, Incarnate Word of God,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, of the New and Eternal Testament,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, falling upon the earth in the Agony,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, shed profusely in the Scourging,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, flowing forth in the Crowning with Thorns,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, poured out on the Cross,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, price of our salvation,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, without which there is no forgiveness,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, Eucharistic drink and refreshment of souls,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, stream of mercy,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, victor over demons,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, courage of Martyrs,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, strength of Confessors,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, bringing forth Virgins,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, help of those in peril,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, relief of the burdened,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, solace in sorrow,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, hope of the penitent,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, consolation of the dying,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, peace and tenderness of hearts,</Line></span><Line><Red>save us.</Red></Line>
        <span class='spaced-mini' /><span />
        <span><Line>Blood of Christ, pledge of eternal life,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, freeing souls from purgatory,</Line></span><Line><Red>save us.</Red></Line>
        <span><Line>Blood of Christ, most worthy of all glory and honor,</Line></span><Line><Red>save us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <span><Line>Lamb of God, Who takest away the sins of the world,</Line></span><Line><Red>spare us, O Lord.</Red></Line>
        <span><Line>Lamb of God, Who takest away the sins of the world,</Line></span><Line><Red>graciously hear us, O Lord.</Red></Line>
        <span><Line>Lamb of God, Who takest away the sins of the world,</Line></span><Line><Red>have mercy on us.</Red></Line>
      </div>

      <p class='spaced-small'>
        <Line>Thou hast redeemed us with Thy Blood, O Lord.</Line>
        <Line><Red>And made of us a kingdom for our God.</Red></Line>
      </p>

      <p class='spaced-medium' style='text-align:center; font-style:italic'><Line>Let us pray.</Line></p>

      <p class='spaced-small'>
        <Line>Almighty, and everlasting God,</Line>
        <Line>  Who hast appointed Thine only-begotten Son</Line>
        <Line>    to be the Redeemer of the world,</Line>
        <Line>      and hast been pleased to be reconciled unto us by His Blood,</Line>
        <Line>  grant us, we beseech Thee,</Line>
        <Line>    so to venerate with solemn worship</Line>
        <Line>      the price of our salvation,</Line>
        <Line>  that the power thereof</Line>
        <Line>    may here on earth keep us from all things hurtful,</Line>
        <Line>      and the fruit of the same may gladden us for ever hereafter in heaven.</Line>
        <Line>Through the same Christ our Lord.</Line>
        <Line>  <Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function AngelMorning() {
  return <Prayer img="./images/angel-morning.jpg">
    <h1>Guardian Angel Prayer</h1>
    <Line>Angel of God,</Line>
    <Line>    my Guardian dear</Line>
    <Line>        To Whom God's love</Line>
    <Line>            commits me here</Line>
    <Line>Ever this day</Line>
    <Line>    be at my side</Line>
    <Line>        To light and guard,</Line>
    <Line>            to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function AngelNight() {
  return <Prayer img="./images/angel-night.jpg">
    <h1>Guardian Angel Prayer</h1>
    <Line>Angel of God,</Line>
    <Line>    my Guardian dear</Line>
    <Line>        To Whom God's love</Line>
    <Line>            commits me here</Line>
    <Line>Ever this night</Line>
    <Line>    be at my side</Line>
    <Line>        To light and guard,</Line>
    <Line>            to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function OurFather() {
  return <Prayer img="./images/jesus-sacred-heart.jpg">
    <h1>Our Father</h1>
    <Line>Our Father</Line>
    <Line>    Who art in Heaven</Line>
    <Line>        Hallowed be Thy Name</Line>
    <Line>    Thy Kingdome come</Line>
    <Line>        Thy Will be done</Line>
    <Line>            On Earth as it is in Heaven</Line>
    <Line>    Give us this day our daily bread</Line>
    <Line>        And forgive us our trespasses</Line>
    <Line>            As we forgive those who trespass against us</Line>
    <Line>    And lead us not into temptation</Line>
    <Line>        But deliver us from evil</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function HailMary() {
  return <Prayer img="./images/mary-angels.jpg">
    <h1>Hail Mary</h1>
    <Line>Hail Mary</Line>
    <Line>    Full of Grace</Line>
    <Line>        The Lord is with thee</Line>
    <Line>    Blessed art thou among women</Line>
    <Line>        And blessed is the fruit of thy womb, Jesus</Line>
    <Line>    Holy Mary, Mother of God</Line>
    <Line>        Pray for us sinners now</Line>
    <Line>            And at the hour of our death</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function GloryBe() {
  return <Prayer img="./images/holy-trinity.jpg">
    <h1>Glory be</h1>
    <Line>Glory be</Line>
    <Line>    To the Father</Line>
    <Line>    And to the Son</Line>
    <Line>    And to the Holy Spirit</Line>
    <Line>As it was</Line>
    <Line>    In the beginning</Line>
    <Line>    Is now</Line>
    <Line>    And ever shall be</Line>
    <Line>        World without end</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function PreciousBlood() {
  return <Prayer img="./images/precious-blood.jpg">
    <h1>St. Gertrude Prayer</h1>
    <Line>Eternal Father</Line>
    <Line>    I offer Thee</Line>
    <Line>        The Most Precious Blood</Line>
    <Line>        Of Thy Divine Son, Jesus</Line>
    <Line>    In union with</Line>
    <Line>        The Masses said</Line>
    <Line>        Throughout the world today</Line>
    <Line>    For</Line>
    <Line>        All the Holy Souls in Purgatory</Line>
    <Line>        For sinners everywhere</Line>
    <Line>        For sinners in the universal Church</Line>
    <Line>        Those in my own home</Line>
    <Line>        And within my family</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function SaintMichael() {
  return <Prayer img="./images/michael.jpg">
    <h1>St. Michael Prayer</h1>
    <Line>St. Michael the Archangel</Line>
    <Line>    Defend us in battle</Line>
    <Line>        Be our protection against</Line>
    <Line>        The wickedness and snares</Line>
    <Line>        Of the devil</Line>
    <Line>            May God rebuke him</Line>
    <Line>            We humbly pray</Line>
    <Line>    And do thou</Line>
    <Line>        O Prince of the Heavenly Hosts</Line>
    <Line>        By the power of God</Line>
    <Line>        Cast into Hell</Line>
    <Line>            Satan, and all the evil spirits</Line>
    <Line>            Who prowl about the world</Line>
    <Line>            Seeking the ruin of souls</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function ApostlesCreed() {
  return <Prayer img="./images/apostles-creed.jpg">
    <h1>Apostle's Creed</h1>
    <Line>I believe in God</Line>
    <Line>  The Father Almighty</Line>
    <Line>    Creator of Heaven and Earth</Line>
    <Line>And in Jesus Christ</Line>
    <Line>  His only Son, Our Lord,</Line>
    <Line>    Who was conceived by the Holy Spirit</Line>
    <Line>      Born of the Virgin Mary</Line>
    <Line>  Suffered under Pontius Pilate</Line>
    <Line>    Was crucified, died, and was buried</Line>
    <Line>      He descended into Hell</Line>
    <Line>  On the third day he rose again from the dead</Line>
    <Line>    He ascended into Heaven</Line>
    <Line>      And is seated at the right hand of God the Father Almighty</Line>
    <Line>        From thence he shall come to judge the living and the dead</Line>
    <Line>I believe in the Holy Spirit</Line>
    <Line>  The Holy Catholic Church</Line>
    <Line>    The communion of Saints</Line>
    <Line>  The forgiveness of sins</Line>
    <Line>    The resurrection of the body</Line>
    <Line>      And life everlasting</Line>
    <Line>Amen.</Line>
  </Prayer>;
}

function HailHolyQueen() {
  return <Prayer img="./images/hail-holy-queen.jpg">
    <h1>Hail Holy Queen</h1>
    <Line>Hail Holy Queen</Line>
    <Line>  Mother of mercy</Line>
    <Line>    Our life, our sweetness, and our hope</Line>
    <Line>To thee to we cry, poor bashished children of Eve</Line>
    <Line>  To the do we send up our sighs, mourning, and weeping</Line>
    <Line>    In this valley of tears</Line>
    <Line>Turn then most gracious advocate</Line>
    <Line>  Thine eyes of mercy towards us</Line>
    <Line>    And after this our exile</Line>
    <Line>      Show unto us the Blessed Fruit of Thy Womb Jesus</Line>
    <Line>Oh clement, oh loving, oh sweet Virgin Mary</Line>
    <Line>  Pray for us, O Holy Mother of God</Line>
    <Line>    That we may be worthy of the promises of Christ</Line>
    <Line>Amen.</Line>
  </Prayer>;
}

function RosaryPrayer() {
  return <Prayer img="./images/hail-holy-queen.jpg">
    <h1>Rosary End Prayer</h1>
    <Line>Oh God, Whose Only Begotten Son</Line>
    <Line>  By his Life, Death, and Resurrection</Line>
    <Line>    Has purchased for us the rewards of Eternal Life</Line>
    <Line>Grant us, we beseech thee</Line>
    <Line>  That by meditating upon these mysteries</Line>
    <Line>    Of the most holy rosary</Line>
    <Line>      Of the Blessed Virgin Mary</Line>
    <Line>        We may imitate what they contain</Line>
    <Line>          And obtain what they promise</Line>
    <Line>            Through the same Christ, Our Lord</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function Memorare() {
  return <Prayer img='./images/memorare-mary.jpg'>
    <h1>Memorare</h1>
    <Line>Remember O Most Gracious Virgin Mary</Line>
    <Line>    That never was it known</Line>
    <Line>    That anyone</Line>
    <Line>    Who fled to thy protection</Line>
    <Line>    Implored thy help</Line>
    <Line>    Or sought thine intercession</Line>
    <Line>        Was left unaided</Line>
    <Line>Inspired by this confidence</Line>
    <Line>    I fly unto thee</Line>
    <Line>    O Virgin of Virgins</Line>
    <Line>        My Mother</Line>
    <Line>To thee do I come</Line>
    <Line>    Before thee I stand</Line>
    <Line>    Sinful and sorrowful</Line>
    <Line>O Mother of the Word Incarnate</Line>
    <Line>    Despise not my petition</Line>
    <Line>    But in thy mercy</Line>
    <Line>        Hear and answer me</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function HolyFamilyPrayer() {
  return <Prayer img='../sidebar/pic.jpg'>
    <Line>Holy Family</Line>
    <Line>    Save our family</Line>
    <Line>        Amen</Line>
  </Prayer>;
}

function Prayer(attrs: { img: string }, children: any) {
  return (
    <Panel>
      <div class='half-grid'>
        <div class='centered'>
          <img src={attrs.img} alt="" loading='lazy' />
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
      <div id='prayers-header'>
        <Navlinks page='Prayers' />
        <div id='tabs-names'>
          {Object.keys(attrs.tabs).map((tabName, i) => (
            <button>{tabName}</button>
          ))}
        </div>
      </div>
      <div id='tabs-bodies'>
        {Object.values(attrs.tabs)}
      </div>
    </div>
  </>;
}
