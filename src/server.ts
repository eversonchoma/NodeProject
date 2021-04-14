import express from 'express';
import routes from './routes/index';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    return res.json({ message: ' hello world rodando no pc da firma'});
});

app.listen(3333, () => {
    console.log('bola em jogo ⚽ servido na porta 3333');
});