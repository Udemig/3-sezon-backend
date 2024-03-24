# Komutlar

## Kollekisyonlardaki bütün verileri temizle

`node ./dev-data/data/dev-commands.js --delete`

## Kollekisyonlara hazır verileri ekle

`node ./dev-data/data/dev-commands.js --import`

# MongoDB Operatörler

- gt > greater than ">"
- gte > greater than or equeals ">="
- lt > less than "<"
- lte > less than or equeals "<="
- ne > not equals "!="

# Authentication (Kimlik Doğrulama)

- Bir kullanıcın kimliğini doğrulamak için geçtiği süreçtir.
- Ör: e posta şifre / google hesabı / parmak izi
- Kimlik doğrulama, bir kullanıcının sisteme erişim talebini gerçekleştiren ilk adımdır.

# Authorization (Yetkilendirme)

- Bir kullanıcnın sistemeizin belirli kaynaklarına erişiminin kontrol etme sürecididr.
- Yetkilendirme kimklik doğrulama sürecinin ardından devreye girer.
- Kimliğini doğruladığımız kullanıcın ne tür eylermleri gerçekleştirebileceğini belirler.
- Ör:
- - kullanıncın oturmu açıksa bazı işlevleri erişebilirken kapalıysa erişemez
- - user rolü sadece okuma yapabilir.
- - guide ve lead-guide rolü saedece kendi oluşturdukları turlarda crud işlemi yapabilir.
- - admin rolü bütün turlarda crud işlemleri yapabilir.

# Hashing

## Temel Özellikleri

1. Benzersizlik: Farklı girdiler farklı hash değerleri üretir. Aynı girdiler de aynı hash değerini üretir

2. Hızlı İşleme

3. Sabit Boyulu Çıktı: Girdinin uzunluğundan bağımsız sabit uzunlukta çıktı verir

4. Parola Güvenliğ: Kullanıcı parollarının hashlenmesi parolanın deplonması sırasında güvenliği arttr. Böylece depolama alınan erişen bir saldırgan kullanıclarının gerçek şifrelerini göremez

# Saltlama

Parola tabanlı hash fonksiyonları aynı girdiler aynı sonuçları ürettikleri için saltlama ile birlik te güvenliği arttırırz. Saltama kullanıcnın parolaso için rasgele bir değer oluşturur ve bu değeri parolanın kendisiyle birleştirir. Sonra bu salt'nmış parola hashing algoritmasından geçer bu sayede hash aybı parola için farklı sonuçlar üretir

## Normal

Denem@123

## 1. Hashlenmiş ve Saltlanmış

$2b$12$B3sHw1fY2MNQy0rFU.AmO.vvBdbnmyHD/NFQlYeBs5w5fxh2tzcfe

## 2. Hashlenmiş ve Saltlanmış

$2b$12$/DWrKJ412jEp11rnh7iMBOGbOA7vmxHJrEq4Pxw10rQJ5CF9S/Kxa

## 3.Hashlenmiş ve Saltlanmış

$2b$12$VqkcTRKPzyQubPBjuBhW.uEiBEco00y.7ozZBQd5b5aFv7qCdmnwG

# JWT (JSON Web Token)

Veri aktarımı için kullanılan kompakt, kendine yaten güvenli bir veri formatıdır.
Özellikle web uygulamların kimlik doğrulaması ve pturum yönetimi gibi alnlarda popülerdir.
Neden kullanılıyor

1. Taşınabailirlik: JWT, istemci ve sunucu arasında taşınabilir bir veri format.

2. Kendine Yetrlilik: Kullanıcı bilgilerini taşırken bu bilgilerin doğrulanmasını sağlayacak tüm bilgileri içeriir. Bu sunucun bir veri depolamay gerek duymadan doğrulama yapmasını sağlar ve bu sayede gerkesiz sorguların önüne geçeriz.

3. Güvenlik: JWT'ler dijital imza gibi yöntemlerle güvenli bir şekilde imzalanabilir. Bu jwt'nin değiştirlmediğini ve güvenli bir şekilde taşındığını doğrular
