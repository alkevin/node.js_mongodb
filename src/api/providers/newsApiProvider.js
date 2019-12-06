const request = require('request');
const baseUrl = "https://newsapi.org/v2/top-headlines";

// comment
const apiKey = "954356c3ce6d425ba687573887e85c54";
const country = "us";
const category = "technology";

//function
exports.getTopArticles = function(){
  return new Promise((resolve, reject) => {
    request(baseUrl + apiKey + country + category, (error, response, body) => {
      try {
      body = JSON.parse(body);
      let topArticles = body.results[0].name.last;
      resolve(topArticles);
      } catch (e) {
        console.log(e);
        console.log(error);
        reject(false);
      }
    })
  });
}
