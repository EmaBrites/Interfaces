const elems = document.querySelectorAll(".layer");
document.querySelector(".hero").addEventListener("mousemove", parallax);
function parallax(e) {
    let _w = window.innerWidth/2;
    let _h = window.innerHeight/2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    for (let index = 0; index < elems.length; index++) {
        const elem = elems[index];
        let _depth = `${50 - (_mouseX - _w) * ((index+1)/100)}% ${50 - (_mouseY - _h) * ((index+1)/100)}%`;
        console.log(_depth);
        elem.style.backgroundPosition = _depth;
    }
}