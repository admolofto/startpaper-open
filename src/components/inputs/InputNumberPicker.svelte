<script>
    export let max = 8,
        min = 2,
        number = 5;

    const handlePlusClick = () => {
        number += 1;
    };

    const handleMinusClick = () => {
        number -= 1;
    };
</script>

<div class="number-picker">
    <button class="number-picker__button" on:click={handleMinusClick}>-</button>
    <p>{number}</p>
    <button class="number-picker__button" on:click={handlePlusClick}>+</button>
</div>

<style>
    .number-picker {
        display: flex;
    }
    .number-picker__button {
        color: gray;
    }
</style>
