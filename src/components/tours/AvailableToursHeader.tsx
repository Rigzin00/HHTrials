interface Props {
  sortBy: string;
  onSortChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
}

const AvailableToursHeader = ({ sortBy, onSortChange, filteredCount, totalCount }: Props) => {
  const filterLabel = filteredCount === totalCount ? "No filter applied" : "Filter applied";

  return (
    <div className="w-full bg-white mt-6 px-5 py-6 rounded-lg">

      {/* container */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-md font-berlin text-[#2b140c]">
            Available Tours
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredCount} of {totalCount} tours • {filterLabel}
          </p>
        </div>

        {/* RIGHT SORT */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              bg-[#2b140c]
              text-white
              px-4 py-2
              rounded-lg
              text-sm
              outline-none
              cursor-pointer
            "
          >
            <option value="all">All</option>
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default AvailableToursHeader;