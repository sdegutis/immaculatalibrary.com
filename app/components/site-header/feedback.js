document.getElementById('giveFeedbackButton').addEventListener('click', e => {
  e.preventDefault();

  const wrapper = document.createElement('div');
  wrapper.id = 'feedbackBox';

  wrapper.innerHTML = `
    <form action='/send-feedback' method='POST'>
      <button id='close-feedback'>✕</button>
      <h3>Give Feedback</h3>
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
