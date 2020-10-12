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
async function query (filter, { page }) {
  const sortBy = {
    congressYear: -1
  };
  const limit = PAGE_SIZE;

  // TODO
  /**
   * Set up some new endpoints to get All Representatives by state
   * In the UI force users to select State, then from that select representative
   * This combo of State/representative will be used for the search.
   * Then we could let the user create another search maintaining the data from the first search
   */

  // get the tallies that match the filter
  const tallies = await Tally.find(filter).exec();

  // get the issue numbers
  let issueNumbers = tallies.map(function arrToIssueNumber(tally) {
    return tally.issue;
  });

  // distinct
  issueNumbers = [... new Set(issueNumbers)];

  // query vote summaries
  const bulkFilter = {
    issue: {
      $in: issueNumbers
    }
  };
  const voteSummariesPromise = VoteSummary.find(bulkFilter).sort(sortBy).exec();
  const docCountPromise = VoteSummary.countDocuments(bulkFilter).exec();

  page = parseInt(page, 10);
  if (page == undefined || page == 0) {
    page = 1;
  }

  return Promise.all([voteSummariesPromise, docCountPromise])
    .then((values) => {
      const [ voteSummaryDocs, totalResults ] = values;
      const totalPages = Math.ceil(totalResults / limit);
      
      // only take a subset of the data
      const start = (page - 1) * limit;
      const end = start + limit;
      let results = voteSummaryDocs.slice(start, end);
      
      // map our results properly
      // TODO map these to be encompassed in individual legislators (maybe on the UI)
      results = results.map(function mapVoteSummaryResponse(summary) {
        const tally = tallies.find(function (t) {
          return t.issue == summary.issue;
        });
        if (tally) {
          return {
            id: summary.id,
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
        return { remove: true };
      });

      return {
        totalPages,
        totalResults,
        currentPage: page,
        currentPageSize: limit,
        data: results.filter(result => !result.remove)
      };
    });


  // get the vote summaries based on issue numbers
  // var { 
  //   results,
  //   page,
  //   limit,
  //   totalPages,
  //   totalResults
  // } = await VoteSummary.paginate(bulkFilter, options);

  // create response objects
  
};


module.exports = {
  query
};
