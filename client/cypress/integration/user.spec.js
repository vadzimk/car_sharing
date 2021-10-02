const newUser = {
  first_name: 'Anthony',
  last_name: 'DelaTorre',
  dl_number: 'Q123',
  dl_date: '2000-01-01',
  country: 'Aruba',
  phone: '1234567890',
  email: 'test@test.y',
  password: 'secret',
  passwordConfirm: 'secret',
  ishost: true,
};

const existingUser = {
  email: newUser.email,
  password: newUser.password,
};

const newLocation = {
  addr_line2: 'unit 300',
  addr_line1: '4000 German Springs Rd',
  zipcode: '90001',
};

describe('user', () => {
  before(() => {
    cy.task('deleteAppuser', newUser.email).
      then(result => expect(result).to.be.true);
  });
  
  it('can signup successfully', () => {
    cy.visit('/signup');
    for (let [key, value] of Object.entries(newUser)) {
      if (key === 'ishost') {
        if (value)
          cy.get(`[name=${key}]`).click();
      } else if (key === 'country') {
        cy.get(`[name=${key}]`).
          click().
          then(() => cy.findByText(value).click());
      } else {
        cy.get(`[name=${key}]`).type(value);
      }
    }
    
    cy.get('[type=submit]').click();
    
    cy.intercept('POST', '/signup', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
      });
    });
    // check notification on success
    cy.contains('You\'ve signed up');
    
  });
  
  it('redirects to /login after successful signup', () => {
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/login');
    });
    cy.contains('Login');
  });
  
  it('can login successfully', () => {
    
    // replaced
    // cy.visit('/login');
    // for (let [key, value] of Object.entries(existingUser)) {
    //   cy.get(`[name=${key}]`).type(value);
    // }
    //
    // cy.get('[type=submit]').click();
    
    cy.typeLogin(existingUser);
    
    cy.intercept('POST', '/login', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.have.ownProperty('token');
      });
    });
    // check notification on success
    cy.contains('You are logged in');
  });
  
});

const newListing = {
  plate: 'ABC',
  make: 'Toyota',
  model: 'Corolla',
  year: '2000',
  transmission: 'Automatic',
  seat_number: '4',
  large_bags_number: '2',
  category: 'Medium',
  miles_per_rental: '',
  active: true,
  images: [
    {path: './car.jpg'},
    {path: './car.jpg'},
  
  ],
};

describe('listing', () => {
  before(() => {
    cy.login(existingUser);
  });
  
  it('can be created by an authorized user', () => {
    cy.visit('/listings');
    cy.get('button').contains('NEW LISTING').click();
    for (let [key, value] of Object.entries(newListing)) {
      if (key === 'transmission' || key === 'category') {
        cy.get(`[name=${key}]`).
          click().
          then(() => cy.findByText(value).click());
      } else if (key === 'active') {
        if (value)
          cy.get(`[name=${key}]`).click();
      } else if (key === 'images') {
        // https://testersdock.com/cypress-file-upload/
        
        cy.get('input[type="file"]').
          attachFile(newListing.images.map(i => i.path));
        
      } else {
        if (value)
          cy.get(`[name=${key}]`).type(value);
      }
    }
    cy.get('[type=submit]').click();
    
    // changed from
    // cy.intercept('POST', '/listings/create', (req) => {
    cy.intercept('POST', '/api/listing/create', (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.be.eq(200);
      });
    });
    // check notification on success
    cy.contains(`Created: ${newListing.plate.toUpperCase()}`);
    
  });
});

describe('location', () => {
    beforeEach(() => {
      cy.login(existingUser);
    });
    it('can be created by host', () => {
      cy.historyPush('/locations');
      cy.get('button').contains('Add address').click();
      cy.contains('New Location');
      for (let [key, value] of Object.entries(newLocation)) {
        cy.get(`[name=${key}]`).type(value);
      }
      cy.contains('New Location').click();
      
      cy.get('[type=submit]').click();
      cy.intercept('POST', '/api/location/add-location', (req) => {
        req.on('response', (res) => {
          expect(res.statusCode).to.be.eq(200);
        });
      });
      cy.contains(newLocation.addr_line1);
    });
    
    it('can be deleted', () => {
      cy.historyPush('/locations');
      cy.get('[data-cy=addressCard]').each($ele => {
        
        if ($ele.text().includes(newLocation.addr_line1) &&
          $ele.text().includes(newLocation.zipcode)) {
          cy.wrap($ele).within(() => {
            cy.get('[data-cy=deleteButton]').click();
          });
        }});
        
      cy.get('[data-cy=btnConfirm]').click();
      cy.intercept('DELETE', '/api/location', (req) => {
        req.on('response', (res) => {
          expect(res.statusCode).to.be.eq(204);
        });
      });
      cy.contains(newLocation.addr_line1).should('not.exist');
      
    });
  },
);

