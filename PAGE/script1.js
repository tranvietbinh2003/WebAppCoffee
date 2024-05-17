let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let box_container = document.getElementById('container')

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    allowSlideNext: true,
    allowSlidePrev: true,
    autoplay: {
        delay: 2600,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

function register(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var user = {
      username : username,
      email : email,
      password : password
  }

  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  alert("Dang ky thanh cong")
  window.location.href="http://127.0.0.1:5501/index.html"
}
function login(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = localStorage.getItem(username);
  var data = JSON.parse(user);
  if (user == null){
      alert("Vui long nhap Username va Password")
  }else if(username == data.username && password == data.password){
      window.location.href="index.html"
  }else{
      alert("UserName hoac mat khau khong dung")
  }
}
function setcookie(){
  var u = document.getElementById("username").value;
  var p = document.getElementById("password").value;

  document.cookie="myusrname="+u+";path=http://127.0.0.1:5501/";
  document.cookie="mypswrd="+p+";path=http://127.0.0.1:5501/";

}
function getcookiedata(){
  var user = getCookie("myusrname");
  var pswrd = getCookie("mypswrd");

  document.getElementById("username").value= user;
  document.getElementById("password").value= pswrd;
}

function getCookie(cname){
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i =0; i <ca.length; i++){
      var c = ca[i];
      while (c.charAt(0) == ''){
          c = c.substring(1);  
      }
      if (c.indexOf(name) == 0){
          return c.substring(name.length, c.length);
      }
  }
  return "";
}