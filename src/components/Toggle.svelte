<script>
    export let toggleStatus = false;
</script>

<div class="toggle" class:toggleStatus>
    {#key toggleStatus}
        <div class="toggle__switch" />
    {/key}
</div>

<style>
    .toggle {
        display: flex;
        width: 28px;
        height: 18px;
        border: 1px solid var(--theme-colors-text);
        border-radius: 8px;
        align-items: center;
        padding: 0 0.15rem;
    }
    .toggle__switch {
        background: var(--theme-colors-text);
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    .toggleStatus {
        justify-content: flex-end;
        background: lightskyblue;
    }
</style>
