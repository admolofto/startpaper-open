<script>
  import Icon from '../../Icon.svelte';
  import InputText from '../../inputs/InputText.svelte';
  import OptionsSection from '../OptionsSection.svelte';
  import Select from 'svelte-select';

  export let cardStore, cardId, flipCard;

  const genres = [
    { value: '00', label: 'All' },
    { value: '28', label: 'Action' },
    { value: '12', label: 'Adventure' },
    { value: '35', label: 'Comedy' },
    { value: '80', label: 'Crime' },
    { value: '99', label: 'Documentary' },
    { value: '18', label: 'Drama' },
    { value: '14', label: 'Fantasy' },
    { value: '36', label: 'History' },
    { value: '27', label: 'Horror' },
    { value: '10749', label: 'Romance' },
    { value: '878', label: 'Sci-fi' },
    { value: '10752', label: 'War' },
    { value: '37', label: 'Western' },
  ];

  let selectedGenre = $cardStore.genreFilter;

  const handleGenreSelect = (e) => {
    cardStore.setGenreFilter(e.detail);
    console.log('run');
  };
</script>

<OptionsSection header="Genre" layout="y">
  <div class="options--select">
    <Select
      items={genres}
      selectedValue={selectedGenre}
      on:select={handleGenreSelect}
    />
  </div>
</OptionsSection>

<style>
  .options--select {
    width: 10rem;
  }
</style>
