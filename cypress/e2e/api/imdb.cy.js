/// <reference types='cypress'/>

//const baseURL = `http://www.omdbapi.com`
const apiKey = `36f47c3f`
const movieTitle = 'The Banker'
const movieID = `tt6285944`
const validSearchValue = `Rome`
const invalidSearchValue = `Rbckdbvkwe`

describe('OMDB API Movie Information', () => {
  it('Get movie information by its title', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?t=${movieTitle}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)

      const { Title, Year, Director, Writer, imdbRating, imdbID } = response.body

      expect(Title).to.eq(movieTitle)
      expect(imdbID).to.match(/^tt\d{7}$/)

      const propertiesToValidate = [Year, Director, Writer, imdbRating]

      // Iterate over properties and assert they are not empty or null
      propertiesToValidate.forEach((property) => {
        expect(property).to.not.be.empty
        expect(property).to.not.be.null
      })
    })
  })

  it('Get a Movie by its ID and Validate Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?i=${movieID}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)

      const { Title, Year, Director, Writer, imdbRating, imdbID } = response.body

      expect(Title).to.eq(movieTitle)
      expect(imdbID).to.eq(movieID)

      const propertiesToValidate = [Year, Director, Writer, imdbRating]

      propertiesToValidate.forEach((property) => {
        expect(property).to.not.be.empty
        expect(property).to.not.be.null
      })
    })
  })

  it('Search Movies with Valid Search Query and Validate Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?s=${validSearchValue}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.Search).that.is.an('array')
      // expect(response.body)
      //   .to.have.property('totalResults')
      //   .and.satisfy((totalResults) => {
      //     return parseInt(totalResults) > 0
      //   })
      expect(Number(response.body.totalResults)).to.be.greaterThan(0)
      expect(response.body).to.have.property('Response', 'True')
      // //expect(response.body.Response).to.eq('True')
      expect(response.body.Search).to.have.length.gt(0)

      response.body.Search.forEach((result) => {
        expect(result).to.not.be.empty
        expect(result).to.not.be.null
        expect(result)
          .to.have.property('imdbID')
          .to.match(/^tt\d{7,8}$/)
      })
    })
  })
  it('Search Movies with Invalid Search Query and Validate Error Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?s=${invalidSearchValue}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('Response', 'False')
      expect(response.body).to.have.property('Error', 'Movie not found!')
      //expect(response.body.Error).to.eq('Movie not found!')
    })
  })
})
