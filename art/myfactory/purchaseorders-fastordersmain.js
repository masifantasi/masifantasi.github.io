// purchaseorders-fastordersmain.js

(function() {

  // dom ready
  var isReady = document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll);

  if (isReady) {
    setTimeout(init, 0);
  } else {
    addEvent(window, 'load', function() {
      setTimeout(init, 0);
    });
  }

  // add event helper
  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn);
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + type, fn);
    }
  }

  function init() {
    // addCustomCSS();
    // addEventListeners();
    modifyLabels();
  }

  function addEventListeners() {
    //
  }

  function modifyLabels() {
    document.getElementById('tdlabReferenceOrderNumber').innerHTML = 'Lieferanten AB / Angebot';
    document.getElementById('tdlabReferenceText').innerHTML = 'Lieferanten LS-Nummer WE';
  }

  function addCustomCSS() {
    //
  }

})();
