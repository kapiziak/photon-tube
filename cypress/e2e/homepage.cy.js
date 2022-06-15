/// <reference types="cypress" />


describe('Test Home Page', () => {
  beforeEach(() => {
    cy.intercept('https://photon-recruitment-app.herokuapp.com/api/*').as('api')
    cy.visit('http://localhost:3000')
    cy.wait('@api')
  })

  it('Homepage should contains at least 1 video', () => {
    cy.get('a[href*="video"]').should('have.length.greaterThan', 0)
  })

  it('Homepage video card should redirect to video page', () => {
    cy.get('a[href*="video"]').first().click()

    cy.url().should('include', '/video')
  })
})

