<script>
    export let color = "#ffffff";
</script>

<style>
    div.color {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: thin solid #333;
        padding-left: 1em;
    }
</style>

<div>
    <div class="color shadowed rounded" style="background-color: {color}">&nbsp;</div>
    <span>{color}</span>
</div>