const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
app.use(express.static('public'));
//paths to folders
const path = require('path')

//cors
const cors = require('cors');
app.use(cors()); // Allow cross-origin requests

//set up static folder
app.use(express.static(path.join(__dirname,'public')))

//organize date
const [year, month, day] = new Date().toISOString().split('T')[0].split('-');
console.log(year, month, day)

app.get('/api/v1/sleepy', (req, res) => {
    
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-${day}-${year}&holes=all&players=0&booking_class=3412&schedule_id=1726&schedule_ids%5B%5D=1726&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data); // Return the data back to the client
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error);
            res.status(500).json({ error: 'Failed to fetch booking data' });
        });
});

app.get('/api/v1/timp', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-${day}-${year}&holes=all&players=0&booking_class=14927&schedule_id=49&schedule_ids%5B%5D=49&schedule_ids%5B%5D=1973&schedule_ids%5B%5D=7542&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data); // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error);
            res.status(500).json({ error: 'Failed to fetch booking data' });
        });
});

app.get('/api/v1/oaks', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-${day}-${year}&holes=all&players=0&booking_class=10949&schedule_id=8633&schedule_ids%5B%5D=8633&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data); // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error);
            res.status(500).json({ error: 'Failed to fetch booking data' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

//https://foreupsoftware.com/index.php/api/booking/times?time=all&date=11-07-2024&holes=all&players=0&booking_class=10949&schedule_id=8633&schedule_ids%5B%5D=8633&specials_only=0&api_key=no_limits