const fs = require('fs');

exports.checkId = (req, res, next, val) => {
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here>`,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found',
    });

  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
