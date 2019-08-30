<script>
    export let title;
    export let description;
    export let size;
</script>

<style>
    .description {
        font-size: 0.8rem;
    }
    .card {
       align-self: flex-start;
    }
</style>

<div class="card {size||""}">
    <h2>{title}
    {#if description}
         <div class="description">{description}</div>
    {/if}
    </h2>
    <slot />
</div>