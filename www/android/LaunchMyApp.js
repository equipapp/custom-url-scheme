(function () {
  "use strict";

  var handler = null;

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction(url) {
    if (typeof handler === "function") {
      // Clear the intent when we have a handler (note that this is only done when the preference 'CustomURLSchemePluginClearsAndroidIntent' is 'true' in config.xml
      cordova.exec(null, null, "LaunchMyApp", "clearIntent", []);

      handler(url);
    } else if (remainingAttempts-- > 0) {
      setTimeout(function () {
        waitForAndCallHandlerFunction(url);
      }, 500);
    }
  }

  function triggerOpenURL() {
    cordova.exec(
      waitForAndCallHandlerFunction,
      null,
      "LaunchMyApp",
      "checkIntent",
      []
    );
  }

  document.addEventListener("deviceready", triggerOpenURL, false);

  var launchmyapp = {
    getLastIntent: function (success, failure) {
      cordova.exec(success, failure, "LaunchMyApp", "getLastIntent", []);
    },
    onHandleOpenUrl: function (fn) {
      handler = fn;
    },
  };

  module.exports = launchmyapp;
})();
