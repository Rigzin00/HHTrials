import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { Blog } from '../types/blog';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        setBlog(await blogService.getBlog(id));
      } catch {
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F4A62A] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-wide">Loading article…</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#F4A62A]/10 flex items-center justify-center text-2xl">📄</div>
        <p className="text-gray-600 font-medium">{error ?? 'Article not found.'}</p>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#2b1b14] hover:bg-[#3d2a1e] px-5 py-2.5 rounded-full transition-colors"
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-white w-full overflow-x-hidden">

      {/* ── Hero ── */}
      {blog.coverImageUrl && (
        <div className="w-screen relative left-1/2 -translate-x-1/2 h-56 sm:h-80 md:h-[460px] overflow-hidden">
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Article shell ── */}
      <div className="max-w-[740px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Back link */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#2b1b14] uppercase tracking-widest transition-colors mb-10"
        >
          ← Back to Blog
        </button>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block bg-[#F4A62A] text-white text-[11px] font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-snug tracking-tight mb-5">
          {blog.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-gray-500 mb-8 pb-7 border-b border-gray-100">
          <span className="font-semibold text-[#2b1b14]">{blog.authorName}</span>
          <span className="text-gray-300">·</span>
          <span>{blog.publishedDate}</span>
          <span className="text-gray-300">·</span>
          <span>{blog.readingTimeMinutes} min read</span>
        </div>

        {/* Pull quote / short description */}
        <blockquote className="relative pl-5 mb-10 border-l-[3px] border-[#F4A62A]">
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed italic">
            {blog.shortDescription}
          </p>
        </blockquote>

        {/* Body content */}
        <div
          className="
            prose prose-base sm:prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-headings:tracking-tight
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-[#F4A62A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#2b1b14]
            prose-blockquote:border-l-[#F4A62A] prose-blockquote:text-gray-500 prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:shadow-md
            prose-hr:border-gray-100
            prose-code:text-[#2b1b14] prose-code:bg-[#FBF7F4] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer back link */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b1b14] hover:text-[#F4A62A] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all articles
          </button>
        </div>
      </div>
    </div>
  );
}