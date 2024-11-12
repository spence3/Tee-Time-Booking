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

//SLEEPY RIDGE
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

//TIMP
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

//SPANISH FORK OAKS
app.get('/api/v1/oaks', (req, res) => {
    axios.get(`https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${month}-12-${year}&holes=all&players=0&booking_class=10949&schedule_id=8633&schedule_ids%5B%5D=8633&specials_only=0&api_key=no_limits`)
        .then((response) => {
            res.json(response.data) // Just send the raw data for now
        })
        .catch((error) => {
            console.error('Error fetching booking data:', error)
            res.status(500).json({ error: 'Failed to fetch booking data' })
        })
})

//SOLDIER HOLLOW
app.get('/api/v1/soldier-hollow', (req, res) => {
    axios.get("https://phx-api-be-east-1b.kenna.io/v2/tee-times?date=2024-11-12&facilityIds=17072,17073", {
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
        teeTimes = response.data[1].teetimes //Accessing teetime data
        //format datetime function
        intlDateObj = new Intl.DateTimeFormat('en-US', {
            timeZone: "America/New_York",
            hour: '2-digit',
            minute: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false
          });

        const teeData = teeTimes.map((element) =>{
            //format the date string
            var date = new Date(element.teetime)
            var formatDate = intlDateObj.format(date)

            var index = formatDate.indexOf(",")
            var justTime = formatDate.slice(index + 2)

            //Only get the date
            formatDate = formatDate.replace(',', '')
            var justDate = formatDate.split(' ')[0]
            justDate = justDate.split('/')
            justDate = `${justDate[2]}-${justDate[0]}-${justDate[1]}`

            //Only get the new date
            var newDate = `${justDate} ${justTime}`

            return{
                time: newDate,
                minimum_players: element.minPlayers,
                maximum_players_per_booking: element.maxPlayers,
                holes: element.rates[0].holes,
                available_spots: element.maxPlayers
            }
        })
        res.json(teeData)
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error)
        res.status(500).json({ error: 'Failed to fetch booking data' })
    })
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})