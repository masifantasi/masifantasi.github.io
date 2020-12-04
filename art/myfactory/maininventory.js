// maininventory.js

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
    console.log('test1');
    insertQRInput();
  }
  
  function insertQRInput() {
    console.log('test2');

    var scannerCell = document.getElemendById('tdScanner');
    var scannerRow = scannerCell.parentNode;

    var tableBody = scannerRow.parentNode;
    var tr = document.createElement('tr');

    tr.innerHTML = '<td class="dlgField" width="25%">QR Code scannen</td><td class="entryField" width="100%" nowrap=""><input id="qr-code-input" wfdatafld="Scanner" style="width:100%;" value=""></td>';

    tableBody.insertBefore(tr, scannerRow);
  }
  
  
  })();
