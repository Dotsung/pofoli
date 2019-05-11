import express from 'express';
import bodyparser from 'body-parser';


const app = express();

app.get('/', (req,res) => {
    return res.send('Hi');
});

const server = app.listen(4000, () => {
    console.log('express listening on port 4000');
});