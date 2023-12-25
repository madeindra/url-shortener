# URL Shortener

Simple URL shortener built using Typescript with Fastify and SQLite.

![preview](https://raw.githubusercontent.com/madeindra/url-shortener/master/preview.png "preview")

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

## Docker

1. Build the image

```
docker build \
--build-arg PORT=3000 \
--build-arg HOST=0.0.0.0 \
--build-arg DB_PATH=database.db \
--build-arg DB_TABLENAME=urls \
--no-cache \
. -t yourusername/url-shortener:latest
```

2. Run the container

```
docker run -d -p 3000:3000 yourusername/url-shortener:latest
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
- [X] Add docker support
- [ ] Add testings