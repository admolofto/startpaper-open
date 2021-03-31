import { writable } from 'svelte/store';

export const createPosterStore = (cardId) => {
  const initialValue = {
    isRepositioning: false,
    objPos: { X: 50, Y: 50 },
    movieTitle: '',
    movieYear: '',
    movieTmdbId: '',
    genreFilter: { value: '00', label: 'All' },
    path: '',
  };

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(`poster_${cardId}`)) ||
      initialValue
  );

  subscribe((value) => {
    localStorage.setItem(
      `poster_${cardId}`,
      JSON.stringify(value)
    );
  });

  const setObjPos = (axis, newObjPos) => {
    update((prev) => {
      return {
        ...prev,
        objPos: { ...prev.objPos, [axis]: newObjPos },
      };
    });
  };

  const setGenreFilter = (newGenreFilter) => {
    update((prev) => {
      return {
        ...prev,
        genreFilter: newGenreFilter,
      };
    });
  };

  const setPath = (newPath) => {
    update((prev) => {
      return {
        ...prev,
        path: newPath,
      };
    });
  };

  const setIsRepositioning = (bool) => {
    update((prev) => {
      return {
        ...prev,
        isRepositioning: bool,
      };
    });
  };

  const setMovieTitle = (newMovieTitle) => {
    update((prev) => {
      return {
        ...prev,
        movieTitle: newMovieTitle,
      };
    });
  };

  const setMovieYear = (newMovieYear) => {
    update((prev) => {
      return {
        ...prev,
        movieYear: newMovieYear,
      };
    });
  };

  const setMovieTmdbId = (newMovieTmdbId) => {
    update((prev) => {
      return {
        ...prev,
        movieTmdbId: newMovieTmdbId,
      };
    });
  };

  return {
    subscribe,
    set,
    update,
    setIsRepositioning,
    setObjPos,
    setPath,
    setGenreFilter,
    setMovieTitle,
    setMovieYear,
    setMovieTmdbId,
  };
};
