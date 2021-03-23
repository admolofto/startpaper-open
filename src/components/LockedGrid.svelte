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

<div
  class="w-full h-full flex flex-col justify-center items-center"
>
  <h1>{message}</h1>
  <InputText
    inputType="password"
    maxlength="4"
    bind:value
    {handleEnterPress}
    error={wrongPin}
  />
</div>
