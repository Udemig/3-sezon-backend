# Dosya Yapısı

- package.json: Bağımlılıkların ve sürümlerinin , komutları içeren dosya.

- config dosyaları: Kütüphaneler için ayar dosyaları

- gitignore: Githuba göndeirlmesini istemediğimiz dosya / klasörleri tanımlarız

- nodemodules: Bağımlılıkların depolandığı klasör

- public: Static, resim / svg gibi dosyların depolarız. Bu klasördee bulıunan dosyları projenin url'i üzerinden erişebilir.

- src: kaynak dosyları

- src/app: uygulama içerisndeki bütün sayfları oluşturduğumuz klasör

- src/app/layout.js: Sayfanın html' body içerisnde konumlandırılmasını sağlayan düzen bileşeni

- src/app/page.js: Projede oluşturulan bir sayfa bileşeni.

# NEXT.js

- Next.js'de 2 bileşen türü vardır.

# # Server Components:

- Varsayılan olarak bütün comp. server comp. şeklinde gelir.
- Veritabanından veri çekme dosya okuma yazma gibi işlemler yapabilirler.
- Server comp. kullanıcın donanımında derlenemesi yerine sunucuda derlenip kullanıcın donanıma gönderilelir. Server comp ile kullanıcnın donanımına daha az yük biner.
- Hook'lar (useState/useEffect) ve kullanıcı etikileşimi (onClick/onSubmit) server componentlarda kullanılamaz.

# # Client Component

- Client comp tanımlamak için sayfanın en üstüne "useclient" yzaılır.
- Veritbanaı ile alakalı işlemler yapamazlar.
- Hooklar kullanıbilir
- Kullanıcı etkişimleri izlenebilir.
- Klasik react bileşenidir

# Sayfalama - Routing

- Next.js'de iki farklı routing türü mevcuttur.

# App Router

- Dosya dizinine göresayfalama geçekleştirir
- Bütün sayfa'lar src/app içerisnde tanımlanır
- App içerisinde tanımlanan her bir klasör bir sayfaya denk gelir
- Her bir sayfa klasörü içerisne page.js/jsx/ts/tsx şeklinde bir dosya bulunması zorunludur.
- Her page dosyasında bir react bileşeni oluşturulmalı ve default export edilmelidir.

## Nested Routes (İç İçe Yollar)

- örn:
- /profile > profili görüntüle
- /profile/friends > arkadaşları görüntüle
- /profile/edit > profili düzenle

- nested routes oluşuturuken bir child (alt) oluşturmak için sadece bir sayfa klasörünün içerisnde bir klasör daha oluşturuz ve page dosyanın tanımlarız

## Dynamic Routes (Dinamik Yollar)

- Bir e ticaret projesi yapıyorsaki yüzlercce ürün olduğundan her bir ürünün sayfaını oluşturmak için nested routes tercih edemeyiz ve bu sorunu route'a tanımlanıcak bir parametre ile yani dinamik bir route ile çözeriz

- - örn: products/20
- - örn: products/10
- - örn: products/33
- - örn: products/55
- - örn: products/89

## Nested Dynamic Routes (İç İçe Dinamik Yollar)

- örn: products/20/reviews > id'si 20 olan ürünün yorumlarının gösterildiği yorumlar sayfası

- örn: products/20/reviews/9 > is'si 20 olan ürünün id'si 9 olan yorumunun göstedildiği yorum detay sayfası

- örn: products/1/reviews
- örn: products/1/reviews/30

## Catch All Segment

- Bir yola ait birden fazla paramtre varsa kullanılan yöntem

- docs/belge-1/sayfa-3
- docs/belge-3/sayfa-1
- docs/belge-9/sayfa-10
- docs/belge-2/sayfa-20

- Yukarıdaki örnekte dökümanlar yolunda iki farklı parametre vardır 1. param hangi belgenin görüntüleneceğini 2. param belgein kaçıncı sayfasının görüntüleneceğini ifade eder

# Undefined Page

- Varsayılan olarak tanımlanmayan bir sayfaya gittiğimizde çıkan 404 sayfası bulunsada istersek bunu özelleştirebiliyoruz

- Özelleştirmek için src/app klasörü içerisine not-found.jsx dosyası oluşturup düzenleriz bu noktada varsayılan 404 sayfası devre dışı kalır bizim oluşturduğumuz devreye girer

- farklı bir sayfadan notFound sayfasına yönlendirmek istersek next içersiindeki notFound fonksiyonunu kullanırız

# Private Folder (Özel Dosyalar)

- Route dışarısında kalan dosyları tanımlamaya yarar.
- Routing dışarsında bir klasör tanımlamak istiyorsak ismnin başına "alt çizgi" "\_" koyarız.
- Klasör yapısını düzenlememize yarar

# Route Group (Yol Gruplandırma)

- Proje içerisindeki sayfları gruplandırmak isteyebiliriz.

- Yazdığımız sayfaların daha kolay erişilebilir olması için route'ları gruplandırmak isyebiliriz.

- Nested routes'dan farkı sayfaya erişken url'e grup ismini eklemeyiz direkt sayfa ismini yazarız gruplandımrnaın url'de bir etkisi yoktur

- Örneğin:

- Auth (Route Grubu)
- - Login.jsx
- - Signup.jsx
- - ForgotPass.jsx

- Profile (Route Grubu)
- - User.jsx
- - EditUser.jsx
- - UserFriends.jsx

# Metadata

- SEO açısından her sayfa için metadata'ları tanımlamak önemlidir

- React'ta her sayfa özel metada tanıtamdığımız için seo açısından projeler yetersiz olabiliyor

- Sayfaların metadata dediğimiz taryıcının öne çıkarması için ihtiyacı olan başlık / açıklama / logo / yapımcı gibi değrleri sayfanın üstünde bir metadata nesnesi oluşturup export ederek tanıtabiliyoruz

- Bazı dinamik sayflarda metada'nın da dinamik olmasını örneğin url'deki parametreye göre değişmesini isteyebiliriz. Bu durumda generateMetadata donksiyonunu kullanırız ve bu fonksiyon url'deki parametreleri alır.

# Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynını belirlememize yardım olan yapı

- Bir sayfa grubunun ortak olarak kullandığı bileşenleri layout'a tanımlayıp kod tekrarını önleyebiliriz

- Root layout'a yaptığımız değişklikler bütün sayfları etkiler. ama bazı durumlarda sadece bir kaç sayfanın ortak olarak bir layout'a sahip olmasını isteyebiliriz

# Link

- a etiketi yerine kullanılır ve yönlendirme göreviini üstlenir

# useRouter

- Link bileşenin görevini fonksiyon olarak yapar fonksiyon içerisnde yönlendirme yaprken kullanırız

# usePathname

- Kullanıcnın bulundupu mevcut sayfanın adresini alır

# Template

- Bir uygulamanın veya sayfa grubunun genel dizaynını belirlememize yardım olan yapı

- Template layout ile aynı görevi yapar ama sayfalar arası geçişte state sıfırlanır

- Layout'da sayfalar arası geçişte state korunur

# Özel Dosyalar

- Page.jsx
- Layout.jsx
- Template.jsx
- not-found.jsx

- Loading.jsx
- - bir bileşenin yüklendiği sürede ekrana gelir

- Error.jsx
- - bir bileşende hata fırlatıldığı durumda devreye girer
- - prop olarak oluşan hatayı ve hata oluşan sayfayı tekrar render etmeye yarayan fonksiyonu alır

# Static vs Dynamic Page

- Next.js'de iki farklı sayfa türü bulunur

1. Static Page (Statik Sayfa):

- Derleme sırasında sunucu tarafından oluşturulur ve bir kez oluşturulduktan sonra her sayfayı açışımızda aynı içeriği sundar

- Static sayflar genellikle sıklıkla değişmeyen içerieğe sahip olan sayfalardır

- Bir sitenin login / signup, hakkımızda, iletişim gibi saylar statik sayfalardır

2. Dynamic Page (Dinamik Sayfa)

- Dinamik sayflar her sayfayı açışta sunucu tarafından tekrar oluşturulur

- Sayfa içeriği, istek anındaki parametrelerle veya dış kaynaklardan alınan verilere göre dğeişebilir.

- Örnek: Bir e ticaret sitesinin ürün detay sayfası verilebilir. Alınan parametreye göre içerik değişeceğiden bu tarz statik sayfa olamaz.

# Parallel Route
