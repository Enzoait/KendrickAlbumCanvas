import React from "react";
import "tailwindcss/tailwind.css";

const tourDates = [
  {
    city: "Paris, France",
    dateRange: "du 15 au 16 janvier 2025",
    venue: "Stade de France",
    image: "paris.jpg",
    description:
      "Paris est la capitale de la France, connue pour sa culture, son art et sa gastronomie.",
    exactDates: ["15 janvier 2025", "16 janvier 2025"],
    seats: [50000, 50000],
  },
  {
    city: "Londres, Royaume-Uni",
    dateRange: "du 18 au 19 janvier 2025",
    venue: "Wembley Stadium",
    image: "london.jpg",
    description:
      "Londres est la capitale du Royaume-Uni, célèbre pour ses monuments historiques et sa diversité culturelle.",
    exactDates: ["18 janvier 2025", "19 janvier 2025"],
    seats: [90000, 90000],
  },
  // Ajoutez les autres villes ici...
];

export const Tour: React.FC = () => {
  return (
    <div className="dates-villes p-8">
      <h2 className="text-2xl font-bold mb-6">Dates de tournée</h2>
      {tourDates.map((tour, index) => (
        <section key={index} className="tour-section mb-8">
          <div className="relative group">
            <h3 className="text-xl font-semibold">{tour.city}</h3>
            <p>{tour.dateRange}</p>
            <p>{tour.venue}</p>
            <img
              src={tour.image}
              alt={`Image de ${tour.city}`}
              className="w-full h-auto mt-4"
            />
            <div className="hidden group-hover:block mt-4 p-4 bg-gray-100 rounded shadow-lg">
              <p>{tour.description}</p>
              <ul className="mt-2">
                {tour.exactDates.map((date, idx) => (
                  <li key={idx} className="mt-1">
                    {date} - {tour.seats[idx]} places
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
