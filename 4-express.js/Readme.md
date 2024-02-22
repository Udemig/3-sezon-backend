# HTTP Server Ve Express Farkları

1. Routing(Rotalama):

- HTTP Modülü: Yolları manuel olarak kontrol ederiz.``req.url` 'i koşulllar içersinde kontrol ederek rota tanımı yaparız
- Express.js: `àpp.get` `app.post` gibi methodlar rotaları daha oraganize bir şekilde yönetebiliyoruz.

2. Middleware(Arayazılım):

- HTTP Modülü: Ara yazılım benzeri bir işlevselliği manuel olarak kendimiz oluşturmamız gerekeri.

- Express.js: Entegre bir arayazılım sistemine sahiptir ve uygulamada günkükleme, kimlik doğrulama vb. olayları ekelemek daha kolaydır

3. Basit Okunabilirlik:

- Express.js: Genellikle daha özlü , açıklayıcı ve okunabilir olarak kabul edilir

- HTTP Modülü: Daha düşük seviye işlevsillik sağlar, eşdeğer bir görev için daha fazla kod yazmak zorunda kalıyoruz

4. Topluk ve Ekosistem:

- Express.js: Büyük ve aktif bir topluluğa sahiptir, zengin arayalım uzantı kaynağına sahiptir.

- HTTP Modülü: Topluluk desteüi vardır ama express'e göre daha sınırlıdır.
