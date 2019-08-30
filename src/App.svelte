<script>
	import FileChooser from "./FileChooser.svelte"
	import Options from "./Options.svelte"
	import ColorMap from "./ColorMap.svelte"
	import MapPreview from "./MapPreview.svelte"

	import Box from "./Box.svelte"

	import {process} from './bmm/bmm'

	let canvas;
	let options;
	let colors;
	let rooms;
	let code = "";
	let needUpdate = false;

	function go() {
		
		let result;

		if (canvas) {
			result = process(canvas, options);
			console.log('res', result);
			colors = result.colors;
			rooms = result.rooms;
			
			code = Object.entries(rooms).map((entries) => entries[1].exportToBitsy()).join("\r\n\r\n");
			needUpdate = false;
		}
	}

	$: if (canvas || options) needUpdate = canvas && true;

</script>

<style>
	button.go:enabled {
		background-color: #3a3;
	}

    textarea {
        font-family: monospace;
    }
</style>

<header>mgg
</header>

<div class="container">
	<div class="row">
		<Box title="Input" description="Select image file and set parameters.">
			<FileChooser bind:canvas = {canvas}/>
			<Options bind:options = {options}/>
			<button class="go" on:click={go} disabled={!needUpdate}>Go!</button>
		</Box>

		<Box title="Colors">
			<ColorMap colors = {colors}/>
		</Box>

		<Box title="Output">
			<MapPreview rooms = {rooms} />		
		</Box>

		<Box title="Code" size=fluid>
			<textarea class="code" cols="50" rows="10">{code}</textarea>
		</Box>
	</div>
</div>