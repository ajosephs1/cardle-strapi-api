const axios = require('axios');

'use strict';

/**
 * model controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::model.model', ({ strapi }) => ({

    async addAllModels(ctx) {
        try {

            // getting makes from strapi
            const makeData = await strapi.entityService.findMany('api::make.make', {
                fields: ['id', 'make']
            })

            // const modelArr = []

            // for each make we are requesting from the nhtsa database the models for that particular make 

            for (const makeItem of makeData) {
                const makeId = makeItem['id']
                let makeName = makeItem['make'].replace(/[\s]*\([^)]*\)[\s]*|\.|,/g, "")

                // for each make fetch from api it's models
                const { data: modelResponse } = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${makeName}/vehicleType/car?format=json`)

                const modelData = modelResponse['Results']

                // for each model create a data entry 
                for (const modelItem of modelData) {

                    await strapi.entityService.create('api::model.model', {
                        data: {
                            model: modelItem['Model_Name'],
                            make: {
                                connect: [{ id: makeId }]
                            }
                        }
                    })
                }
            }

            ctx.send({ message: 'Makes imported successfully' })
        } catch (error) {
            ctx.body = error
        }
    }
}))
