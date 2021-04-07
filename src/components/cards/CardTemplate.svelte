<script>
  export let padding = '1rem',
    background = true,
    overflow = false;

  let overflowCss = overflow ? 'overlay' : 'hidden';
</script>

<div
  class="card-template"
  class:overflow={!overflow}
  class:background
  style="--padding: {padding}; --overflow: {overflowCss};"
  on:mousedown
>
  <slot />
</div>

<style>
  .card-template {
    width: 100%;
    height: 100%;
    padding: var(--padding);
    background: none;
    border-radius: 10px;
    overflow: hidden;
  }
  .card-template:hover {
    overflow-y: var(--overflow);
  }
  .overflow {
    overflow: hidden;
  }
  .background {
    background: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
</style>
