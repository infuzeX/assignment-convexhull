const express = require("express");
const router = express.Router();
const Product = require('../../models/Product');
const response = require('../../lib/response');


//add Product 
router.post('/', (req, res) => {
    new Product(req.body).save()
        .then(product => response(true, product, res))
        .catch(err => response(false, err, res));
})

//get all prrroducts
router.get('/', (req, res) => {
    Product.find()
        .then(products => response(true, products, res))
        .catch(err => response(false, err, res))
})


//delete Product
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id })
        .then(product => response(true, product._id, res))
        .catch(err => response(false, err, res))
})

module.exports = router
