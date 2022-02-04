document.getElementById('giveFeedbackButton').addEventListener('click', e => {
  e.preventDefault();

  const wrapper = document.createElement('div');
  wrapper.id = 'feedbackBox';

  wrapper.innerHTML = `
    <form action='/send-feedback' method='POST'>
      <button id='close-feedback'>&#x1F5D9;</button>
      <h3>Give Feedback</h3>
      <p>Have thoughts about this site? Would something make it better? Send your thoughts! If you need a response, please provide contact information.</p>
      <p><textarea name='feedback'></textarea></p>
      <span><button send>Send Feedback</button></span>
    </form>
  `;

  document.body.append(wrapper);

  const escaper = (/** @type {KeyboardEvent} */ e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      wrapper.remove();
      document.removeEventListener('keydown', escaper);
    }
  };
  document.addEventListener('keydown', escaper);
  wrapper.querySelector('#close-feedback').addEventListener('click', e => {
    e.preventDefault();
    wrapper.remove();
  });
});
