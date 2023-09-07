'use strict';

/**
 * test-answer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-answer.test-answer');
