// import modules:
const getProductsFromLsFunc = () => 
    import(/* webpackChunkName: "storage" */"./storage.js");
const createCartItemFunc = () => 
    import(/* webpackChunkName: "cart_structure" */"./cart.js");
const addProductsToLsFunc = () => 
    import(/* webpackChunkName: "storage" */"./storage.js");

const cart_items = document.getElementById('cart_items');
const overlayEl = document.getElementById('cart_overlay');
const cartEl = document.getElementById('cart');

export function showCart(overlayEl, cartEl) {
    overlayEl.classList.add('show');
    window.setTimeout(_ => cartEl.classList.add('show'), 0);
}

export function hideCart(overlayEl, cartEl) {
    cartEl.classList.remove('show')
    window.setTimeout(_ => overlayEl.classList.remove('show'), 300);
}

export function showCartItems() {
    // clear container:
    cart_items.innerHTML = '';
    getProductsFromLsFunc().then(({getProductsFromLs}) => {
        console.log(getProductsFromLs());
        getProductsFromLs().forEach((product, index) => {
            createCartItemFunc().then(({createCartItem}) => {
                createCartItem(product, index);
            });
        });
    }); 
}

export function checkLs(productData) {
    getProductsFromLsFunc().then(({getProductsFromLs}) => {
        const lsProducts = getProductsFromLs();
        if (lsProducts.some(product => product.id === productData.id)) {
        } else {
            addProductsToLsFunc().then(({addProductsToLs}) => {
                addProductsToLs(productData);
            });
            showCartItems();
            showCart(overlayEl, cartEl);
        }
    });
}

export function NumberOfItems(navbarCartTemp) {
    let count = 0;
    getProductsFromLsFunc().then(({getProductsFromLs}) => {
        let lsProducts = getProductsFromLs();
        if (lsProducts.length > 0) {
            lsProducts.forEach(product => {
                count += product.item_count;
                navbarCartTemp.innerHTML = `Cart( ${count} )`
            });
            count = 0;
        } else {
            navbarCartTemp.innerHTML = `Cart( ${0} )`;
        }
    });
}

export function totalPrice(total_price_el) {
    let price = 0;
    getProductsFromLsFunc().then(({getProductsFromLs}) => {
        let lsProducts = getProductsFromLs();
        if (lsProducts.length > 0) {
            lsProducts.forEach(product => {
                price += product.price * product.item_count;
                total_price_el.innerHTML = `$${price.toFixed(2)}`;
            });
            price = 0;
        } else {
            total_price_el.innerHTML = `$00.00`;
        }
    });
}