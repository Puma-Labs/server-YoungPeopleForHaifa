module.exports = async (req, res, hash = null) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
    }
    const userHash = hash !== null ? hash : req.user.hash
    let hashPath = [userHash.substring(0, userHash.length/2|0), userHash.substring(userHash.length/2|0)]

    let sampleFile = Object.entries(req.files)[0][1]

    let fileNameSection = sampleFile?.name.split('.')

    if(fileNameSection.length <= 1) {
        return res.status(500).send({
            status: 'error',
            message: 'file extension not found'
        });
    }

    return {
        file: sampleFile,
        name: fileNameSection[0],
        extension: fileNameSection[1],
        randomName: __randomString(34),
        userPath: `/store/${hashPath[0]}/${hashPath[1]}`,
    }
}
