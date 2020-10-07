const httpStatus = require('http-status');
const { Tally, VoteSummary } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
async function query (filter, options) {
  options.sortBy = {
    congressYear: -1
  };

  // get the tallies that match the filter
  const tallies = await Tally.find(filter).exec();

  // get the issue numbers
  const issueNumbers = tallies.map(function arrToIssueNumber(tally) {
    return tally.issue;
  });

  // query vote summaries
  const bulkFilter = {
    issue: {
      $in: issueNumbers
    }
  };
  // get the vote summaries based on issue numbers
  var { 
    results,
    page,
    limit,
    totalPages,
    totalResults
  } = await VoteSummary.paginate(bulkFilter, options);

  // create response objects
  results = results.map(function mapVoteSummaryResponse(summary) {
    const tally = tallies.find(function (t) {
      return t.issue == summary.issue;
    });
    if (tally) {
      return {
        congress: summary.congress,
        congressYear: summary.congressYear,
        issue: summary.issue,
        session: summary.session,
        title: summary.title,
        voteNumber: summary.voteNumber,
        voteDate: summary.voteDate,
        url: summary.url,
        name: tally.name,
        party: tally.party,
        state: tally.state,
        voteCast: tally.voteCast
      };
    }
    return {remove: true};
  });

  return {
    totalPages,
    totalResults,
    currentPage: page,
    currentPageSize: limit,
    data: results.filter(result => !result.remove)
  };
};


module.exports = {
  query
};
