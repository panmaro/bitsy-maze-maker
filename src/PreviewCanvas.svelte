<script>
    
    const cw = 5, ch  = 5;

    export let room = null;

    function updateCanvas() {
        console.log('updateCanvas', room);

        if (!room) return;

        const canvas = document.querySelector('canvas.preview');
        const ctx = canvas.getContext("2d");

        let color, currentColor = null;

        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                
                if (room.exit(x,y)) {
                    color = "#22ff44";
                } else if (room.cell(x,y) === "0") {
                    color = "#ffffff";
                } else color = "#444444";
                
                if (color !== currentColor) {
                    ctx.fillStyle = color;
                    currentColor = color;
                }
                ctx.fillRect(x*cw, y*ch, cw - 1, ch - 1);
            }
        }     
    }

    $: room && updateCanvas();

</script>

<figure>
  <canvas class="preview bordered" width="80" height="80"></canvas>
  <figcaption>Room: {room&&room.name||"none"}</figcaption>
</figure>


