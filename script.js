const axios = require('axios');
const fs = require('fs');

(async function () {
    const arcades = (await axios.get(process.env.ARCADE_LIST_URL)).data.map(a => a.id)

    for (const arcade of arcades) {
        const url = process.env.DATA_URL + arcade;
        fs.mkdirSync('dist', { recursive: true });
        const filePath = `dist/${arcade}.json`;

        if (!url) {
            throw new Error('Environment variable DATA_URL is not set');
        }

        const nowTime = Date.now();

        try {
            const response = await axios.get(url);
            fs.writeFileSync(filePath, JSON.stringify({ alias: response.data, last_update: nowTime }, null, 2));
            console.log(`Data saved to ${filePath}`);
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    }
})()