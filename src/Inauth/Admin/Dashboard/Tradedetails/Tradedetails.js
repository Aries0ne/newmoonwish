import React from 'react';
import TradeComponent from '../../../../Components/TradeComponent';

const col = ['Broker Id', 'Client Id', 'Customer Id', 'Trade Type', 'Trade Type', 'Trade Status', 'Qty', 'Loss Limit', 'Profit Limit', 'Set Trail', 'Count Of Stock', 'Strategy Name', 'UpdatedAt']
const rows = [
  {
    brokerid: 'MOTILAL OSWAL',
    clinetid: 'EHYD226042',
    customerid: 132,
    tradetype: 'Paper Trade',
    tradetype2: 'Bankniftyoption',
    staus: 1,
    qty: 1,
    ll: 200,
    pl: 1000,
    st: 100,
    stock: 1,
    strategyname: 'HLNATGASMINI',
    update: '13-05-2023 16:09:48',
  },
  {
    brokerid: 'MOTILAL OSWAL',
    clinetid: 'EHYD226042',
    customerid: 132,
    tradetype: 'Paper Trade',
    tradetype2: 'Bankniftyoption',
    staus: 1,
    qty: 1,
    ll: 200,
    pl: 1000,
    st: 100,
    stock: 1,
    strategyname: 'HLNATGASMINI',
    update: '13-05-2023 16:09:48',
  },
  {
    brokerid: 'MOTILAL OSWAL',
    clinetid: 'EHYD226042',
    customerid: 132,
    tradetype: 'Paper Trade',
    tradetype2: 'Bankniftyoption',
    staus: 1,
    qty: 1,
    ll: 200,
    pl: 1000,
    st: 100,
    stock: 1,
    strategyname: 'HLNATGASMINI',
    update: '13-05-2023 16:09:48',
  },
];

const title = 'Client ID';
const drpValue = ['JKLJHKL66', 'KNHJ55'];

const title2 = 'Select Status';
const drpValue2 = ['ON', 'Off'];

const title3 = 'Select Strategy';
const drpValue3 = ['Dcahs', 'Dcahs 1'];

const title4 = 'Select Tarde Type';
const drpValue4 = ['Nift NFO', 'Nift NFO 1'];


export default function Tradedetails() {
  return (
    <>
      <TradeComponent
        col={col}
        rows={rows}
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
        title3={title3}
        drpValue3={drpValue3}
        title4={title4}
        drpValue4={drpValue4}
      />
    </>
  )
}
