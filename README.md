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

Explanation a main route: 

Initially, SSR seemed like a good approach because it improves SEO and ensures that search results are indexed properly by search engines. However, it was not the ideal solution for our use case because:

We needed to prebuild the first five pages of paginated results at build time for better performance. SSR does not support prebuilding pages (That's why I chose SSG); it only renders them dynamically on each request.
Using SSR for search results would mean that every query requires a new request to the server, increasing load times and reducing responsiveness for the user. 

Explanation a search route:

Why Client-Side Fetching?
To balance performance and SEO, I created a /search page to handle search queries. This allowed me to implement two possible approaches:

SSR (Server-Side Rendering): Good for SEO but since every request is processed by the server.
Client-Side Fetching: Faster, as it does not rely on the server for each query.
Although SSR could have been beneficial for SEO, I opted for client-side fetching because:

It provides a more interactive and faster experience for users by allowing instant search updates without reloading the page.
Since search results are highly dynamic, rendering them on the server each time is unnecessary.
With client-side fetching, users can type a query and see results immediately, without waiting for a full page refresh.
This approach ensures faster responses and a better user experience, while still allowing pre-rendering for paginated pages using ISR (Incremental Static Regeneration)


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
