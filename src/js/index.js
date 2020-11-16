for (const style of document.querySelectorAll('link[rel="preload"][as="style"]')) {
    style.rel = "stylesheet";
}
biws.stickyParallax({ containerSelector: ".pages" });
biws.stickyParallax({ containerSelector: ".bullets" });