<script>
  import InputText from './inputs/InputText.svelte';
  import { pin } from '../stores/pinStore';

  export let setIsLocked;

  let value = '';
  let wrongPin = false;
  let message = 'Enter PIN to unlock page';

  const handleEnterPress = () => {
    submitPIN();
  };

  const submitPIN = () => {
    if (value === $pin) {
      setIsLocked(false);
      wrongPin = false;
      value = '';
    } else {
      message = 'Wrong PIN, try again';
      wrongPin = true;
      value = '';
    }
  };
</script>

<div class="locked-grid">
  <h1 class="locked-grid--message">{message}</h1>
  <div class="locked-grid--input">
    <InputText
      inputType="password"
      maxlength="4"
      bind:value
      {handleEnterPress}
      error={wrongPin}
    />
  </div>
</div>

<style>
  .locked-grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    width: 100%;
  }
  .locked-grid--message {
    width: fit-content;
    margin-bottom: 1rem;
  }
  .locked-grid--input {
    width: 8rem;
  }
</style>
