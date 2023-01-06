const assert = require('assert');
const { expect } = require('chai');
const TPM2 = require('./../src/index.js');
const tpm2 = new TPM2;

// describe('TPM2', () => {
//     describe('getRandom', () => {
//         it('Should return random 8 bytes', (done) => {
//             const result = tpm2.getRandom(8);
//             expect(result.stdout).to.have.lengthOf(8);
//             done();
//         });
//     });
// });
