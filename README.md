# TPM2-Node

<p  align="center">
    <img src="https://github.com/anthonybudd/TPM2/raw/main/docs/images/tpm-icon.png" width="200" alt="tpm icon">
</p>

Node JS library for working with the TPM2.


```js
const TPM2 = require('TPM2');
const tpm2 = new TPM2;

// Random bytes
console.log(tpm2.getRandom(8));

// Encrypt/decrypt file.
tpm2.createPrimary({
    keyContext: 'primary.ctx'
});
tpm2.create({
    parentContext: 'primary.ctx',
    keyAlgorithm: 'aes128',
    public: 'key.pub',
    private: 'key.priv',
});
tpm2.load({
    parentContext: 'primary.ctx',
    keyContext: 'key.ctx',
    public: 'key.pub',
    private: 'key.priv',
});
tpm2.encrypt('path/to/.env', {
    parentContext: 'key.ctx',
    output: 'secrets.enc'
});
tpm2.decrypt('secrets.enc', {
    parentContext: 'key.ctx',
    output: 'decrypted-secrets.txt'
});
```


### Raspberry Pi Set-up
I tested this library using the GeekPi TPM2 module.

```sh
sudo echo 'dtparam=spi=on' >> /boot/config.txt
sudo echo 'dtoverlay=tpm-slb9670' >> /boot/config.txt

apt-get install tpm2-tools
# or build from source. Recommended but more complex. https://github.com/tpm2-software

git clone git@github.com:anthonybudd/TPM2.git
cd TPM2
npm i
npm run test
```