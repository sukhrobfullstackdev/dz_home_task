This project is a Next.js-based (Pages Router) web application that allows users to search for artworks using the Metropolitan Museum of Art's public API. It provides a seamless UI with search, pagination, and image optimization for better performance.

Features

Search Functionality: Users can search for artworks by keyword.

Pagination: Large datasets are paginated for better navigation.

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


Navigate to the project directory:

cd dz_test_task

Install dependencies:

pnpm install

Start the development server:

pnpm dev

Environment Variables

Create a .env.local file and add:

NEXT_PUBLIC_MET_API=https://collectionapi.metmuseum.org/public/collection/v1

API Usage

Search API: GET /search?q={query}

Artwork Details API: GET /objects/{id}

Deployment

This project can be deployed to Vercel:

pnpm run build
pnpm start

Sukhrobbek (Sam) - Software Engineer
