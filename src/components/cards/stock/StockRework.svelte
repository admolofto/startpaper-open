<script>
  export let cardStore, cardId;

  $: symbol = $cardStore.symbol;

  const fetchIntraday = async () => {
    const respones = await fetch(
      'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'
    );
  };
</script>
