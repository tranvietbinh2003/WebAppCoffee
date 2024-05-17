import db from '../models'
import data from '../../data/data.json'
import { generateCode } from '../helpers/fn'


export const insertData = () => new Promise( async (resolve, reject) => {
    try {
        const categories = Object.keys(data)
        categories.forEach(async (item) => {
            await db.Category.create({
                code: generateCode(item),
                value: item
            })
        })
        // [key, [1, 3,4,]]
        const dataArr = Object.entries(data)
        dataArr.forEach((item) => {
            item[1]?.map(async (phone) => {
                await db.Phone.create({
                    id: phone.upc,
                    title: phone.phoneTitle,
                    price: +phone.phonePrice,
                    available: +phone.available,
                    image: phone.imageUrl,
                    description: phone.phoneDescription,
                    category_code: generateCode(item[0])
                })
            })
        })
       resolve('OK')
    } catch (error) {
        reject(error)
    }
}) 