module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/addYears',
            handler: 'year.addAllYears',
            config: { auth: false, }
        }
    ]
}