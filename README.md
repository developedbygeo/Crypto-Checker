# Crypto Checker

Crypto Checker is an app that looks up cryptocurrency data and trends. Built mobile-first and fully responsive for both portrait and landscape orientations, it fetches data from the Coingecko API, cleans & parses it to create a detailed overview of each cryptocurrency's current state and price.

## Installation

#### Installing the dependencies:

After cloning, it would be essential to install the dependencies:

```bash
npm install
```

#### Building the project:

Creating the /dist directory requires building:

```
npm run build
```

#### Running the project on watch mode:

`watch` has also been configured and is run with:

```
npm run watch
```

#### Accessing the API:

Coingecko's API does not require a key. However, the limit of 50 calls per minute applies, as per their Free tier.

## Features

- Interactive line chart with yearly data - analyzed on a daily basis.
- Dynamic cryptocurrency data visualization according to the most up-to-date data.
- Dynamic current price / market cap / price trend, based on the current mean price across several CEX.
- Cryptocurrencies which do not support a EUR/USD pair are paired and displayed with the USDT pair.

## Tech

- JavaScript
- Chart.JS
- Crypto-Symbol
- Currency Symbol Map
- Webpack
- NPM
- FontAwesome

For a more detailed overview of the development & production dependencies, please check `package.json`.

## Contributing

Contributions are certainly welcome. Please feel free to open an issue/PR if there is something you would like to be changed.

## Acknowledgements

A massive thank you to The Odin Project & freeCodeCamp community, as their guidance and learning process have been invaluable. A big thank you to Coingecko as well, for providing their API free of charge.

## Disclaimer

The cryptocurrency market is volatile and there may be a real-time deviation on central exchanges (CEX) from the prices depicted herein. The data depicted in this project are purely for educational purposes and should, under no circumstances, be considered financial advice. Prior to making any trading or investing decisions, it is imperative to make your own research and due diligence.

## License

[MIT](https://choosealicense.com/licenses/mit/)
