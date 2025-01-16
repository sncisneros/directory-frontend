/*   things to add: */
import Head from 'next/head';
import { useState } from 'react';

const restaurants = [
  { id: 1, name: "Pizza Palace", location: "Newport Beach", cuisine: "Italian", rating: 4.5 },
  { id: 2, name: "Sushi World", location: "San Francisco", cuisine: "Japanese", rating: 4.7 },
  { id: 3, name: "Taco Town", location: "Santa Monica", cuisine: "Mexican", rating: 4.2 },
  { id: 4, name: "Pasta y Pasta", location: "Los Angeles", cuisine: "Italian", rating: 4.6 },
  { id: 5, name: "Pho Real", location: "Long Beach", cuisine: "Vietnemese", rating: 4.0 },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 4,
    name: `Restaurant ${i + 4}`,
    location: `City ${i % 10}`,
    cuisine: ["Italian", "Japanese", "Mexican", "Chinese", "American"][i % 5],
    rating: [3.9, 3.4, 3, 4, 4.2, 4.8][i%6],
  }))
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalResults = filteredRestaurants.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-neutralLight p-4 font-sans">
      <Head>
        <title>Restaurant Directory</title>
        <meta name="description" content="Find the best restaurants in your area." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-elegant mb-4 text-neutralDark">Restaurant Directory</h1>
        <input
          type="text"
          placeholder="Search by name, cuisine, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-accent rounded-lg mb-6 text-neutralDark"
        />

        <ul className="space-y-4">
          {paginatedRestaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="p-4 bg-neutralLight rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-elegant text-neutralDark">{restaurant.name}</h2>
              <p className="text-neutralDark">{restaurant.cuisine} - {restaurant.location}</p>
              <p className="text-yellow-500 font-bold">Rating: {restaurant.rating} ★</p>
            </li>
          ))}
          {paginatedRestaurants.length === 0 && (
            <li className="text-accent">No restaurants found.</li>
          )}
        </ul>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-neutralDark text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-neutralDark">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-neutralDark text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}