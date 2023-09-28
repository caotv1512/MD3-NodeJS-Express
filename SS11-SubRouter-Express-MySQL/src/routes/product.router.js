const express = require('express');
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    res.render('product', { title: 'hihi' });
})
productRouter.get('/:productId', (req, res) => {
    const id = req.params.productId;
    res.send('GET product with productId: ' + id);
})

productRouter.post('/', (req, res) => {
    res.send('Hello Post product');
})

productRouter.put('/:productId', (req, res) => {
    const id = req.params.productId;
    res.send('Updating product with productId: ' + id);
})
productRouter.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    res.send('Delete product with productId: ' + id);
})

module.exports = productRouter;