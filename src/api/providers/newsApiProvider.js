const request = require('request');
const baseUrl = "https://newsapi.org/v2/top-headlines";

// Query to complete baseUrl
const query = {
  apiKey : "954356c3ce6d425ba687573887e85c54",
  country : "us",
  category : "technology"

} 

// Retrun function is a json 
exports.getAllTopArticles = function(){
  return new Promise((resolve, reject) => {
    request({url:baseUrl,qs:query}, (error, response, body) => {
      try {
      let topArticles = JSON.parse(body);
      //resolve = succes
      resolve(topArticles);

      } catch (e) {
        reject(false);
      }
    })
  });
}

// r
exports.getOneTopArticles = function(){
  return new Promise((resolve, reject) => {
    request({url:baseUrl,qs:query,pageSize:100}, (error, response, body) => {
      try {
      let topArticles = JSON.parse(body);
      
      let randomValue = Math.floor(Math.random() * 100);
//console.log(randomValue);
      resolve(topArticles.articles[randomValue]);
      } catch (e) {
        reject(false);
      }
    })
  });
}

