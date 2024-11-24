const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
    const data = {
        message: 'Hello from the API call'
    };
    res.json(data);
})


app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})