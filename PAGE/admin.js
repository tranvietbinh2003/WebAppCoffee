let card_admin = document.getElementById('card')
let image = document.getElementById('image')
let admin_title = document.getElementById('title')
let available = document.getElementById('admin_available')


console.log('fdfsfdsf',card_admin)
const data =   fetch('http://localhost:5000/api/v1/phone/',{
  method:'GET',
  })
  
.then(Response => Response.json()).then((data)=>{
  let html = ''
  data.phoneData.rows.map((item)=>{
    html = 
    html + ` <div class="card">
   
    <div class="table" id="admin_form">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="${item.image}" alt="Avatar" ></td>
                <td class="text" >${item.title}</td>
                <td >${item.available}</td>
                <td>
                  <button class="edit-btn" >Edit</button>
                  <button class="delete-btn">Delete</button>
                </td>
              </tr>`
  })
console.log('dafds',data.phoneData.rows)

       card_admin.innerHTML=html

       const editButtons = document.querySelectorAll('.edit-btn');

       editButtons.forEach(button => {
         button.addEventListener('click', function() {
           // Chuyển hướng đến trang mới khi nhấn nút "Edit"
           window.location.href = 'edit.html'; // Thay 'new_page.html' bằng đường dẫn của trang mới bạn muốn chuyển hướng đến
         });
       });
  return data.user

  
})

