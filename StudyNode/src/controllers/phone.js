import * as services from "../services";
import { interalServerError, badRequest } from "../middlewares/handle_errors";
import { title,image,category_code,price,available,phoneid,description,phoneids,filename} from "../helpers/joi_schema";
import joi from 'joi'
const cloudinary = require('cloudinary').v2;

export const getPhones = async (req, res) => {
    try {
        const response = await services.getPhones(req.query)
        return res.status(200).json(response)    
   
    } catch (error) {
        return interalServerError(res)
        
    }  
    
}
export const getPhoneDetail = async (req, res) => {
    try {
        const response = await services.getPhoneDetail(req.params.id)
        return res.status(200).json(response)    
   
    } catch (error) {
        return interalServerError(res)
        
    }  
    
}
//CREATE
export const creatNewPhones = async (req, res) => {
    // console.log(req.body)
    try {
        const fileData = req.file 
        const { error } = joi.object({title, image, category_code, price, available,description }).validate({...req.body,image:fileData?.path})
        if (error) {
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message,res)
        }
        const response = await services.creatNewPhones(req.body,fileData)
        return res.status(200).json(response)    
   
    } catch (error) {
        return interalServerError(res)
        
    }  
    
}

//UPDATE
export const updatePhones = async (req, res) => {
    // 
    try {
        // console.log(req.user)// user đc mã hóa 
        const fileData = req.file 
        const { error } = joi.object({ phoneid}).validate({phoneid: req.body.phoneid})
        console.log(error);
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message,res)
        }
        const response = await services.updatePhones(req.body,fileData)
        return res.status(200).json(response)    
   
    } catch (error) {
        return interalServerError(res)
        
    }  
    
}

//DELETE
export const deletePhones = async (req, res) => {
    // 
    try {
        const { error } = joi.object({ phoneids, filename}).validate(req.query)
        if (error) {
            return badRequest(error.details[0].message,res)
        }
        const response = await services.deletePhones(req.query.phoneids,req.query.filename)
        return res.status(200).json(response)    
   
    } catch (error) {
        return interalServerError(res)
        
    }  
    
}

