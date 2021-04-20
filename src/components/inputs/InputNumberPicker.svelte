<script>
    import Icon from "../Icon.svelte";
    import { columns } from "../../stores/columnsStore";

    export let max = 8,
        min = 2;

    $: maxValue = false;
    $: minValue = false;
    $: if ($columns.staticColumns === max) {
        maxValue = true;
    } else {
        maxValue = false;
    }
    $: if ($columns.staticColumns === min) {
        minValue = true;
    } else {
        minValue = false;
    }

    const handlePlusClick = () => {
        if (!maxValue) {
            columns.incrementStaticColumns();
        }
    };

    const handleMinusClick = () => {
        if (!minValue) {
            columns.decrementStaticColumns();
        }
    };
</script>

<div class="number-picker">
    {#if !minValue}
        <button class="number-picker__button" on:click={handleMinusClick}>
            <Icon icon="minus" size="10" />
        </button>
    {:else}
        <div class="blank" />
    {/if}
    <p class="number-picker__number">{$columns.staticColumns}</p>
    {#if !maxValue}
        <button class="number-picker__button" on:click={handlePlusClick}>
            <Icon icon="plus" size="10" />
        </button>
    {:else}
        <div class="blank" />
    {/if}
</div>

<style>
    .number-picker {
        display: flex;
    }
    .number-picker__number {
        font-weight: 500;
        margin: 0 2px;
    }
    .number-picker__button {
        font-weight: 500;
    }
    .blank {
        width: 10px;
        height: 10px;
    }
</style>
