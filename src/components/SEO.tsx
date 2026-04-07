import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}

const SITE_NAME = 'Heritage Himalaya Trails';
const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://hhtrails.com';

const DEFAULT_DESCRIPTION =
  'Heritage Himalaya Trails – Authentic cultural and heritage tours across Ladakh and the Himalayan region. Discover ancient monasteries, Silk Route trails, and vibrant living traditions.';
const DEFAULT_IMAGE = `${SITE_URL}/imagewithfallback.png`;

function setMeta(
  nameOrProperty: string,
  content: string,
  attr: 'name' | 'property' = 'name',
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${nameOrProperty}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeLink(rel: string) {
  const el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (el) el.remove();
}

function removeMeta(nameOrProperty: string, attr: 'name' | 'property' = 'property') {
  const el = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${nameOrProperty}"]`,
  );
  if (el) el.remove();
}

function toAbsoluteUrl(url: string, siteUrl: string): string {
  if (!url) return `${siteUrl}/imagewithfallback.png`;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

function inferImageType(url: string): string {
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (cleanUrl.endsWith('.png')) return 'image/png';
  if (cleanUrl.endsWith('.webp')) return 'image/webp';
  if (cleanUrl.endsWith('.gif')) return 'image/gif';
  if (cleanUrl.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  imageAlt,
  type = 'website',
  publishedTime,
  noindex = false,
}: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  // Resolve relative image paths to absolute URLs
  const absoluteImage = toAbsoluteUrl(image, SITE_URL);
  const resolvedImageAlt = imageAlt || fullTitle;
  const imageType = inferImageType(absoluteImage);

  useEffect(() => {
    // Page title
    document.title = fullTitle;

    // Basic meta
    setMeta('description', description);
    setMeta(
      'robots',
      noindex
        ? 'noindex,nofollow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    );

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', absoluteImage, 'property');
    setMeta('og:image:secure_url', absoluteImage, 'property');
    setMeta('og:image:url', absoluteImage, 'property');
    setMeta('og:image:type', imageType, 'property');
    setMeta('og:image:alt', resolvedImageAlt, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'en_IN', 'property');

    if (type === 'article' && publishedTime) {
      setMeta('article:published_time', publishedTime, 'property');
    } else {
      removeMeta('article:published_time');
    }

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', absoluteImage);
    setMeta('twitter:image:src', absoluteImage);
    setMeta('twitter:image:alt', resolvedImageAlt);
    setMeta('twitter:site', '@HHTHimalaya');

    // Canonical link
    if (noindex) {
      removeLink('canonical');
    } else {
      setLink('canonical', canonicalUrl);
    }
  }, [
    fullTitle,
    description,
    absoluteImage,
    resolvedImageAlt,
    imageType,
    type,
    canonicalUrl,
    noindex,
    publishedTime,
  ]);

  return null;
}
