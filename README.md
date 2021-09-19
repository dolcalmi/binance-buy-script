# Binance buy script
Just a script to buy crypto with binance.com

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)

## Installation / Initial setup

* `git clone git@github.com:dolcalmi/binance-buy-script.git`
* `cd binance-buy-script`
* `npm i`

## Usage

### Options

- **`--base` or `-b`**\
Base currency (BTC, ETH, LTC).\
Default value: BTC
- **`--quote` or `-q`**\
Quote currency (AUD, USD, ...).\
Default value: USD
- **`--amount` or `-a`**\
Quote amount.\
Default value: 0
- **`--apiKey` or `-k`**\
Binance api key.\
Default value: null
- **`--secret` or `-s`**\
Binance api secret.\
Default value: null

### Example
How to buy 10 AUD of BTC:
``` bash
> DEBUG=binance:* node index -b BTC -q AUD -a 10 -k YOUR_API_KEY -s YOUR_API_SECRET
```
