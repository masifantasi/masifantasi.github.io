// ==UserScript==
// @name         PEET Relabel
// @version      1.0
// @author       Manuel
// @match        https://mf.artgmbh.com/Logistik/Labels/ProductLabel*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const $ = window.$;

  const html = `
    <hr class="w-100" style="margin: 2rem 15px 3rem;">
    <div class="form-group col-10">
      <input id="relabel-input" type="number" class="form-control" placeholder="Umlabeln" style="padding: 2rem 1.5rem; font-size: 2rem;" autofocus>
    </div>
    <div class="form-group col-2">
      <input id="relabel-print-quantity" type="number" value="1" min="1" max="20" step="1" class="form-control" style="padding: 2rem 1.5rem; font-size: 2rem;">
    </div>
  `;

  $('.content .container .row').append(html);

  $(document).on('change', '#relabel-input', function(e) {
    e.preventDefault();

    const val = $('#relabel-input').val();

    if (val.length > 5) {
      const eanNumber = val.substring(0, 5);
      const labelQty = val.substring(5) || 0;
      const printQty = $('#relabel-print-quantity').val() || 1;

      $.post('https://mf.artgmbh.com/Logistik/CommonTools/GetProduct', { eanNumber }, (data) => printLabel(data.ProductID, labelQty, printQty));
  
      $('#relabel-input').val('').focus();
      $('#relabel-print-quantity').val(1);
    } else {
      $('#relabel-input').val('');
    }
  });

  function printLabel(id, labelQty, printQty) {
    const label = {
      ReportID: 26,
      ProductID: id,
      VariantID: 0,
      CustomerID: 0,
      OrderID: 0,
      LabelQuantity: labelQty,
      PrintQuantity: printQty
    };

    $.post('https://mf.artgmbh.com/Logistik/Labels/PrintProductLabel', label);
  }

})();
