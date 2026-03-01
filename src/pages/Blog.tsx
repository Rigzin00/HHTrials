import { useEffect, useState } from 'react';
import {
  BlogHeroSection,
  BlogCategoryFilter,
  BlogFeaturedSection,
  BlogLatestArticles,
  BlogLibrarySection,
  BlogNewsletterSection,
} from '../components/blog';
import { blogService } from '../services/blogService';
import type { Blog } from '../types/blog';

const BlogPage = () => {
  const [category, setCategory] = useState('');
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogs({ limit: 50 });
        setAllBlogs(data.blogs);
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const filtered = category
    ? allBlogs.filter((b) => b.category === category)
    : allBlogs;

  // Featured section — first 3; Latest section — rest
  const featured = filtered.slice(0, 3);
  const latest = filtered.slice(3);

  return (
    <div>
      <BlogHeroSection />
      <div className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <BlogCategoryFilter selected={category} onChange={setCategory} />
          {loading ? (
            <p className="text-center text-sm text-gray-400 py-12">Loading articles…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-12">No articles found.</p>
          ) : (
            <BlogFeaturedSection blogs={featured} />
          )}
        </div>
      </div>
      {!loading && latest.length > 0 && <BlogLatestArticles blogs={latest} />}
      <BlogLibrarySection />
      <BlogNewsletterSection />
    </div>
  );
};

export default BlogPage;
