document.getElementById('urlForm').onsubmit = async (event) => {
  event.preventDefault();
  const url = document.getElementById('urlInput').value;
  const slug = document.getElementById('slugInput').value;

  // Make API request to shorten the URL
  const response = await fetch('/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      originalUrl: url,
      customSlug: slug,
    }),
  })

  const data = await response.json();
  
  if (!response.ok) {
    // Handle the error
    return alert(data.message);
  }

  // Display the shortened URL
  document.getElementById('shortenedUrl').innerText = data.shortUrl;
};