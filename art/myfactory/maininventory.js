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
    insertInputRow();
  }
  
  function insertInputRow() {
    console.log('test2');

    var scannerCell = document.getElementById('tdScanner');
    var scannerRow = scannerCell.parentNode;
    var tableBody = scannerRow.parentNode;
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    td1.className = 'dlgField';
    td1.width = '25%';

    var td2 = document.createElement('td');
    td2.className = 'entryField';
    td2.width = '100%';

    var input = document.createElement('input');
    input.id = 'qr-code-input';
    input.style.width = '100%';
    
    addEvent(input, 'change', handleChange);

    td1.appendChild(document.createTextNode('QR Code scannen'));
    td2.appendChild(input);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tableBody.insertBefore(tr, scannerRow);
  }
  
  function handleChange() {
    console.log(this);

    var input = document.getElementById('qr-code-input');
    var val = input.value;

    if (val.length > 5 && val.indexOf(';') !== -1) {
      var els = val.split(';');
      var str = els[0] + els[2];

      var scannerInput = document.getElementById('txtScanner');

      input.value = '';
      scannerInput.value = str;
    }
  }

})();
