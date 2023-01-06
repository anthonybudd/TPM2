const { spawnSync } = require("child_process");

/** 
 * TMP2
 * */
class TPM2 {
    constructor() {

    }

    call = (method, args) => {
        return spawnSync(method, args);
    };

    stringifyOptions = (options) => Object.entries(foo).map(([key, value]) => (`--${key} ${value}`));


    /**
     * This method uses the TPM to create an array of random bytes.
     * @param {number} outputSize - Length of output data.
     * @param {Object} options - The command options
     * @param {string} options.output - Specifies the filename to output the raw bytes to. Defaults to stdout as a hex string.
     * @param {string} options.hex - Convert the output data to hex format without a leading "0x".
     * @param {string} options.force - Override checking that the: - Requested size is within the hash size limit of the TPM. - Number of retrieved random bytes matches requested amount.
     * @param {string} options.session - The session created using tpm2_startauthsession. Multiple of these can be specified. For example, you can have one session for auditing and another for encryption of the parameters.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, in absence of rphash option, The tool will not actually execute the command, it simply returns a cpHash.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @return {string} The command output.
     */
    getRandom = (outputSize, options) => {
        const args = this.stringifyOptions(options);
        args.push(outputSize);
        return this.call('tpm2_getrandom', args);
    };
}

module.exports = TPM2;
