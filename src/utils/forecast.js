'use strict';

// Modules
import fetch from 'node-fetch';
import key from '../api-key.json' assert {type: 'json'};

const forecast = async (address, callback) => {
    try {
        const response = await fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${address}&format=json&u=c&rapidapi-key=44ecf4522emsh48f75419e76afd8p193823jsn951ccde94696`);
        const data = await response.json();

        if (!data.location) {
            callback('Unable to get location. Try another search.')
        } else {
            const { location: { city, region, country }, current_observation: { condition } } = data;
            callback({
                forecast: `Today will be ${condition.text.toLowerCase()}. It is currently ${condition.temperature} degrees celcius out.`, 
                location: city + ', ' + region + ', ' + country
            })
        }
    } catch(e) {
        callback('Check for typo in url, and your connection.')
    }
}

export { forecast };