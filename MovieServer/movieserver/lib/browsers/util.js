const Chrome = require('./chrome');
const Firefox = require('./firefox');
const Edge = require('./edge');
const Explorer = require('./explorer');
const Opera = require('./opera');
const Safari = require('./opera');
const DefaultBrowser = require('./default');

function getBrowser(userAgent) {
    const browserVersion = userAgent.browserVersion;
    let browser;
    if (userAgent.isDesktop) {
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
      // TODO: implement Android and AndroidTV browser support
      browser = new DefaultBrowser();
    } else {
      // Unsupported (ios, windows phone etc)
      browser = new DefaultBrowser();
    }
    return browser;
}

module.exports = getBrowser;