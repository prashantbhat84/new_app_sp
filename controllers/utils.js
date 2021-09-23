
const BoxModel = require('../models/box')


const getHmacKeyArray = (input, arraylength) => {
    const hmac = [];

    for (let i = 0; i < arraylength - 1; i++) {
        const hexval = (input[i])
        const hexval1 = (input[i + 1]);
        const hmacVal = (hexval ^ hexval1) | 0x63
        hmac.push(hmacVal.toString())
    }

    const lastmacval = (input[arraylength - 1])
    const hamcresult = (lastmacval ^ 0x79) | 0x63;
    hmac.push(hamcresult.toString())
    return hmac;

}
const getEncryptedAESKey = (input, arraylength) => {
    const aeskey = []
    for (let i = 0; i < arraylength; i++) {

        const hexval = (input[i])
        let val = (hexval | 0x47).toString()
        aeskey.push(val)
    }
    for (let i = 8; i < 15; i++) {
        const hexval = (input[i - 8])

        const hexval1 = (input[i - 7])

        const result = ((hexval) ^ (hexval1)) | 0x47
        aeskey.push(result.toString())
    }

    const hexval2 = (input[7])

    const res1 = ((hexval2) ^ 0x79) | 0x47
    aeskey.push(res1.toString())
    return aeskey
}
class Utils {

    constructor() {
        if (!Utils.instance) {
            Utils.instance = this;
        }
        return Utils.instance;
    }

    getSecret(boxid) {

        const str = boxid
        const arr2 = [];
        const arr = Array.from(str);
        for (i = 0; i < arr.length;) {
            let var2 = '0x' + arr[i] + arr[i + 1];
            arr2.push(var2);
            i = i + 2
        }
        const arraylength = arr2.length;
        if (arraylength === 8) {
            const hmac = getHmacKeyArray(arr2, arraylength)
            const aeskey = getEncryptedAESKey(arr2, arraylength);
            return { hmac, aeskey }
        } else {
            throw new Error("Boxid length should be 16")
        }

    }
    async getBoxDateInfo(req, res, next) {
        try {

            const date = new Date();
            const boxids = [];
            const currentTime = date.getMinutes()
            const box = await BoxModel.find();

            box.forEach(item => {
                const dt = +item.lastUpdated;
                const timediff = +currentTime - dt;
                if (timediff > 5) {
                    boxids.push(item.boxid);
                }
            })

            if (boxids.length > 0) {
                console.log('tamper')
                throw new Error()
            } else {

                response.successReponse({ status: 200, res, result: "All boxes intact", res })
            }

        } catch (error) {

            response.errorResponse({ status: 400, result: 'All boces arenot intact', res })
        }
    }


}

const utils = new Utils();

Object.freeze(utils)

module.exports = utils