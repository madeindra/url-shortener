# URL Shortener
Simple URL shortener built using Typescript with Fastify and SQLite.

## Installation

1. Clone the repository
```
git clone https://github.com/madeindra/url-shortener.git
```

2. Install dependencies
```
npm install
```

3. Build the project
```
npm run build
```

4. Export environment variables:
```
export PORT=3000
export HOST=localhost
export DB_PATH=database.db
export DB_TABLENAME=urls
```

5. Start the server 
```
npm start
```

## Usage

1. Open your browser and visit `http://localhost:3000`

2. Send POST request to `http://localhost:3000/shorten` with the following body:
```
{
    "originalUrl": "https://www.google.com",
    "customSlug": "google"
}
```

3. Copy the generated short URL and open it in your browser

## TODOs
- [ ] Add docker support
- [ ] Add homepage with form to shorten URL
- [ ] Add testings