import React from "react";
import "tailwindcss/tailwind.css";
import { tourDates } from "@/data/tour";

export const Tour: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold p-12 text-center text-white">
        Dates de tournée
      </h2>
      {tourDates.map((tour, index) => (
        <section
          key={index}
          className="relative group w-full flex flex-col overflow-hidden border-white/50 last:border-b-0 border-b"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 w-full md:w-1/3 h-64 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${tour.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent"></div>
          </div>

          {/* Text content */}
          <div className="relative z-10 flex-1 p-6 bg-opacity-75 text-white group flex items-center justify-between">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold mr-4">
                {tour.dateRange.split("/")[0]}
                <span className="mx-1">/</span>
                {tour.dateRange.split("/")[1].toString().padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-semibold">{tour.city}</h3>
            </div>
            <p className="text-lg font-medium">{tour.venue}</p>
          </div>

          {/* Accordion Content */}
          <div className="relative max-h-0 group-hover:max-h-96 transition-all duration-300 w-full">
            <div className="ml-[33%] p-6  text-white">
              {tour.exactDates.map((date, index) => (
                <div key={index} className="ml-1/3">
                  <h5 className="text-lg font-semibold">{date}</h5>
                  <p className="text-base">{tour.seats[index]} places</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
