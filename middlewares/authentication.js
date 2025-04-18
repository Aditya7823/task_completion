const { validateToken } = require("../Services/authentication");

function checkForAuthenticationCookie() {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies['token'];
        
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
          
            req.user = userPayload;
            next();
        } catch (error) {
            console.error("Invalid token:", error);
            res.status(401).send("Unauthorized: Invalid token");
        }
    };
}

module.exports = {
    checkForAuthenticationCookie
};
