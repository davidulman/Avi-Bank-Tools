type BankDetailJSON = {
  id: number;
  bank: string;
  city: string;
  branch: string | null;
  swift_code: string;
  country?: string;
  countryCode?: string;
};

type CountryDetail = {
  country: string;
  country_code: string;
  list: BankDetailJSON[];
};

type BankDetailResult =
  | {
      bank: string;
      city: string;
      swift_code: string;
    }
  | false;

type BankNameResult = string | false;

export const getBankFromBic = (bicCode: string): BankDetailResult => {
  if (!bicCode || bicCode.length < 8) return false;
  const getCountryCode = bicCode.substring(4, 6).toUpperCase();
  const swift8 = bicCode.substring(0, 8);

  const findDetailBySwiftCode = (
    countryCode: string,
    fullBicCode: string
  ): BankDetailResult | false => {
    try {
      const json: CountryDetail = require(`./BIC-BankName/AllCountries/${countryCode}.json`);
      const findBank = json.list.find((i) =>
        i.swift_code.includes(fullBicCode)
      );
      if (!findBank) return false;
      const { id, branch, ...restInfo } = findBank;
      return findBank ? restInfo : false;
    } catch (error) {
      return false;
    }
  };

  return findDetailBySwiftCode(getCountryCode, bicCode);
};

export const getBankNameFromBic = (bicCode: string): BankNameResult => {
  const bankDetail = getBankFromBic(bicCode);
  if (!bankDetail) return false;
  const { bank } = bankDetail;
  return bankDetail ? bank : false;
};

export const getBankCityFromBic = (bicCode: string): BankNameResult => {
  const bankDetail = getBankFromBic(bicCode);
  if (!bankDetail) return false;
  const { city } = bankDetail;
  return bankDetail ? city : false;
};
