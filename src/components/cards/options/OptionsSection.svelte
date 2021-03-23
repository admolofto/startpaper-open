<script>
  export let layout = 'x',
    header = 'option header';
</script>

<div
  class={`flex ${
    layout === 'x' ? 'items-center' : 'flex-col'
  }`}
>
  <h1
    class="text-sm font-medium text-gray-600 mr-3 w-20 mb-1"
  >
    {header}
  </h1>
  <slot />
</div>
