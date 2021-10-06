window.addEventListener('load', () => {
    console.log("Canva chargé!");

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

        //when click only
        draw(e)
    }

    function finishedPosition() {
        painting = false;

        //after start from new position
        ctx.beginPath();
        // POST 
        $.ajax({
            type: "POST",
            url: 'https://api.draw.codecolliders.dev/paths',
            data: data,
            success: success,
            dataType: dataType
        });
    }

    function draw(e) {
        if (!painting) return;

        //style
        ctx.lineWidth = document.getElementById('pencilWidth').value;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

    }

    //listener
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})