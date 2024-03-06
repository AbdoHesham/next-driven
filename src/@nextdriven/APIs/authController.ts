import { BaseURL } from "../config";


export const AccountController = {
    Login: BaseURL + `/api/Account/Login`,
    ChangePassword: BaseURL + `/api/Account/ChangePassword`,
    VerifyOTPNumber: BaseURL + `/api/Account/VerifyOTPNumber`,
    ConfirmLicenseKey: BaseURL + `/api/Account/ConfirmLicenseKey`,
    VerifyPINCode: BaseURL + `/api/Account/VerifyPINCode`,

}