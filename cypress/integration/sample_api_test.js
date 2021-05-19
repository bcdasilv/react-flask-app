describe('Backend running -- Smoke test', () => {
    
    context('Given I ran the backend (API)', () => {

        before(() => {
            cy.intercept({
                method: 'GET',
                url: 'http://localhost:5000/',
            }).as('apiCheck');
        });

        it('When I visit the root endpoint it does not smoke!', () => {
            cy.visit('http://localhost:5000/');
            cy.wait('@apiCheck').then((interception) => {
              assert.isNotNull(interception.response.body, 'API is up and doesn\'t smoke!');
              assert.equal(interception.response.body, 'Hello, World!')
            }); // or
            // cy.wait('@apiCheck').should(({ request, response }) => {
            //     expect(response && response.body).to.include('Hello, World!');
            //     expect(response && response.statusCode).to.be.equal(200);
            // });
        });
    });
});

// describe('Adding/Reading Object', () => {

//     it('Sending a user object for insertion', () => {
//         cy.request('POST', 'http://localhost:5000/users', { name: 'Janis' , job: 'Singer'}).then(
//             (response) => {
//              expect(response.status).to.be.equal(201);
//             }
//           )
//     });

//     it('Getting objects', () => {
//         cy.request('GET', 'http://localhost:5000/users').then(
//             (response) => {
//                 expect(response.status).to.be.equal(200);
//                 expect(response.body).to.have.property('users_list');
//                 assert.isNotEmpty(response.body.users_list);
//             }
//             )
//     });

// });
