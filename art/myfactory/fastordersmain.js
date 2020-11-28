// fastordersmain.js

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
    addCustomCSS();
    addEventListeners();
    
  }

  function addEventListeners() {
    var contactIdSelect = document.getElementById('cboContactID');
    var contactNameInput = document.getElementById('txtContactName');
    var referenceInput = document.getElementById('txtReferenceText');
    var paymentConditionsSelect = document.getElementById('cboPaymentCondition');
    var shippingConditionsSelect = document.getElementById('cboShipmentCondition');

    // addEvent(contactIdSelect, 'blur', checkContactId);
    addEvent(contactIdSelect, 'change', checkContactId);
    addEvent(contactNameInput, 'blur', checkContactName);
    addEvent(referenceInput, 'blur', checkReference);
    addEvent(paymentConditionsSelect, 'change', checkPaymentConditions);
    addEvent(shippingConditionsSelect, 'change', checkShippingConditions);
  }

  // enable controls
  window.mFrontendEventEnableControls = checkEverything;

  // before save
  window.mFrontendEventBeforeSave = checkEverything;

  function checkEverything() {
    checkContactId();
    checkDeliveryDates();
    checkPaymentConditions();
    checkShippingConditions();
  }

  function checkContactId() {
    var contactIdSelect = document.getElementById('cboContactID');

    if (contactIdSelect) {
      var contactIdLabel = document.getElementById('tdlabContactID');
      var txt = contactIdSelect.value ? 'Ansprechpartner' : 'Ansprechpartner <small class="red-circle">🔴</small>';

      contactIdLabel.innerHTML = txt;
    }

    checkContactName();
    checkReference();
  }

  function checkContactName() {
    var contactNameInput = document.getElementById('txtContactName');

    if (contactNameInput) {
      var contactNameLabel = document.getElementById('tdlabContactName');
      var txt = contactNameInput.value ? 'Zu Händen Text' : 'Zu Händen Text <small class="red-circle">🔴</small>';

      contactNameLabel.innerHTML = txt;
    }
  }

  function checkReference() {
    var referenceInput = document.getElementById('txtReferenceText');

    if (referenceInput) {
      var referenceLabel = document.getElementById('tdlabReferenceText');
      var txt = referenceInput.value ? 'Betreff' : 'Betreff <small class="red-circle">🔴</small>';

      referenceLabel.innerHTML = txt;
    }
  }

  function checkPaymentConditions() {
    var paymentConditionsSelect = document.getElementById('cboPaymentCondition');

    if (paymentConditionsSelect) {
      var paymentConditionsLabel = document.getElementById('tdlabPaymentCondition');
      var txt = paymentConditionsSelect.value ? 'Zahlungskondition' : 'Zahlungskondition <small class="red-circle">🔴</small>';

      paymentConditionsLabel.innerHTML = txt;
    }
  }

  function checkShippingConditions() {
    var shippingConditionsSelect = document.getElementById('cboShipmentCondition');

    if (shippingConditionsSelect) {
      var shippingConditionsLabel = document.getElementById('tdlabShipmentCondition');
      var txt = shippingConditionsSelect.value ? 'Versandart' : 'Versandart <small class="red-circle">🔴</small>';

      shippingConditionsLabel.innerHTML = txt;
    }
  }

  // delivery date check on focus
  window.mFrontendEventListViewInputOnFocus = checkDeliveryDates;

  function checkDeliveryDates() {
    var inputs = document.getElementById('tblListBody_lstPositions').getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var isDeliveryDate = input.id === 'txtList_lstPositions_DeliveryDate';

      if (isDeliveryDate) {
        var isPastDate = checkIfPast(input);
        var clazz = isPastDate ? 'invalid' : '';

        input.className = clazz;
      }
    }
  }

  function checkIfPast(input) {
    var orderDateVal = document.getElementById('txtOrderDate').value.split('.');
    var documentDate = new Date(orderDateVal[2], orderDateVal[1] - 1, orderDateVal[0]);

    var inputVal = input.value.split('.');
    var deliveryDate = new Date(inputVal[2], inputVal[1] - 1, inputVal[0]);

    return deliveryDate < documentDate;
  }

  function addCustomCSS() {
    var style = document.createElement('style');
    var css = '.invalid { border: 3px solid #f00; } .red-circle { color: #f00; }';

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.innerHTML = css;
    }

    document.getElementsByTagName('head')[0].appendChild(style);
  }

})();
