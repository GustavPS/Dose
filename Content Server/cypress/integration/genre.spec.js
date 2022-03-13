/// <reference types="Cypress" />


let token;

describe('Genre API endpoint', () => {
    beforeEach(async () => {
        const result = await cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:3001/api/auth/validate',
            body: {
                token: 'test'
            }
        });
        expect(result.status).to.equal(200);
        expect(result.body.status).to.equal('success');
        expect(result.body.token).to.not.be.undefined;
        expect(result.body.validTo).to.not.be.undefined;
        token = result.body.token;
    });

    it('Empty array is inserted when no genre is available', async () => {
        const result = await cy.request({
            method: 'GET',
            url: `http://127.0.0.1:3001/api/genre/list?token=${token}`,
        });
        expect(result.status).to.equal(200);
        expect(result.body.genres).to.be.an('array');
        expect(result.body.genres).to.have.length(0);
    });

    it('Genre is fetched when it is available', () => {
        cy.task('createDummyGenre').then(() => {
            cy.request({
                method: 'GET',
                url: `http://127.0.0.1:3001/api/genre/list?token=${token}`,
            }).then(result => {
                expect(result.status).to.equal(200);
                expect(result.body.genres).to.be.an('array');
                expect(result.body.genres).to.have.length(1);
            });

        });


    });
});