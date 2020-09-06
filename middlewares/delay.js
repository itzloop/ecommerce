const delay = (delay) => (req, res, next) => {
  setTimeout(next, delay);
};

module.exports = delay;
