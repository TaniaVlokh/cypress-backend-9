import BackendPage = require("../../../pages/BackendPage")


describe('DBConnection', () => {
  const backendPage = new BackendPage()
  beforeEach(function(){
    cy.visit('backend')
    cy.fixture('user').then(function(data) => )
  })
  it('Runs a query', () => {
    cy.task('runQuery', 'Select * FROM students').then((rows) => {
      console.log(JSON.stringify(rows, null, 2))
      expect(rows).to.have.length.above(2)
      // another way to assurt
      cy.wrap(rows).should('have.length.above', 2)
    })
  })

  it('Tast case 1 - Create user and validate', function() {
    backendPage.createUser('Tech', 'Global', 'techglobal@gmail.com', '1990-01-01')

    cy.task('runQuery', 'Select * FROM students WHERE email= "techglobal@gmail.com"').then((rows) => {
      console.log(JSON.stringify(rows, null, 2))
    //  expect(rows).to.have.length.above(2)
    
const user = rows[0]
console.log(JSON.stringify(rows, null, 2))

  })
})
})
