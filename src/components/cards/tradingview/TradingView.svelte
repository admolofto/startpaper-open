<script>
  import { onMount } from 'svelte';

  import CardTemplate from '../CardTemplate.svelte';

  export let cardStore;

  let widgetContainerRef;

  let scriptOptions = {
    colorTheme: 'light',
    dateRange: '1D',
    showChart: true,
    locale: 'en',
    width: '100%',
    height: '100%',
    largeChartUrl: '',
    isTransparent: true,
    showSymbolLogo: true,
    plotLineColorGrowing: 'rgba(33, 150, 243, 1)',
    plotLineColorFalling: 'rgba(33, 150, 243, 1)',
    gridLineColor: 'rgba(240, 243, 250, 1)',
    scaleFontColor: 'rgba(120, 123, 134, 1)',
    belowLineFillColorGrowing: 'rgba(255, 255, 255, 0)',
    belowLineFillColorFalling: 'rgba(33, 150, 243, 0)',
    symbolActiveColor: 'rgba(33, 150, 243, 0.12)',
    tabs: [
      {
        title: 'Stocks',
        symbols: [
          {
            s: 'NASDAQ:AAPL',
          },
          {
            s: 'NYSE:GME',
          },
          {
            s: 'NASDAQ:CRSR',
          },
          {
            s: 'NASDAQ:FB',
          },
          {
            s: 'NYSE:WMT',
          },
        ],
      },
      {
        title: 'Crypto',
        symbols: [
          {
            s: 'BITBAY:BTCUSD',
          },
        ],
      },
    ],
  };

  const generateTradingViewWidget = () => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify(scriptOptions);
    widgetContainerRef.appendChild(script);
  };

  onMount(() => {
    generateTradingViewWidget();
  });
</script>

<CardTemplate padding="0rem 1rem 1rem 1rem">
  <div class="tradingview-widget-container">
    <div
      class="tradingview-widget-container__widget"
      bind:this={widgetContainerRef}
    />
  </div>
</CardTemplate>

<style>
  .tradingview-widget-container {
    height: 100%;
    width: 100%;
  }
  .tradingview-widget-container__widget {
    height: 100%;
    width: 100%;
  }
</style>
