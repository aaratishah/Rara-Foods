export default function RestaurantRating({ rating = 0, count = 0, onClick }) {
  return (
    <p
      className="review"
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    >
      {[...Array(5).keys()].map((each) => (
        <i
          className="fas fa-star"
          style={{
            color: each + 1 <= rating && '#f5b223',
          }}
        />
      ))}
      <a
        style={{
          fontWeight: 400,
          marginLeft: 4,
          fontSize: 14,
        }}
      >
        {count} customer {count <= 1 ? 'rating' : 'ratings'}
      </a>
    </p>
  );
}
