const adorationLinks = [
  "https://www.youtube.com/embed/live_stream?channel=UCTv8s3mfmdIIXNcw_5Pdv_w&autoplay=1",
  "https://www.youtube.com/embed/live_stream?channel=UChmNZQg06jCB5xXHSAQQNpA&autoplay=1",
].map(href => <iframe src={href} /> as HTMLIFrameElement);

const blessedSacramentImage = <img src="./blessedsacrament.png" />;

export function BlessedSacrament() {
  const target = <div id='top2'>
    {blessedSacramentImage}
  </div> as HTMLDivElement;

  return <>
    <link rel='stylesheet' href='./blessedsacrament.css' />
    {target}
    <div id="navlinks" class="box">
      {adorationLinks.map((iframe, i) => (
        <a onclick={(e: Event) => {
          e.preventDefault();
          target.replaceChildren(iframe);
        }} href={iframe.src}>Adoration {i + 1}</a>
      ))}
      <a href="#" onclick={(e: Event) => {
        e.preventDefault();
        target.replaceChildren(blessedSacramentImage);
      }}>Static image</a>
    </div>
  </>;
}
