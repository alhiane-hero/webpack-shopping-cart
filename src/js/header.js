// import modules:
const showCartFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");

// import imgs:
import Logo from '../img/Logo.svg';
import ShoppingBag from '../img/shopping-bag.svg';

const headerEl = document.getElementById('header');
const headerContainer = document.createElement('div');
headerContainer.className = 'container';
let header_str = `
    <div class="_row">
        <a href="#" class="logo">
            <img src=${Logo} alt='logo'>
        </a>
        <div class="navbar_cart d-flex align-items-center">
            <img src=${ShoppingBag} alt='shopping bag icon'>
            <span class="navbar-cart_temp">Cart( 0 )</span>
        </div>
    </div>
`;
headerContainer.innerHTML = header_str;

headerEl.appendChild(headerContainer);

const navbar_cart_btn = headerEl.querySelector('.navbar_cart');
const overlayEl = document.getElementById('cart_overlay');
const cartEl = document.getElementById('cart');

navbar_cart_btn.addEventListener('click', _ => {
    showCartFunc().then(({showCart}) => {
        showCart(overlayEl, cartEl);
    });
});