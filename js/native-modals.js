(function () {
    this.init = function (_options) {
        let $modalTriggers = document.querySelectorAll("[data-bModal]");
        let $modalContainer = document.querySelector("#bModal-container");
        let $modalPlaceholder;

        const modalTriggerClickEventHandler = function (e, $modalTrigger) {
            e.preventDefault();
            const modalTarget = $modalTrigger.dataset.bmodal;
            let $modalTargetDom = document.getElementById(modalTarget);
            let $nodeToCopy;

            $modalTargetDom.childNodes.forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    $nodeToCopy = node;
                }
            });

            if ($nodeToCopy) {
                let $modalCopy = $nodeToCopy.cloneNode(true);

                $modalContainer.classList.toggle("active");
                while ($modalPlaceholder.firstChild) {
                    $modalPlaceholder.removeChild($modalPlaceholder.firstChild);
                }
                let $newElement = $modalPlaceholder.insertAdjacentElement("afterbegin", $modalCopy);
                $modalPlaceholder
                    .querySelectorAll(".bModal-button")
                    .forEach(function ($element) {
                        $element.addEventListener("click", function (e) {
                            e.preventDefault();

                            if ($element.dataset.bmodalCallback) {
                                window[$element.dataset.bmodalCallback]($newElement);
                            }
                        });
                    });
            }
        };

        if (!$modalContainer) {
            const $_container = document.createElement("div");
            $_container.setAttribute("id", "bModal-container");
            document.body.insertAdjacentElement("afterbegin", $_container);

            const $_modalPlaceholder = document.createElement("div");
            $_modalPlaceholder.setAttribute("id", "bModal-placeholder");
            $_container.insertAdjacentElement("afterbegin", $_modalPlaceholder);

            $modalContainer = $_container;
            $modalPlaceholder = $_modalPlaceholder;
        }

        $modalContainer.addEventListener("click", function (e) {
            if (
                e.target.id === "bModal-container" ||
                e.target.classList.contains("bModal-button__cancel")
            ) {
                $modalContainer.classList.toggle("active");
            }
        });

        $modalTriggers.forEach(function ($modalTrigger) {
            $modalTrigger.addEventListener("click", function (e) {
                modalTriggerClickEventHandler(e, $modalTrigger);
            });
        });

        if (_options.watch) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        let $modalTrigger = mutation.addedNodes[i];
                        $modalTrigger.addEventListener("click", function (e) {
                            modalTriggerClickEventHandler(e, $modalTrigger);
                        });
                    }
                });
            });
            observer.observe(document, {
                childList: true
            });
        }
    };

    this.close = function () {
        let $modalContainer = document.querySelector("#bModal-container");
        $modalContainer.classList.toggle("active");
    };

    window.bModal = {
        init: this.init,
        close: this.close
    };
})();


document.addEventListener("DOMContentLoaded", function (event) {
    bModal.init({
        watch: true
    });

    window.callback = function (arg) {
        console.info('Callback', arg);
        bModal.close();
    }

});