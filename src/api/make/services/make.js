'use strict';

/**
 * make service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::make.make');
