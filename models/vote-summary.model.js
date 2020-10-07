const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const voteSummarySchema = new mongoose.Schema({
    congress: String,
    congressYear: String,
    issue: String,
    session: String,
    title: String,
    voteNumber: String,
    voteDate: String,
    url: String
}, {
    timestamps: true
});

// add plugin that converts mongoose to json
voteSummarySchema.plugin(toJSON);
voteSummarySchema.plugin(paginate);

/**
 * @typedef VoteSummary
 */
const VoteSummary = mongoose.model('VoteSummary', voteSummarySchema);

module.exports = VoteSummary;
