import {
  HimalayanTours,
  TourLayout
} from '../components/tours';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="flex-grow pt-[72px] min-h-screen ">
      <SEO
        title="Explore Our Tours"
        description="Browse Heritage Himalaya Trails' curated tours across Ladakh and the Himalayas – from Silk Route expeditions to Buddhist heritage walks and immersive village stays."
        image="/Heritage_walk.jpeg"
      />
      <HimalayanTours />
      <TourLayout />
    </div>
  );
};

export default Home;