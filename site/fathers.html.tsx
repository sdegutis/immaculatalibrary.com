import { Column, Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { markdown } from "./util/_helpers.js";

export function Markdown(attrs: any, children: any) {
  children = String(children);
  return markdown.render(children);
}

const others: Record<string, { id: string, title: string }[]> = {
  'Chrysostom': [
    { id: 'libraryoffathers0000unse_r8l9', title: 'Homilies of S. John Chrysostom on the Gospel of St. John, Part II. Hom. XLII.-LXXXVIII.' },
    { id: 'libraryoffathers0004unse_b6j5', title: 'Homilies of S. John Chrysostom on First Corinthians, Part I. Hom. I.-XXIV.' },
    { id: 'libraryoffathers0033unse', title: 'Homilies of S. John Chrysostom on Acts, Part I. Hom. I.-XXVIII.' },
    { id: 'libraryoffathers0035unse', title: 'Homilies of S. John Chrysostom on Acts, Part II. Hom. XXIX.-LV.' },
    { id: 'libraryoffathers0000unse', title: 'Homilies of S. John Chrysostom on Romans' },
    { id: 'vol2pt2libraryof00unse', title: 'Homilies of S. John Chrysostom on Matthew, Part II. Hom. XXVI.-LVIII.' },
    { id: 'vol6libraryoffat00unse', title: 'Commentary on Galatians and Homilies on Ephesians of S. John Chrysostom' },
    { id: 'vol7libraryoffat00unse', title: 'Homilies of S. John Chrysostom on Romans' },
    { id: 'vol9libraryoffat00unse', title: 'Homilies of S. John Chrysostom on The Statues or To the People of Antioch' },
    { id: 'vol11libraryoffa00unse', title: 'Homilies of S. John Chrysostom on Matthew, Part I. Hom. I.-XXV.' },
    { id: 'vol12libraryoffa00unse', title: 'Homilies of S. John Chrysostom on Timothy, Titus, and Philemon' },
    { id: 'vol14libraryoffa00unse', title: 'Homilies of S. John Chrysostom on Philippians, Colossians, and Thessalonians' },
    { id: 'vol27libraryoffa00unse', title: 'Homilies of S. John Chrysostom on Second Corinthians' },
    { id: 'vol28libraryoffa00unse', title: 'Homilies of S. John Chrysostom on John, Part I. Hom. I.-XLI.' },
    { id: 'vol33libraryoffa00unse', title: 'Homilies of Chrysostom on Acts, Part I. Hom. I-XXVIII.' },
    { id: 'vol34libraryoffa00unse', title: 'Homilies of Chrysostom on Matthew, Part III. Hom. LIX.-XC.' },
    { id: 'vol35libraryoffa00unse', title: 'Homilies of Chrysostom on Matthew, Part II. Hom. XXIX-LV' },
    { id: 'vol36libraryoffa00unse', title: 'Homilies of Chrysostom on Acts, Part II. Hom. XLII-LXXXVIII' },
    { id: 'vol45libraryoffa00unse', title: 'Homilies of Chrysostom on First Corinthians' },
  ],
  'Augustine': [
    { id: 'vol16libraryoffa00unse', title: 'Sermons on Selected Lessons of The New Testament by S. Augustine, Vol. I. Matthew, Mark, Luke' },
    { id: 'vol20libraryoffa00unse', title: 'Sermons on Selected Lessons of the New Testament by S. Augustine, Vol II. John, Acts, Romans, 1 Corinthians, Galatians, Ephesians, Philippians, 1 Thessalonians, 1 Timothy, Titus, James, 1 John' },
    { id: 'vol22libraryoffa00unse', title: 'Seventeen Short Treatises of S. Augustine' },
    { id: 'vol26libraryoffa00unse', title: 'Homilies on John and 1 John by Augustine, Vol. I. (Hom. L-XLIII, 1. John. I-VIII)' },
    { id: 'vol29libraryoffa00unse', title: 'Homilies on John and 1 John by S. Augustine, Vol. II.' },
  ],
  'Athanasius': [
    { id: 'vol38libraryoffa00unse', title: 'The First Epistles of S. Athanasius' },
    { id: 'vol13libraryoffa00unse', title: 'Historical Tracts of S. Athanasius' },
    { id: 'vol8libraryoffat00unse', title: 'Select Treatises of S. Athanasius in Controversy with the Arians' },
    { id: 'vol19libraryoffa00unse', title: 'Select Treatises of S. Athanasius in Controversy with the Arians' },
  ],
  'Various Fathers': [
    { id: 'vol3libraryoffat00unse_0', title: 'Treatises of S. Caecilius Cyprian' },
    { id: 'vol10libraryoffa00unse', title: 'Tertullian, Vol. I. Apologetic and Practical Treatises' },
    { id: 'vol41libraryoffa00unse', title: 'Select Works of S. Ephrem the Syrian' },
    { id: 'vol17libraryoffa00unse', title: 'Epistles of S. Cyprian with the Council of Carthage on the Baptism of Heretics, To which are added the extant works of S. Pacian, Bishop of Barcelona' },
    { id: 'libraryoffathers0002unse', title: 'Catechetical Lectures of St. Cyril of Jerusalem' },
  ],
};


export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>

          <h3>The Fathers Gospel Commentary</h3>
          <p>
            The <a href='/books/catena-aurea.html'>Catena Aurea</a> contains
            commentary on every verse in the Gospels by the Fathers of the Church.
          </p>

          <h3>Notable Works by Church Fathers</h3>
          <ul>
            <li><a href='/books/catena-aurea.html'>Catena Aurea</a>: Gospel Commentary by the Fathers</li>
            <li><a href='/books/morals-on-the-book-of-job.html'>Morals on the Book of Job</a> by St. Gregory the Great</li>
            <li><a href='/books/confessions.html'>Confessions</a> by St. Augustine</li>
            <li><a href='/books/augustine-on-the-psalms.html'>Exposition on the Psalms</a> by St. Augustine</li>
            <li><a href='/books/works-of-justin-martyr.html'>The Works of St. Justin Martyr</a> by St. Justin Martyr</li>
            <li><a href='/books/commentary-on-the-gospel-of-john.html'>Commentary on John</a> by St. Cyril of Alexandria</li>
            <li><a href='/books/venerable-bedes-ecclesiastical-history-of-england.html'>Ecclesiastical History of England</a> by St. Bede</li>
          </ul>

          <h3>Why not use CatenaBible.com?</h3>
          <p>
            They're missing a huge number of quotes from the Church Fathers
            on the gospels, which are found in the Catena Aurea. It's also
            run by some Orthodoxes, who may be biased toward Greek fathers.
          </p>

          <h3>Why not use New Advent?</h3>
          <Markdown>
            The edition of the Church Fathers they digitized was translated
            by anti-Catholics. This site uses the previous English translation
            of the Church Fathers that was deemed "too Catholic" for them.
          </Markdown>

        </div>

        <div>
          <h3>What the Apostles Taught about Mary</h3>
          <p>Proves through the Bible and Church Fathers that Mary was conceived sinlessly.</p>
          <p><a href="https://a.co/d/17K0yf7" target='_blank'>Buy it on Amazon.</a></p>
          <p><a href="https://a.co/d/17K0yf7" target='_blank'><img src='https://m.media-amazon.com/images/I/611Njn+smlL._SY466_.jpg' /></a></p>
        </div>

      </SplitColumn>
    </Spaced>

    <Spaced>

      <Column>
        <h3>More Fathers</h3>
        <p>These books have not been formally added to this site yet, but they are linked here for your convenience.</p>
        {Object.entries(others).map(([groupTitle, group]) => <>
          <h4>{groupTitle}</h4>
          <ul>
            {group.map(({ id, title }) => <>
              <li><a target='_blank' href={`https://archive.org/details/${id}/mode/2up?view=theater`}>{title}</a></li>
            </>)}
          </ul>
        </>)}
      </Column>

    </Spaced>

  </TypicalPage>
</>;
