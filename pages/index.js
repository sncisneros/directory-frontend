/*   things to add:
add sort by button 
add open/close based on operating hours(and green/red*/
import Head from 'next/head';
import { useState } from 'react';

const restaurants = [
  { id: 1, name: "Pizza Palace", location: "Newport Beach", cuisine: "Italian", rating: 4.5, hours: "10:00 AM - 11:00 PM", address: "123 Main St, Newport Beach, CA", phone: "(123) 456-7890", website: "https://pizzapalace.com" },
  { id: 2, name: "Sushi World", location: "San Francisco", cuisine: "Japanese", rating: 4.7, hours: "11:00 AM - 11:00 PM", address: "456 Elm St, San Francisco, CA", phone: "(987) 654-3210", website: "https://sushiworld.com" },
  { id: 3, name: "Taco Town", location: "Santa Monica", cuisine: "Mexican", rating: 4.2, hours: "12:00 PM - 12:00 AM", address: "789 Oak St, Santa Monica, CA", phone: "(555) 123-4567", website: "https://tacotown.com" },
  { id: 4, name: "Pasta y Pasta", location: "Los Angeles", cuisine: "Italian", rating: 4.6, hours: "1:00 PM - 10:00 PM", address: "989 Wilshire St, Los Angeles, CA", phone: "(213) 123-4557", website: "https://pastapasta.com" },
  { id: 5, name: "Pho Real", location: "Long Beach", cuisine: "Vietnemese", rating: 4.0, hours: "11:00 AM - 9:00 PM", address: "123 Ocean Dr, Long Beach, CA", phone: "(123) 123-1231", website: "https://phoreal.com" },
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 4,
    name: `Restaurant ${i + 4}`,
    location: `City ${i % 10}`,
    cuisine: ["Italian", "Japanese", "Mexican", "Chinese", "American"][i % 5],
    rating: [3.9, 3.4, 3, 4, 4.2, 4.8][i % 6],
    hours: "10:00 AM - 9:00 PM",
    address: `Address ${i + 4}, City ${i % 10}`,
    phone: `(800) 555-10${i}`,
    website: `https://restaurant${i + 4}.com`,
  }))
];

function isOpen(hours) {
    const [openTime, closeTime] = hours.split(' - ').map((time) => new Date(`1970-01-01T${time}Z`));
    const now = new Date();
    const currentTime = new Date(`1970-01-01T${now.getUTCHours()}:${now.getUTCMinutes()}Z`);
    return currentTime >= openTime && currentTime <= closeTime;
  }

  export default function Home() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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
      <div className="min-h-screen bg-neutralLight p-4 font-sans flex">
        <Head>
          <title>Restaurant Directory</title>
          <meta name="description" content="Find the best restaurants in your area." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className="fixed top-0 left-0 right-0 bg-white shadow z-10 p-4 flex justify-center">
          <h1 className="text-3xl font-elegant mb-4 text-neutralDark">Restaurant Directory</h1>
        </div>
  
        <div className="flex flex-col w-full max-w-7xl mx-auto pt-24">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, cuisine, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border border-accent rounded-lg mb-6 text-neutralDark"
            />
          </div>
  
          <div className="flex flex-grow">
            <div className={`flex-1 overflow-auto ${selectedRestaurant ? 'pr-4' : ''}`}>
              <ul className="space-y-4">
                {paginatedRestaurants.map((restaurant) => (
                  <li
                    key={restaurant.id}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-xl font-elegant text-neutralDark">{restaurant.name}</h2>
                      <p className="text-neutralDark">{restaurant.cuisine} - {restaurant.location}</p>
                      <p className="text-yellow-500 font-bold">Rating: {restaurant.rating} ★</p>
                      </div>
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => setSelectedRestaurant(restaurant)}
                        className="px-4 py-2 bg-accent text-white rounded mb-2"
                      >
                        More Info
                      </button>
                      <p className={`font-bold ${isOpen(restaurant.hours) ? 'text-open' : 'text-closed'}`}>{isOpen(restaurant.hours) ? 'Open' : 'Closed'}</p>
                    
                    </div>
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
            </div>
  
            {selectedRestaurant && (
              <aside className="w-80 bg-white p-6 ml-6 rounded-lg shadow-md flex-shrink-0">
                <h2 className="text-2xl font-elegant text-neutralDark mb-4">{selectedRestaurant.name}</h2>
                <p className="text-neutralDark mb-2"><strong>Cuisine:</strong> {selectedRestaurant.cuisine}</p>
                <p className="text-neutralDark mb-2"><strong>Location:</strong> {selectedRestaurant.location}</p>
                <p className="text-neutralDark mb-2"><strong>Address:</strong> {selectedRestaurant.address}</p>
                <p className="text-neutralDark mb-2"><strong>Phone:</strong> {selectedRestaurant.phone}</p>
                <a href={selectedRestaurant.website} className="text-accent underline" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
                <br></br>
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="mt-4 px-4 py-2 bg-closed text-white rounded"
                >
                  Close
                </button>
              </aside>
            )}
          </div>
        </div>
      </div>
    );
  }  
  