const form = [...document.getElementsByTagName('form')].find(form => form.id === 'fileform');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const filenameInput = [...form.querySelectorAll('input')].find(input => input.name === 'filename');
  const getUploadUrlUrl = `/admin/book/upload-link?filename=${encodeURIComponent(filenameInput.value)}`;
  const { url: uploadUrl } = await (await fetch(getUploadUrlUrl)).json();

  const fileInput = [...form.querySelectorAll('input')].find(input => input.type === 'file');
  const file = fileInput.files[0];

  const waiter = document.getElementById('status');
  waiter.hidden = false;

  console.log('Uploading...');

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
  });

  if (response.status === 200) {
    form.submit();
  }
  else {
    console.log('Error', response);
    waiter.innerHTML = `<td></td><td>Error: <pre>${JSON.stringify(response)}</pre></td>`;
  }
});
