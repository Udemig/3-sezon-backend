const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.setRefIds = (req, res, next) => {
  // eğerki atılan isteğin boysinde tur idsi varsa bir şey yapma ama isteğin body kısmında tur idsi gelmediyse url'deki tur idsini al ve body'e ekle
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
