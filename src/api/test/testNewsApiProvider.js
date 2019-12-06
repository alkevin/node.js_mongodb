const newsApiProvider = require('../providers/newsApiProvider');
var expect = require('chai').expect;
describe('newsApiProviders', function() {
  describe('#getTopArticles()', function() {
    it('should retrieve an object when the function is used', function() {
        const promiseNews = newsApiProvider.getTopArticles();
        promiseNews.then(response => {
          expect(response).to.be.an('Object');  
        })
    });
  });
});
