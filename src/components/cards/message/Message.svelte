<script>
  import { onMount } from 'svelte';
  import { userInfo } from '../../../stores/userInfoStore';

  export let cardStore, cardId;

  $: time = $userInfo.time;
  $: messageOption = $cardStore.messageOption;

  $: font = $cardStore.font;
  $: fontSize = $cardStore.fontSize;

  $: message = 'Good Evening';

  $: returnMessage(messageOption);

  const returnGreeting = () => {
    if (time.hour <= 4) {
      return 'Late Night?';
    } else if (time.hours <= 11) {
      return 'Good Morning';
    } else if (time.hours <= 15) {
      return 'Good Afternoon';
    } else if (time.hours <= 19) {
      return 'Good Evening';
    } else return 'Good Night';
  };

  const returnMessage = (option) => {
    if (option === 'greeting') {
      message = returnGreeting();
    }
  };

  onMount(() => {
    returnMessage(messageOption);
  });
</script>

<div class={`message`}>
  <h1
    class="message__text"
    style="--font-size: {fontSize}; --font: {font};"
  >
    {message}
  </h1>
</div>

<style>
  .message {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message__text {
    text-align: center;
    font-size: var(--font-size);
    font-family: var(--font);
    line-height: 2.5rem;
  }
</style>
