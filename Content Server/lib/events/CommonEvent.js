const events = require('events');

/* NOTE:
    Need to use global variable because NextJS bundles each API-route as it's own webpack bundle.
    This means that the API-route will have it's own events object if it wasn't using the global events object.
    This is not great but it's the only way to get around this issue, as it's not possible to share the events object between routes.
*/

if (!global.CommonEvent) {
    global.CommonEvent = new events.EventEmitter();
}

module.exports = global.CommonEvent;