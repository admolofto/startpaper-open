<script>
  import CardTemplate from '../CardTemplate.svelte';

  export let cardStore, cardId, isCardFlipped;

  $: getRedditPosts = fetchRedditPosts(subredditsUrlString);

  $: subredditNames = getSubredditNames(
    $cardStore.subreddits
  );

  $: console.log(subredditNames);

  $: subredditsUrlString = returnSubredditsUrlString(
    subredditNames
  );
  $: subredditsHeaderString = returnSubredditsHeaderString(
    subredditNames
  );

  const getSubredditNames = (data) => {
    console.log(cardId, data);
    if (data && data !== {}) {
      return data.map((item) => {
        return item.data.display_name;
      });
    } else {
      return ['all'];
    }
  };

  const returnSubredditsUrlString = (names) => {
    return names.join('+');
  };

  const returnSubredditsHeaderString = (names) => {
    return names.join('\u200b•');
  };

  const fetchRedditPosts = async (subredditsQuery) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subredditsQuery}.json`
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.data.children;
  };
</script>

<CardTemplate>
  <h1 class="reddit-feed__header">
    r/{subredditsHeaderString}
  </h1>
  <div class="reddit-feed" class:disabled={isCardFlipped}>
    {#await getRedditPosts then data}
      {#each data as post}
        <div class="post">
          <a
            href={`https://reddit.com/r/${post.data.subreddit}`}
          >
            <h1 class="post-sub">
              r/{post.data.subreddit}
            </h1>
          </a>
          <a href={post.data.url}>
            <p class="post-title line-clamp">
              {post.data.title}
            </p>
            <p class="post-domain">{post.data.domain}</p>
          </a>

          <a
            class="ups-comments-container"
            href={`https://reddit.com/${post.data.permalink}`}
          >
            <h1 class="post-ups">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="g-stroke-norm"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path d="M18 15l-6-6l-6 6h12" />
              </svg>
              {post.data.ups}
            </h1>

            <h1 class="post-ups">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="g-stroke-norm"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path
                  d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3"
                />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="13" x2="14" y2="13" />
              </svg>
              {post.data.num_comments}
            </h1>
          </a>
        </div>
      {/each}
    {/await}
  </div>
</CardTemplate>

<style>
  .reddit-feed {
    margin-bottom: 3rem;
  }
  .reddit-feed__header {
    text-align: center;
    width: 100%;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 3.2rem;
    overflow: hidden;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .post {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .post-title {
    font-size: 1rem;
  }
  .post-domain {
    color: slategray;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .post-sub {
    font-weight: bold;
    font-size: 0.8rem;
  }
  .post-ups {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: slategrey;
    margin-right: 0.5rem;
  }
  .ups-comments-container {
    display: flex;
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 3.6rem;
    overflow: hidden;
  }
  .disabled {
    pointer-events: none;
  }
</style>
