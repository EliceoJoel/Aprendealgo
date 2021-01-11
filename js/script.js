/****************** VARIABLES ********************* */
let isShowCart = false;
const cart = document.getElementById("cart");
const buttonCart = document.querySelector(".cart-icon");
const addCartButton = document.querySelectorAll(".add-cart-button");
const coursesInCart = document.querySelector(".courses-in-cart");
const clearCartButton = document.querySelector(".button-clear-cart");
const deleteCourseButton = document.querySelector(".pop-course");


/*************** EVENT LISTENERS **************** */
document.addEventListener("DOMContentLoaded", loadCoursesFromLocalStorage);

buttonCart.addEventListener("click", showCart);

addCartButton.forEach(button=>{
   button.addEventListener("click", addToCart);
})

clearCartButton.addEventListener("click", clearCart);

coursesInCart.addEventListener("click", (e)=>{
   if(e.target.className === "fas fa-trash" ){
      removeCourseFromCart(e);
   }
})


/************** FUNCTIONS ****************** */

function loadCoursesFromLocalStorage(e){
   let courses = obtainCoursesLocalStorage()
   courses.forEach(course => {
      coursesInCart.innerHTML += 
      `<tr>
         <td><img src="${course.image}" alt="${course.name}"></td>
         <td>${course.name}</td>
         <td>${course.price}</td>
         <td>
            <button class="pop-course">
               <i class="fas fa-trash"></i>
            </button>
         </td>
      </tr>`
   });
}



function showCart(e){
   e.preventDefault();
   if(isShowCart){
      isShowCart = false;
      cart.style.display = "none";
   }else{
      isShowCart = true;
      cart.style.display = "block";
   }
}

function addToCart(e){
   e.preventDefault();
   //obtain information of the selected course
   let image = e.target.parentElement.parentElement.previousElementSibling;
   let name = e.target.parentElement.parentElement.firstElementChild.firstElementChild;
   let price = e.target.nextElementSibling.lastElementChild.firstElementChild;

   if(!courseIsInCart(name)){
      //add to cart in DOM
      addToDom(image, name, price);
      //Add to cart in LocalStorage
      addToLocalStorage(image, name, price);
   }else{
      alert("That course has already been added");
   }
}

function courseIsInCart(name){
   let res = false
   let courses = obtainCoursesLocalStorage();
   courses.forEach(course=>{
      if(course.name === name.textContent){ res=true; }
   })
   return res;
}

function addToDom(image, name, price){
   let newCourse = `<tr>
                      <td><img src="${image.src}" alt="${name.textContent}"></td>
                      <td>${name.textContent}</td>
                      <td>${price.textContent}</td>
                      <td>
                         <button class="pop-course">
                            <i class="fas fa-trash"></i>
                         </button>
                      </td>
                   </tr>`
   coursesInCart.innerHTML += newCourse;
}

function addToLocalStorage(image, name, price){
   let courses = obtainCoursesLocalStorage();
   courses.push({image: image.src, name: name.textContent, price: price.textContent});
   localStorage.setItem("courses", JSON.stringify(courses));
}

function obtainCoursesLocalStorage(){
   let courses;
   if(localStorage.getItem("courses") === null){
      courses = [];
   }else{
      courses = JSON.parse(localStorage.getItem("courses"));
   }
   return courses;
}

function clearCart(e){
   e.preventDefault();
   //clear in DOM
   e.target.parentElement.previousElementSibling
   .lastElementChild.innerHTML = " <!-- Courses added here -->";

   //Clear in LocalStorage
   localStorage.clear();
}

function removeCourseFromCart(e){
   e.preventDefault();
   let course = e.target.parentElement.parentElement.parentElement;
   let courses = obtainCoursesLocalStorage();

   //removeFromDOM
   course.remove();

   //remove from LocalStorage
   let courseName = e.target.parentElement.parentElement
   .previousElementSibling.previousElementSibling;

   courses = courses.filter(course=>{
      return course.name != courseName.textContent;
   });

   localStorage.clear();
   localStorage.setItem("courses", JSON.stringify(courses))

}

