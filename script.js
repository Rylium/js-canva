window.addEventListener('load', () => {
    console.log("document loaded");

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");

    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //variables
    let painting = false;

    //methods
    function startPosition(e) {
        painting = true;
        console.log("in progress...");

        //when click only
        draw(e)
    }

    function finishedPosition() {
        painting = false;
        console.log("end paint");

        //after start from new position
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        //style
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

    }

    //listener
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})