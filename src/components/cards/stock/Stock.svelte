<script>
  import CardTemplate from '../CardTemplate.svelte';
  import { Graph } from '../../../utils/graph.min.js';
  import { onMount } from 'svelte';

  export let cardStore, cardId;

  $: logo = $cardStore.logo;
  $: symbol = $cardStore.symbol;
  $: companyName = '';

  let apiToken = 'Tsk_9ce02047bcac4f55bb42cdf036066e0a';
  let baseURL = 'https://sandbox.iexapis.com/stable/';

  // let apiToken = 'pk_c65a697e7c4d405a809fa83a6f356a4c';
  // let baseURL = 'https://cloud.iexapis.com/stable/';

  $: data = [0, 0, 0];

  let isGains = true;
  $: change = 0;
  $: changePercent = 0;
  $: realtimePrice = 0;

  let logoExists = true;

  const getCompany = async () => {
    const res = await fetch(
      `${baseURL}/stock/${symbol}/company?token=${apiToken}`
    );
    const company = await res.json();
    return company;
  };

  const getStock = async () => {
    const res = await fetch(
      `${baseURL}/stock/${symbol}/intraday-prices?chartInterval=45&changeFromClose=true&token=${apiToken}`
    );
    const intraday = await res.json();
    return intraday;
  };

  const getQuote = async () => {
    const res = await fetch(
      `${baseURL}/stock/${symbol}/quote?displayPercent=true&token=${apiToken}`
    );
    const quote = await res.json();
    return quote;
  };

  const findCompanyDomain = async (companyName) => {
    let url = `https://company.clearbit.com/v1/domains/find?name=${companyName}`;
    let options = {
      method: 'get',
      headers: {
        Authorization:
          'Bearer sk_9714dc1fa25bd090baa2d208e8263b5a',
      },
    };
    const res = await fetch(url, options);
    const companyDomain = await res.json();
    return companyDomain;
  };

  onMount(() => {
    getQuote()
      .then((quote) => {
        realtimePrice = quote.iexRealtimePrice;
        getStock().then((intraday) => {
          let prevItem;
          data = intraday.map((item) => {
            if (item.average != null) {
              let value =
                item.average - quote.previousClose;
              prevItem = value;
              return value;
            } else {
              return prevItem;
            }
          });

          if (quote.change < 0) {
            isGains = false;
          }
          change = quote.change;
          changePercent =
            Math.round(quote.changePercent * 10) / 10;

          new Graph({
            data: data,
            target: document.getElementById(
              `${cardId}_canvas`
            ),
            lineColor: isGains
              ? 'rgb(16, 185, 129)'
              : 'rgb(220, 38, 38)',
            showZeroLine: true,
            centerZero: true,
            zeroLineColor: 'lightgrey',
          });
        });

        getCompany().then((company) => {
          companyName = company.companyName;
          if (
            company.website === '' ||
            company.website === '0' ||
            company.website === null
          ) {
            let firstWordCompanyName = company.companyName.replace(
              / .*/,
              ''
            );
            findCompanyDomain(firstWordCompanyName).then(
              (companyDomain) => {
                cardStore.setLogo(companyDomain.logo);
              }
            );
          } else {
            const url = company.website.replace(
              'https://www.',
              ''
            );
            let testURL = fetch(
              `https://logo.clearbit.com/${url}`,
              { mode: 'no-cors' }
            ).then((response) => {
              if (!response.ok) {
                logoExists = false;
              } else {
                logoExists = true;
                cardStore.setLogo(
                  `https://logo.clearbit.com/${url}`
                );
              }
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<CardTemplate>
  <div class="stock">
    <div>
      <div class="stock__quote">
        <h1 class="stock__quote--company-symbol">
          {symbol}
        </h1>
        {#if logoExists}
          <img
            class="stock__quote--company-logo"
            src={logo}
            alt={symbol}
          />
        {:else}
          <p class="stock__quote--company-name">
            {companyName}
          </p>
        {/if}
      </div>
      <div>
        <p class="stock__quote--price">{realtimePrice}</p>
      </div>
    </div>
    <div class="stock__chart">
      <canvas
        class="stock__chart--canvas"
        id={`${cardId}_canvas`}
      />
      <p
        class="stock__chart--change"
        class:stock__chart--change-negative={!isGains}
      >
        {change}
        {changePercent}%
      </p>
    </div>
  </div>
</CardTemplate>

<style>
  .stock {
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    display: flex;
  }
  .stock__quote {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
  }
  .stock__quote--company-symbol {
    font-size: large;
    font-weight: 500;
  }
  .stock__quote--company-logo {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 5px;
    margin-left: 0.5rem;
  }
  .stock__quote--company-name {
    font-size: small;
    margin-left: 0.5rem;
  }
  .stock__quote--price {
    font-size: x-large;
  }
  .stock__chart {
    margin-left: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .stock__chart--canvas {
    margin: 0.2rem 0;
    height: 2.5rem;
    width: 100%;
  }
  .stock__chart--change {
    font-size: small;
    font-weight: 600;
    text-align: center;
    color: green;
  }
  .stock__chart--change-negative {
    color: red;
  }
</style>
