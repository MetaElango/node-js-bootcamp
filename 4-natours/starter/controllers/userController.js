const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...fields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      filteredObj[el] = obj[el];
    }
  });
  return filteredObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) there should be no password field
  if (req.body.password || req.body.passwordConfirm) {
    const error = new AppError(
      'This route is not for password updates. Please use /updatePassword.',
      400
    );
    return next({ ...error, message: error.message });
  }
  // 2) Filter unwanted objects
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3 update the user doc with filtered objects
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
