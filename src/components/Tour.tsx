import React from "react";
import "tailwindcss/tailwind.css";
import { tourDates } from "@/data/tour";
import { Title } from "./Title";

// TODO : Responsive tablet

export const Tour: React.FC = () => {
  return (
    <div>
      <div className="relative w-full h-full">
        <img src="/concert.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent"></div>
      </div>

      <Title title="Kendrick Lamar en tournée !" />

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
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-background to-transparent"></div>
          </div>

          {/* Text content */}
          <div className="relative z-10 flex p-6 bg-opacity-75 text-white group flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center w-full md:w-1/3">
              <div className="text-3xl font-bold mr-4">
                {tour.dateRange.split("/")[0]}
                <span className="mx-1">/</span>
                {tour.dateRange.split("/")[1].toString().padStart(2, "0")}
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">{tour.city}</h3>
                <p className="text-lg font-medium text-left md:text-right md:hidden">
                  {tour.venue}
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-1/3 max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ul className="text-white space-y-4 pt-8 md:pt-0">
                {tour.exactDates.map((date, index) => (
                  <li key={index}>
                    <h5 className="text-lg font-semibold">{date}</h5>
                    <p className="text-base text-neutral-400">
                      {tour.seats[index]} places
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg font-medium w-1/3 text-right hidden md:block">
              {tour.venue}
            </p>
          </div>

          {/* Accordion Content */}
        </section>
      ))}
    </div>
  );
};
