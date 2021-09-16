export const scrollToAnimation = (to, duration, calcHeader, cb) => {
    let final = document.querySelector(to);
    if(final == -1) {
        return;
    }
    const box = final.getBoundingClientRect();
    const body = document.body;
    const docEl = document.documentElement;
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    final = box.top + scrollTop - clientTop;
    if(calcHeader) {
        final-= document.querySelector('.header').offsetHeight
    }
    let start = window.scrollY || document.documentElement.scrollTop, currentTime = null;
    const animateScroll = (timestamp) => {
        if (!currentTime) currentTime = timestamp;        
        let progress = timestamp - currentTime;
        if(progress > duration) progress = duration;
        let val = easeInOutQuad(progress, start, final - start, duration);
        window.scrollTo(0, val);
        if(progress < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            cb && cb();
        }
    };
    window.requestAnimationFrame(animateScroll);
};

const easeInOutQuad = (t, b, c, d) => {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
}