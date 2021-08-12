describe('user', () => {
  before(() => {
    cy.task('deleteAppuser', 'test@test.t').
      then(result => expect(result).to.be.true);
  });
  
  it('can signup successfully', ()=> {
    cy.visit('/signup');
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
    
    cy.intercept('POST', '/signup', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
      });
    });
    // check notification on success
    cy.contains('You\'ve signed up');
    
  });
  
  it('redirects to /login after successful signup',()=>{
    cy.location().should(loc=>{
      expect(loc.pathname).to.eq('/login');
    });
    cy.contains('Login');
  })
  
  it('can login successfully', ()=>{
    cy.visit('/login');
    cy.get('[name=email]').type('test@test.t');
    cy.get('[name=password]').type('00000');
    cy.get('[type=submit]').click();
  
    cy.intercept('POST', '/login', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.have.ownProperty('token')
      });
    });
    // check notification on success
    cy.contains('You are logged in');
  })
});
  
