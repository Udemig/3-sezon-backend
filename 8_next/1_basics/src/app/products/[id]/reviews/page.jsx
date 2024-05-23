const Reviews = ({ params }) => {
  return (
    <div>
      <h1 className="mb-20">
        <span className="text-red-500">{params.id}</span> idli ürünün Yorumları
      </h1>

      <h2>1 - Berbat Bir İçerik</h2>
      <h2>2 - Mükemmel Bir İçerik</h2>
      <h2>3 - Fevkalede Bir İçerik</h2>
      <h2>4 - İdare Eder Bir İçerik</h2>
    </div>
  );
};

export default Reviews;
