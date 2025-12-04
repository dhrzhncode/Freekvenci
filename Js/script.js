const root = document.documentElement;
const scrollTarget = document.scrollingElement || document.documentElement;

function updateFakeScrollbar() {
    const vh = window.innerHeight;
    const scrollHeight = scrollTarget.scrollHeight;
    const scrollTop = scrollTarget.scrollTop;

    const ratio = vh / scrollHeight;
    const thumbH = Math.max(ratio * vh, 40);                 // min thumb size
    const trackLen = vh - thumbH;
    const top = (scrollTop / (scrollHeight - vh || 1)) * trackLen;

    root.style.setProperty("--thumb-height", thumbH + "px");
    root.style.setProperty("--thumb-top", top + "px");
}

window.addEventListener("scroll", updateFakeScrollbar, { passive: true });
window.addEventListener("resize", updateFakeScrollbar);
updateFakeScrollbar();



// WaveForm
