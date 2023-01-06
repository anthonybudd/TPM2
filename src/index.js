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

    stringifyOptions = (options, args = []) => (Object.entries(options).map(([key, value]) => ((value === false) ? '' : `-${(key.length === 1) ? key : `-${key}`} ${((value === true) ? '' : value)}`).replace(/^\s+|\s+$/g, '')).concat(args));





    //////////////////////////////////////////////////////////////////
    // TMP Methods

    /**
     * 
     * @param {*} options 
     * @returns 
     */
    activateCredential = (options = {}) => (this.call('tpm2_activatecredential', this.stringifyOptions(options)));


    /**
     * Proves that an object with a specific NAME is loaded in the TPM. By certifying that the object is loaded, the TPM warrants that a public area with a given NAME is self-consistent and associated with a valid sensitive area.
     * 
     * If a relying party has a public area that has the same NAME as a NAME certified with this command, then the values in that public area are correct. An object that only has its public area loaded cannot be certified.
     * {@link https://tpm2-tools.readthedocs.io/en/latest/man/tpm2_certify.1/ tpm2_certify}
     * 
     * @param {string} options.certifiedkeyContext - The object to be certified.
     * @param {string} options.signingkeyContext - The key used to sign the attestation structure.
     * @param {string} options.certifiedkeyAuth - The authorization value provided for the object specified with -c.
     * @param {string} options.hashAlgorithm - The hash algorithm to use in signature generation.
     * @param {string} options.signingkeyAuth - The authorization value for the signing key specified with -C.
     * @param {string} options.attestation - Output file name for the attestation data.
     * @param {string} options.signature - Output file name for the signature data.
     * @param {string} options.format - Format selection for the signature output file.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash, unless rphash is also required.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @param {string} options.session - The session created using tpm2_startauthsession. This can be used to specify an auxiliary session for auditing and or encryption/decryption of the parameters.
     * @returns 
     */
    certify = (options = {}) => (this.call('tpm2_certify', this.stringifyOptions(options)));


    /**
     * Attest the association between a loaded public area and the provided hash of the creation data. The creation data and the creation ticket is produced when creating the object. The object itself is created with either TPM2_CreatePrimary or TPM2_Create commands.
     * 
     * @param {string} options.signingkeyContext - Context object pointing to the key used that signs the attestation.
     * @param {string} options.signingkey - Optional authorization value to use for the key specified by -C.
     * @param {string} options.certifiedkeyContext - Context object pointing to the key that has to be certified.
     * @param {string} options.hashAlgorithm - The hash algorithm used to digest the creation data.
     * @param {string} options.scheme - The signing scheme used to sign the attestation data.
     * @param {string} options.creationHash - File containing the digest of the creation data.
     * @param {string} options.ticket - The ticket file to validate that the creation data was produced by the TPM.
     * @param {string} options.signature - File containing the signature of the attestation data for the certified key.
     * @param {string} options.format - Output signature format selection.
     * @param {string} options.attestation - The attestation data of the type TPM2_CREATION_INFO signed with signing key.
     * @param {string} options.qualification - Optional, the policy qualifier data that the signer can choose to include in the signature. Can either be a path or hex string.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash, unless rphash is also required.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @param {string} options.session - The session created using tpm2_startauthsession. This can be used to specify an auxiliary session for auditing and or encryption/decryption of the parameters
     */
    certifyCreation = (options) => (this.call('tpm2_certifycreation', this.stringifyOptions(options)));


    /**
     * Generates a partial certificate that is suitable as the third input parameter for TPM2_certifyX509 command. The certificate data is written into a file in DER format and can be examined using openssl asn1parse tool as follows:
     * 
     * @param {object} options
     * @param {string} options.outcert - The output file where the certificate will be written to. The default is partial_cert.der Optional parameter.
     * @param {string} options.days - The number of days the certificate will be valid starting from today. The default is 3560 (10 years) Optional parameter.
     * @param {string} options.issuer - The ISSUER entry for the cert in the following format: --issuer="C=US;O=org;OU=Org unit;CN=cname" Supported fields are:\nC - "Country", max size = 2\nO - "Org", max size = 8\nOU - "Org Unit", max size = 8 \n CN - "Common Name", max size = 8 The files need to be separated with semicolon. At list one supported field is required for the option to be valid. Optional parameter.
     * @param {string} options.subject = The SUBJECT for the cert in the following format: --subject="C=US;O=org;OU=Org unit;CN=cname" Supported fields are:\nC - "Country", max size = 2\nO - "Org", max size = 8\nOU - "Org Unit", max size = 8\nCN - "Common Name", max size = 8 The files need to be separated with semicolon. At list one supported field is required for the option to be valid. Optional parameter.
     */
    certifyX509CertUtil = (options) => (this.call('tpm2_certifyX509certutil', this.stringifyOptions(options)));


    /**
     * Configures authorization values for the various hierarchies, NV indices, transient and persistent objects.
     * 
     * Note: For non-permanent objects (Transient objects and Persistent objects), copies of the private information (files or persistent handles) created prior to changing auth are not invalidated.
     * 
     * @param {object} options
     * @param {string} options.objectContext - The key context object to be used for the operation.
     * @param {string} options.objectAuth - The old authorization value for the TPM object specified with -c.
     * @param {string} options.parentContext - The parent object. This is required if the object for the operation is a transient or persistent object.
     * @param {string} options.private - The output file which contains the new sensitive portion of the object whose auth was being changed. protection details
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash, unless rphash is also required.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @param {string} options.session - The session created using tpm2_startauthsession. This can be used to specify an auxiliary session for auditing and or encryption/decryption of the parameters. ARGUMENT the command line argument specifies the AUTH to be set for the object specified with -c. 
     */
    changeAuth = (options, arg) => (this.call('tpm2_changeauth', this.stringifyOptions(options, [arg])));


    /**
     * Replaces the active endorsement primary seed with a new one generated off the TPM2 RNG. The Transient and Persistent objects under the endorsement hierarchy are lost. This command requires platform auth.
     * 
     * @param {object} options
     * @param {string} options.auth - Specifies the AUTH for the platform. hierarchy.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash, unless rphash is also required.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @param {string} options.session - The session created using tpm2_startauthsession. This can be used to specify an auxiliary session for auditing and or encryption/decryption of the parameters.
     * @returns 
     */
    changeEPS = (options) => (this.call('tpm2_changeeps', this.stringifyOptions(options)));

    /**
     * Replaces the active platform primary seed with a new one generated off the TPM2 RNG. The Transient and Persistent objects under the platform hierarchy are lost whilst retaining the NV objects.
     * 
     * @param {object} options
     * @param {string} options.auth - Specifies the AUTH for the platform. hierarchy.
     * @param {string} options.cphash - File path to record the hash of the command parameters. This is commonly termed as cpHash. NOTE: When this option is selected, The tool will not actually execute the command, it simply returns a cpHash, unless rphash is also required.
     * @param {string} options.rphash - File path to record the hash of the response parameters. This is commonly termed as rpHash.
     * @param {string} options.session - The session created using tpm2_startauthsession. This can be used to specify an auxiliary session for auditing and or encryption/decryption of the parameters.
     * @returns
     */
    changePPS = (options) => (this.call('tpm2_changepps', this.stringifyOptions(options)));

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
