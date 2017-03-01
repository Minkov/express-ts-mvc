export interface BaseAuthController {
    getLoginForm(req, res);
    getRegisterForm(req, res);
    loginUser(req, res);
    registerUser(req, res);
    logoutUser(req, res);
}