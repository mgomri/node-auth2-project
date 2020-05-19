const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})