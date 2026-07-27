import { useEffect } from 'react';

/**
 * A reusable component to set page metadata.
 * Changes document title and meta description without any third party dependency.
 */
export function PageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    if (path !== undefined) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      // Assuming window.location.origin for the base URL, or hardcode if preferred. 
      // But window.location.origin is standard and dynamic for current environment.
      canonicalLink.href = `${window.location.origin}${path}`;
    }
  }, [title, description, path]);

  return null;
}
