import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

import App from 'next/app';
import Cookies from 'cookies'


MyApp.getInitialProps = async (appContext) => {
    const cookies = new Cookies(appContext.ctx.req, appContext.ctx.res)
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    // Allowed pages without auth
    const noAuthPages = ['/dashboard/login', '/_error', '/dashboard/setup/account', '/dashboard/setup/database', '/dashboard/setup/libraries'];

    for (const noAuthPage of noAuthPages) {
        if (appContext.ctx.pathname == noAuthPage) {
            return { ...appProps }
        }
    }

    // Only runs server side
    if (appContext.ctx.res) {
        if (!tokenExist(appContext.ctx.req.cookies)) {
            return redirectToLogin(appContext.ctx.res);
        }

        let accessToken = appContext.ctx.req.cookies.dashToken;
        let refreshToken = appContext.ctx.req.cookies.dashRefreshToken;
        let validTo = appContext.ctx.req.cookies.dashValidTo;

        const currentTime = Date.now() / 1000;
        const accessTokenValid = (validTo - currentTime) >= 60;

        if (accessTokenValid) {
            return { ...appProps };
        }
        let host = appContext.ctx.req.headers.host;
        if (appContext.ctx.req.secure) {
            host = `https://${host}`;
        } else {
            host = `http://${host}`;
        }

        // If access token has expired or is about to expire
        const req = await fetch(`${host}/api/dashboard/auth/refresh`, {
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
        if (newTokenInfo.status === 'success') {
            saveTokenInfo(cookies,
                newTokenInfo.token,
                newTokenInfo.refreshToken,
                newTokenInfo.validTo);
            return { ...appProps };
        } else {
            clearTokenInfo(cookies);
            return redirectToLogin(appContext.ctx.res);
        }
    } else {
        return { ...appProps }
    }
}

function tokenExist(cookies) {
    let accessToken = cookies.dashToken;
    let refreshToken = cookies.dashRefreshToken;
    let validTo = cookies.dashValidTo;
    return accessToken != null && accessToken != undefined &&
        refreshToken != null && refreshToken != undefined &&
        validTo != null && validTo != undefined;
}

function redirectToLogin(res) {
    res.writeHead(302, { Location: `/dashboard/login` });
    res.end();
    return {};
}

function saveTokenInfo(cookies, accessToken, refreshToken, validTo) {
    cookies.set('dashToken', accessToken, {
        httpOnly: false
    });
    cookies.set('dashRefreshToken', refreshToken, {
        httpOnly: false
    });
    cookies.set('dashValidTo', validTo, {
        httpOnly: false
    });
}

function clearTokenInfo(cookies) {
    cookies.set('dashToken', null);
    cookies.set('dashRefreshToken', null);
    cookies.set('dashValidTo', null);
}