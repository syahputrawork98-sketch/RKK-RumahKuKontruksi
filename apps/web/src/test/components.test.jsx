import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PublicContainer from '../components/ui/PublicContainer';
import PublicSection from '../components/ui/PublicSection';
import SectionHeading from '../components/ui/SectionHeading';
import InfoCard from '../components/ui/InfoCard';
import ActionLink from '../components/ui/ActionLink';
import HoldAction from '../components/ui/HoldAction';

describe('Shared Components', () => {
  describe('PublicContainer', () => {
    it('renders with canonical class and children', () => {
      const { container } = render(<PublicContainer>Content</PublicContainer>);
      expect(container.firstChild).toHaveClass('public-container');
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('allows className extension', () => {
      const { container } = render(<PublicContainer className="extra-class">Content</PublicContainer>);
      expect(container.firstChild).toHaveClass('public-container');
      expect(container.firstChild).toHaveClass('extra-class');
    });
  });

  describe('PublicSection', () => {
    it('renders as semantic section with default padding and bg-white', () => {
      const { container } = render(<PublicSection>Content</PublicSection>);
      const section = container.firstChild;
      expect(section.tagName.toLowerCase()).toBe('section');
      expect(section).toHaveClass('section-padding');
      expect(section).toHaveClass('section-bg-white');
    });

    it('renders with bg muted variant', () => {
      const { container } = render(<PublicSection bg="muted">Content</PublicSection>);
      const section = container.firstChild;
      expect(section).toHaveClass('section-bg-muted');
    });

    it('allows className extension and ID', () => {
      const { container } = render(<PublicSection id="test-id" className="extra">Content</PublicSection>);
      const section = container.firstChild;
      expect(section).toHaveClass('extra');
      expect(section).toHaveAttribute('id', 'test-id');
    });
  });

  describe('SectionHeading', () => {
    it('renders title with correct specific classes and no hero classes', () => {
      const { container } = render(<SectionHeading title="Test Title" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('section-heading');
      expect(wrapper.querySelector('.section-heading__title')).toHaveTextContent('Test Title');
      
      // Should not have any hero-* classes
      expect(wrapper.querySelector('[class*="hero-"]')).toBeNull();
    });

    it('renders optional eyebrow and description', () => {
      const { container } = render(
        <SectionHeading 
          title="Title" 
          eyebrow="Eyebrow text" 
          description="Desc text" 
        />
      );
      const wrapper = container.firstChild;
      expect(wrapper.querySelector('.section-heading__eyebrow')).toHaveTextContent('Eyebrow text');
      expect(wrapper.querySelector('.section-heading__description')).toHaveTextContent('Desc text');
    });
  });

  describe('InfoCard', () => {
    it('renders with canonical class and required fields', () => {
      const { container } = render(
        <InfoCard title="Card Title" description="Card Desc" />
      );
      const card = container.firstChild;
      expect(card).toHaveClass('info-card');
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Desc')).toBeInTheDocument();
      expect(screen.getByText('Card Title').tagName.toLowerCase()).toBe('h3');
    });

    it('renders marker and decorative icon', () => {
      const { container } = render(
        <InfoCard title="Title" description="Desc" marker="01" icon={<span>Icon</span>} />
      );
      const card = container.firstChild;
      expect(card.querySelector('.card-marker')).toHaveTextContent('01');
      const iconWrapper = card.querySelector('.card-icon');
      expect(iconWrapper).toBeInTheDocument();
      expect(iconWrapper).toHaveTextContent('Icon');
      // aria-hidden for icon is best practice for decorative, though checking presence is enough for requirement
    });

    it('allows className extension', () => {
      const { container } = render(
        <InfoCard title="T" description="D" className="extra-class" />
      );
      expect(container.firstChild).toHaveClass('info-card', 'extra-class');
    });
  });

  describe('ActionLink', () => {
    it('renders internal link correctly', () => {
      render(
        <BrowserRouter>
          <ActionLink to="/test" variant="primary">Internal</ActionLink>
        </BrowserRouter>
      );
      const link = screen.getByText('Internal');
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('btn', 'btn-primary');
    });

    it('renders external link with proper target/rel', () => {
      render(
        <ActionLink to="https://example.com" isExternal variant="outline">External</ActionLink>
      );
      const link = screen.getByText('External');
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveClass('btn', 'btn-outline');
    });
  });

  describe('HoldAction', () => {
    it('renders as button with type="button" and aria-disabled', () => {
      render(
        <HoldAction reason="Currently holding">Click Me</HoldAction>
      );
      const button = screen.getByText('Click Me');
      expect(button.tagName.toLowerCase()).toBe('button');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveClass('btn', 'btn-primary'); // Default variant
      
      expect(screen.getByText('Currently holding')).toBeInTheDocument();
      expect(screen.getByText('Currently holding')).toHaveClass('hold-reason');
    });

    it('prevents action on click and maintains safety attributes', () => {
      const onClick = vi.fn();

      render(
        <HoldAction
          onClick={onClick}
          type="submit"
          aria-disabled="false"
        >
          Click Me
        </HoldAction>
      );

      const button = screen.getByRole('button', { name: 'Click Me' });

      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
