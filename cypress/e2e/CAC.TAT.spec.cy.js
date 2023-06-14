// <reference types="Cypress" /> //Busca como rerencia os tipos do Cypress

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
    })
    //Teste de Cenários alternativos
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Elthon')
        cy.get('#lastName').type('Coutinho')
        cy.get('#email').type('elthon.teste-teste.com')
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click() 

        cy.get('.error').should('be.visible') //verificacao da mensagem de erro
    })

      it('campo telefone deve ficar vazio se preenchido com valor não númerico', function() {
        cy.get('#phone')
        .type('abcdefg')
        .should('have.value', '')
      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Elthon')
        cy.get('#lastName').type('Coutinho')
        cy.get('#email').type('elthon.teste@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click() 

        cy.get('.error').should('be.visible') //verificacao da mensagem de erro
      })

      it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Elthon')
          .should('have.value', 'Elthon') // Verifica se o texto = Elthon
          .clear() // Limpa o campo FirstName
          .should('have.value', '') // Verifica se o texto = Vazio
        
        cy.get('#lastName').type('Coutinho').should('have.value', 'Coutinho').clear().should('have.value', '')
        cy.get('#email').type('elthon.teste@teste.com').should('have.value', 'elthon.teste@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('988774455').should('have.value', '988774455').clear().should('have.value', '')   
      })

      it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
        cy.get('button[type="submit"]').click() // Clica no botão submit
        cy.get('.error').should('be.visible') // Mensagem de erro deve estar visivel
      })
  })