'use strict';

/**
 * year controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::year.year', ({ strapi }) => ({

    async addAllYears(ctx) {
        try {

            const currentYear = new Date().getFullYear();
            const startYear = 1950;
            const yearRange = 5;
            // const options= [];

            for (let year = startYear; year <= currentYear; year += yearRange) {
                const rangeStart = year;
                const rangeEnd = Math.min(year + yearRange - 1, currentYear);

                await strapi.entityService.create('api::year.year', {
                    data: {
                        year: `${rangeStart}-${rangeEnd}`
                    }
                })
                //   options.push({
                //     label: `${rangeStart} - ${rangeEnd}`,
                //     value: `${rangeStart}-${rangeEnd}`,
                //   });
            }

            ctx.send({ message: 'Year ranges added successfully' })
        } catch (error) { }
    }
}));
