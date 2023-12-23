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

2. Input your URL and custom slug (optional) to the form

3. Click `Shorten` button

4. Copy the shortened URL

## API Documentation

### Create Short URL

POST /shorten

```
{
    "originalUrl": "https://www.google.com",
    "customSlug": "google"
}
```

### Get Original URL

GET /:slug

## TODOs
- [X] Add homepage with form to shorten URL
- [ ] Add docker support
- [ ] Add testings