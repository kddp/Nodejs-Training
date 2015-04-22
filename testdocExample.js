/**
 * @class Item
 * @constructor
 * @param name {String} Item name
 * @param price {Number} Item price
 * @param quantity {Number} Item quantity (the number available to buy)
 */
 
Store.Item = function (name, price, quantity) {
    /**
     * @property name
     * @type String
     */
    this.name = name;
    /**
     * @property price
     * @type String
     */
    this.price = price * 100;
    /**
     * @property quantity
     * @type Number
     */
    this.quantity = quantity;
    /**
     * @property id
     * @type Number
     */
    this.id = Store.Item._id++;
    Store.Item.list[this.id] = this;
};

/**
 * @class Cart
 * @constructor
 * @param name {String} Customer name
 */
 
Store.Cart = function (name) {
    /**
     * @property name
     * @type String
     */
    this.name = name;
    /**
     * @property items
     * @type Object
     * @default {}
     */
    this.items = {};
};

/**
 * @method total
 * @return {Number} tax-included total value of cart contents
 */
 
Store.Cart.prototype.total = function () {
    var subtotal, id;
    subtotal = 0;
    for (id in this.items) {
        if(this.items.hasOwnProperty(id)) {
            subtotal += Store.Item.list[id].price * this.items[id];
        }
    }
    return parseFloat(((subtotal * (1 + Store.TAX_RATE / 100)) / 100).toFixed(2));
};