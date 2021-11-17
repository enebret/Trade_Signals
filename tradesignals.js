var ccxt = require ('ccxt');
const fs = require('fs').promises;
const axios = require('axios');
const exchangeId = 'binance'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
      apiKey: process.env['Api_key'],
      secret: process.env['secret'],
         //timeout: 10000,
        enableRateLimit: true,
        options: {
            adjustForTimeDifference: true,
            recvWindow: 6000,
        } 
    })

  const url = "https://api3.binance.com/api/v3/avgPrice?symbol=";
  //get balance (async function)
  //if one hour price of balance currency is ngeative,if(onehour<0){convert balance to usdt using a sell order, getbtc()}
  //getbalance function should be wrapped in a setinterval function, run every 2 or 3seconds

async function getSignal () {
    try{
        const dt = await exchange.fetchTickers()
        const vt = Object.keys(dt)
        const cd = []
      
        vt.map((p)=>{
          const wr = p.length - 4;
          const wd = p.length;
          const wf = p.slice(wr,wd);
          if(wf==="USDT"){
            //fs.appendFile('sym.txt', p + " " + '\n');
            async function nino (x){
                //const vx = await exchange.fetchTicker(x)
                //const mq = vx.info.change1h
                //const gq = vx.info.priceChangePercent //multiply by 100 to get 24h percent
                const dt = await exchange.fetchOHLCV (x, "1h")
                const tz = await exchange.fetchTicker(x)
                const twentyfour = tz.info.priceChangePercent //twenty four hours time change percent
                const mp = Number(tz.info.lastPrice)
                const fc = dt.length - 1
                const we = dt[fc]
                const vb = we[4]
                //const cb = we[4]
                //const tb = vb+cb
                //const yb = tb/2
                //const wb = mp-vb 
                const onehour = mp-vb
                if(twentyfour>10 && onehour>0){
                  fs.appendFile('hp.txt', x + " " + '\n')
                  //buyorder
                }
                
                
            }
          
            nino(p)
            
          }
          //console.log(cd)
          
        })
       
      
    }
    catch(error) {
      console.log (error)
    }
  }
  
      
getSignal()