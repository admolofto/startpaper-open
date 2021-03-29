<script>
  import InputDraggablePhoto from '../../inputs/InputDraggablePhoto.svelte';

  export let cardStore, cardId, flipCard;
</script>

<InputDraggablePhoto {cardStore} {cardId} {flipCard} />
