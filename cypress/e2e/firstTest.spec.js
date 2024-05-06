

{
  /* <reference types="cypress" />; */
}

describe("First test suite", () => {
  it("first Test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    // find by tab name

    cy.get("input");

    //by id

    cy.get("#inputEmail");

    //by class value

    cy.get(".input-full-width");

    // by attribute

    cy.get("[fullwidth]");

    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    cy.get('[placeholder="Email"][fullwidth]');

    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains('Sign in')
    cy.contains('nb-card' , 'Horizontal form').find('button')

    cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()
  });


  it('save subject of command', ()=> {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
    // usingTheGrid.find('[for="inputEmail1"]').should('contain' , "Email")
    // usingTheGrid.find('[for="inputPassword2"]').should('contain' , "Password")


    cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
    cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain' , "Email")
    cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain' , "Password")

    //-------------

    cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
        cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain' , "Email")
    })
  })


  it('extract text values' , ()=> {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[for="exampleInputEmail1"]').then(label => {
        const  labelText = label.text()
        expect(labelText).to.equal('Email address')
        cy.wrap(labelText).should('contain' , "Email address")
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
        expect(text).to.equal('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then(classValue => {
        expect(classValue).to.equal('label')
    })



    cy.get('#exampleInputEmail1').type('test@test.com')
    cy.get('#exampleInputEmail1').invoke('prop','value').should('contain', 'test@test.com')

  })



  it('ratio buttons', ()=> {
    cy.visit('/')
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
      cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
      
    })
  })



  it.only('pick date training' , ()=> {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    let date = new Date()
    date.setDate(date.getDate() + 5)
    let futureDay = date.getDate()
    let dateToAssert = `May ${futureDay}, 2024`

    cy.contains('nb-card','Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
      cy.wrap(input).invoke('prop','value').should('contains',dateToAssert)
    })
  })



});
