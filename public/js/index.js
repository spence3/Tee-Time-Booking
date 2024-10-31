const fs = require('fs');
const axios = require('axios');

const teeTimeAPI = '/api/v1/teetimes'

$(function(){
    function getTeeTimes(){
        axios
        .get(teeTimeAPI)
        .then((response) => {
            const time = response.time
            console.log(time)
        })
    }


})