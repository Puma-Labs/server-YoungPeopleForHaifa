const axios = require('axios')

module.exports = async (value) => {
    const API_KEY = __CONFIG.google_api_key
    const COUNTRY_SHORT = __CONFIG.country.short
    let url =
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}${ COUNTRY_SHORT ? '&components=country:' + COUNTRY_SHORT : '' }&conponents=type:address&input=${value}`;
    const res = await axios.get(encodeURI(url))
    let predictions = res.data.predictions

    return predictions.map((item) => {
        const structured_formatting = item.structured_formatting
        const main_text = structured_formatting.main_text ? structured_formatting.main_text : ''
        const secondary_text = structured_formatting.secondary_text ? structured_formatting.secondary_text : ''
        return  {main_text, secondary_text}
    })
}
