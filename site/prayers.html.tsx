import { CenteredColumn, Spaced } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

const Prayer: JSX.Component<{ lines: string[] }> = (attrs, children) => (
  <blockquote style='white-space:pre'>
    {attrs.lines.join('\n')}
  </blockquote>
);

export default <>
  <TypicalPage title="Prayers" image='/img/categories/blessed-sacrament-big.jpg'>

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>Daily Prayers</h2>

          <h3>Sign of the Cross</h3>
          <Prayer lines={[
            `In the Name of`,
            ` The Father`,
            `  And of the Son`,
            `   And of the Holy Spirit`,
            `Amen`,
          ]} />

          <h3>Guardian Angel Prayer</h3>
          <Prayer lines={[
            `Angel of God, my Guardian dear`,
            `  To Whom God's love commits me here`,
            ` Ever this day be at my side`,
            `  To light and guard, to rule and guide`,
            `   Amen`,
          ]} />

          <h3>Our Father</h3>
          <Prayer lines={[
            `Our Father`,
            ` Who art in Heaven`,
            `  Hallowed be Thy Name`,
            `  Thy Kingdome come`,
            `  Thy Will be done`,
            `   On Earth as it is in Heaven`,
            ` Give us this day our daily bread`,
            `  And forgive us our trespasses`,
            `  As we forgive those who trespass against us`,
            ` And lead us not into temptation`,
            `  But deliver us from evil`,
            `   Amen`,
          ]} />

          <h3>Hail Mary</h3>
          <Prayer lines={[
            `Hail Mary`,
            ` Full of Grace`,
            `  The Lord is with thee`,
            ` Blessed art thou among women`,
            `  And blessed is the fruit of thy womb, Jesus`,
            ` Holy Mary, Mother of God`,
            `  Pray for us sinners now`,
            `   And at the hour of our death`,
            `    Amen`,
          ]} />

          <h3>Glory Be</h3>
          <Prayer lines={[
            `Glory be`,
            ` To the Father`,
            ` And to the Son`,
            ` And to the Holy Spirit`,
            `As it was`,
            ` In the beginning`,
            ` Is now`,
            ` And ever shall be`,
            `  World without end`,
            `   Amen`,
          ]} />

          <h3>St. Gertrude Prayer</h3>
          <Prayer lines={[
            `Eternal Father`,
            ` I offer Thee`,
            `  The Most Precious Blood`,
            `  Of Thy Divine Son, Jesus`,
            ` In union with`,
            `  The Masses said`,
            `  Throughout the world today`,
            ` For`,
            `  All the Holy Souls in Purgatory`,
            `  For sinners everywhere`,
            `  For sinners in the universal Church`,
            `  Those in my own home`,
            `  And within my family`,
            `   Amen`,
          ]} />

          <h3>St. Michael</h3>
          <Prayer lines={[
            `St. Michael the Archangel`,
            ` Defend us in battle`,
            ` Be our protection against`,
            `  The wickedness and snares`,
            `  Of the devil`,
            `   May God rebuke him`,
            `   We humbly pray`,
            ` And do thou`,
            `  O Prince of the Heavenly Hosts`,
            `  By the power of God`,
            `   Cast into Hell`,
            `   Satan, and all the evil spirits`,
            `   Who prowl about the world`,
            `   Seeking the ruin of souls`,
            `    Amen`,
          ]} />

          <h3>Memorare</h3>
          <Prayer lines={[
            `Remember O Most Gracious Virgin Mary`,
            ` That never was it known`,
            ` That anyone`,
            ` Who fled to thy protection`,
            ` Implored thy help`,
            ` Or sought thine intercession`,
            `  Was ever left unaided`,
            `Inspired by this confidence`,
            ` I fly unto thee`,
            ` O Virgin of Virgins`,
            `  My Mother`,
            `To thee do I come`,
            ` Before thee I stand`,
            ` Sinful and sorrowful`,
            `O Mother of the Word Incarnate`,
            ` Despise not my petition`,
            ` But in thy mercy`,
            `  Hear and answer me`,
            `   Amen`,
          ]} />

          <h3>Litany of Saints</h3>
          <Prayer lines={[
            `St. Jane Frances de Chantal`,
            ``,
            `St. Therese of Lisieux`,
            ` St. John Bosco`,
            `  St. Joan of Arc`,
            ``,
            `St. Teresa of Avila`,
            ` St. Catherine of Siena`,
            `  St. Rose of Lima`,
            ``,
            `St. John Paul II`,
            ``,
            `St. Cecilia`,
            ` St. Philomena`,
            `  St. Jude`,
            ``,
            `St. Augustine`,
            ` St. Benedict`,
            `  St. Francis of Assisi`,
            ``,
            `St. Monica`,
            ` St. Rita`,
            `  St. Dymphna`,
            ``,
            `St. Francis de Sales`,
            ` St. Vincent de Paul`,
            `  St. Thomas More`,
            ``,
            `Patron Saints`,
            ` Guardian Angels`,
            `  Holy Souls in Purgatory`,
            ``,
            `Most Chaste Heart of Blessed St. Joseph`,
            ` Most Immaculate Heart of the Blessed Virgin Mary`,
            `  Most Sacred Heart of Jesus`,
            `  Most Sacred Heart of Jesus`,
            `  Most Sacred Heart of Jesus`,
          ]} />

          <h3>Daily Petitions</h3>
          <Prayer lines={[
            `Dear Lord, bless our family [name all the members].`,
            ``,
            `Have mercy on us`,
            ` forgive us our sins`,
            `  grant us eternal life.`,
            ``,
            `Unblind us from all spiritual blindness`,
            ` soften our hardened hearts`,
            `  and free us from all slavery to sin.`,
            ``,
            `Protect us from the world`,
            ` the devil, and the flesh`,
            `  and the seven deadly sins.`,
            ``,
            `Fill us with faith,`,
            ` hope,`,
            `  and love.`,
            ``,
            `Help us to love you,`,
            ` know you,`,
            `  and serve you.`,
            ``,
            `Help us to love you`,
            ` with our whole heart, mind, soul, and strength`,
            `  because you are all good and deserve all our love.`,
            ``,
            `Help us to do our prayers`,
            ` holy reading`,
            `  and devotions.`,
          ]} />

        </Typography>
      </CenteredColumn>
    </Spaced>

  </TypicalPage>
</>;
