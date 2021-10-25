export function addProductsToLs(productData) {
    const lsProducts = getProductsFromLs();
    localStorage.setItem('product',
        JSON.stringify([...lsProducts, productData]));
}

export function addToItemCountInLs(index) {
    const lsProducts = getProductsFromLs();
    lsProducts[index].item_count += 1;
    localStorage.setItem('product',
    JSON.stringify([...lsProducts]));
}

export function subFromItemCountInLs(index) {
    const lsProducts = getProductsFromLs();
    if (lsProducts.length !== 0) {
        lsProducts[index].item_count -= 1;
    }
    localStorage.setItem('product',
    JSON.stringify([...lsProducts]));
}

export function removeProductsFromLs(productData) {
    const lsProducts = getProductsFromLs();
    localStorage.setItem('product', JSON.stringify(
        lsProducts.filter(product => product.id !== productData.id)
    ));
}

export function getProductsFromLs() {
    const lsProducts = JSON.parse(localStorage.getItem('product'));
    return localStorage.getItem('product') !== null ? lsProducts : [];
}