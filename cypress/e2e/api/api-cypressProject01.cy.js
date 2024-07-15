import { postRequestBodyProject01, updateRequestBodyProject01 } from '../../fixtures/testData.json'
describe('CRUD Oper', () => {
  // after(() => {
  //   cy.request({
  //     method: 'DELETE',
  //     url: 'https://api.tech-global-training.com/students/all/delete',
  //   })
})
const studentIDProp = ['STUDENT_ID']
let studentId
it(' Get All Students', () => {
  cy.request({
    method: 'GET',
    url: 'https://api.tech-global-training.com/students',
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.length.gte(2)

    studentIDProp.forEach((id) => {
      expect(id).not.be.null
    })
  })
})

it('Create a new student and validate the response', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.tech-global-training.com/students',
    body: postRequestBodyProject01,
  }).then((response) => {
    expect(response.status).to.equal(201)
    expect(response.body.STUDENT_ID).to.be.gte(2)

    expect(response.body.DOB).be.eq(postRequestBodyProject01.DOB)
    expect(response.body.EMAIL).be.eq(postRequestBodyProject01.EMAIL)
    expect(response.body.FIRST_NAME).be.eq(postRequestBodyProject01.FIRST_NAME)
    expect(response.body.LAST_NAME).be.eq(postRequestBodyProject01.LAST_NAME)
    expect(response.body.INSTRUCTOR_ID).be.eq(postRequestBodyProject01.INSTRUCTOR_ID)
    studentId = response.body.STUDENT_ID
  })
})

it('Retrieve the newly created student and validate the response', () => {
  cy.request({
    method: 'GET',
    url: `https://api.tech-global-training.com/students/${studentId}`,
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.DOB).to.contain(postRequestBodyProject01.DOB)
    expect(response.body.EMAIL).be.eq(postRequestBodyProject01.EMAIL)
    expect(response.body.FIRST_NAME).be.eq(postRequestBodyProject01.FIRST_NAME)
    expect(response.body.LAST_NAME).be.eq(postRequestBodyProject01.LAST_NAME)
    expect(response.body.INSTRUCTOR_ID).be.eq(postRequestBodyProject01.INSTRUCTOR_ID)
  })
})

it('Update Newly Created Student with a Different Instructor', () => {
  cy.request({
    method: 'PUT',
    url: `https://api.tech-global-training.com/students/${studentId}`,
    body: updateRequestBodyProject01,
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.equal(`Successfully updated ${updateRequestBodyProject01.FIRST_NAME}`)
  })
})
it(' Delete Newly Created Student', () => {
  cy.request({
    method: 'DELETE',
    url: `https://api.tech-global-training.com/students/${studentId}`,
  }).then((response) => {
    expect(response.status).to.equal(200)
    //expect(response.body).to.eq(`Successfully deleted user with Id: ${studentId}`)
  })
})
//})
