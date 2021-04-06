<script>
  export let padding = '1rem',
    overflow = false;
</script>

<div
  class="card-template"
  class:overflow={!overflow}
  style="--padding: {padding}"
  on:mousedown
>
  <slot />
</div>

<style>
  .card-template {
    width: 100%;
    height: 100%;
    padding: var(--padding);
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
  .card-template:hover {
    overflow-y: overlay;
  }
  .overflow {
    overflow: hidden;
  }
</style>
