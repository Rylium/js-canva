window.addEventListener('load', () => {
    console.log("Document chargé");

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");
    const pencilWidth = document.getElementById('textbox_id').value

    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //variables
    let painting = false;

    //methods
    function startPosition(e) {
        painting = true;

        //when click only
        draw(e)
    }

    function finishedPosition() {
        painting = false;

        //after start from new position
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        //style
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

    }

    //listener
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})