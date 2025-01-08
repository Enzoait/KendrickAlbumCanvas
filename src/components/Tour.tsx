import React from "react";
import "tailwindcss/tailwind.css";
import { tourDates } from './elements/TourDates';

export const Tour: React.FC = () => { 

  return (
    <div className="dates-villes p-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Dates de tournée</h2>
      {tourDates.map((tour, index) => (
        <section key={index} className="tour-section mb-8 relative group">
          <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-4">
                {tour.dateRange.split("/")[0]}
                <span className="mx-1">/</span>
                {(tour.dateRange.split("/")[1])
                  .toString()
                  .padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-semibold relative z-10">
                {tour.city}
              </h3>
            </div>
            <p className="text-lg font-medium">{tour.venue}</p>
            <img
              src={tour.image}
              alt={`Image de ${tour.city}`}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"
            />
          </div>
          <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 ease-in-out mt-4 p-4 bg-gray-100 rounded shadow-lg">
            <ul className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              {tour.exactDates.map((date, idx) => (
                <li key={idx} className="mt-1">
                  {date} - {tour.seats[idx]} places
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
};