const getProductsModule = () =>
    import(/* webpackChunkName: "get_products" */"./get_products.js");
const checkLsFunc = () => 
    import(/* webpackChunkName: "utilities" */"./utilities.js");

const rowEl = document.getElementById('row');
const getProducts = getProductsModule();

getProducts.then(({getProducts}) => {
    getProducts().map(productData => {
        const {image, title, cate, price} = productData;
        const product_container = document.createElement('div');
        product_container.classList = `
            col-lg-4 col-sm-6 mb-5
        `;
        const productStr = `
        <div class="product_item"
        style="transform: translateY(${1 * (productData.id * 20)}px);">
            <div class="product_img">
                <img class='img-fluid' 
                src=${image} 
                alt=${title} >
                <div class='btn_overlay'>
                    <button class="add_to_cart_btn">Browse Cart</button>
                </div>
            </div>
            <div class="product_info d-flex justify-content-between">
                <div class="product_text">
                    <h3 class="product_title">
                        ${title}
                    </h3>
                    <p class="product_cate">
                        ${cate}
                    </p>
                </div>
                <div class="product_price">
                    <span class="price">
                        $${price}
                    </span>
                </div>
            </div>
        </div>
        `;
        product_container.innerHTML += productStr;

        const add_to_cart_btn = product_container.querySelector('.add_to_cart_btn');
        add_to_cart_btn.addEventListener('click', _ => {
            checkLsFunc().then(({checkLs}) => {
                checkLs(productData);
            });
        });

        rowEl.appendChild(product_container);
    });
});