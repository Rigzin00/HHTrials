const HimalayanTours = () => {
  const places = ["Ladakh", "Spiti", "Zanskar", "Himachal", "Sikkim"];

  return (
    <div className="w-full py-12 text-center bg-[#281910] border-b">

      <p className="font-sans text-sm mb-2 text-[#F3F4F1]">Himalayan Tours</p>

      <p className="font-sans max-w-2xl mx-auto text-sm leading-relaxed text-[#F3F4F1]">
        Immerse yourself in ancient cultures, explore pristine mountain landscapes,
        and discover the authentic spirit of the Himalayas through carefully curated journeys
      </p>

      <div className="flex justify-center gap-8 mt-5">
        {places.map((place) => (
          <div key={place} className="flex items-center gap-2 text-[#F3F4F1] text-sm">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="font-sans">{place}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HimalayanTours;