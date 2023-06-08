function terminate (server, options = { coreDump: false, timeout: 500 }) {
    // Exit function
    const exit = code => {
        options.coreDump ? process.abort() : process.exit(code)
    }

    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            console.error('\x1b[31m[ERROR]\x1b[0m', err.message, err.stack)
        }

        server.close(exit)
        setTimeout(exit, options.timeout).unref()
    }
}

module.exports = terminate
