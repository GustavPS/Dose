import cookie from 'js-cookie';

const COOKIE_SETTINGS = {
    expires: 7
}

const validateDashboardAccess = () => {
    return new Promise(async (resolve, reject) => {
        let dashboardAccessToken = cookie.get('dashToken');
        const dashboardRefreshToken = cookie.get('dashRefreshToken');
        const dashAccessTokenValidTo = cookie.get('dashValidTo');

        // Fail-safe, this should never happen since we check it server-side in _app.js
        if (!dashboardTokenExist()) {
            console.log("Dashboard token does not exist");
            removeTokens();
            reject();
            return;
        }

        const currentTime = Date.now() / 1000;
        const mainAccessTokenValid = (dashAccessTokenValidTo - currentTime) >= 60;

        // If we have to get a new mainToken
        if (!mainAccessTokenValid) {
            console.log("Dashboard token is expired");
            const newTokenInfo = await getNewDashboardToken(dashboardAccessToken, dashboardRefreshToken);
            if (newTokenInfo.status === 'success') {
                console.log("Got new dashboard token")
                setDashboardToken(newTokenInfo.token, newTokenInfo.refreshToken, newTokenInfo.validTo);
                dashboardAccessToken = newTokenInfo.token;
                resolve(dashboardAccessToken);
            } else {
                console.log("Couldn't get a new dashboard token");
                // We couldn't get a new token (refresh-token probably too old)
                reject();
            }
        } else {
            resolve(dashboardAccessToken);
        }

    });
}

const getNewDashboardToken = async (accessToken, refreshToken) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: accessToken,
            refreshToken: refreshToken
        })
    });

    const newTokenInfo = await req.json();
    return newTokenInfo;
}

const dashboardTokenExist = () => {
    const accessToken = cookie.get('dashToken');
    const refreshToken = cookie.get('dashRefreshToken');
    const validTo = cookie.get('dashValidTo');
    return accessToken != null && accessToken != undefined &&
        refreshToken != null && refreshToken != undefined &&
        validTo != null && validTo != undefined;
}

const setDashboardToken = (token, refreshToken, validTo) => {
    cookie.set('dashToken', token, COOKIE_SETTINGS);
    cookie.set('dashRefreshToken', refreshToken, COOKIE_SETTINGS);
    cookie.set('dashValidTo', validTo, COOKIE_SETTINGS);
}

const removeTokens = () => {
    cookie.remove('dashToken');
    cookie.remove('dashRefreshToken');
    cookie.remove('dashValidTo');
}

module.exports = validateDashboardAccess;