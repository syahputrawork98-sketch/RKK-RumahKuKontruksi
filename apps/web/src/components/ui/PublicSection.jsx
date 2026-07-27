export default function PublicSection({ children, id, className = '', bg = 'white' }) {
  const bgClass = bg === 'muted' ? 'section-bg-muted' : 'section-bg-white';
  
  return (
    <section id={id} className={`section-padding ${bgClass} ${className}`}>
      {children}
    </section>
  );
}
