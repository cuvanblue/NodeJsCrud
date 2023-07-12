require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webroute = require('./routes/web');
const apiroute = require('./routes/api');
const app = express();
const port = process.env.PORT || 3010;
const host_name = process.env.HOST_NAME;
const morgan = require('morgan');
configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

app.use('/', webroute);
app.use('/api/v1/', apiroute);
app.use((req, res) => {
    return res.send("404 Not Found!");
})

app.listen(port, host_name, () => {
    console.log(`Example app listening on port ${port}`)
})