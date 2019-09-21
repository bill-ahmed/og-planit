const EXPRESS = require('express'); // server
const CORS = require('cors');

const APP = EXPRESS();  // our app instance
const PORT = 4000;  // Port to run the application on

// Enable CORS
APP.use(CORS());


/**Root page */
APP.get('/', (req, res) => {

    // Template for simple get request.
    res.send('Hello World!')
});


APP.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});