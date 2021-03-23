<div class="card-template" on:mousedown>
  <slot />
</div>

<style>
  .card-template {
    width: 100%;
    height: 100%;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow: auto;
  }
</style>
