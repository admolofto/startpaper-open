<script>
  export let layout = 'x',
    header = 'option header';
</script>

<div
  class="options-section"
  class:options-section--layout-x={layout === 'x'}
  class:options-section--layout-y={layout === 'y'}
>
  <h1 class="options-section__header">
    {header}
  </h1>
  <slot />
</div>

<style>
  .options-section {
    display: flex;
    margin-bottom: 2rem;
  }
  .options-section--layout-x {
    align-items: center;
  }
  .options-section--layout-y {
    flex-direction: column;
  }
  .options-section__header {
    font-size: small;
    font-weight: 600;
    color: darkslategray;
    margin-right: 0.25rem;
    width: 5rem;
    margin-bottom: 0.25rem;
  }
</style>
