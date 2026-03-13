const BlogHeroSection = () => {
  return (
    <div className="relative w-full h-[277px] overflow-hidden mt-[72px]">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Blog.jpeg')"
        }}
      />
      
      {/* Dark Overlay (reduce this to decrease the background color )*/}
      <div className="absolute inset-0 bg-black/25" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Title */}
        <h1 className="text-[#edeceb] text-2xl md:text-3xl font-berlin font-medium  mb-3 tracking-wide">
          Blog & Stories
        </h1>
        
        {/* Subtitle */}
        <p className="text-md text-[#edeceb] max-w-xl leading-relaxed">
          Explore journeys, culture, travel wisdom, and stories from the Himalayas.
        </p>
      </div>
    </div>
  );
};

export default BlogHeroSection;