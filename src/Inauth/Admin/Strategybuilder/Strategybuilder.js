import React from 'react';
import StrategyBuilderComp from '../../../Components/StrategyBuilderComp';

export default function Strategybuilder() {
  // First
  const title = 'Index';
  const drpValue = ['BANKNIFTY', 'Buy', 'Sell'];

  // Secound
  const title1 = 'Stock';
  const drpValue1 = ['BANKNIFTY', 'Buy', 'Sell'];

  // Third
  const title2 = 'Currency';
  const drpValue2 = ['USDINR', 'Buy', 'Sell'];

  // Four
  const title3 = 'Commodity';
  const drpValue3 = ['Copper', 'Buy', 'Sell'];

  // Five
  const title4 = 'Currency futures';
  const drpValue4 = ['Weekly Contract', 'Monthly Contract', 'Daily Contract'];

  // Six
  const title5 = 'Monthly';
  const drpValue5 = ['Near Expiry'];

  // Seven
  const title6 = 'Weekly';
  const drpValue6 = ['Weekly 1'];

  // Eight
  const title7 = 'Expiry Day';
  const drpValue7 = [10, 15, 20];

  // Nine
  const title8 = 'Expiry Day';
  const drpValue8 = [10, 15, 20];

  // Nine
  const title9 = 'Monthly Status';
  const drpValue9 = ['Status 1', 'Status 2', 'Status 3'];

  // Nine
  const title10 = 'Entry Lots';
  const drpValue10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Nine
  const title11 = 'EOD Data';
  const drpValue11 = ['P 2D', 'P 2D', 'P 2D', 'P 2D'];

  // Nine
  const title12 = 'Price';
  const drpValue12 = ['Hight', 'Low'];

  // Nine
  const title13 = '+ / -';
  const drpValue13 = ['+', '-'];

  return (
    <>
      <StrategyBuilderComp
        title={title}
        drpValue={drpValue}
        title1={title1}
        drpValue1={drpValue1}
        title2={title2}
        drpValue2={drpValue2}
        title3={title3}
        drpValue3={drpValue3}
        title4={title4}
        drpValue4={drpValue4}
        title5={title5}
        drpValue5={drpValue5}
        title6={title6}
        drpValue6={drpValue6}
        title7={title7}
        drpValue7={drpValue7}
        title8={title8}
        drpValue8={drpValue8}
        title9={title9}
        drpValue9={drpValue9}
        title10={title10}
        drpValue10={drpValue10}
        title11={title11}
        drpValue11={drpValue11}
        title12={title12}
        drpValue12={drpValue12}
        title13={title13}
        drpValue13={drpValue13}
      />
    </>
  )
}
