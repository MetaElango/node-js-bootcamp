const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slugify: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a maximum group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a Difficulty details'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover'],
    },
    images: {
      type: [String],
    },
    startDates: [Date],
    createAt: {
      type: Date,
      default: Date.now(),
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.pre('save', function (next) {
  this.slugify = slugify(this.name, { lower: true });
  next();
});
// tourSchema.pre('save', function (next) {
//   console.log(this, 'Pre save');
//   next();
// });
// tourSchema.post('save', function (doc, next) {
//   console.log(this, 'Post save');
//   next();
// });
// tourSchema.pre('find', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.startTime = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(
    `time taken to complete the query: ${Date.now() - this.startTime}`
  );
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
