WEBINARS CATALOG – Server Side

This application was built as part of a Technical Case for a Junior Full Stack Web Developer position.
The objective was to build a Webinar Catalog Application where users can browse webinars and enroll by submitting a form with name, email, and LinkedIn URL.

Running locally

Run the commands below in a Git Bash terminal:

mkdir client
cd client
git clone https://github.com/victorgfz/webinars_catalog_server.git .
npm install

Create a .env file and configure the environment variables

DATABASE_URL=
CORS_ORIGIN=
JWT_SECRET=

npx prisma generate
npx prisma migrate dev
npm run dev

Architecture

I decided to use the MVC pattern adapted to REST APIs, which I believe is the most common approach in this context and also the one I am most comfortable with.
The MVC pattern separates the application into specific layers:

- Routes: define endpoints and call the corresponding controllers.
- Middlewares: intercept requests for certain validations (e.g., authentication).
- Controllers: receive the HTTP request, pass the necessary data to the services, and then send back a JSON response.
- Services: responsible for executing business rules, usually persisting or retrieving data from the database.

API Routes

Authentication

POST /auth/register → register a new user
POST /auth/login → log in the user
POST /auth/logout → log out the user

User

GET /user → returns info about the logged-in user

Filters

GET /filter → returns the list of available filters for webinars
GET /filter/categories → returns the list of categories
GET /filter/speakers → returns the list of speakers
POST /filter/categories → creates a new category in the database
POST /filter/speakers → creates a new speaker in the database

Webinars

GET /webinar → returns the list of webinars (can receive query strings for filtering)
GET /webinar/:id → returns the info of a specific webinar by its id
POST /webinar/:id/enrollment → creates a new enrollment for a specific webinar
POST /webinar → creates a new webinar in the database

Extra Routes

These routes are not part of the required functionalities, but I decided to implement them since no API was provided to fetch the necessary data, and this approach avoids having to insert them manually:

POST /webinar
GET /filter/categories
GET /filter/speakers
POST /filter/categories
POST /filter/speakers
