# TPM2-Node

<p align="center">
    <img src="https://github.com/anthonybudd/TPM2/raw/main/docs/images/tpm-icon.png" width="100" alt="tpm icon">
</p>

<p align="center">
    <img src="https://github.com/anthonybudd/TPM2/raw/main/docs/images/geek-pi-tmp2.png" width="300" alt="geekpi tpm">
</p>

Node JS library for working with the TPM (Trusted Platform Module) 2.0

The TPM classs is a JS API of the tpm2-tools found here [tpm2-tools.readthedocs.io](https://tpm2-tools.readthedocs.io/en/latest/).

⚠️ This is not a stable API. This repo is just for my personal use. If you would like a stable version reach out and I will release a stable 1.0 ⚠️


```
npm i trusted-platform-module-2
```

```js
const TPM2 = require('trusted-platform-module-2');
const tpm2 = new TPM2;

// Random bytes
console.log(tpm2.getRandom(8));

// Encrypt/decrypt file.
tpm2.encrypt('path/to/.env', {
    parentContext: 'key.ctx',
    output: 'secrets.enc'
});
tpm2.decrypt('secrets.enc', {
    parentContext: 'key.ctx',
    output: 'decrypted-secrets.txt'
});
```


### Example
Below is a full example on how to use the TPM library to: create a primary hierarchy, create a child object, load the public/private portions of the key into the TPM, then encrypt a file with that key. 

```js
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
```


### Raspberry Pi Set-up
I tested this library using the GeekPi TPM2 module which has a Infineon Optiga SLB 9670.


```sh
sudo echo 'dtparam=spi=on' >> /boot/config.txt
sudo echo 'dtoverlay=tpm-slb9670' >> /boot/config.txt

apt-get install tpm2-tools
# or build from source. Recommended but more complex. https://github.com/tpm2-software
sudo reboot

git clone git@github.com:anthonybudd/TPM2.git
cd TPM2
npm i
npm run test
```
