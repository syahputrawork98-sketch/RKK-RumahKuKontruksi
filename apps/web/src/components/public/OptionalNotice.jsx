export default function OptionalNotice({ message, isVisible = false }) {
  if (!isVisible) return null;

  return (
    <div className="optional-notice" role="alert">
      <div className="public-container">
        <p>{message}</p>
      </div>
    </div>
  );
}
