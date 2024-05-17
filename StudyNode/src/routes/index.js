import user from './user'
import auth from './auth'
import insert from './insert'
import phone from './phone'
import { notFound } from '../middlewares/handle_errors'
const initRoutes = (app) => {
 
    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/insert',insert)
    app.use('/api/v1/phone', phone)


    app.use(notFound)

}

module.exports = initRoutes