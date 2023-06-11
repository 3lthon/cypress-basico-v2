// <reference types="Cypress" /> //Busca como rerencia os tipos do Cypress

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')
        cy.title('').should('be.equal', 'Central de Atendimento ao Cliente TAT') //Verifica o titulo da pagina visitada e valida se é igual a
  
    })
  })