const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tallySchema = new mongoose.Schema({
  issue: String,
  name: String,
  party: String,
  state: String,
  title: String,
  voteCast: String
}, {
  timestamps: true
});

// add plugin that converts mongoose to json
tallySchema.plugin(toJSON);
tallySchema.plugin(paginate);

/**
 * @typedef Tally
 */
const Tally = mongoose.model('Tally', tallySchema);

module.exports = Tally;
