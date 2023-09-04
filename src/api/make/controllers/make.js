const axios = require('axios');
'use strict';
/**
 * make controller
//  * use strapi endpoints to make a call to the api and update or add to the database 
 */

console.log('controller logic')

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::make.make', ({ strapi }) => ({

    async addAllMakes(ctx) {
        try {
            const { data: makeResponse } = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json ')
         
            const makeData = makeResponse['Results']
            for (const item of makeData) {
                
                await strapi.entityService.create('api::make.make', {
                    data: {
                        make: item['MakeName']
                    }
                })
            }
            ctx.send({ message: 'Data imported successfully' })
            // ctx.body =  makeData
        } catch (error) {
            ctx.status = 500;
            ctx.send({ error: 'An error occurred while importing data' });
        }
    }

}));
