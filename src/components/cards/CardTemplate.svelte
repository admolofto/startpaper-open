<script>
  export let padding = false,
    background = true,
    overflow = false,
    editmode;

  let overflowCss = overflow ? 'overlay' : 'hidden';
</script>

<div
  class="card-template"
  class:overflow={!overflow}
  class:background
  class:normal-shadow={background && !editmode}
  class:padding
  class:editmode
  style="--overflow: {overflowCss};"
  on:mousedown
>
  <slot />
</div>

<style>
  .card-template {
    width: 100%;
    height: 100%;
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
  }
  .padding {
    padding: 1rem;
  }
  .normal-shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  .editmode {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
</style>
