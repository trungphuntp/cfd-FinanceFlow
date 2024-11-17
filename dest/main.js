// handle Lenis scroll
const lenis = new Lenis();
function handleLenisScroll() {
    lenis.on("scroll", (e) => {});

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
window.addEventListener("load", handleLenisScroll());

// menu Mobile
function handleMenuMobile() {
    // hamberger
    const btnMenuMobile = document.querySelector(
        ".header .header__right .header__right-btnmenumobile"
    );
    // menu header mobile
    const menuMobile = document.querySelector(".menumobile");

    btnMenuMobile?.addEventListener("click", () => {
        btnMenuMobile?.classList.toggle("--active");
        handleMenu();
    });
    function handleMenu() {
        if (btnMenuMobile?.classList.contains("--active")) {
            menuMobile?.classList.add("--active");
            document.body.classList.add("--disable-scroll");
            lenis.stop();
        } else {
            menuMobile?.classList.remove("--active");
            document.body.classList.remove("--disable-scroll");
            lenis.start();
        }
        handleHeaderColor();
    }
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991.98) {
            btnMenuMobile?.classList.remove("--active");
            handleMenu();
        }
    });

    // change color khi scroll -> khắc phục lenis
    const header = document.querySelector(".header");
    function handleHeaderColor() {
        if (!header) return;
        if (menuMobile.classList.contains("--active")) {
            header.style.background = "transparent";
        } else {
            if (window.scrollY > header.offsetHeight) {
                header.style.background = "var( --blue-color)";
            } else {
                header.style.background = "transparent ";
            }
        }
    }
    window.addEventListener("scroll", () => {
        handleHeaderColor();
    });
}
window.addEventListener("load", handleMenuMobile());
function handleHeader() {
    const header = document.querySelector(".header");
    const menuMobile = document.querySelector(".menumobile");

    function monifyHeader() {
        if (!header) return;
        let heightHeader = header.offsetHeight;
        window.addEventListener("scroll", () => {
            if (window.scrollY > heightHeader) {
                header.style.background = "var( --blue-color)";
                header.style.height = "var( --height-header-scroll)";
            } else {
                header.style.background = "transparent ";
                header.style.height = "var( --height-header)";
            }
        });
    }
    if (menuMobile.classList.contains("--active")) {
        monifyHeader();
    }
}
window.addEventListener("load", handleHeader());

// slider user say
function handleUserSay() {
    let users = document.querySelector(".scusersay .banneruser");
    if (!users) return;
    // set Width User
    setWidthUser();
    function setWidthUser() {
        let list = document.querySelectorAll(
            ".scusersay .banneruser .banneruser__item"
        );
        let widthContainer = document.querySelector(".container").offsetWidth;

        if (!list) return;
        if (!widthContainer) return;
        list?.forEach((item) => {
            if (window.innerWidth > 576 && window.innerWidth < 991.98) {
                item.style.width = "calc(90%)";
            } else if (window.innerWidth < 575.98) {
                // width 100% - khoảng cách muốn dư ra;
                item.style.width = "calc(100% - 32px)";
            } else {
                item.style.width = `calc((${widthContainer}px - var( --pd-container) * 2) / 2 - var(--gap-slider) / 2 )`;
            }
        });
    }

    setHeightUsers();
    // set Height User
    function setHeightUsers() {
        let list = document.querySelectorAll(
            ".scusersay .banneruser .banneruser__item"
        );
        let maxHeightItem = 0;

        if (!list) return;
        list?.forEach((item) => {
            item.style.height = `fit-content`;
            if (item.offsetHeight > maxHeightItem) {
                maxHeightItem = item.offsetHeight;
            }
        });

        list?.forEach((item) => {
            item.style.height = `${maxHeightItem}px`;
        });
    }
    if (window.innerWidth < 991.98) {
        setPaddingLeft();
    }
    function setPaddingLeft() {
        let view = document.querySelector(
            ".scusersay .banneruser .flickity-viewport"
        );
        if (!view) return;
    }

    // create slider
    let flkty = new FlickityResponsive(users, {
        // options
        cellAlign: "center",
        contain: true,
        groupCells: 2,
        draggable: ">1",
        wrapAround: true,
        pageDots: true,
        prevNextButtons: false,
        selectedAttraction: 0.01,
        friction: 0.2,

        responsive: [
            {
                breakpoint: 991.98,
                settings: {
                    groupCells: 1,
                    cellAlign: "left",
                },
            },
        ],
    });

    window.addEventListener("resize", () => {
        setWidthUser();
        setHeightUsers();
        if (window.innerWidth < 991.98) {
            setPaddingLeft();
        }
    });
}
window.addEventListener("load", handleUserSay());

// handle popup video
function handlePopupVideo() {
    let btnPlay = document.querySelectorAll("[data-btn-video]"),
        popupVideo = document.querySelector(".popupvideo"),
        btnClose = document.querySelector(
            ".popupvideo .popupvideo__inner .popupvideo__inner-frame .close"
        ),
        frame = popupVideo.querySelector(".frame");

    btnPlay?.forEach((btn) => {
        btn?.addEventListener("click", () => {
            let srcViddeo = btn?.dataset.videoSrc;
            if (!srcViddeo) return;

            popupVideo?.classList.add("--active");
            frame?.setAttribute(
                "src",
                `https://www.youtube.com/embed/${srcViddeo}&autoplay=1`
            );
            document.body.classList.add("--disable-scroll");
            lenis.stop();
        });
    });
    popupVideo?.addEventListener("click", () => {
        handleRemovePopup();
    });
    btnClose?.addEventListener("click", () => {
        handleRemovePopup();
    });

    function handleRemovePopup() {
        popupVideo?.classList.remove("--active");
        frame?.setAttribute("src", "");
        document.body.classList.remove("--disable-scroll");
        lenis.start();
    }
}
window.addEventListener("load", handlePopupVideo());

// handle back to top
function handleBackToTop() {
    const btnBackToTop = document.querySelector(
        ".footer .footer__bottom .footer__bottom-gotop"
    );
    let container = document.querySelector(".container");

    // scroll 1/2 page active btn back to top
    window.addEventListener("scroll", () => {
        if (
            window.scrollY + window.innerHeight >=
            document.body.offsetHeight / 2
        ) {
            btnBackToTop?.classList.add("--active");
        } else {
            btnBackToTop?.classList.remove("--active");
        }
    });

    // click btn back to top
    btnBackToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // set position cho btn back to top
    function setPositionBtn() {
        let widthContainer = document.querySelector(".container").offsetWidth;

        if (!widthContainer) return;
        if (!btnBackToTop) return;
        btnBackToTop.style.right = `calc((100vw - (${widthContainer}px - var(--pd-container) * 2)) / 2 )`;
    }
    setPositionBtn();

    window.addEventListener("resize", () => {
        setPositionBtn();
    });
}
window.addEventListener("load", handleBackToTop());

// Scroll Progress Bar
function progressScrollBar() {
    let progressBar = document.querySelector(".progressbar .line");

    if (!progressBar) return;
    window.addEventListener("scroll", () => {
        setWidthProgressBar();
    });
    function setWidthProgressBar() {
        progressBar.style.width = `${Math.round(
            (window.scrollY /
                (document.body.offsetHeight - window.innerHeight)) *
                100
        )}%`;
    }
}
window.addEventListener("load", progressScrollBar());

// Loading
function handleLoading() {
    const loading = document.querySelector(".loading");
    let lineLoading = document.querySelector(".loading .line .line__progress");
    let percentText = document.querySelector(".loading .percent ");
    let imgs = document.querySelectorAll("img");
    let imgsLenght = document.querySelectorAll("img").length;
    let loadedImgs = imagesLoaded(imgs);
    let countImgs = 0;

    loadedImgs.on("done", () => {
        hiddenLoading();
    });
    loadedImgs.on("fail", () => {
        console.log("fail");
    });
    loadedImgs.on("progress", () => {
        handleLoadProgress();
    });
    function handleLoadProgress() {
        countImgs++;

        if (!lineLoading) return;
        lineLoading.style.width = `${Math.round(
            (countImgs / imgsLenght) * 100
        )}%`;

        if (!percentText) return;
        percentText.innerText = `${Math.round(
            (countImgs / imgsLenght) * 100
        )}%`;
    }

    function hiddenLoading() {
        loading.classList.add("--hide");
    }
}
handleLoading();

// set padding khi không có container
// gắn data-padding vào thử muốn padding
// data-padding = "left" hoac "right"
function handlePadding() {
    let elements = document.querySelectorAll("[data-padding]");
    elements.forEach((item) => {
        if (window.innerWidth < 991.98) {
            settingPadding(item, true);
        } else {
            settingPadding(item);
        }
    });

    window.addEventListener("resize", () => {
        elements.forEach((item) => {
            if (window.innerWidth < 991.98) {
                settingPadding(item, true);
            } else {
                settingPadding(item);
            }
        });
    });

    function settingPadding(ele, center = false) {
        let container = document.querySelector(".container");
        let pos;
        if (center) {
            pos = "center";
        } else {
            pos = ele.dataset.padding;
        }

        if (!ele) return;
        if (pos === "left") {
            ele.style.paddingLeft = `min(calc(${
                window.innerWidth - container.offsetWidth
            }px /2  + var(--pd-container)),
             calc( (var( --max-width-page) - ${
                 container.offsetWidth
             }px) /2  + var(--pd-container)))`;
        } else if (pos === "right") {
            ele.style.paddingRight = `min(calc(${
                window.innerWidth - container.offsetWidth
            }px /2  + var(--pd-container)), calc( (var( --max-width-page) - ${
                container.offsetWidth
            }px) /2  + var(--pd-container)))`;
        } else if (pos === "center") {
            ele.style.paddingRight = `min(calc(${
                window.innerWidth - container.offsetWidth
            }px /2  + var(--pd-container)), calc( (var( --max-width-page) - ${
                container.offsetWidth
            }px) /2  + var(--pd-container)))`;
            ele.style.paddingLeft = `min(calc(${
                window.innerWidth - container.offsetWidth
            }px /2  + var(--pd-container)), calc( (var( --max-width-page) - ${
                container.offsetWidth
            }px) /2  + var(--pd-container)))`;
        } else {
            return;
        }
    }
}
window.addEventListener("load", handlePadding());

// handle accordian
// gắn data-accordian lên item
// gắn data-accordian-head lên head của item
// gắn data-accordian-body lên body của item
function handleAccordian() {
    let listAcorrdian = document.querySelectorAll("[data-accordian] ");
    listAcorrdian?.forEach((itemAccordian) => {
        let bodyItem = itemAccordian?.querySelector("[data-accordian-body]");
        itemAccordian?.addEventListener("click", () => {
            if (!itemAccordian.isEqualNode(getActiveCurrent())) {
                removeActiveItem();
            }
            itemAccordian?.classList.toggle("--active");
            if (itemAccordian?.classList.contains("--active")) {
                if (!bodyItem) return;
                bodyItem.style.height = `${bodyItem.scrollHeight}px`;
                bodyItem.style.marginTop = `16px`;
            } else {
                if (!bodyItem) return;
                bodyItem.style.height = `0px`;
                bodyItem.style.marginTop = `0px`;
            }
        });
    });
    function getActiveCurrent() {
        let result;
        listAcorrdian?.forEach((itemAccordian) => {
            if (itemAccordian.classList.contains("--active")) {
                result = itemAccordian;
            }
        });
        return result;
    }

    function removeActiveItem() {
        listAcorrdian?.forEach((itemAccordian) => {
            let bodyItem = itemAccordian?.querySelector(
                "[data-accordian-body]"
            );
            itemAccordian?.classList.remove("--active");
            if (itemAccordian?.classList.contains("--active")) {
                if (!bodyItem) return;
                bodyItem.style.height = `${bodyItem.scrollHeight}px`;
                bodyItem.style.marginTop = `16px`;
            } else {
                if (!bodyItem) return;
                bodyItem.style.height = `0px`;
                bodyItem.style.marginTop = `0px`;
            }
        });
    }
}
window.addEventListener("load", handleAccordian());
// handle tab js
// gắn data-tab-btn vào btn control ẩn hiện
// gắn data-tab-item vào item muốn hiện khi bấm vào btn
function handleTabsJS() {
    let btns = document.querySelectorAll("[data-tab-btn]");
    let items = document.querySelectorAll("[data-tab-item]");

    btns.forEach((btn) => {
        btn?.addEventListener("click", () => {
            let attrBtn = btn?.dataset.tabBtn;
            removeActiveTab();
            showContent(attrBtn);
            btn?.classList.add("--active");
        });
    });

    function showContent(attr) {
        items?.forEach((item) => {
            let attrItem = item?.dataset.tabItem;
            if (attrItem === attr) {
                item?.classList.remove("--hide");
            } else {
                item?.classList.add("--hide");
            }
        });
    }
    function removeActiveTab() {
        btns.forEach((btn) => {
            btn?.classList.remove("--active");
        });
    }
}
window.addEventListener("load", handleTabsJS());

// ----- validate form (chỉ kiểm tra input và textarea) -----
// gắn data-form vào thẻ CHA của các groupform;
//  gắn data-form-btn vào button SUBMIT của form

// gắn các thẻ sau vào formgroup cần validate:
// - data-form-no-fill : kiểm tra không điền
// - data-form-email : kiểm tra email
// - data-form-fullname : kiểm tra fullname

// - data-form-textarea nếu là textarea --- !important ---

function handleValidateForm() {
    let btns = document.querySelectorAll("[data-form-btn]");

    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            let parentForm = getParentBuAttr(btn, "data-form");
            if (handleNoFill(parentForm)) {
                handleEmail(parentForm);
                handleFullName(parentForm);
                handleTextarea(parentForm);
                handlePopupSubmit();
            }
        });
    });

    // get parent
    function getParentBuAttr(ele, attr = "") {
        while (ele?.parentNode) {
            if (ele?.parentNode.hasAttribute(attr)) {
                return ele?.parentNode;
            } else {
                ele = ele?.parentNode;
            }
        }
        return;
    }

    // handle check error
    function isError(form) {
        let messages = form.querySelectorAll(".message");
        let result = true;
        messages.forEach((message) => {
            if (message.innerText.trim() !== "") {
                result = false;
            }
        });

        return result;
    }

    // handle show popup submit
    function handlePopupSubmit() {
        let forms = document.querySelectorAll("[data-form]");
        const popupMessage = document.querySelector(".messagesuccess");
        const btnPopupMessage = document.querySelector(
            ".messagesuccess .messagesuccess__body .btn"
        );

        forms.forEach((form) => {
            if (isError(form)) {
                popupMessage.classList.add("--active");
            } else {
                popupMessage.classList.remove("--active");
            }
        });

        function hidePopupSubmit(closeItem) {
            closeItem.addEventListener("click", () => {
                popupMessage.classList.remove("--active");
            });
        }

        hidePopupSubmit(btnPopupMessage);
        hidePopupSubmit(popupMessage);
    }

    // handle no fill
    function handleNoFill(parentForm) {
        let formRequests = parentForm?.querySelectorAll("[data-form-no-fill]");
        let result;
        formRequests?.forEach((form) => {
            let inputForm = form?.querySelector("input");
            if (inputForm?.value.trim() == "") {
                checkError(form, "Please fill in this field");
                result = false;
            } else {
                checkError(form, "");
                result = true;
            }
        });

        return result;
    }
    function handleTextarea(parentForm) {
        let formRequests = parentForm?.querySelectorAll("[data-form-textarea]");
        formRequests?.forEach((form) => {
            let textareaInput = form?.querySelector("textarea");
            if (textareaInput?.value.trim() == "") {
                checkError(form, "Please fill in this field");
            } else {
                checkError(form, "");
            }
        });
    }
    // handle Email
    function handleEmail(parentForm) {
        let formRequests = parentForm?.querySelectorAll("[data-form-email]");
        formRequests?.forEach((form) => {
            let inputForm = form?.querySelector("input");
            const regex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!regex.test(inputForm?.value.trim().toLowerCase())) {
                checkError(form, "Invalid email");
            } else {
                checkError(form, "");
            }
        });
    }
    // full name
    function handleFullName(parentForm) {
        let formRequests = parentForm?.querySelectorAll("[data-form-fullname]");
        formRequests?.forEach((form) => {
            let inputForm = form?.querySelector("input");
            const regex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;

            if (!regex.test(inputForm?.value.trim().toLowerCase())) {
                checkError(form, "Invalid fullname");
            } else {
                checkError(form, "");
            }
        });
    }

    // function check
    function checkError(form, message = "") {
        let errorMessage = form?.querySelector(".message");
        if (message !== "") {
            errorMessage.innerText = message;
        } else {
            errorMessage.innerText = "";
        }
    }
}
window.addEventListener("load", handleValidateForm());
