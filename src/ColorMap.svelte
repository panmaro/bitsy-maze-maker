<script>
    import ColorItem from "./ColorItem.svelte"
    export let colors = {colors:[], tiles:[], exits: [], unknown: []};
</script>

<style>
    .colors {
        padding-left: 1rem;
    }
</style>

{#if colors.colors.length}
<div>
<h4>
    Used colors:
</h4>
    <div class="colors">
        {#each colors.colors as color}
            <ColorItem bind:color={color}/>
        {/each}
    </div>
</div>
{/if}


{#if colors.tiles.length}
<div>
<h4>
    Tiles colors:
</h4>
    <div class="colors">
        {#each colors.tiles as color}
            <ColorItem bind:color={color}/>
        {/each}
    </div>
</div>
{/if}

{#if colors.exits.length}
<div>
<h4>
    Exits colors:
</h4>
    <div class="colors">
        {#each colors.exits as color}
            <ColorItem bind:color={color}/>
        {/each}
    </div>
</div>
{/if}

{#if colors.unknown.length}
<div>
<h4>
    Unknown colors:
</h4>
    <div class="colors">
        {#each colors.unknown as color}
            <ColorItem bind:color={color}/>
        {/each}
    </div>
</div>
{/if}