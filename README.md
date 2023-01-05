# TPM2-Node

<p  align="center">
    <img src="https://github.com/anthonybudd/TPM2/raw/main/docs/images/tmp-icon.png" width="200" alt="TMP icon">
</p>

Node JS library for working with the TPM2.


```js
const TPM2 = require('TPM2');

const tpm2 = new TPM2;

console.log(tpm2.getRandom(8));
```


### Raspberry Pi Set-up
I tested this library using the GeekPi TMP2 module.

```sh
sudo echo 'dtparam=spi=on' >> /boot/config.txt
sudo echo 'dtoverlay=tpm-slb9670' >> /boot/config.txt

apt-get install tpm2-tools
# or build from source. Recommended but more complex.
# https://github.com/tpm2-software

git clone git@github.com:anthonybudd/TPM2.git
cd TMP2
npm i
npm run test
```