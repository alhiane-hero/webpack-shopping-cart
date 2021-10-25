const json = require('./data.json');

export function getProducts() {
    return json.items;
}