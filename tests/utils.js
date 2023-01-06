const assert = require('assert');
const { expect } = require('chai');
const TPM2 = require('./../src/index.js');
const tpm2 = new TPM2;

describe('TPM2', () => {
    describe('stringifyOptions', () => {
        it('-f', (done) => {
            const result = tpm2.stringifyOptions({
                f: true
            });
            assert.deepEqual(result, ['-f']);
            done();
        });

        it('-f --ff', (done) => {
            const result = tpm2.stringifyOptions({
                f: true,
                ff: true,
            });
            assert.deepEqual(result, ['-f', '--ff']);
            done();
        });

        it('-f (false)', (done) => {
            const result = tpm2.stringifyOptions({
                f: false,
            });
            assert.deepEqual(result, ['']);
            done();
        });

        it('--file path.txt', (done) => {
            const result = tpm2.stringifyOptions({
                file: 'path.txt',
            });
            assert.deepEqual(result, ['--file path.txt']);
            done();
        });
    });
});
