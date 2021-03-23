<script>
  export let isDragging = false;

  let startPos = {};
  let distanceMoved = {};

  $: if (distanceMoved.x > 6 || distanceMoved.y > 6) {
    isDragging = true;
  }

  const handleMousedown = (e) => {
    startPos.x = e.pageX;
    startPos.y = e.pageY;
    distanceMoved = { x: 0, y: 0 };
  };

  const handleMouseup = (e) => {
    distanceMoved.x = Math.abs(startPos.x - e.pageX);
    distanceMoved.y = Math.abs(startPos.y - e.pageY);
    if (distanceMoved.x > 20 || distanceMoved.y > 20) {
      isDragging = true;
    }
    setTimeout(() => {
      isDragging = false;
    }, 100);
  };
</script>

<div
  class="detect-drag"
  on:mousedown={handleMousedown}
  on:mouseup={handleMouseup}
>
  <slot {isDragging} />
</div>

<style>
  .detect-drag {
    width: 100%;
    height: 100%;
  }
</style>
