// Javascript'teki yerleşik hata class'ının bütün özelliklerinin dışarınsda ekstra özelliklere ve parametrelere sahip olan  gelişmiş versiyonu oluşturlarlım

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // durum koduna göre status değerini belirle: 4xx şeklindeyse fail 5xx şeklindeyse error olmalı
    this.status = String(this.statusCode).startsWith("4") ? "fail" : "error";

    // hata'nın detyı ve hata oluşana kadar çalışan doayların bilgisini al
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
