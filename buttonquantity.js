(globalThis.CodeCrumbs = globalThis.CodeCrumbs || {}).QuantityButtons = function({
    quantityGroupClass: t = "q-group",
    quantityIncrementButtonClass: e = "q-inc",
    quantityDecrementButtonClass: n = "q-dec",
    quantityNumberFieldClass: s = "q-num",
    disableDecrementAtOne: a = !0
}) {
    function o(t, e) {
        const n = a && parseInt(t.value, 10) <= 1;
        e.toggleAttribute("disabled", n),
        e.classList.toggle("disabled", n);
    }

    function l() {
        document.querySelectorAll(`.${t}`).forEach((t => {
            const e = t.querySelector(`.${s}`),
                a = t.querySelector(`.${n}`);
            e && a && o(e, a);
        }));
    }

    function updatePriceBasedOnQuantity(inputElement) {
        let row = inputElement.closest('.cart-item');
        if (!row) return;

        let unitPrice = parseFloat(row.getAttribute('data-unit-price'));
        let quantity = parseInt(inputElement.value, 10);
        let itemTotal = unitPrice * quantity;

        let itemTotalElement = row.querySelector('.item-total');
        if (itemTotalElement) {
            itemTotalElement.textContent = '$' + itemTotal.toFixed(2);
        }
    }

    "loading" !== document.readyState ? l() : document.addEventListener("DOMContentLoaded", l),
    document.addEventListener("click", (function(a) {
        let l = a.target;
        for (; l && l.nodeType == Node.ELEMENT_NODE && (!l.classList || !l.classList.contains(e) && !l.classList.contains(n));) l = l.parentNode;
        if (l && l instanceof Element) {
            const a = l.closest(`.${t}`).querySelector(`.${s}`),
                u = parseInt(a.value, 10),
                c = l.closest(`.${t}`).querySelector(`.${n}`);
            l.classList.contains(e) ? a.value = u + 1 : l.classList.contains(n) && (a.value = Math.max(u - 1, 1)), o(a, c), a.dispatchEvent(new Event("change", {bubbles: true}));

            
            // Update the price after changing the quantity
            updatePriceBasedOnQuantity(a);
        }
    })),
    new MutationObserver(((t, e) => {
        for (let e of t) "attributes" === e.type && "value" === e.attributeName && l();
    })).observe(document, {
        attributes: !0,
        subtree: !0,
        attributeFilter: ["value"]
    });
};
