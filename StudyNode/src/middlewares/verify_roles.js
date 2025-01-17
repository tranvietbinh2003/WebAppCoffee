import { notAuth } from "./handle_errors"



export const isAdmin = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R1') return notAuth('Requie role Admin', res)
    next()
}

export const isCreaterOrAdmin = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R1' && role_code !== 'R2') return notAuth('Requie role Admin or Moderator', res)
    next()
}