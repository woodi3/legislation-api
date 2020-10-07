const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services');
const { query } = require('express');

const getQuery = catchAsync(async (req, res) => {
    const queryFilter = pick(req.query, ['name', 'state']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    var $and = [];
    if (queryFilter.name) {
        $and.push({
            name: new RegExp(queryFilter.name, 'gi')
        });
    }
    if (queryFilter.state) {
        $and.push({
            state: queryFilter.state
        });
    }
    // not including these issue numbers for now
    $and.push({
        issue: {
            $not: new RegExp("PN", 'gi')
        }
    });
    const result = await searchService.query({ $and }, options);
    return res.json(result);
});

module.exports = {
    getQuery
};
