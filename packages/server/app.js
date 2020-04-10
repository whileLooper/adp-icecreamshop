const topFiveIceCreamShops = require("./utils/icecreamshops");
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const BUSINESS_SEARCH_URL = "https://api.yelp.com/v3/businesses/search";
const BUSINESS_REVIEW_URL = (id) =>
  `https://api.yelp.com/v3/businesses/${id}/reviews`;

// TODO: move api key to .env file, and hide it
const API_KEY =
  "p7e5hvsTxDS3U8-fPTsO0tMwnMFM_VgO5UKt4g3lMlDyH7QgbnE-LLvKscfLho53rp-jXjpX8VLXFaAl8q9KJj82DifBAKqJlB6p3k_BxwT1cHDA3uzIdcPR936PXnYx";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/fusion-icecream", async (req, res) => {
  axios({
    url: BUSINESS_SEARCH_URL,
    method: "get",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      term: "ice cream",
      location: "alpharetta, ga",
      limit: 5,
      sort_by: "rating",
    },
  }).then(({ data }) => {
    // get business reviews base on data
    const shopsInfo = data.businesses;
    if (data) {
      const shopIdList = data.businesses.map((shop) =>
        axios({
          url: BUSINESS_REVIEW_URL(shop.id),
          method: "get",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        })
      );

      // mapping each shop's first reviews
      axios.all(shopIdList).then((allReviews) => {
        shopsInfo.forEach((e, i) => {
            shopsInfo[i]["reviews"] = allReviews[i].data.reviews[0];
        });
        res.send(shopsInfo);
      });
    } else {
      res.send(shopsInfo);
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
