const { spawnSync } = require("child_process");

class TPM2 {
    constructor() {

    }

    getRandom = (options, argument) => {
        if (!argument) argument = options;
        if (typeof argument !== 'number') throw Error('Argument must be type number');
        return spawnSync('tpm2_getrandom', [argument]);
    };
}

module.exports = TPM2;
