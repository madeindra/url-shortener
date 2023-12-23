// assign copying function to copy button
const copyButton = document.getElementById('copyButton');

// Initialize the tooltip without showing it initially
const tooltip = new bootstrap.Tooltip(copyButton, {
  placement: 'top',
  title: 'Link copied!',
  trigger: 'manual'
});

// handle the copy onclick event
copyButton.onclick = () => {
  // get the shortened URL input
  const urlInput = document.getElementById('shortenedUrl');

  urlInput.select();
  urlInput.setSelectionRange(0, 99999);

  // copy the text inside the text field
  navigator.clipboard.writeText(urlInput.value);

  // Show the tooltip after copying
  tooltip.show();

  // hide the tooltip after 1 seconds
  setTimeout(() => {
    tooltip.hide();
  }, 1000);
}

// handle the form submission
const urlForm = document.getElementById('urlForm');
urlForm.onsubmit = async (event) => {
  // prevent the form from submitting and refreshing the page
  event.preventDefault();

  // validate form
  if (!urlForm.checkValidity()) {
    event.stopPropagation()
    // add was-validated class to show validation errors
    urlForm.classList.add('was-validated')
    return;
  }

  // set the button to loading
  const restoreButton = setButtonLoading(document.getElementById('submitButton'));

  // get the URL and slug from the form
  const url = document.getElementById('urlInput').value;
  const slug = document.getElementById('slugInput').value;

  // create request body
  const body = {
    originalUrl: url.trim(),
  };

  if (slug.trim()) {
    body = {
      ...body,
      customSlug: slug.trim(),
    }
  }

  // send API request to shorten the URL
  const response = await fetch('/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })

  // restore the button to its original state
  restoreButton();

  // parse the response
  const data = await response.json();
  
  // handle the error for non 200 response codes
  if (!response.ok) {
    // if there is a message, display it
    if (data.message) {
      return alert(data.message);
    }

    // if there is no message, display a generic error
    return alert('An error occurred');
  }

  // display the shortened URL
  document.getElementById('shortenedUrl').value = data.shortUrl;

  // remove invisible from resultDiv to display it
  document.getElementById('resultDiv').classList.remove('invisible');
};

// function to set the button to loading
function setButtonLoading(element) {
  // store the original inner html
  const original = element.innerHTML;

  // change inner html to span element
  element.innerHTML = `
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
  `;

  return () => {
    // restore the original inner html
    element.innerHTML = original;
  }
}