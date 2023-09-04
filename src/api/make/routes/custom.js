module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/addMakes',
            handler: 'make.addAllMakes',
            config: { auth: false, }
        }
    ]
}