const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Hello User');
})
userRouter.get('/:userId', (req, res) => {
    const id = req.params.userId;
    res.send('GET User with userId: ' + id);
})

userRouter.post('/', (req, res) => {
    res.send('Hello Post User');
})

userRouter.put('/:userId', (req, res) => {
    const id = req.params.userId;
    res.send('Updating User with userId: ' + id);
})
userRouter.delete('/:userId', (req, res) => {
    const id = req.params.userId;
    res.send('Delete User with userId: ' + id);
})

module.exports = userRouter;