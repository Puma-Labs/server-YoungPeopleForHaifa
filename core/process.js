'use strict'

const terminate = require('../core/exceptions/terminate');

module.exports = (server) => {
    const exitHandler = terminate(server)

    process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
    process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
    process.on('SIGINT', exitHandler(0, 'SIGINT'))
}
