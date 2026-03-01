import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../types/blog';

interface Props {
  blogs: Blog[];
}

const BlogFeaturedSection = ({ blogs }: Props) => {
  const navigate = useNavigate();
  const [featured, ...rest] = blogs;
  const sideBlogs = rest.slice(0, 2);

  if (!featured) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10">

        {/* ── Featured (left) ── */}
        <div
          className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/blog/${featured.id}`)}
        >
          <div className="relative h-[420px]">
            {featured.coverImageUrl
              ? <img src={featured.coverImageUrl} alt={featured.title} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e]" />}
            <div className="absolute top-6 left-6 bg-[#F4A62A] text-white text-sm px-5 py-2 rounded-full font-medium">
              {featured.category}
            </div>
          </div>
          <div className="p-3">
            <h2 className="text-xl font-bold font-sans text-[#2b2b2b] mb-3 leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-1 line-clamp-3">
              {featured.shortDescription}
            </p>
            <div className="flex items-center text-xs text-gray-500 gap-3">
              <span>{featured.authorName}</span>
              <span>•</span>
              <span>{featured.category}</span>
              <span>•</span>
              <span>{featured.publishedDate}</span>
              <span>•</span>
              <span>{featured.readingTimeMinutes} min</span>
              <span className="ml-auto font-medium text-[#2b1b14] cursor-pointer hover:underline">
                Read Full Story →
              </span>
            </div>
          </div>
        </div>

        {/* ── Side cards (right) ── */}
        <div className="flex flex-col gap-8">
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="relative h-[190px]">
                {blog.coverImageUrl
                  ? <img src={blog.coverImageUrl} alt={blog.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e]" />}
                <div className="absolute top-5 left-5 bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium">
                  {blog.category}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xl font-bold text-[#2b2b2b] mb-2 leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {blog.authorName} • {blog.readingTimeMinutes} min
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogFeaturedSection;
//       <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10">

//         {/* ================= LEFT: Featured Blog ================= */}
//         <div className="bg-white rounded-lg overflow-hidden shadow-sm">

//           {/* Image */}
//           <div className="relative h-[420px]">
//             <img
//               src="/assets/Blog/Container (1).svg"
//               alt="Featured"
//               className="w-full h-full object-cover"
//             />

//             <div className="absolute top-6 left-6 bg-[#F4A62A] text-white text-sm px-5 py-2 rounded-full font-medium">
//               Culture & Heritage
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-3">
//             <h2 className="text-xl font-bold font-sans  text-[#2b2b2b] mb-3 leading-snug">
//               Dr. Sonam Wangchok: Preserving Himalayan Cultural Heritage Through Community Action
//             </h2>

//             <p className="text-gray-600 leading-relaxed mb-1">
//               This article examines the life and work of Dr. Sonam Wangchok, founder of the Himalayan Cultural Heritage Foundation. It explores how his personal life in Nubra Valley has evolved to becoming a leading scholar and conservationist dedicated to safeguarding Ladakh's tangible and intangible heritage through community-driven initiatives.
//             </p>

//             <div className="flex items-center text-xs text-gray-500 gap-3">
//               <span>Heritage Himalaya Trails</span>
//               <span>•</span>
//               <span>Research Editorial</span>
//               <span>•</span>
//               <span>October 2024</span>
//               <span>•</span>
//               <span>9 min</span>

//               <span className="ml-auto font-medium text-[#2b1b14] cursor-pointer hover:underline">
//                 Read Full Story →
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-8">

//           {/* Card 1 */}
//           <div className="bg-white rounded-lg overflow-hidden shadow-sm">

//             <div className="relative h-[190px]">
//               <img
//                 src="/assets/Blog/Container (2).svg"
//                 alt="Blog 1"
//                 className="w-full h-full object-cover"
//               />

//               <div className="absolute top-5 left-5 bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium">
//                 Culture & Heritage
//               </div>
//             </div>

//             <div className="p-3">
//               <h3 className="text-xl font-bold text-[#2b2b2b] mb-2 leading-snug">
//                 Community-Led Cultural Preservation in Ladakh
//               </h3>

//               <p className="text-xs text-gray-500">
//                 Himalayan Cultural Heritage Foundation • 4 min
//               </p>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white rounded-xl overflow-hidden shadow-sm">

//             <div className="relative h-[200px]">
//               <img
//                 src="/assets/Blog/Container (3).svg"
//                 alt="Blog 2"
//                 className="w-full h-full object-cover"
//               />

//               <div className="absolute top-5 left-5 bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium">
//                 Sustainability & Volunteering
//               </div>
//             </div>

//             <div className="p-3">
//               <h3 className="text-lg font-semibold text-[#2b2b2b] mb-2 leading-snug">
//                 Cultural Conservation as a Tool for Sustainable Tourism
//               </h3>

//               <p className="text-xs text-gray-500 py-2">
//                 HHT Research Desk • 3 min
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogFeaturedSection;
