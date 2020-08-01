const express = require('express');
const path = require('path');
const axios = require('axios');
const exphbs = require('express-handlebars');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use( express.static(path.join(__dirname, 'public')) );

// configuring Handlebars for Express
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
// end of configuration

app.get('/', (request, response) => {
    response.render('home', {
        title: 'Homepage'
    });
});

app.get('/invitados', async (request, response) => {
    const invitadosReq = await axios.get('https://jsonplaceholder.typicode.com/users');
    response.render('invitados', {
        title: 'Invitados',
        dataInvitados: invitadosReq.data
    });
});

app.get('/invitados/:id', async (request, response) => {
    const { id } = request.params;
    const invitadoReq = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    response.render('invitado', {
        title: `Invitado ${ invitadoReq.data.name }`,
        dataInvitado: invitadoReq.data
    });
});

app.get('/acerca', (request, response) => {
    response.render('acerca', {
        title: 'Acerca de',
        autor: 'John Doe'
    });
});

app.listen( port, () => { console.log( `Servidor funcionando por ${ port }` ) } );