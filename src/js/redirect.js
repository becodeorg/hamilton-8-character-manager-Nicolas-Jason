import '../scss/style.scss';
let url = window.location.href

function redirectingPage(){
    location.replace('/index.html');
}

setTimeout(redirectingPage, 3000);