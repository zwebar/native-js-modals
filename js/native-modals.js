"use strict";

var nModal = (function () {
    var nInit = function (_options) {
        var defaultOptions = {
            watch: true,
            backdrop: true
        };

        var options = Object.assign({}, defaultOptions, _options);

        var $modalTriggers = document.querySelectorAll("[data-nModal]");
        var $modalContainer = document.querySelector("#nModal-container");
        var $modalPlaceholder = void 0;

        var modalTriggerClickEventHandler = function modalTriggerClickEventHandler(e, $modalTrigger) {
            e.preventDefault();
            var modalTarget = $modalTrigger.dataset.nmodal;
            var modalSize = $modalTrigger.dataset.nmodalSize ? $modalTrigger.dataset.nmodalSize : "small";
            var $modalTargetDom = document.getElementById(modalTarget);
            var $nodeToCopy = void 0;

            if (typeof modalTarget === 'undefined') {
                return;
            }

            // See if we can find a node to copy,
            // i.e. does the targeted node contain anything
            $modalTargetDom.childNodes.forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    $nodeToCopy = node;
                }
            });

            // Copy the targeted node to the nModal placeholder
            if ($nodeToCopy) {
                var $modalCopy = $nodeToCopy.cloneNode(true);
                $modalPlaceholder.classList.remove("large", "small", "max");

                switch (modalSize) {
                    case "small":
                        $modalPlaceholder.classList.add("small");
                        break;
                    case "large":
                        $modalPlaceholder.classList.add("large");
                        break;
                    case "max":
                        $modalPlaceholder.classList.add("max");
                        break;
                }

                $modalContainer.classList.add("active");
                while ($modalPlaceholder.firstChild) {
                    $modalPlaceholder.removeChild($modalPlaceholder.firstChild);
                }
                var $newElement = $modalPlaceholder.insertAdjacentElement("afterbegin", $modalCopy);

                // Register callbacks in the modal
                $modalPlaceholder.querySelectorAll(".nModal-button").forEach(function ($element) {
                    $element.addEventListener("click", function (e) {
                        e.preventDefault();

                        if ($element.dataset.nmodalCallback) {
                            window[$element.dataset.nmodalCallback]($newElement);
                        }
                    });
                });
            }
            else {
                console.info(modalTarget, 'doesn\'t have content to display. Add at least a &lt;form&gt;.');
            }
        };

        if (!$modalContainer) {
            // Add the nModal container
            var $_container = document.createElement("div");
            $_container.setAttribute("id", "nModal-container");
            if (options.backdrop) {
                $_container.classList.add('backdrop');
            }

            document.body.insertAdjacentElement("afterbegin", $_container);

            // Add the nModal
            var $_modalPlaceholder = document.createElement("div");
            $_modalPlaceholder.setAttribute("id", "nModal-placeholder");

            $_container.insertAdjacentElement("afterbegin", $_modalPlaceholder);

            // Assign variables
            $modalContainer = $_container;
            $modalPlaceholder = $_modalPlaceholder;
        }

        // nModal close event
        $modalContainer.addEventListener("click", function (e) {
            if (e.target.id === "nModal-container" || e.target.classList.contains("nModal-button__cancel")) {
                $modalContainer.classList.remove("active");
            }
        });

        // Assign the nModal triggers
        $modalTriggers.forEach(function ($modalTrigger) {
            $modalTrigger.addEventListener("click", function (e) {
                modalTriggerClickEventHandler(e, $modalTrigger);
            });
        });

        // Watch the DOM for changes and assign triggers
        if (options.watch) {
            if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        for (var i = 0; i < mutation.addedNodes.length; i++) {
                            let $modalTrigger = mutation.addedNodes[i];
                            if ($modalTrigger.dataset.hasOwnProperty('nmodal')) {
                                $modalTrigger.addEventListener("click", function (e) {
                                    modalTriggerClickEventHandler(e, $modalTrigger);
                                });
                            }
                        }
                    });
                });
                observer.observe(document, {
                    childList: true
                });
            }
        }

        document.addEventListener("keydown", function (event) {
            var key = event.key;
            if (key === "Escape" && $modalContainer.classList.contains("active")) {
                event.preventDefault();
                nModal.close();
            }
        });
    };

    // Close the nModal
    var nClose = function () {
        var $modalContainer = document.querySelector("#nModal-container");
        $modalContainer.classList.remove("active");
    };

    // Expose nModal variable
    return {
        init: nInit,
        close: nClose
    };
})();