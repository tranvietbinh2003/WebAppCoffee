import createError from 'http-errors';
export const badRequest = ( err , res) => {
    const error = createError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const interalServerError = (res) => {
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: -1,
        mes: error.message
    })
    
}
export const notFound = (req, res) => {
    const error = createError.NotFound('tuyến đường không xác định')
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}
export const notAuth = (err, res) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}