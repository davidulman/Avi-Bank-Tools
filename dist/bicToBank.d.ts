type BankDetailResult = {
    bank: string;
    city: string;
    swift_code: string;
} | false;
type BankNameResult = string | false;
export declare const getBankFromBic: (bicCode: string) => BankDetailResult;
export declare const getBankNameFromBic: (bicCode: string) => BankNameResult;
export declare const getBankCityFromBic: (bicCode: string) => BankNameResult;
export {};
