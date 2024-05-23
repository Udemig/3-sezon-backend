import React from "react";

const Review = ({ params }) => {
  return (
    <div>
      <h1 className="mb-20">Yorum Detay Sayfası</h1>

      <h1>
        <span className="text-red-500">{params.id}</span> idli ürünün
        <span className="text-red-500"> {params.reviewId}</span> idli yorumu
      </h1>
    </div>
  );
};

export default Review;
