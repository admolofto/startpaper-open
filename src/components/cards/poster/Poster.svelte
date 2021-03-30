<script>
  import { onMount } from 'svelte';
  import InputDraggablePhoto from '../../inputs/InputDraggablePhoto.svelte';

  export let cardStore, cardId, flipCard;

  let movieData = Promise.resolve([]);
  let movieDetails = `${$cardStore.movieTitle}, ${$cardStore.movieYear}`;
  let movieTmdId = $cardStore.movieTmdbId.toString();

  console.log($cardStore.movieTitle);

  let urlBaseImg = `https://image.tmdb.org/t/p/original`;
  let urlTmdbMoviePage = `https://www.themoviedb.org/movie/${movieTmdId}`;
  $: console.log(urlTmdbMoviePage);

  let genreId = '878';
  let apiKey = '6b0c4f66ce4c706a64911a6348ae8442';
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

  const getMoviesFromTmdb = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const updatePosterStore = async () => {
    movieData = await getMoviesFromTmdb();
    cardStore.setPath(
      `${urlBaseImg}${movieData.results[7].poster_path}`
    );
    cardStore.setMovieTmdbId(movieData.results[7].id);
    cardStore.setMovieTitle(movieData.results[7].title);
    console.log(movieData);
  };

  onMount(() => {
    updatePosterStore();
  });
</script>

<div class="poster">
  <div class="poster--details-overlay">
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
    position: relative;
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
