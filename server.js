const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());


/**Root page */
app.get('/', (req, res) => {

    // Template for simple get request.
    res.send('Hello World!')
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});