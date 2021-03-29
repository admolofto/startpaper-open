<script>
  import { onMount } from 'svelte';

  export let cardStore, cardId, flipCard;

  const img = new Image();
  let imgRatio;
  $: img.src = $cardStore.path;

  img.onload = () => {
    imgRatio = img.width / img.height;
  };

  let containerRef;
  let startPos = {};
  let startObjPos = {};
  let direction;

  $: objPosCss = `${$cardStore.objPos.X}% ${$cardStore.objPos.Y}%`;

  onMount(() => {
    cardStore.setIsRepositioning(false);
  });

  const handleDoneClick = () => {
    console.log('run');
    cardStore.setIsRepositioning(false);
    flipCard(cardId, 'opts', { optionsFlip: true });
  };

  const handleMousedown = (e) => {
    if (!$cardStore.isRepositioning) return;
    e.preventDefault();
    const containerRatio =
      containerRef.offsetWidth / containerRef.offsetHeight;
    direction = 'Y';
    let reset = 'X';
    if (containerRatio < imgRatio) {
      direction = 'X';
      reset = 'Y';
    }
    startPos[reset] = 50;
    startObjPos[reset] = 50;
    cardStore.setObjPos(reset, 50);

    startPos[direction] = e[`page${direction}`];
    startObjPos[direction] = $cardStore.objPos[direction];

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
  };

  const handleMousemove = (e) => {
    let difference =
      e[`page${direction}`] - startPos[direction];
    let newObjPos = Math.min(
      100,
      Math.max(startObjPos[direction] - difference, 0)
    );
    cardStore.setObjPos(direction, newObjPos);
  };

  const handleMouseup = () => {
    window.removeEventListener(
      'mousemove',
      handleMousemove
    );
    window.removeEventListener('mouseup', handleMouseup);
  };
</script>

<div
  class="photo"
  bind:this={containerRef}
  on:mousedown={handleMousedown}
>
  {#if $cardStore.isRepositioning}
    <div>
      <button
        class="photo__repos--button"
        on:click={handleDoneClick}
      >
        Done
      </button>
      <div class="photo__repos--outer">
        <div class="photo__repos--inner">
          Drag to reposition
        </div>
      </div>
    </div>
  {/if}
  <img
    class="photo__image"
    style="--objPos: {objPosCss}"
    src={$cardStore.path}
    alt="missing"
  />
</div>

<style>
  .photo {
    width: 100%;
    height: 100%;
  }
  .photo__repos--button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .photo__repos--outer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  .photo__repos--inner {
    background: rgba(255, 255, 255, 0.75);
    border-radius: 10px;
    padding: 0.5rem 0.1rem;
    font-size: small;
  }
  .photo__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    object-position: var(--objPos);
  }
</style>
