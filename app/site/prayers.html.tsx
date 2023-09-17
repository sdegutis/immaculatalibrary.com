import { Column } from "../components/new/column";
import { Html } from "../components/new/html";
import { Navlinks } from "../components/new/navlinks";
import { QuickLinks } from "../components/new/quicklinks";
import { SiteFooter } from "../components/new/site-footer";
import { SiteHeader } from "../components/new/site-header";
import { Typography } from "../components/new/typography";
import { markdown } from "../util/helpers";

const prayers = `

### Morning

Angel of God, my Guardian dear
To Whom God's love commits me here
Ever this day be at my side
To light and guard, to rule and guide
Amen

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

Hail Mary
Full of Grace
The Lord is with thee
Blessed art thou among women
And blessed is the fruit of thy womb, Jesus
Holy Mary, Mother of God
Pray for us sinners now
And at the hour of our death
Amen

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

Remember O Most Chaste Spouse
Of the Blessed Virgin Mary
My good protector
St. Joseph
That never was it known
That anyone
Who came to your protection
And sought your intercession
Was left unaided
Confidently I prostrate myself before you
And fervently beg
For your powerful intervention
O Foster Father of our Dear Redeemer
Despise not my petitions
But in your mercy
Hear and answer me
Amen

Remember O Most Gracious Virgin Mary
That never was it known
That anyone
Who fled to thy protection
Implored thy help
Or sought thine intercession
Was ever left unaided
Inspired by this confidence
I fly unto thee
O Virgin of Virgins
My Mother
To thee do I come
Before thee I stand
Sinful and sorrowful
O Mother of the Word Incarnate
Despise not my petition
But in thy mercy
Hear and answer me
Amen

In the Name of
The Father
And of the Son
And of the Holy Spirit
Amen



### Night

Angel of God, my Guardian dear
To Whom God's love commits me here
Ever this night be at my side
To light and guard, to rule and guide
Amen

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

Most Sacred Heart of Jesus
Have mercy on us
Most Sacred Heart of Jesus
Have mercy on us
Most Sacred Heart of Jesus
Have mercy on us

Remember O Most Chaste Spouse
Of the Blessed Virgin Mary
My good protector
St. Joseph
That never was it known
That anyone
Who came to your protection
And sought your intercession
Was left unaided
Confidently I prostrate myself before you
And fervently beg
For your powerful intervention
O Foster Father of our Dear Redeemer
Despise not my petitions
But in your mercy
Hear and answer me
Amen

Remember O Most Gracious Virgin Mary
That never was it known
That anyone
Who fled to thy protection
Implored thy help
Or sought thine intercession
Was ever left unaided
Inspired by this confidence
I fly unto thee
O Virgin of Virgins
My Mother
To thee do I come
Before thee I stand
Sinful and sorrowful
O Mother of the Word Incarnate
Despise not my petition
But in thy mercy
Hear and answer me
Amen

In the Name of
The Father
And of the Son
And of the Holy Spirit
Amen


### Litany of Saints

St. Jane Frances de Chantal


St. Therese of Lisieux

St. John Bosco

St. Joan of Arc


St. Teresa of Avila

St. Catherine of Siena

St. Rose of Lima


St. John Paul II


St. Cecilia

St. Philomena

St. Jude


St. Augustine

St. Benedict

St. Francis of Assisi


St. Monica

St. Rita

St. Dymphna


St. Francis de Sales

St. Vincent de Paul

St. Thomas More


Patron Saints

Guardian Angels

Holy Souls in Purgatory


Most Chaste Heart of Blessed St. Joseph

Most Immaculate Heart of the Blessed Virgin Mary

Most Sacred Heart of Jesus
Most Sacred Heart of Jesus
Most Sacred Heart of Jesus

`;

export default <>
  <Html>
    <body>
      <main>

        <SiteHeader image='/img/categories/blessed-sacrament-big.jpg' />
        <Navlinks />

        <Column spaced centered>
          <Typography>

            <h1>Prayers</h1>

            {markdown.render(prayers)}

          </Typography>
        </Column>

      </main>

      <QuickLinks />
      <SiteFooter />
    </body>
  </Html>
</>;
