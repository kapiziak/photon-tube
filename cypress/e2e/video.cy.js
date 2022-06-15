/// <reference types="cypress" />



describe('Tests Video Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/video/1')
        cy.intercept('https://photon-recruitment-app.herokuapp.com/api/*').as('api')
        cy.wait('@api')
    })

    it('Video related media should render and redirect to another videos', () => {

        cy.url().then(url => {
            cy.get('a[href*="video"]').first().click()
            cy.wait('@api')
            cy.url().should('not.eq', url)
            cy.url().should('include', '/video')
        })

    })

    it('Add new comment', () => {
        cy.get(`form[data-type=new-comment] input`).type('Test Comment')
        cy.get(`form[data-type=new-comment]`).submit()
        cy.get('div[data-type=comment] p').should('contain.text', 'Test Comment')
    })
})