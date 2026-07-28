import { useEffect } from 'react';

/**
 * A reusable component to set page metadata.
 * Changes document title and meta description without any third party dependency.
 * Restores previous metadata upon unmount.
 */
export function PageMeta({ title, description, path, robots }) {
  useEffect(() => {
    // Save previous state
    const prevTitle = document.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const hasPrevDescription = !!metaDescription;
    const prevDescriptionContent = hasPrevDescription ? metaDescription.content : null;
    let descriptionCreated = false;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const hasPrevCanonical = !!canonicalLink;
    const prevCanonicalHref = hasPrevCanonical ? canonicalLink.href : null;
    let canonicalCreated = false;

    let metaRobots = document.querySelector('meta[name="robots"]');
    const hasPrevRobots = !!metaRobots;
    const prevRobotsContent = hasPrevRobots ? metaRobots.content : null;
    let robotsCreated = false;

    // Apply new metadata
    if (title) {
      document.title = title;
    }

    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
        descriptionCreated = true;
      }
      metaDescription.content = description;
    }

    if (path !== undefined) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
        canonicalCreated = true;
      }
      canonicalLink.href = `${window.location.origin}${path}`;
    }

    if (robots !== undefined) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        document.head.appendChild(metaRobots);
        robotsCreated = true;
      }
      metaRobots.content = robots;
    }

    // Cleanup function
    return () => {
      if (title) {
        document.title = prevTitle;
      }
      
      if (description) {
        if (descriptionCreated && metaDescription && metaDescription.parentNode) {
          metaDescription.parentNode.removeChild(metaDescription);
        } else if (hasPrevDescription && metaDescription) {
          metaDescription.content = prevDescriptionContent;
        }
      }

      if (path !== undefined) {
        if (canonicalCreated && canonicalLink && canonicalLink.parentNode) {
          canonicalLink.parentNode.removeChild(canonicalLink);
        } else if (hasPrevCanonical && canonicalLink) {
          canonicalLink.href = prevCanonicalHref;
        }
      }

      if (robots !== undefined) {
        if (robotsCreated && metaRobots && metaRobots.parentNode) {
          metaRobots.parentNode.removeChild(metaRobots);
        } else if (hasPrevRobots && metaRobots) {
          metaRobots.content = prevRobotsContent;
        }
      }
    };
  }, [title, description, path, robots]);

  return null;
}
