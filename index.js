const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()


const [year, month, day] = new Date().toISOString().split('T')[0].split('-');
console.log(year, month, day); // Output: 'yyyy', 'mm', 'dd'


app.get('/', (req, res) => {
    res.json('welcom to my golf booking')
})

app.get('/book', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-${day}-${year}&holes=all&players=0&booking_class=3412&schedule_id=1726&schedule_ids%5B%5D=1726&specials_only=0&api_key=no_limits`)
        .then((response) => {
            console.log(response.data); // Log the entire response data
            // Check if it's JSON or HTML
            res.json(response.data); // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error);
            res.status(500).json({ error: 'Failed to fetch booking data' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})