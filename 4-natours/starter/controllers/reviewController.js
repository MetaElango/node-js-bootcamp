const Review = require('../models/reviewModel');
const APIFeatures = require('../utils/apiFeature');

const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  return res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { review, rating, tour } = req.body;
  const user = req.user.id;
  const newReview = await Review.create({ review, rating, tour, user });

  return res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});
