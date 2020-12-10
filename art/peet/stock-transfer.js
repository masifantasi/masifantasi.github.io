// ==UserScript==
// @name         PEET Stock Transfer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Manuel
// @match        https://mf.artgmbh.com/Logistik/WarehouseEX/SinglePathMode
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const $ = window.$;

  const css = `
    /* elements */
    #inpSourceWarehouse,
    #inpTargetWarehouse,
    .scan-area-position-item,
    span[data-bind="text: TargetWarehouse().WarehouseDesc"] {
      animation: creation 1s;
    }

    @keyframes creation {
      to {
        opacity: 1;
      }
    }

    .scan-area-position-item__button:not([data-bind="click:DeletePosition"]) {
      display: none;
    }

    .valid {
      color: #45aa0f;
      font-weight: bold;
    }

    /* stock quantity table */
    .stock-quantity table td {
      font-family: monospace;
      font-size: 16px;
      white-space: nowrap;
      vertical-align: top;
      width: 250px;
      padding: 2px 10px;
    }
    .stock-quantity table td:first-child {
      text-align: right;
      font-weight: bold;
    }
  `;

  addCustomCSS();

  // creation
  $(document).on('animationstart', e => {
    const el = e.target;

    if (el.id === 'inpSourceWarehouse') {
      $(el).val('HAUPT').trigger('change');
    } else if (el.id === 'inpTargetWarehouse') {
      $(el).focus();
    } else if ($(el).hasClass('scan-area-position-item')) {
      const productNumber = $(el).find('span[data-bind="text: ProductNumber"]').text();
      const qtyCol = $(el).find('.scan-area-position-item__quantity');

      $.post('https://mf.artgmbh.com/Logistik/StockReport/GetListProductStockWarehouse', { eannumber: productNumber }, data => {
        let html = '';

        data.forEach(el => {
          html += `<tr><td data-warehouse-id="${ el.WarehouseID }" data-quantity="${ el.Quantity }">${ formatNum(el.Quantity) }</td><td>${ el.WarehouseShortDesc }</td></tr>`;
        });

        $(qtyCol).after(`<div class="mr-4 stock-quantity"><table>${ html }</table></div>`);
        compareQuantities();
      });
    } else if ($(el).data('bind') === 'text: TargetWarehouse().WarehouseDesc') {
      const loc = $(el).text();

      $('.warehouse-info').append(`<div class="mt-2"><b>Lagerort:</b> <span id="parent-warehouse"></span></div>`);

      $.post('https://mf.artgmbh.com/Logistik/WarehouseEX/GetWarehouse', { desc: loc }, data => {
        const parentWarehouse = data.ParentWarehouseDesc + ' - ' + data.ParentWarehouseShort;

        $('.warehouse-info #parent-warehouse').html(parentWarehouse);
      });

    }
  });

  $(document).on('change blur focus', '#inpProductNumber', compareQuantities);

  function compareQuantities() {
    const posItems = $('.scan-area-position-item');

    posItems.each((i, el) => {
      const scanQtyInput = $(el).find('input[type="number"]');
      const scanQty = Number(scanQtyInput.val());
      const stockQtyCell= $(el).find('[data-warehouse-id="1"]');
      const stockQty = Number(stockQtyCell.data('quantity'));
      const isValid = scanQty >= stockQty;

      scanQtyInput.toggleClass('valid', isValid);
      stockQtyCell.parent().toggleClass('valid', isValid);
    });
  }

  function addCustomCSS() {
    const style = document.createElement('style');

    style.innerHTML = css;
    document.head.appendChild(style);
  }

  function formatNum(n) {
    const num = n.toString().replace(',', '.');

    return Number(num).toFixed(0).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

})();
