(function () {
    this.init = function (_options) {
        let $modalTriggers = document.querySelectorAll("[data-nModal]");
        let $modalContainer = document.querySelector("#nModal-container");
        let $modalPlaceholder;

        const modalTriggerClickEventHandler = function (e, $modalTrigger) {
            e.preventDefault();
            const modalTarget = $modalTrigger.dataset.nmodal;
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
                    .querySelectorAll(".nModal-button")
                    .forEach(function ($element) {
                        $element.addEventListener("click", function (e) {
                            e.preventDefault();

                            if ($element.dataset.nmodalCallback) {
                                window[$element.dataset.nmodalCallback]($newElement);
                            }
                        });
                    });
            }
        };

        if (!$modalContainer) {
            const $_container = document.createElement("div");
            $_container.setAttribute("id", "nModal-container");
            document.body.insertAdjacentElement("afterbegin", $_container);

            const $_modalPlaceholder = document.createElement("div");
            $_modalPlaceholder.setAttribute("id", "nModal-placeholder");
            $_container.insertAdjacentElement("afterbegin", $_modalPlaceholder);

            $modalContainer = $_container;
            $modalPlaceholder = $_modalPlaceholder;
        }

        $modalContainer.addEventListener("click", function (e) {
            if (
                e.target.id === "nModal-container" ||
                e.target.classList.contains("nModal-button__cancel")
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
    };

    this.close = function () {
        let $modalContainer = document.querySelector("#nModal-container");
        $modalContainer.classList.toggle("active");
    };

    window.nModal = {
        init: this.init,
        close: this.close
    };
})();


document.addEventListener("DOMContentLoaded", function (event) {
    nModal.init({
        watch: true
    });

    window.callback = function (arg) {
        console.info('Callback', arg);
        nModal.close();
    }

});