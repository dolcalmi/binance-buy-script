const ccxt = require ('ccxt');
const commandLineArgs = require('command-line-args')
const info = require('debug')('binance:info')
const error = require('debug')('binance:error')

const optionDefinitions = [
  { name: 'base', alias: 'b', type: String, defaultValue: 'BTC'  },
  { name: 'quote', alias: 'q', type: String, defaultValue: 'USD' },
  { name: 'amount', alias: 'a', type: Number, defaultValue: 0 },
  { name: 'apiKey', alias: 'k', type: String, defaultValue: null },
  { name: 'secret', alias: 's', type: String, defaultValue: null },
];

const { base, quote, amount, apiKey, secret } = commandLineArgs(optionDefinitions);

const infoMsg = 'Order %s with requested amount %s %s was filled with %s %s';

marketBuy(base, quote, amount, { apiKey, secret })
  .then(r => info(infoMsg, r.id, r.price, quote, r.filled, base))
  .catch(e => error(e))

/**
 * Creates a market order
 * @param  {string} base       base currency (BTC, ETH, LTC)
 * @param  {string} quote      quote currency (COP, CLP, PEN, ARS)
 * @param  {number} quoteAmount order amount
 * @param  {object} options    binance api key and secret object { apiKey, secret }
 * @return {object}            binance order
 */
function marketBuy(base, quote, quoteAmount, options) {
  if (quoteAmount <= 0)
    return Promise.reject('Invalid amount')

  const binance = new ccxt.binance(options);
  const symbol = `${base}/${quote}`;

  return binance
    .createMarketBuyOrder(symbol, null, { quoteOrderQty: quoteAmount })
    .then(o => sleep(4000, o))
    .then(o => binance.fetchOrder(o.id, symbol));
}

function sleep(ms, order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(order), ms);
  });
}
