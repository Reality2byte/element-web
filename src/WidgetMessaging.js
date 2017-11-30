/*
Copyright 2017 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Handle widget postMessage events
 * @param  {Event} event Event to handle
 * @return {undefined}
 */
function onMessage(event) {
    console.warn("Checking for widget event", event);
    if (!event.origin) { // Handle chrome
        event.origin = event.originalEvent.origin;
    }

    // Event origin is empty string if undefined
    if (event.origin.length === 0 || !event.data.widgetData) {
        // TODO / FIXME -- check for valid origin URLs!!
        return; // don't log this - debugging APIs like to spam postMessage which floods the log otherwise
    }

    // TODO -- handle widget actions
    alert(event.data.widgetData);
}

let listenerCount = 0;
module.exports = {
    /**
     * Register widget message event listeners
     * @return {undefined}
     */
    startListening() {
        if (listenerCount === 0) {
            window.addEventListener("message", onMessage, false);
        }
        listenerCount += 1;
    },

    stopListening() {
        listenerCount -= 1;
        if (listenerCount === 0) {
            window.removeEventListener("message", onMessage);
        }
        if (listenerCount < 0) {
            // Make an error so we get a stack trace
            const e = new Error(
                "WidgetMessaging: mismatched startListening / stopListening detected." +
                " Negative count",
            );
            console.error(e);
        }
    },
};
