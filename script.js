window.addEventListener('load', () => {
    console.log("Canva chargé!");

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext("2d");
    let colorPickerVal = document.getElementById('colorPicker').value;

    function colorPick() {
        ctx.strokeStyle = colorPickerVal;
    }
    colorPick()

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
        let apiData = "";
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