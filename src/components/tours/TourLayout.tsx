import { useEffect, useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import MapSection from "./MapSection";
import AvailableToursHeader from "./AvailableToursHeader";
import TourCard from "./TourCard";
import { toursService } from "../../services/toursService";
import type { Tour } from "../../types/tour";

const TourLayout = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await toursService.getTours({ page: 1, limit: 10 });
        setTours(data.tours);
      } catch (err) {
        console.error(err);
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (selectedRegions.length > 0 && !selectedRegions.includes(tour.region)) {
        return false;
      }

      if (
        selectedTypes.length > 0 &&
        !tour.types.some((t) => selectedTypes.includes(t))
      ) {
        return false;
      }

      if (
        selectedSeasons.length > 0 &&
        !selectedSeasons.includes(tour.season)
      ) {
        return false;
      }

      if (duration > 0 && tour.durationDays > duration) {
        return false;
      }

      return true;
    });
  }, [tours, selectedRegions, selectedTypes, selectedSeasons, duration]);

  return (
    <div className="w-full py-8">
      <div className="px-4 max-w-[1400px] mx-auto flex gap-8">
        <FilterSidebar
          selectedRegions={selectedRegions}
          onRegionsChange={setSelectedRegions}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          selectedSeasons={selectedSeasons}
          onSeasonsChange={setSelectedSeasons}
          duration={duration}
          onDurationChange={setDuration}
        />

        <div className="flex-1">
          <MapSection />
          <AvailableToursHeader />

          {error && (
            <p className="text-sm text-red-600 mb-3">{error}</p>
          )}

          {loading && filteredTours.length === 0 ? (
            <p className="text-sm text-gray-500">Loading tours…</p>
          ) : filteredTours.length === 0 ? (
            <p className="text-sm text-gray-500">No tours match these filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourLayout;