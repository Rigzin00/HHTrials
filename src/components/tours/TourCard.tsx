import type { Tour } from "../../types/tour";
import { useNavigate } from "react-router-dom";
import { useSavedTours } from "../../contexts/SavedToursContext";
import { useAuth } from "../../hooks/useAuth";
import { Bookmark, MapPin, Calendar } from "lucide-react";
interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isSaved, toggleSave } = useSavedTours();
  const saved = isSaved(tour.id);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return; // requires login — silently ignore
    await toggleSave(tour.id);
  };

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">

      {/* IMAGE SECTION */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl flex-shrink-0">

        {/* Main Image */}
        <img
          src={tour.photoUrl}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

  {/* Top Brown Overlay Shape */}
  <img
    src="/Vector.svg"  // your overlay svg
    alt="overlay-shape"
    className="absolute top-0 left-0 w-full h-[90px] object-cover z-10 pointer-events-none  bg-no-repeat bg-top bg-cover"
  />

  {/* Recommended Badge */}
  <span className="absolute top-4 left-4 bg-[#FBAF27] text-white text-xs px-4 py-1 rounded-full z-20">
    {tour.isCustom ? "Custom" : "Recommended"}
  </span>

  {/* Bookmark */}
  <button
    onClick={handleBookmark}
    title={saved ? "Remove from saved" : "Save tour"}
    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow z-20 transition-colors ${
      saved ? "bg-[#FBAF27] hover:bg-amber-500" : "bg-white hover:bg-amber-50"
    }`}
  >
    <Bookmark
      className={`w-4 h-4 transition-colors ${saved ? "fill-white text-white" : "text-[#2b1b14]"}`}
      strokeWidth={1.8}
    />
  </button>

  {/* Bottom Info */}
 
        <div className="absolute bottom-3 left-4 right-4 flex justify-between text-white text-sm z-20">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
            {tour.region}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
            {tour.durationNights}N / {tour.durationDays}D
          </span>
        </div>
        </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">

        <h3 className="text-[17px] leading-snug font-semibold text-[#2b140c] line-clamp-2">
          {tour.title}
        </h3>

        {/* tags */}
        <div className="flex gap-1.5 flex-wrap">
          {tour.types.slice(0, 3).map((type) => (
            <span
              key={type}
              className="bg-[#FBAF27] text-white text-sm px-4 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        <p className="text-[13px] leading-relaxed text-gray-500 line-clamp-3 flex-1 text-justify">
          {tour.description || "Journey through the Himalayas with HHTrails — discover ancient trails, breathtaking landscapes, and rich cultural heritage."}
        </p>

        {/* divider */}
        <div className="border-t border-gray-100 pt-2.5 mt-auto">
          <button
            className="w-full bg-[#2b140c] hover:bg-[#3d1f10] active:scale-[0.98] transition-all text-white py-2.5 rounded-lg text-sm font-medium tracking-wide"
            onClick={() => navigate(`/tours/${tour.id}`)}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
