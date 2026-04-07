import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SITE_URL =
  process.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://hhtrails.com';

const BLOG_ROUTE = '/blog';
const BLOG_META = {
  title: 'Blog - Stories from the Himalayas | Heritage Himalaya Trails',
  description:
    'Read travel stories, cultural insights, and heritage guides from Heritage Himalaya Trails. Explore articles about Ladakh, Buddhist traditions, and Himalayan life.',
  image: `${SITE_URL}/Blog.jpeg`,
  imageType: 'image/jpeg',
  imageWidth: '2560',
  imageHeight: '1338',
  url: `${SITE_URL}${BLOG_ROUTE}`,
};

const distDir = path.resolve(process.cwd(), 'dist');
const sourceHtmlPath = path.join(distDir, 'index.html');
const blogHtmlPath = path.join(distDir, 'blog', 'index.html');

if (!existsSync(sourceHtmlPath)) {
  throw new Error(
    `Cannot prerender blog metadata because file does not exist: ${sourceHtmlPath}`,
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertMetaTag(html, attr, key, content) {
  const safeKey = escapeRegExp(key);
  const tagRegex = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${safeKey}["'][^>]*>`,
    'i',
  );
  const replacement = `    <meta ${attr}="${key}" content="${escapeAttr(content)}" />`;

  if (tagRegex.test(html)) {
    return html.replace(tagRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function upsertLinkTag(html, rel, href) {
  const safeRel = escapeRegExp(rel);
  const tagRegex = new RegExp(`<link\\s+[^>]*rel=["']${safeRel}["'][^>]*>`, 'i');
  const replacement = `    <link rel="${rel}" href="${escapeAttr(href)}" />`;

  if (tagRegex.test(html)) {
    return html.replace(tagRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

function upsertTitleTag(html, title) {
  const replacement = `    <title>${escapeAttr(title)}</title>`;
  const titleRegex = /<title>[^<]*<\/title>/i;

  if (titleRegex.test(html)) {
    return html.replace(titleRegex, replacement);
  }

  return html.replace('</head>', `${replacement}\n  </head>`);
}

let blogHtml = readFileSync(sourceHtmlPath, 'utf8');

blogHtml = upsertTitleTag(blogHtml, BLOG_META.title);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:title', BLOG_META.title);
blogHtml = upsertMetaTag(blogHtml, 'name', 'twitter:title', BLOG_META.title);
blogHtml = upsertMetaTag(blogHtml, 'name', 'description', BLOG_META.description);
blogHtml = upsertMetaTag(
  blogHtml,
  'property',
  'og:description',
  BLOG_META.description,
);
blogHtml = upsertMetaTag(blogHtml, 'name', 'twitter:description', BLOG_META.description);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:image', BLOG_META.image);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:image:secure_url', BLOG_META.image);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:image:type', BLOG_META.imageType);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:image:width', BLOG_META.imageWidth);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:image:height', BLOG_META.imageHeight);
blogHtml = upsertMetaTag(blogHtml, 'name', 'twitter:image', BLOG_META.image);
blogHtml = upsertMetaTag(blogHtml, 'property', 'og:url', BLOG_META.url);
blogHtml = upsertLinkTag(blogHtml, 'canonical', BLOG_META.url);

mkdirSync(path.dirname(blogHtmlPath), { recursive: true });
writeFileSync(blogHtmlPath, blogHtml, 'utf8');

console.log(`Prerendered metadata file: ${blogHtmlPath}`);
