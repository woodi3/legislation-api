const httpStatus = require('http-status');
const { Tally, VoteSummary } = require('../models');
const ApiError = require('../utils/ApiError');
const PAGE_SIZE = 100;
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
async function query(filter) {
    // get the tallies that match the filter
    const tallies = await Tally.find(filter).exec();

    // map the names from tallies
    // use Set to make a distinct list
    return [...new Set(tallies.map(t => t.name))];
};


module.exports = {
    query
};
