const { spawnSync } = require('child_process');

/** 
 * TMP2
 */
class TPM2 {
    constructor() {

    }

    call = (method, args) => {
        return spawnSync(method, args);
    };

    stringifyOptions = (options) => Object.entries(options).map(([key, value]) => (value === false) ? '' : `--${key} ${((value === true) ? '' : value)}`);





    //////////////////////////////////////////////////////////////////
    // TMP Methods

    activatecredential = () => { };
    certify = () => { };
    certifycreation = () => { };
    certifyX509certutil = () => { };
    changeauth = () => { };
    changeeps = () => { };
    changepps = () => { };
    checkquote = () => { };
    clear = () => { };
    clearcontrol = () => { };
    clockrateadjust = () => { };
    commit = () => { };

    /**
     * Create a child object. The object can either be a key or a sealing object. A sealing object allows to seal user data to the TPM, with a maximum size of 128 bytes. Additionally it will load the created object if the -c is specified
     */
    create = (options) => (this.call('tpm2_create', this.stringifyOptions(options)));


    createak = () => { };
    createek = () => { };
    createpolicy = () => { };

    /**
     * This command is used to create a primary object under one of the hierarchies: Owner, Platform, Endorsement, NULL. The command will create and load a Primary Object. The sensitive and public portions are not returned. A context file for the created object's handle is saved as a file for future interactions with the created primary.
     */
    createPrimary = (options) => (this.call('tpm2_createprimary', this.stringifyOptions(options)));


    dictionarylockout = () => { };
    duplicate = () => { };
    ecdhkeygen = () => { };
    ecdhzgen = () => { };
    ecephemeral = () => { };


    /**
     * Performs symmetric encryption or decryption with a specified symmetric key on the contents of FILE. If FILE is not specified, defaults to stdin
     * 
     * @param {string} file - specifies the input file path FILE of the data to encrypt or decrypt.
     * @param {Object} options - The command options
     * @param {string} options.keyContext - The encryption key object.
     * @param {string} options.auth - The authorization value for the encryption key object.
     * @param {boolean} options.decrypt - Perform a decrypt operation. Defaults to encryption when this option is not specified.
     * @param {string} options.pad - Enable pkcs7 padding for applicable AES encryption modes cfb/cbc/ecb. Applicable only to encryption and for input data with last block shorter than encryption block length.
     * @param {string} options.output - The output file path for either the encrypted or decrypted data. If not specified, defaults to stdout.
     * @param {string} options.mode - The key algorithm associated with this object. Defaults to object properties or CFB if not defined.
     * @param {string} options.iv - Optional initialization vector to use. Defaults to 0's. Syntax allows for an input file and output file source to be specified. The input file path is first, optionally followed by a colon ":" and the output iv path. This output iv can be saved for subsequent calls when chaining.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash.
     */
    encryptDecrypt = (file, options) => {
        const args = this.stringifyOptions(options);
        args.push(file);
        return this.call('tpm2_encryptdecrypt', args);
    };


    /**
     * Alias of encryptDecrypt()
     *  
     * @param {string} file - specifies the input file path FILE of the data to encrypt or decrypt. 
     * @param {object} options 
     * @returns 
     */
    encrypt = (file, options = {}) => {
        return this.encryptDecrypt(file, Object.assign(options, {
            decrypt: false,
        }));
    };


    /**
     * Alias of encryptDecrypt()
     *  
     * @param {string} file - specifies the input file path FILE of the data to encrypt or decrypt. 
     * @param {object} options 
     * @returns 
     */
    decrypt = (file, options = {}) => {
        return this.encryptDecrypt(file, Object.assign(options, {
            decrypt: true,
        }));
    };


    eventlog = () => { };
    evictcontrol = () => { };
    flushcontext = () => { };
    getcap = () => { };
    getcommandauditdigest = () => { };
    geteccparameters = () => { };
    getekcertificate = () => { };

    /**
     * Returns the next SIZE octets from the random number generator. The SIZE parameter is expected as the only argument to the tool.
     * 
     * Note that the TPM specification recommends that TPM's fix the number of available entry to the maximum size of a hash algorithm output in bytes.
     * 
     * Most TPMs do this, and thus the tool verifies that input size is bounded by property TPM2_PT_MAX_DIGEST and issues an error if it is too large.
     * 
     * Output defaults to stdout and binary format unless otherwise specified with -o and --hex options respectively.
     * 
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

    getsessionauditdigest = () => { };
    gettestresult = () => { };
    gettime = () => { };
    hash = () => { };
    hierarchycontrol = () => { };
    hmac = () => { };
    import = () => { };
    incrementalselftest = () => { };

    /**
     * Load both the private and public portions of an object into the TPM.
     * The tool outputs the name of the loaded object in a YAML dictionary format with the key name where the value for that key is the name of the object in hex format.
     * 
     * @param {Object} options - The command options
     * @param {string} options.parentContext - The parent object.
     * @param {string} options.auth - The authorization value of the parent object specified by -C.
     * @param {string} options.public - A file containing the public portion of the object.
     * @param {string} options.private - A file containing the sensitive portion of the object.
     * @param {string} options.name - An optional file to save the name structure of the object.
     * @param {string} options.keyContext - The file name of the saved object context, required.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash.
     */
    load = (options) => (this.call('tpm2_load', this.stringifyOptions(options)));


    loadexternal = () => { };
    makecredential = () => { };
    nvcertify = () => { };
    nvdefine = () => { };
    nvextend = () => { };
    nvincrement = () => { };
    nvread = () => { };
    nvreadlock = () => { };
    nvreadpublic = () => { };
    nvsetbits = () => { };
    nvundefine = () => { };
    nvwrite = () => { };
    nvwritelock = () => { };
    pcrallocate = () => { };
    pcrevent = () => { };
    pcrextend = () => { };
    pcrread = () => { };
    pcrreset = () => { };
    policyauthorize = () => { };
    policyauthorizenv = () => { };
    policyauthvalue = () => { };
    policycommandcode = () => { };
    policycountertimer = () => { };
    policycphash = () => { };
    policyduplicationselect = () => { };
    policylocality = () => { };
    policynamehash = () => { };
    policynv = () => { };
    policynvwritten = () => { };
    policyor = () => { };
    policypassword = () => { };
    policypcr = () => { };
    policyrestart = () => { };
    policysecret = () => { };
    policysigned = () => { };
    policytemplate = () => { };
    policyticket = () => { };
    print = () => { };
    quote = () => { };
    rc_decode = () => { };
    readclock = () => { };
    readpublic = () => { };
    rsadecrypt = () => { };
    rsaencrypt = () => { };
    selftest = () => { };
    send = () => { };
    sessionconfig = () => { };
    setclock = () => { };
    setcommandauditstatus = () => { };
    setprimarypolicy = () => { };
    shutdown = () => { };
    sign = () => { };
    startauthsession = () => { };
    startup = () => { };
    stirrandom = () => { };
    testparms = () => { };
    unseal = () => { };
    verifysignature = () => { };
    zgen2phase = () => { };
}

module.exports = TPM2;
