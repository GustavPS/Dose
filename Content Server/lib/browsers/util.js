const Chrome = require('./chrome');
const Firefox = require('./firefox');
const Edge = require('./edge');
const Explorer = require('./explorer');
const Opera = require('./opera');
const Safari = require('./opera');
const AndroidTV = require('./androidTV');
const DefaultBrowser = require('./default');

function getBrowser(userAgent) {
    const browserVersion = userAgent.browserVersion;
    let browser;
    if (userAgent.isDesktop && !userAgent.isAndroid) {
      if (userAgent.isChrome) {
        browser = new Chrome(browserVersion);
      } else if (userAgent.isFirefox) {
        browser = new Firefox(browserVersion);
      } else if (userAgent.browser === "Edge") {
        browser = new Edge(browserVersion);
      } else if (userAgent.isIE) {
        browser = new Explorer(browserVersion);
      } else if (userAgent.browser === "Opera") {
        browser = new Opera(browserVersion);
      } else if (userAgent.isSafari) {
        browser = new Safari(browserVersion);
      } else {
        // We couldn't recognize the browser
        browser = new DefaultBrowser();
      }
    } else if (userAgent.isAndroid) {
      if (!userAgent.isMobile) {
        // Android TV
        browser = new AndroidTV(userAgent.osVersion);
      } else {
        // Android phone
        browser = new DefaultBrowser();
      }
    } else {
      // Unsupported (ios, windows phone etc)
      browser = new DefaultBrowser();
    }
    return browser;
}

module.exports = getBrowser;