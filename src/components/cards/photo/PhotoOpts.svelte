<script>
  import Icon from '../../Icon.svelte';
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore, cardId, flipCard;

  let value = $cardStore.path;

  const handleRepositionClick = () => {
    cardStore.setIsRepositioning(true);
    flipCard(cardId, 'front', { optionsFlip: true });
  };
</script>

<OptionsSection header="Link" layout="y">
  <InputText bind:value />
</OptionsSection>
<OptionsSection header="Reposition">
  <button on:click={handleRepositionClick}>
    <Icon icon="reposition" />
  </button>
</OptionsSection>
