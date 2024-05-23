const Document = ({ params }) => {
  // eğer urlde 2 parametre varsa 2. param sayfa sayısı verdiği için ona göre bir metin ekrna bastık
  if (params.slug.length === 2) {
    return (
      <h1 className="text-center">
        {params.slug[0]} deki {params.slug[1]} görüntüleniyor
      </h1>
    );
  }

  // urlde 1 parametre varsa 1. param belge ismi oluycağı için ona göre bir metin ekrana bastık
  return <h1>{params.slug[0]} görüntüleniyor</h1>;
};

export default Document;
