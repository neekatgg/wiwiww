// chatbot.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// Ruta principal
app.get('/', async (req, res) => {
    // Obtiene la información de la página web
    const webpageData = await getWebpageData('https://informes.certus.edu.pe/carreras/conoce-certus/?utm_source=google&utm_medium=search&utm_campaign=certus-pg-performance-sedes-abierta-cpl-brand_generico-20230904&utm_content=brand-609240199158-{{ad.id}}-sedes%20certus&utm_term=d51c3d64-76be-ea11-a975-df07e0e40c6d&gad_source=1&gclid=CjwKCAiApuCrBhAuEiwA8VJ6JhofkjyB-3li5_el29NWgUwTnBSd1WF9ljh0jaWow9M5YB0iTGJ8_hoC0oAQAvD_BwE');

    // Responde con la información obtenida
    res.send(webpageData);
});

// Función para obtener información de la página web
async function getWebpageData(url) {
    try {
        // Realiza una solicitud HTTP a la página web
        const response = await axios.get(url);

        // Utiliza Cheerio para analizar el HTML de la página
        const $ = cheerio.load(response.data);

        // Extrae la información que necesitas
        const pageTitle = $('title').text();

        // Puedes agregar más lógica para extraer más información aquí

        // Retorna la información
        return `Título de la página: ${pageTitle}`;
    } catch (error) {
        console.error('Error al obtener datos de la página web:', error.message);
        return 'Ocurrió un error al obtener la información de la página web.';
    }
}

// Inicia el servidor
console.log('Iniciando el servidor...');
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

