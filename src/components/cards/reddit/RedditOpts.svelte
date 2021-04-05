<script>
  import Select from 'svelte-select';
  import OptionsSection from '../OptionsSection.svelte';

  export let cardStore;

  const getSubreddits = async (filterText) => {
    const response = await fetch(
      `https://www.reddit.com/subreddits/search.json?q=${filterText}`
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.data.children;
  };

  let selectedValue = $cardStore.subreddits;

  let loadOptions = getSubreddits;

  const optionIdentifier = 'data';

  const getOptionLabel = (option) =>
    option.data.display_name;

  const getSelectionLabel = (option) =>
    option.data.display_name_prefixed;

  const handleSelect = (e) => {
    cardStore.setSubreddits(e.detail);
  };
</script>

<OptionsSection layout="y" header="Subreddits">
  <div class="reddit-opts__multi-select">
    <Select
      isMulti={true}
      {selectedValue}
      {loadOptions}
      {getOptionLabel}
      {getSelectionLabel}
      {optionIdentifier}
      on:select={handleSelect}
    />
  </div>
</OptionsSection>

<style>
  .reddit-opts__multi-select {
    max-width: 17rem;
  }
</style>
