const newsApiProvider = require('../providers/newsApiProvider');
var expect = require('chai').expect;
describe('newsApiProviders', function() {
  describe('#getAllTopArticles()', function() {
    it('should retrieve an object when the function is used', function() {
        const promiseNews = newsApiProvider.getAllTopArticles();
        promiseNews.then(response => {
          expect(response).to.be.an('Object');  
        })
    });
  });
});
