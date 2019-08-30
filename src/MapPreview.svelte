<script>
    import PreviewCanvas from "./PreviewCanvas.svelte";

    export let rooms = {};
    let currentRoom = 1;
    
    $: roomKeys = Object.keys(rooms);
    $: roomsCount = Object.keys(rooms).length;
    $: room = rooms[roomKeys[currentRoom - 1]];
</script>

<PreviewCanvas bind:room = {room} />
<label>
    Room: {currentRoom}/{roomsCount}
    <input type="range" disabled={roomsCount<=0} min=1 max={Math.max(1, roomsCount)} bind:value={currentRoom}>
</label>
