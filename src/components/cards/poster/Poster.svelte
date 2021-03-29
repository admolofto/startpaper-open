<script>
  import InputDraggablePhoto from '../../inputs/InputDraggablePhoto.svelte';

  export let cardStore, cardId, flipCard;
</script>

<div class="poster">
  <InputDraggablePhoto {cardStore} {cardId} {flipCard} />
</div>

<style>
  .poster {
    width: 100%;
    height: 100%;
  }
</style>
