// let's get all required element

const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span") ;

form.onsubmit = (e)=>{
    e.preventDefault();   // preventing form from submitting 
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block" ;

    let xhr = new XMLHttpRequest() ; // creating new XML object
    xhr.open("POST","message.php",true) ;   // sending post request to message.php
    xhr.onload = () => {    // once ajax loaded 
         if(xhr.readyState == 4 && xhr.status == 200){  // if ajax response is 200 and ready state is 4 there is not any error
             let response = xhr.response ;    // storing ajax response in a response variable
             // If response is an error like enter valid email address then we shall change status color to red else reset the form
             if(response.indexOf("email and message field is required") != -1 || response.indexOf("Enter a valid email address!") || response.indexOf("Sorry,failed to send your message!") ){
                 statusTxt.style.color = "red";
             }else{ 
                 form.reset() ;
                 setTimeout(()=>{
                    statusTxt.style.display = "none" ;
                 },3000) ;    // hide the statusTxt after 3 seconds if the msg is sent 
             }
             statusTxt.innerText = response ;
          }
     }
    let formData = new FormData(form) ;  // creating new form data object. this object is used to send form data
    xhr.send(formData) ; 
}