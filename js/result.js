'use strict';
{
  window.onload = function(){
    let data = location.href.split("?")[0];
    let birthdays = data.split("=")[0];
    // document.getElementById("message").innerHTML = decodeURIComponent(text);
    console.log(birthdays);
  }
  
}