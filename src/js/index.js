// import modules:
const showCartItemsFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");

// import assets:
import 'bootstrap/scss/bootstrap-grid.scss';
import "../sass/app.scss";

// show cart items:
showCartItemsFunc().then(({showCartItems}) => {
    showCartItems();
}); 