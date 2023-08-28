window.addEventListener("load", () => {
    var style = document.createElement('style');
    style.innerHTML = `
    #titlecard, .app-horizontal-widget-holder, .app-bottom-content-anchor, .app-viewcard-strip, #image-header, .scene-footer-container, #watermark, .id-interactive-hovercard, .hdeJwf {
      display: none;
    }
    `
    document.body.appendChild(style);
});