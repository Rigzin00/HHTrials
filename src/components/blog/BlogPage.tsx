import { Compass, Landmark, Lightbulb, Leaf, Camera } from 'lucide-react';

const BlogPage = () => {

  const articles = [
    {
      id: 1,
      category: "Travel Stories",
      title: "Walking the Silk Route: Cultural Legacies Beyond Trade",
      description: "An overview of how Silk Route networks shaped Ladakh's cultural exchange,",
      author: "Heritage Himalaya Trails",
      image: "assets/ImageWithFallback (1).svg"
    },
    {
      id: 2,
      category: "Sustainability & Volunteering",
      title: "Belief Systems and Climate Adaptation in Ladakh",
      description: "Insights from Dr. Sonam Wangchok's research on traditional belief systems",
      author: "Dr. Sonam Wangchok",
      image: "assets/ImageWithFallback (5).svg"
    },
    {
      id: 3,
      category: "Culture & Heritage",
      title: "Village Life in Ladakh: A Cultural Perspective",
      description: "Understanding Ladakhi village systems, social values, and everyday cultural",
      author: "HHT Field Team",
      image: "assets/ImageWithFallback.svg"
    }
  ];
  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative w-full h-[277px] overflow-hidden mt-[72px]">
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('assets/Blog/Container.svg')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-berlin font-semibold text-white mb-3 tracking-wide">
            Blog & Stories
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-200 max-w-xl leading-relaxed">
            Explore journeys, culture, travel wisdom, and stories from the Himalayas.
          </p>
        </div>
      </div>

      {/* Blog Listing Section */}
      <div className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Category Filter Pills */}
          <div className="mb-12">
            {/* First Row */}
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <button className="h-9 px-5 rounded-full text-xs font-medium bg-[#2b1b14] text-white">
                All
              </button>
              <button className="h-9 px-5 rounded-full text-xs font-medium  bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2 ">
                <Compass size={14} />
                Travel Stories
              </button>
              <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Landmark size={14} />
                Culture & Heritage
              </button>
              <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Lightbulb size={14} />
                Tips & Guides
              </button>
              <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Leaf size={14} />
                Sustainability & Volunteering
              </button>
            </div>
            
            {/* Second Row - Centered */}
            <div className="flex justify-center">
              <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Camera size={14} />
                Photography
              </button>
            </div>
          </div>

          {/* Blog Grid Layout */}
         <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10">

            {/* ================= LEFT: Featured Blog ================= */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">

              {/* Image */}
              <div className="relative h-[420px]">
                <img
                  src="/assets/Blog/Container (1).svg"
                  alt="Featured"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-6 left-6 bg-[#F4A62A] text-white text-sm px-5 py-2 rounded-full font-medium">
                  Culture & Heritage
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h2 className="text-xl font-bold font-sans  text-[#2b2b2b] mb-3 leading-snug">
                  Dr. Sonam Wangchok: Preserving Himalayan Cultural Heritage Through Community Action
                </h2>

                <p className="text-gray-600 leading-relaxed mb-1">
                  This article examines the life and work of Dr. Sonam Wangchok, founder of the Himalayan Cultural Heritage Foundation. It explores how his personal life in Nubra Valley has evolved to becoming a leading scholar and conservationist dedicated to safeguarding Ladakh's tangible and intangible heritage through community-driven initiatives.
                </p>

                <div className="flex items-center text-xs text-gray-500 gap-3">
                  <span>Heritage Himalaya Trails</span>
                  <span>•</span>
                  <span>Research Editorial</span>
                  <span>•</span>
                  <span>October 2024</span>
                  <span>•</span>
                  <span>9 min</span>

                  <span className="ml-auto font-medium text-[#2b1b14] cursor-pointer hover:underline">
                    Read Full Story →
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">

              {/* Card 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">

                <div className="relative h-[190px]">
                  <img
                    src="/assets/Blog/Container (2).svg"
                    alt="Blog 1"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-5 left-5 bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium">
                    Culture & Heritage
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-xl font-bold text-[#2b2b2b] mb-2 leading-snug">
                    Community-Led Cultural Preservation in Ladakh
                  </h3>

                  <p className="text-xs text-gray-500">
                    Himalayan Cultural Heritage Foundation • 4 min
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">

                <div className="relative h-[200px]">
                  <img
                    src="/assets/Blog/Container (3).svg"
                    alt="Blog 2"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-5 left-5 bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium">
                    Sustainability & Volunteering
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2 leading-snug">
                    Cultural Conservation as a Tool for Sustainable Tourism
                  </h3>

                  <p className="text-xs text-gray-500 py-2">
                    HHT Research Desk • 3 min
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
            <div className="w-full bg-[#f5f5f5] py-16">
            <div className="max-w-6xl mx-auto px-6">
              {/* Section Title */}
              <h2 className="text-2xl font-semibold text-[#2b2b2b] text-center mb-12">
                Latest Articles
              </h2>

              {/* Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div 
                    key={article.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Image Section */}
                    <div className="relative h-[180px] bg-[#2b1b14]">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-[#f4a62a] text-white text-xs px-3 py-1 rounded-full font-medium">
                        {article.category}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-base font-semibold text-[#2b2b2b] mb-2 leading-snug">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {article.description}
                      </p>

                      {/* Bottom Meta Row */}
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span className="ml-auto text-[#2b1b14] font-medium hover:underline cursor-pointer">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;