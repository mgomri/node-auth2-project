const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');

server.use(express.json());
server.use('/auth', authRouter);
server.use('/users', userRouter);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})