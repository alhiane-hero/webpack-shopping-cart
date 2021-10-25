// import modules:
const hideCartFunc = () =>
    import(/* webpackChunkName: "utilities" */"./utilities.js");
const showCartItemsFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");
const NumberOfItemsFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");
const totalPriceFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");
const removeProductsFromLsFunc = () => 
    import(/* webpackChunkName: "storage" */"./storage.js");
const addToItemCountInLsFunc = () => 
    import(/* webpackChunkName: "storage" */"./storage.js");
const subFromItemCountInLsFunc = () => 
    import(/* webpackChunkName: "storage" */"./storage.js");

// dom elements:
const cart_items = document.getElementById('cart_items');
const overlayEl = document.getElementById('cart_overlay');
const cartEl = document.getElementById('cart');
const close_cart_icon = document.getElementById('close_cart_icon');
const navbar_cart_temp = document.querySelector('.navbar-cart_temp');
const total_price_el = document.getElementById('total_price_el');

// create cart item:
export function createCartItem(productData, index) {
    const cart_item = document.createElement('div');
    cart_item.className = 'cart_item _row';
    const {image, title, price, item_count} = productData;
    const itemStr = `
        <div class="cart_info d-flex align-items-center">
            <div class="cart_item_img">
                <img class='img-fluid'
                    src=${image}
                    alt=${title}>
            </div>
            <div class="cart_item_text">
                <h3 class="item_title">${title}</h3>
                <span class="item_price">$${price}</span>
                <button class="remove_item_btn">remove</button>
            </div>
        </div>
        <div class="cart_count">
            <div class="arrow arrow_up">
                <img src="img/chevron-up-icon.svg" alt="chevron up icon">
            </div>
            <p class="item_count">${item_count}</p>
            <div class="arrow arrow_down">
                <img src="img/chevron-down-icon.svg" alt="chevron down icon">
            </div>
        </div>
    `;
    cart_item.innerHTML = itemStr;

    const remove_item_btn = cart_item.querySelector('.remove_item_btn');
    remove_item_btn.addEventListener('click', _ => {
        removeProductsFromLsFunc().then(({removeProductsFromLs}) => {
            removeProductsFromLs(productData);
            NumberOfItemsFunc().then(({NumberOfItems}) => {
                NumberOfItems(navbar_cart_temp);
            });
            totalPriceFunc().then(({totalPrice}) => {
                totalPrice(total_price_el);
            });
            showCartItemsFunc().then(({showCartItems}) => {
                showCartItems();
            });
        });
    });

    const cart_count_btns = cart_item.querySelectorAll('.arrow');
    cart_count_btns.forEach(arrow => {
        arrow.addEventListener('click', _ => {
            if (arrow.classList.contains('arrow_up')) {
                addToItemCountInLsFunc().then(({addToItemCountInLs}) => {
                    addToItemCountInLs(index);
                });
                showCartItemsFunc().then(({showCartItems}) => {
                    showCartItems();
                }); 
            } 
            else {
                if (productData.item_count === 1) {
                    removeProductsFromLsFunc().then(({removeProductsFromLs}) => {
                        removeProductsFromLs(productData);
                    });
                    showCartItemsFunc().then(({showCartItems}) => {
                        showCartItems();
                    });
                    // reset price and item_count:
                    navbar_cart_temp.innerHTML = `Cart( ${0} )`;
                    total_price_el.innerHTML = `$00.00`;
                    hideCartFunc().then(({hideCart}) => {
                        hideCart(overlayEl, cartEl);
                    });
                } else {
                    subFromItemCountInLsFunc().then(({subFromItemCountInLs}) => {
                        subFromItemCountInLs(index);
                    });
                    showCartItemsFunc().then(({showCartItems}) => {
                        showCartItems();
                    });
                }
            }
        }); 
    });

    NumberOfItemsFunc().then(({NumberOfItems}) => {
        NumberOfItems(navbar_cart_temp);
    });

    totalPriceFunc().then(({totalPrice}) => {
        totalPrice(total_price_el);
    });

    cart_items.appendChild(cart_item);
}

// close products cart:
close_cart_icon.addEventListener('click', _ => {
    hideCartFunc().then(({hideCart}) => {
        hideCart(overlayEl, cartEl);
    });
});

document.body.addEventListener('click', event => {
    if (event.target.classList.contains('cart_overlay')
    || event.target.classList.contains('remove_item_btn')) {
        hideCartFunc().then(({hideCart}) => {
            hideCart(overlayEl, cartEl);
        });
    }
});