document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('donate-to-read-button');
  button.onclick = (e) => {
    e.preventDefault();

    window.open('https://buy.stripe.com/5kAaIqclW2dsby8dQQ', '_blank');

    document.getElementById('read-online-table').hidden = false;
    document.getElementById('read-online-table-donate-section').hidden = true;
  };
});
