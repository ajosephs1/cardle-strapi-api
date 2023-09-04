module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/addModels',
            handler: 'model.addAllModels',
            config: { auth: false, }
        }
    ]
}