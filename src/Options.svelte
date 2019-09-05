<script>

    export let options = {
        roomWidth: 16,
        roomHeight: 16,
        horizontalLoop: true,
        verticalLoop: true,
        pixelMaps: ["#000000 1", '#ffffff 0', '#ff0000 2,3,4'].join('\r\n'),
        roomIndexOffset: 0,
    }

</script>

<style>
    #pixelMaps {
        font-family: monospace;
    }
    
</style>

<label for="roomWidth">Room width: {options.roomWidth}</label>
<input type="range" id="roomWidth" min="2" max="16" bind:value={options.roomWidth}>

<label for="roomHeight">Room height: {options.roomHeight}</label>
<input type="range" id="roomHeight" min="2" max="16" bind:value={options.roomHeight}>

<label for="horizontalLoop">Horizontal Loop</label>
<input type="checkbox" id="horizontalLoop" text="Horizontal Loop" bind:checked={options.horizontalLoop}>

<label for="verticalLoop">Vertical Loop</label>
<input type="checkbox" id="verticalLoop" text="Vertical Loop" bind:checked={options.verticalLoop}>

<label for="roomIndexOffset">Room index offset</label>
<input type="number" id="roomIndexOffset" text="Room index offset" bind:value={options.roomIndexOffset}>

<label for="pixelMaps">Color mapping</label>
<textarea id="pixelMaps" bind:value={options.pixelMaps}></textarea>