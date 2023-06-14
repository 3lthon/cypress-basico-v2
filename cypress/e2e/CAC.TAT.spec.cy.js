/// <reference types="Cypress" /> //Busca como rerencia os tipos do Cypress

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){ 
        //(1) Como a url sempre será visitada é usado o beforeEach para não precisar de um cy.visit dentro de cada teste
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title('').should('be.equal', 'Central de Atendimento ao Cliente TAT') //Verifica o titulo da pagina visitada e valida se é igual a
      })
      //(2 e 3)
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        cy.get('#firstName').type('Elthon')
        cy.get('#lastName').type('Coutinho')
        cy.get('#email').type('elthon.teste@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) // Variavel longText + Remoção do Delay (Delay = 0)
        cy.get('button[type="submit"]').click() //Elemento Inspecionado via Navegador

        //(4)
        cy.get('.success').should('be.visible') //Verificacao da mensagem de sucesso

    //Teste de Cenários alternativos
    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida')
        cy.get('#firstName').type('Elthon')
        cy.get('#lastName').type('Coutinho')
        cy.get('#email').type('elthon.teste-teste.com')
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click() 

        cy.get('.error').should('be.visible') //verificacao da mensagem de erro
    })
      
  })