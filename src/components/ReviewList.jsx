export default function ReviewList({ reviews }) {
  return (
    <div>
      <h3 className="font-bold text-lg">Reviews</h3>
      {reviews.map((r) => (
        <div key={r.reviewId} className="border-b py-2">
          <p className="font-semibold">{r.rating}★</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
