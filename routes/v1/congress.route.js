const express = require('express');
const congressController = require('../../controllers/congress.controller');

const router = express.Router();

router
    .route('/')
    .get(congressController.getQuery);

module.exports = router;
/**
 * @swagger
 * path:
 *  /congress:
 *    get:
 *      summary: Query vote summaries
 *      description: Queries vote summaries, preferrably by a search string
 *      tags: [Search]
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
 *    responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/VoteSummaryResponse'
 *                  currentPage:
 *                    type: integer
 *                    example: 1
 *                  currentPageSize:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 */
