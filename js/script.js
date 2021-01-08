/****************** VARIABLES ********************* */
const cart = document.getElementById("cart");
const buttonCart = document.querySelector(".shopping-cart");
let isShowCart = false;

/*************** EVENT LISTENERS **************** */
buttonCart.addEventListener("click", showCart);


/************** FUNCTIONS ****************** */
function showCart(e){
   if(isShowCart){
      isShowCart = false;
      cart.style.display = "none";
   }else{
      isShowCart = true;
      cart.style.display = "block";
   }
}