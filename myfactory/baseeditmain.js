// baseeditmain.js

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
    if (msEditName === 'BaseProducts') {
      //
    }
  }

  // save click
  window.mFrontendEventSaveClick = function() {
    if (msEditName === 'BaseProducts') {
      updateEAN();
    }

    if (msEditName === 'BaseCustomers') {
      updateDATEV();
    }
  };

  function updateEAN() {
    var EANNumberInput = document.getElementById('txtEANNumber');
    var productNumberInput = document.getElementById('txtProductNumber');

    if (EANNumberInput && productNumberInput) {
      EANNumberInput.value = productNumberInput.value;
    }
  }

  function updateDATEV() {
    var customerNumberInput = document.getElementById('txtCustomerNumber');
    var datevAccountInput = document.getElementById('txtDatevAccount');

    if (customerNumberInput && datevAccountInput) {
      if (datevAccountInput.value === '') {
        datevAccountInput.value = customerNumberInput.value + '00';
      }
    }
  }

})();
