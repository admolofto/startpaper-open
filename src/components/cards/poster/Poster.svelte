<script>
  import { onMount } from 'svelte';
  import InputDraggablePhoto from '../../inputs/InputDraggablePhoto.svelte';

  export let cardStore, cardId, flipCard, isCardFlipped;

  const apiKey = '6b0c4f66ce4c706a64911a6348ae8442';

  $: filterValues = {
    genre: $cardStore.genreFilter.value,
  };

  $: movieDetails = `${$cardStore.movieTitle}, ${$cardStore.movieYear}`;
  $: movieTmdId = $cardStore.movieTmdbId.toString();

  $: urlTmdbMoviePage = `https://www.themoviedb.org/movie/${movieTmdId}`;

  $: mainTmdbUrl = createMainTmdbUrl(filterValues);
  $: updatePosterStore(mainTmdbUrl);

  const createRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const createMainTmdbUrl = (filters) => {
    let randomNum = createRandomNum(1, 3);
    let pageQuery = `&page=${randomNum}`;
    let genreFilterQuery =
      filters.genre !== '00'
        ? `&with_genres=${filters.genre}`
        : '';
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=en&include_adult=false${pageQuery}${genreFilterQuery}`;
  };

  const updatePosterStore = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    const randomNum = createRandomNum(
      0,
      data.results.length
    );

    cardStore.setPath(
      `https://image.tmdb.org/t/p/original${data.results[randomNum].poster_path}`
    );
    cardStore.setMovieTmdbId(data.results[randomNum].id);
    cardStore.setMovieTitle(data.results[randomNum].title);
    cardStore.setMovieYear(
      data.results[randomNum].release_date.substring(0, 4)
    );
  };

  onMount(() => {
    createMainTmdbUrl(filterValues);
  });
</script>

<div class="poster">
  <div class:poster--details-overlay={!isCardFlipped}>
    <a href={urlTmdbMoviePage}>
      <h1 class="poster--details-overlay--title-year">
        {movieDetails}
      </h1>
    </a>
  </div>
  <InputDraggablePhoto {cardStore} {cardId} {flipCard} />
</div>

<style>
  .poster {
    width: 100%;
    height: 100%;
  }
  .poster--details-overlay {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0.5rem;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      180deg,
      rgba(2, 0, 36, 0) 67%,
      rgba(0, 0, 0, 0.8113620448179272) 90%
    );
    border-radius: 10px;
    transition: all;
    transition-delay: 200ms;
    transition-duration: 500ms;
  }
  .poster--details-overlay:hover {
    opacity: 1;
  }
  .poster--details-overlay--title-year {
    position: absolute;
    bottom: 0.5rem;
    color: white;
    font-size: small;
  }
</style>
