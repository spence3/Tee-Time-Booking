const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
app.use(express.static('public'))
const path = require('path')

//cors
const cors = require('cors')
app.use(cors())

//set up static folder
app.use(express.static(path.join(__dirname,'public')))

//organize date
const [year, month, day] = new Date().toISOString().split('T')[0].split('-')
console.log(year, month, day)

app.get('/api/v1/sleepy', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-10-${year}&holes=all&players=0&booking_class=3412&schedule_id=1726&schedule_ids%5B%5D=1726&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data) // Return the data back to the client
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error)
            res.status(500).json({ error: 'Failed to fetch booking data' })
        })
})

app.get('/api/v1/timp', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-10-${year}&holes=all&players=0&booking_class=14927&schedule_id=49&schedule_ids%5B%5D=49&schedule_ids%5B%5D=1973&schedule_ids%5B%5D=7542&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data) // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error)
            res.status(500).json({ error: 'Failed to fetch booking data' })
        })
})

app.get('/api/v1/oaks', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-10-${year}&holes=all&players=0&booking_class=10949&schedule_id=8633&schedule_ids%5B%5D=8633&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data) // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error)
            res.status(500).json({ error: 'Failed to fetch booking data' })
        })
})

app.get('/api/v1/soldier-hollow', (req, res) => {
    console.log('made it hear')
    axios.get("https://phx-api-be-east-1b.kenna.io/v2/tee-times?date=2024-11-11&facilityIds=17072,17073", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,enq=0.9",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\"v=\"130\", \"Google Chrome\"v=\"130\", \"Not?A_Brand\"v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-be-alias": "aspira-management-company",
          "Referer": "https://aspira-management-company.book-v2.teeitup.golf/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      })
      .then((response) => {
        data = {
            time: response.data[1].teetimes.teetime,
            minimum_players: response.data[1].teetimes.minPlayers,
            maximum_players_per_booking: response.data[1].teetimes.maxPlayers,
            // holse: response.data[1].teetimes
        }
        res.json(response.data[1].teetimes)
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error)
        res.status(500).json({ error: 'Failed to fetch booking data' })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})