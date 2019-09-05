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
                
                if (room.cell(x,y) === "0") {
                    color = "#ffffff";
                } else color = "#444444";
                
                ctx.fillStyle = color;
                ctx.fillRect(x*cw, y*ch, cw - 1, ch - 1);

                if (room.exit(x,y)) {
                    ctx.fillStyle = "#22ff44";
                    ctx.fillRect(x*cw + 1, y*ch + 1, cw - 3, ch - 3);
                } 
            }
        }     
    }

    $: room && updateCanvas();

</script>

<figure>
  <canvas class="preview bordered" width="80" height="80"></canvas>
  <figcaption>Room: {room&&room.name||"none"}</figcaption>
</figure>


