<script>
  import { onMount } from 'svelte';
  import InputDraggablePhoto from '../../inputs/InputDraggablePhoto.svelte';

  export let cardStore, cardId, flipCard;

  $: filterValues = {
    genre: $cardStore.genreFilter.value,
  };

  $: updatePosterStore(filterValues);

  let movieData = Promise.resolve([]);
  $: movieDetails = `${$cardStore.movieTitle}, ${$cardStore.movieYear}`;
  $: movieTmdId = $cardStore.movieTmdbId.toString();

  let urlBaseImg = `https://image.tmdb.org/t/p/original`;
  $: urlTmdbMoviePage = `https://www.themoviedb.org/movie/${movieTmdId}`;

  let apiKey = '6b0c4f66ce4c706a64911a6348ae8442';

  const getMoviesFromTmdb = async (filters) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${filters.genre}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const updatePosterStore = async (filters) => {
    movieData = await getMoviesFromTmdb(filters);
    let randomNum = Math.floor(
      Math.random() * movieData.results.length
    );

    cardStore.setPath(
      `${urlBaseImg}${movieData.results[randomNum].poster_path}`
    );
    cardStore.setMovieTmdbId(
      movieData.results[randomNum].id
    );
    cardStore.setMovieTitle(
      movieData.results[randomNum].title
    );
    cardStore.setMovieYear(
      movieData.results[randomNum].release_date.substring(
        0,
        4
      )
    );
    console.log(movieData);
  };
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
