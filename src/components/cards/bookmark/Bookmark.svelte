<script>
  export let cardStore, cardId;

  $: withHttp = (testUrl) =>
    !/^https?:\/\//i.test(testUrl)
      ? `http://${testUrl}`
      : testUrl;
  $: formattedUrl = withHttp($cardStore.url);

  $: url = new URL(formattedUrl);
  $: bookmarkName = $cardStore.name;

  $: favicon = `https://api.faviconkit.com/${url.host}/144`;
</script>

<div class="bookmark">
  <a class="bookmark__link" href={url.origin}>
    <img
      class="bookmark__favicon"
      src={favicon}
      alt={bookmarkName}
    />
    <h1 class="bookmark__title">{bookmarkName}</h1>
  </a>
</div>

<style>
  .bookmark {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bookmark__link {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .bookmark__favicon {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
  }
  .bookmark__title {
    text-align: center;
  }
</style>
