<script>
  import InputText from '../inputs/InputText.svelte';
  import { pin } from '../../stores/pinStore';
  import { pages } from '../../stores/pagesStore';
  import Dropdown from '../dropdown/Dropdown.svelte';

  export let pageIndex,
    isLocking,
    setIsLocking,
    isPageLocked;

  let value = '';
  let pinExists = false;
  let wrongPinEntered = false;
  $: message = 'Create a PIN to lock page.';

  $: if ($pin !== '') {
    pinExists = true;
    if (!isPageLocked) {
      message = 'Enter PIN to lock page.';
    } else {
      message = 'Enter PIN to remove page lock.';
    }
  }

  const handleEnterPress = () => {
    if (value !== '') {
      submitPIN();
    }
  };

  const submitPIN = () => {
    if (pinExists) {
      if (value === $pin) {
        if (!isPageLocked) {
          pages.setPageLockStatus(pageIndex, true);
        } else {
          pages.setPageLockStatus(pageIndex, false);
        }
        setIsLocking(false);
        wrongPinEntered = false;
        value = '';
      } else {
        message = 'Wrong PIN, try again';
        wrongPinEntered = true;
        value = '';
      }
    } else {
      pin.setPin(value);
      pages.setPageLockStatus(pageIndex, true);
      setIsLocking(false);
      value = '';
    }
  };

  const handleOutsideClick = () => {
    value = '';
    setIsLocking(false);
  };
</script>

<Dropdown
  type="input"
  showDropdown={isLocking}
  {handleOutsideClick}
>
  <div class="input__wrapper">
    <p
      class="input__message"
      class:input__message--wrong-pin={wrongPinEntered}
    >
      {message}
    </p>
    <InputText
      inputType="password"
      bind:value
      on:change
      on:blur
      {handleEnterPress}
      maxlength="4"
      error={wrongPinEntered}
    />
  </div>
</Dropdown>

<style>
  .input__wrapper {
    padding: 0.5rem;
  }
  .input__message {
    margin-bottom: 0.5rem;
  }
  .input__message--wrong-pin {
    color: red;
  }
</style>
