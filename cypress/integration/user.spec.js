describe('user', () => {
  before(() => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.config().baseUrl}/api/test/email`,
        body: {
          email: 'test@test.t',
        },
        failOnStatusCode: false,
      },
    ).then((res => {
      // expect(res.status).to.be.oneOf([204, 404]);
      expect(res.status).to.equal(204);
    }));
  });
  
  it('signup successfully', function() {
    cy.visit('/');
    cy.get('[name=first_name]').type('first_test');
    cy.get('[name=last_name]').type('last_test');
    cy.get('[name=dl_number]').type('dln_test');
    cy.get('[name=dl_date]').type('2000-12-30');
    cy.get('[name=country]').click().then(() => cy.findByText('Aruba').click());
    cy.get('[name=phone]').type('12345678');
    cy.get('[name=email]').type('test@test.t');
    cy.get('[name=password]').type('00000');
    cy.get('[name=passwordConfirm]').type('00000');
    cy.get('[type=submit]').click();
    
    cy.intercept('POST', '/', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
      });
    });
    // check notification on success
    cy.contains('You\'ve signed up');
    
  });
});
  
