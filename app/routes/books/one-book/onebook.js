(() => {

  const donated = localStorage.getItem('donated');
  if (donated) {
    revealReadOnlineSection();
  }
  else {
    const button = document.getElementById('donate-to-read-button');
    button.onclick = (e) => {
      e.preventDefault();
      window.open('https://buy.stripe.com/5kAaIqclW2dsby8dQQ', '_blank');
      revealReadOnlineSection();
      localStorage.setItem('donated', 'true');
    };
  }

  function revealReadOnlineSection() {
    document.getElementById('read-online-table').hidden = false;
    document.getElementById('read-online-table-donate-section').hidden = true;
    document.getElementById('did-donate-sign').hidden = false;
  }

})();  
