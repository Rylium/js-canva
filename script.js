window.addEventListener("load", () => {
  console.log("Canva chargé!");

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  let colorPicker = document
    .getElementById("colorPicker")
    .addEventListener("change", onChangeColor);

  let painting = false;
  let draws, path, lastId, path1;

  // Récupération des données de l'Api
  function getDraw() {
    $.ajax("https://api.draw.codecolliders.dev/paths").done(function (data) {
      console.log(data);
      draws = data;
      for (const draw of draws) {
        lastId = draw.id;
        path = draw.path;
        ctx.beginPath;
        ctx.strokeStyle = draw.strokeColor;
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
