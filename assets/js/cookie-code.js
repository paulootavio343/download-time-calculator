const htmlContainer = document.querySelector(".cookieConsentContainer");
const acceptButton = document.querySelector(".accepted");
const refuseButton = document.querySelector(".refused");

acceptButton.addEventListener('click', () => {
    setCookie("TD_Cookie_AC8ZE78G", "TD_bMW_uQQ2QGrpBP1i4GV2NQ", 7);
    fadeOut(htmlContainer);
})

refuseButton.addEventListener('click', () => {
    fadeOut(htmlContainer);
})

function fadeIn(container) {
    container.style.opacity = 0;
    container.style.display = "block";

    (function showContainer() {
        let transparency = parseFloat(container.style.opacity);
        (transparency += .02) > 1 || (container.style.opacity = transparency, requestAnimationFrame(showContainer))
    })()
}

function fadeOut(container) {
    container.style.opacity = 1;

    (function hideContainer() {
        (container.style.opacity -= .02) < 0 ? container.style.display = "none" : requestAnimationFrame(hideContainer)
    })()
}

function setCookie(item, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = item + "=" + value + expires + "; path=/";
}

function eraseCookie(item) {
    document.cookie = item + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function cookieConsent() {
    if (!document.cookie.includes("TD_Cookie_AC8ZE78G")) {
        fadeIn(htmlContainer);
    }
}

cookieConsent();
