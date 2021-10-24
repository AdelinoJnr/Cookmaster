const app = require('./app');

const { PORT } = require('../database');

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
