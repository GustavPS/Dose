/// <reference types="Cypress" />

describe('Test login flow', () => {
    it('Works to login with correct Main Server key', async () => {
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
    });

    it("Doesn't work to login with incorrect Main Server key", async () => {
        const result = await cy.request({
            method: 'POST',
            url: 'http://127.0.0.1:3001/api/auth/validate',
            body: {
                token: 'fail'
            }
        });
        expect(result.status).to.equal(200);
        expect(result.body.status).to.equal('error');
        expect(result.body.token).to.be.undefined
        expect(result.body.validTo).to.be.undefined;
    });
});