import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from 'next/router';
import App from 'next/app';
import Cookies from 'cookies'

export default function DoseApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

DoseApp.getInitialProps = async (appContext) => {
    const cookies = new Cookies(appContext.ctx.req, appContext.ctx.res)
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
 
    // Allowed pages without auth
    const noAuthPages = ['/login', '/_error'];
 
    for (const noAuthPage of noAuthPages) {
        if (appContext.ctx.pathname == noAuthPage) {
            return { ...appProps }
        }
    }

    // Only runs server side
   if (appContext.ctx.res) {
        if (!tokenExist(appContext.ctx.req.cookies)) {
            console.log("No token saved");
            return redirectToLogin(appContext.ctx.res);
        }

       let accessToken  = appContext.ctx.req.cookies.token;
       let refreshToken = appContext.ctx.req.cookies.refreshToken;
       let validTo      = appContext.ctx.req.cookies.validTo;

       const currentTime      = Date.now() / 1000;
       const accessTokenValid = (validTo - currentTime) >= 60;

       console.log("Access token valid: " + accessTokenValid);

       if (accessTokenValid) {
           return { ...appProps };
       }

       // If access token has expired or is about to expire
       const req = await fetch(`http://localhost:${process.env.SERVER_PORT}${process.env.SERVER_SUB_FOLDER}/api/auth/refreshToken`, {
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
           console.log(newTokenInfo);
           saveTokenInfo(cookies,
                         newTokenInfo.token,
                         newTokenInfo.refreshToken,
                         newTokenInfo.validTo);
           console.log("Refreshed token");
           return { ...appProps };
       } else {
           clearTokenInfo(cookies);
           console.log("Couldn't get new token");
           return redirectToLogin(appContext.ctx.res);
       }
   } else {
       console.log("klient");
       return { ...appProps }
   }
}

function tokenExist(cookies) {
    let accessToken  = cookies.token;
    let refreshToken = cookies.refreshToken;
    let validTo      = cookies.validTo;
    return accessToken  != null  && accessToken != undefined &&
           refreshToken != null && refreshToken != undefined &&
           validTo      != null && validTo      != undefined;
}

function redirectToLogin(res) {
    res.writeHead(302, { Location: `${process.env.SERVER_SUB_FOLDER}/login` });
    res.end();
    return {};
}

function saveTokenInfo(cookies, accessToken, refreshToken, validTo) {
    cookies.set('token', accessToken, {
        httpOnly: false
    });
    cookies.set('refreshToken', refreshToken, {
        httpOnly: false
    });
    cookies.set('validTo', validTo, {
        httpOnly: false
    });
}

function clearTokenInfo(cookies) {
    cookies.set('token', null);
    cookies.set('refreshToken', null);
    cookies.set('validTo', null);
}