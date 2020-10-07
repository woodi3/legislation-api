const express = require('express');
const searchController = require('../../controllers/search.controller');

const router = express.Router();

router
    .route('/')
    .get(searchController.getQuery);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search management and retrieval
 */

/**
 * @swagger
 * path:
 *  /search:
 *    get:
 *      summary: Query vote summaries
 *      description: Queries vote summaries, preferrably by a search string
 *      tags: [VoteSummary, Tally]
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Congress person's name
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of vote summaries
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 */
