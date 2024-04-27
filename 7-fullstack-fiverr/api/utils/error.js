// aldığı parametrelere göre hata middlewareinde kullanılacak bir error nesnesi oluşturuan fonsiyon

const error = (status, message) => {
  // bir err nesnesi oluşturalım
  const err = new Error();

  // hata nesnesini güncelleyelim
  err.message = message;
  err.status = status;

  return err;
};

export default error;
