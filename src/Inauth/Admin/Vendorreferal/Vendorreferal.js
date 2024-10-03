import React from 'react';
import VendorReferalComponent from '../../../Components/VendorReferalComponent';

const col = ['Vendor Id', 'Name', 'Mobile', 'Referal Code', 'Coupon Code', 'MRP', 'D.Charge', 'M.dis', 'Q.dis', 'H.dis', 'Y.dis']
const rows = [
  { VendorId: '139', Name: 'PawanMatade', Mobile: '9321446611', refercode: 'SDTRADE', cc: 'SDTRADEA', mrp: 6000, Dcharge: 700, mdis: 50, qdis: 40, hdis: 51, ydis: 0 },
];


export default function Vendorreferal() {
  // drop down
  const title = ' ';
  const drpValue = ['Mbile', 'PC']

  return (
    <>
      <VendorReferalComponent
        title={title}
        col={col}
        rows={rows}
        drpValue={drpValue}
      />
    </>
  )
}
