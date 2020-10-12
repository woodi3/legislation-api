const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { congressService } = require('../services');

const getQuery = catchAsync(async (req, res) => {
    const queryFilter = pick(req.query, ['state']);
    if (!queryFilter.state) {
        return res.json({success: false, msg: 'No state!'});
    }
    let query = {
        state: new RegExp(queryFilter.state, 'gi')
    };
    
    const congressPeopleNames = await congressService.query(query);
    return res.json(congressPeopleNames);
});

module.exports = {
    getQuery
};
