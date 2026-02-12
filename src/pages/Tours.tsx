import {
  HimalayanTours,
  FilterSidebar
} from '../components/tours';

const Home = () => {
  return (
    <div className="flex-grow pt-[72px] min-h-screen ">
      <HimalayanTours />
      <FilterSidebar />
    </div>
  );
};

export default Home;