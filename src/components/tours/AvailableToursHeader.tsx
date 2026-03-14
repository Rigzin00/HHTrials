interface Props {
  sortBy: string;
  onSortChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
  isFiltered: boolean;
}

const AvailableToursHeader = ({ sortBy, onSortChange, filteredCount, totalCount, isFiltered }: Props) => {
  const filterLabel = isFiltered ? "Filter applied" : "No filter applied";
  const filteredLabel = filteredCount === 1 ? "tour" : "tours";
  const totalLabel = totalCount === 1 ? "tour" : "tours";

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
            Showing {filteredCount} {filteredLabel} of {totalCount} {totalLabel} • {filterLabel}
          </p>
        </div>

        {/* RIGHT SORT */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="
                bg-[#2b140c]
                text-white
                pl-4 pr-10 py-2
                rounded-lg
                text-sm
                outline-none
                cursor-pointer
                appearance-none
              "
            >
              <option value="all">All</option>
              <option value="shortest">Shortest</option>
              <option value="newest">Newest</option>
            </select>

            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AvailableToursHeader;