import React from 'react';
import './Liveprice.scss';
import { Box, Typography } from '@mui/material';
import nifty from '../../images/nifty.png';
import banknif from '../../images/banknif.png';
import gold from '../../images/gold.png';
import silver from '../../images/silver.png';
import sensex from '../../images/sensex.png';
import copper from '../../images/copper.png';
import crude from '../../images/copper.png';
import finnifty from '../../images/finnifty.png';
import graph from '../../images/graph.png';
import graph1 from '../../images/graph1.png';
import midcapnifty from '../../images/midcapnifty.png';
import indiavix from '../../images/indiavix.png';

export default function Liveprice({ liveFeedData }) {
  const liveData = [
    { market_name: 'NIFTY50', ltp: 0, pc: 1, c: 0 },
    { market_name: 'BANKNIFTY', ltp: 0, pc: 0, c: 0 },
    { market_name: 'GOLD', ltp: 0, pc: 0, c: 0 },
    { market_name: 'SILVER', ltp: 0, pc: 0, c: 0 },
    { market_name: 'SENSEX', ltp: 0, pc: 0, c: 0 },
    { market_name: 'COPPER', ltp: 0, pc: 0, c: 0 },
    { market_name: 'CRUDE', ltp: 0, pc: 0, c: 0 },
    { market_name: 'INDIAVIX', ltp: 0, pc: 0, c: 0 },
    { market_name: 'FINNIFTY', ltp: 0, pc: 0, c: 0 },
    { market_name: 'MIDCAPNifty', ltp: 0, pc: 0, c: 0 },
  ];

 
  const imageMap = {
    NIFTY50: nifty,
    NIFTY_IT: nifty,
    BANKNIFTY: banknif,
    GOLD: gold,
    SILVER: silver,
    SENSEX: sensex,
    COPPER: copper,
    CRUDEOIL: crude,
    FINNIFTY: finnifty,
    INDIAVIX: indiavix,
    MIDCPNIFTY: midcapnifty,
  };



  const down = (
    <svg width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.60241 8.06195L3.60241 1.03332M6.53101 5.13336L3.60241 8.06195L6.53101 5.13336ZM3.60241 8.06195L0.673816 5.13336L3.60241 8.06195Z'
        stroke='#FF231F'
        strokeWidth='1.17144'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  const up = (
    <svg width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.51526 1.03329V8.06192M0.58667 3.96189L3.51526 1.03329L0.58667 3.96189ZM3.51526 1.03329L6.44386 3.96189L3.51526 1.03329Z'
        stroke='#26DE81'
        strokeWidth='1.17144'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <Box className='livePrice-list'>
      {liveFeedData?.length === 0 &&
        liveData.map((items, index) => (
          <Box component={'div'} className='item' key={index} style={{ marginRight: 10 }}>
            <Box className={`livePrice-item ${index === 0 ? 'high' : 'low'}`}>
              <Box className='price'>
                <div className='first'>
                  <Typography component={'h6'} className='mname'>
                    <span>
                      <img
                        src={imageMap[items.market_name.toUpperCase()]}
                        alt={items.market_name}
                        style={{ height: '20px', width: '20px', marginTop: '5px' }}
                      />
                    </span>
                    {items.market_name}
                  </Typography>
                  <span>
				  <Typography component={'span'} className={`${Math.sign(items?.pc) === 1 ? 'up' : 'down'}`}>
                      {items.pc}%
                    </Typography>
                  </span>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
				
                  <Typography sx={{ display: 'inline-flex' }} className='number' component={'p'}>
					<div className='div001'>
					<div className='div002'>
                    <Typography component={'p'} sx={{ marginRight: '4px'
						,color:'red' }}>
                      {Math.sign(items?.pc) === 1 ? up : down}
                    </Typography>
                    {items.ltp}
                    
					</div>
          {/* <img src={graph} alt="graph" style={{ height: '45px', width: '80px' }} /> */}


					<Typography component={'p2'} >Portfolio</Typography>
					</div>
                  </Typography>
                  <img
                    src={Math.sign(items?.pc) === 1 ? graph1 : graph}  // Use graph1 for positive, graph for negative
                    alt="graph"
                    style={{ height: '45px', width: '80px' }}
                  />

                  {/* <Typography component={'small'}>
                    {Number(items?.ltp - items?.c).toFixed(2)}
                    <Typography component={'span'} className={`${Math.sign(items?.pc) === 1 ? 'up' : 'down'}`}>
                      {items.pc}%
                    </Typography>
                  </Typography> */}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      {liveFeedData?.length > 0 &&
        liveFeedData.map((items, index) => (
          <Box component={'div'} className='item' key={index} style={{ marginRight: 10 }}>
            <Box className={`livePrice-item ${Math.sign(items?.pc) === 1 ? 'high' : 'low'}`}>
              <Box className='price'>
                <div className='div11'>
                <Typography component={'h6'} className='mname'>
                  <span>
                    <img
                      src={imageMap[items.market_name.toUpperCase()]}
                      
                      style={{ height: '20px', width: '20px', margin: '5px 2px 1px 2px' }}
                    />
                  </span>
                  {items.market_name}
                </Typography>
                <Typography component={'span'} className={`${Math.sign(items?.pc) === 1 ? 'up' : 'down'}`}>
                      {items.pc}%
                    </Typography>
                    </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row',alignItems:'center' }}>
                  <div className='div012'>
                  <Typography component={'p'} className={`price_value ${Math.sign(items?.pc) === 1 ? 'up' : 'down'}`}>
                    <Typography component={'p'} sx={{ marginRight: '4px' }}>
                      {Math.sign(items?.pc) === 1 ? up : down}
                    </Typography>
                    {items.ltp}
                  </Typography>
                   <Typography component={'small'}>
                    {Number(items?.ltp - items?.c).toFixed(2)}
                    
                  </Typography>
                  </div>
                  <img
                    src={Math.sign(items?.pc) === 1 ? graph1 : graph}  // Use graph1 for positive, graph for negative
                    alt="graph"
                    style={{ height: '45px', width: '80px' }}
                  />
                  {/* <Typography component={'small'}>
                    {Number(items?.ltp - items?.c).toFixed(2)}
                    <Typography component={'span'} className={`${Math.sign(items?.pc) === 1 ? 'up' : 'down'}`}>
                      {items.pc}%
                    </Typography>
                  </Typography> */}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
}
