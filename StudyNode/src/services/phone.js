import db from '../models'
import { Op } from 'sequelize'
import {v4 as generateId} from 'uuid'
const cloudinary = require('cloudinary').v2;

//READ
export const getPhones = ({page, limit, order, name,available, ...query }) => new Promise( async(resolve, reject) => {
    try {
        const queries ={raw: true, nest: true}
        const offset = (!page || +page <= 1) ? 0 :(+page -1)
        const fLimit = +limit || +process.env.LIMIT_PHONE
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if (order) queries.order = [order]
        if (name) query.title = { [Op.substring]: name }
        if (available) query.available = { [Op.between]: available }
        const response = await db.Phone.findAndCountAll({
            where: query,
           ...queries,
           attributes: {
            exclude:['category_code',]//,'description'
           } ,
           include: [
                {model: db.Category, attributes: {exclude:['createAt', 'updateAt']}, as: 'categoryData'}
           ]
        })
      resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got': 'Cannot found phones',
            phoneData: response
        })

    } catch (error) {
        reject(error)
    }
}) 
//CREAT
export const getPhoneDetail = (id) => new Promise( async (resolve, reject) => {
    try { 
        const response = await db.Phone.findOne({
            where:{id:id},
        })
      resolve({
            err: response ? 0 : 1,
           data:response
        })
    } catch (error) {
        reject(error)
    }
}) 
export const creatNewPhones = (body, fileData) => new Promise( async (resolve, reject) => {
    try { 
        const response = await db.Phone.findOrCreate({
            where:{title: body?.title},
            defaults: {
                ...body,
                id: generateId(),
                image: fileData?.path,
                filename: fileData?.filename

            }
        })
      resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Created': 'Cannot create new phone',
        })
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
    }
}) 


//UPDATE
export const updatePhones = ({phoneid,...body}, fileData) => new Promise( async (resolve, reject) => {
    try { 
        if(fileData) body.image= fileData?.path
        const response = await db.Phone.update(body,{
            where:{id : phoneid}
        })
        
      resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? `${response[0]} phone updated` : 'Cannot update new phone/ Phones ID not found',
        })
        if (fileData && response[0] === 0) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
        reject(error)
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
    }
}) 

//DELETE
export const deletePhones = (phoneids, filename) => new Promise( async (resolve, reject) => {
    try { 
        const response = await db.Phone.destroy({
            where:{id : phoneids}
        })
        
      resolve({
            err: response > 0 ? 0 : 1,
            mes: `${response} phone(s) delete`
        })
         cloudinary.api.delete_resources(filename)
    } catch (error) {
        reject(error)
       
    }
}) 
