"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankCityFromBic = exports.getBankNameFromBic = exports.getBankFromBic = void 0;
const getBankFromBic = (bicCode) => {
    if (!bicCode || bicCode.length < 8)
        return false;
    const getCountryCode = bicCode.substring(4, 6).toUpperCase();
    const swift8 = bicCode.substring(0, 8);
    const findDetailBySwiftCode = (countryCode, fullBicCode) => {
        try {
            const json = require(`./BIC-BankName/AllCountries/${countryCode}.json`);
            const findBank = json.list.find((i) => i.swift_code.includes(fullBicCode));
            if (!findBank)
                return false;
            const { id, branch } = findBank, restInfo = __rest(findBank, ["id", "branch"]);
            return findBank ? restInfo : false;
        }
        catch (error) {
            return false;
        }
    };
    return findDetailBySwiftCode(getCountryCode, bicCode);
};
exports.getBankFromBic = getBankFromBic;
const getBankNameFromBic = (bicCode) => {
    const bankDetail = (0, exports.getBankFromBic)(bicCode);
    if (!bankDetail)
        return false;
    const { bank } = bankDetail;
    return bankDetail ? bank : false;
};
exports.getBankNameFromBic = getBankNameFromBic;
const getBankCityFromBic = (bicCode) => {
    const bankDetail = (0, exports.getBankFromBic)(bicCode);
    if (!bankDetail)
        return false;
    const { city } = bankDetail;
    return bankDetail ? city : false;
};
exports.getBankCityFromBic = getBankCityFromBic;
