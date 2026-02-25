import type { Tour } from "../../types/tour";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className="w-[360px] m-3 bg-white rounded-xl shadow-md overflow-hidden">

      {/* IMAGE SECTION */}
      <div className="relative h-[180px] bg-[#2b140c]">

        {/* top dark shape */}
        <div className="absolute top-0 left-0 w-full h-16 bg-[#2b140c] rounded-b-[60px]" />

        {/* image */}
        <img
          src={tour.photoUrl}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        {/* recommended badge */}
        <span className="absolute top-3 left-3 bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
          {tour.isCustom ? "Custom" : "Recommended"}
        </span>

        {/* bookmark */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
          🔖
        </div>

        {/* bottom info */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-white text-xs">
          <span>📍 {tour.region}</span>
          <span>
            📅 {tour.durationNights}N / {tour.durationDays}D
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        <h3 className="text-lg font-semibold text-[#2b140c]">
          {tour.title}
        </h3>

        {/* tags */}
        <div className="flex gap-2 flex-wrap">
          {tour.types.slice(0, 3).map((type) => (
            <span
              key={type}
              className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {tour.description || "Journey through the Himalayas with HHTrails."}
        </p>

        {/* button */}
        <button className="w-full bg-[#2b140c] text-white py-3 rounded-lg text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default TourCard;
