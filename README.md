This project is a Next.js-based (Pages Router) web application that allows users to search for artworks using the Metropolitan Museum of Art's public API. It provides a seamless UI with search, pagination, and image optimization for better performance.

Features

Search Functionality: Users can search for artworks by keyword.

Pagination: Large datasets are paginated for better navigation.

Static Generation with ISR: The first 5 pages are statically generated at build time, while additional pages are generated on-demand using Incremental Static Regeneration (ISR).

Lazy Loading for Images: Implemented lazy loading so that images only load when they come into the viewport, improving performance..

Grid System: Utilized a grid layout to efficiently display artwork cards.

Artwork Details: Each artwork has a dedicated page with detailed information.

Optimized Performance: Image optimization and efficient API fetching.

Responsive Design: Tailored for mobile and desktop experiences.

Tech Stack

Next.js (Pages Router)

TypeScript

Tailwind CSS

Metropolitan Museum of Art API


Installation

Clone the repository:

git clone https://github.com/sukhrobfullstackdev/dz_home_task

Navigate to the project directory:

cd dz_test_task

Install dependencies:

npm install

Start the development server:

npm run dev

API Usage

Search API: GET /search?q={query}

Artwork Details API: GET /objects/{id}

Deployment

This project can be deployed to Vercel:

npm run build
npm start

Sukhrobbek (Sam) - Software Engineer
