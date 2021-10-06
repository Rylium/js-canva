window.addEventListener("load", () => {
    console.log("Canva chargé!");

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let colorPicker = document
        .getElementById("colorPicker")
        .addEventListener("change", onChangeColor);

    let painting = false;
    let draws, path, lastId;

    // Récupération des données de l'Api
    function getDraw(lastId) {
        $.ajax("https://api.draw.codecolliders.dev/paths").done(function (data) {
            // console.log(data);
            draws = data;
            for (const draw of draws) {
                lastId = draw.id;
                path = draw.path;

                path.forEach(element => console.log(element[1]));
                // Pour chaqué element, redéfinir chaque sous-élément sous "element" et choisir d'afficher sa première propriété (x)
                path.forEach(element => console.log(element[2])); // (y)
            }
        });
    }
    getDraw();


    function onChangeColor() {
        ctx.strokeStyle = this.value;
    }

    //methods
    function startPosition(e) {
        painting = true;
        console.log(imgData)
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

    //listener
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});