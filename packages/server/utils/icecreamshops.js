const axios = require("axios");

const BUSINESS_SEARCH_URL = "https://api.yelp.com/v3/businesses/search";

// TODO: move api key to .env file, and hide it
const API_KEY =
  "p7e5hvsTxDS3U8-fPTsO0tMwnMFM_VgO5UKt4g3lMlDyH7QgbnE-LLvKscfLho53rp-jXjpX8VLXFaAl8q9KJj82DifBAKqJlB6p3k_BxwT1cHDA3uzIdcPR936PXnYx";

const topFiveIceCreamShops = async () => axios({
  url: BUSINESS_SEARCH_URL,
  method: "get",
  headers: {
    Authorization: `Bearer ${API_KEY}`
  },
  params: {
    term: "ice cream",
    location: "alpharetta, ga",
    limit: 5,
    sort_by: 'rating'
  },
});

module.exports.topFiveIceCreamShops = topFiveIceCreamShops
