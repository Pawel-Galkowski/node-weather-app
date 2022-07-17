const express = require('express');
const path = require("path");
const app = express();

const weatherData = require('./utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, './public')

app.set('view engine', 'ejs');
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index')
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(req.query.address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404')
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})