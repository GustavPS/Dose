import cookie from 'js-cookie';
import Router from 'next/router';
// We have to use a lock to avoid race-condition if there are multiple calls to this function at the same time
import lock from './lock';

const validateServerAccess = async (server, cb) => {
    lock.enter(async function (token) {
        let   mainAccessToken          = cookie.get('token');
        const mainRefreshToken         = cookie.get('refreshToken');
        const mainAccessTokenValidTo   = cookie.get('validTo');
        const serverAccessToken        = cookie.get('serverToken');
        const serverAccessTokenValidTo = cookie.get('serverValidTo');
    
        // Fail-safe, this should never happen since we check it server-side in _app.js
        if (!mainTokenExist()) {
            console.log("Main token does not exist");
            Router.push('/');
            lock.leave(token);
            return;
        }
    
        const currentTime          = Date.now() / 1000;
        const mainAccessTokenValid = (mainAccessTokenValidTo - currentTime) >= 60;
    
        // If we have to get a new mainToken
        if (!mainAccessTokenValid) {
            console.log("Main token is expired");
            const newTokenInfo = await getNewMainToken(mainAccessToken, mainRefreshToken);
            console.log(newTokenInfo);
            if (newTokenInfo.status === 'success') {
                console.log("Got new main token")
                setMainToken(newTokenInfo.token, newTokenInfo.refreshToken, newTokenInfo.validTo);
                mainAccessToken = newTokenInfo.token;
            } else {
                console.log("Couldn't get a new main token");
                // We couldn't get a new token (refresh-token probably too old)
                lock.leave(token);
                Router.push('/');
                return;
            }
        }
    
        // If we haven't saved a serverToken
        if (!serverTokenExist()) {
            console.log("No serverToken saved");
            getServerToken(mainAccessToken, server)
            .then(result => {
                console.log("Got a serverToken");
                // We successfully got a new token
                setServerToken(result.token, result.validTo);
                lock.leave(token);
                cb(result.token);
            }).catch(err => {
                console.log("Couldn't get a serverToken");
                // We couldn't get a new token
                lock.leave(token);
                Router.push('/');
            });
        } else {
            const serverAccessTokenValid = (serverAccessTokenValidTo - currentTime) >= 60;
            // If we have to get a new serverToken
            if (!serverAccessTokenValid) {
                console.log("serverToken was not valid");
                getServerToken(mainAccessToken, server)
                .then(result => {
                    // We successfully got a new token
                    console.log("Got a new serverToken");
                    setServerToken(result.token, result.validTo);
                    lock.leave(token);
                    cb(result.token);
                }).catch(err => {
                    // We couldn't get a new token
                    console.log("Couldn't get a new serverToken");
                    lock.leave(token);
                    Router.push('/');
                });
            } else {
                // If we have a valid mainToken and a valid serverToken
                lock.leave(token);
                cb(serverAccessToken);
            }
        }
    });


}

const getNewMainToken = async (accessToken, refreshToken) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refreshToken`, {
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

const getServerToken = (mainToken, server) => {
    console.log(server);
    return new Promise(async (resolve, reject) => {
        fetch(`${server.server_ip}/api/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: mainToken
            })
        })
        .then((r) => r.json())
        .then((data) => {
            if (data.status === 'success') {
                resolve({
                    token: data.token,
                    validTo: data.validTo
                });
            } else {
                console.log(data);
                reject();
            }
        });
    });
}

const serverTokenExist = () => {
    let accessToken  = cookie.get('serverToken');
    let validTo      = cookie.get('serverValidTo');
    return accessToken  != null  && accessToken != undefined &&
           validTo      != null && validTo      != undefined;
}

const mainTokenExist = () => {
    const accessToken  = cookie.get('token');
    const refreshToken = cookie.get('refreshToken');
    const validTo      = cookie.get('validTo');
    return accessToken  != null && accessToken  != undefined &&
           refreshToken != null && refreshToken != undefined &&
           validTo      != null && validTo      != undefined;
}

const setServerToken = (token, validTo) => {
    cookie.set('serverToken', token);
    cookie.set('serverValidTo', validTo);
} 

const setMainToken = (token, refreshToken, validTo) => {
    cookie.set('token', token);
    cookie.set('refreshToken', refreshToken);
    cookie.set('validTo', validTo);
}

module.exports = validateServerAccess;