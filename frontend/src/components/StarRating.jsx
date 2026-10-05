const StarRating = ({ value = 0, onChange, label = true }) => {
  const interactive = typeof onChange === "function";
  return (
    <div className={`star-rating ${interactive ? "interactive" : ""}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={star <= Math.round(value) ? "active" : ""}
          onClick={() => onChange?.(star)}
          aria-label={`${star} stars`}
        >
          ★
        </button>
      ))}
      {label && <span>{Number(value || 0).toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
