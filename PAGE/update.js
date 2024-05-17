let form_update = document.getElementById('update_form')
let title = document.getElementById('update_Title')
let price = document.getElementById('update_Price')
let available = document.getElementById('update_available')
let decription = document.getElementById('update_decription')
let category = document.getElementById('update_category')
let image = document.getElementById('update_image')
let test = document.getElementById('test')

test.addEventListener('click',()=>{
    alert('hkdjfdk')
})
console.log(form_update)

form_update.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('sdfsd')
    let formData = new FormData()
        formData.append('image',image.files[0])
        formData.append('title',title.value)
        formData.append('price',price.value)
        formData.append('available',available.value)
        formData.append('description',decription.value)
        formData.append('category_code',category.value)
        const data =   fetch('http://localhost:5000/api/v1/phone/',{
                    method:'POST',
                    headers:{
                        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlX2NvZGUiOiJSMSIsImlhdCI6MTY4NTUxMTIwNCwiZXhwIjoxNjg1OTQzMjA0fQ.akasNQkS446AbHbgxlj-w3TKCTxjA197Z4KpCK2-Ndk"
                    },
                    body:
                        formData
                
                })    
                .then(Response => Response.json()).then((data)=>{
                  console.log('dafds',data)
                 
                            alert(data.mes)
                    
                    return data.user
                  
                    
                })
            })
