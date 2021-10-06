window.addEventListener("load", () => {

    // Déclaration des variables
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let colorPicker = document
        .getElementById("colorPicker")
        .addEventListener("change", onChangeColor);
    let painting = false;
    let draws, path, lastId;


    // Récupération des données de l'Api
    function getDraw() {
        $.ajax("https://api.draw.codecolliders.dev/paths").done(function(data) {
            for (const draw of data) {
                ctx.beginPath();
                ctx.strokeStyle = draw["strokeColor"];
                ctx.lineWidth = draw["lineWidth"];
                ctx.moveTo(draw.path[0], draw.path[1]);
                for (const path of draw.path) {
                    ctx.lineTo(path[0], path[1]);
                }
                ctx.stroke();
            }
        });
    }

    // Ajout de dessins a l'API
    function sendDraw() {
        $.ajax({
            url: "https://api.draw.codecolliders.dev/paths/add",
            headers: {
                "x-api-key": token,
                "Content-Type": "application/json",
            },
            method: "post",
            data: JSON.stringify({}),
            processData: false,
        }).done();
    }

    // Exécution de la fonction + Rafraîchissement des données 
    getDraw();
    setInterval(getDraw, 2000);

    // Fonction au changement de couleur
    function onChangeColor() {
        ctx.strokeStyle = this.value;
    }

    //methods
    function startPosition(e) {
        painting = true;

        //when click only
        draw(e);
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
        ctx.lineWidth = document.getElementById("pencilWidth").value;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }

    // Ajout d'event
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});