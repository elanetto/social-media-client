// When I added the wait-command all over, it finally worked! 
// The modal was not loading fast enough, so the test failed before the modal was loaded.

// Login test with valid credentials
it('The user can log in with the login form with valid credentials', function() {
    cy.visit('http://127.0.0.1:8080/');
    cy.wait(2000);

    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.wait(2000);

    cy.get('#loginEmail').clear('anette.test@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginEmail').type('anette.test@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginPassword').clear('validPassword123');
    cy.wait(2000);

    cy.get('#loginPassword').type('validPassword123');
    cy.wait(2000);

    cy.get('#loginForm > .modal-footer > .btn-success').click();
});

// Login test with invalid credentials
it('The user cannot submit the login form with invalid credentials and is shown a message.', function() {
    cy.visit('http://127.0.0.1:8080/');
    cy.wait(2000);

    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.wait(2000);

    cy.get('#loginEmail').clear('invalidUsername@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginEmail').type('invalidUsername@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginPassword').clear('invalidPassword1234');
    cy.wait(2000);

    cy.get('#loginPassword').type('invalidPassword1234');
    cy.wait(2000);

    cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Either your username was not found or your password is incorrect')
    });

    cy.wait(2000);

    cy.get('#loginForm > .modal-footer > .btn-success').click();
});


// Logout test
it('The user can log out with the logout button', function() {

    // First: Login
    cy.visit('http://127.0.0.1:8080/');
    cy.wait(2000);

    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.wait(2000);

    cy.get('#loginEmail').clear('anette.test@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginEmail').type('anette.test@stud.noroff.no');
    cy.wait(2000);

    cy.get('#loginPassword').clear('validPassword123');
    cy.wait(2000);

    cy.get('#loginPassword').type('validPassword123');
    cy.wait(2000);

    cy.get('#loginForm > .modal-footer > .btn-success').click();
    cy.wait(2000);

    // Then log out
    cy.get('button[data-auth="logout"]').click(); 
    cy.wait(2000);
});

// These tests were made using Cypress Studio