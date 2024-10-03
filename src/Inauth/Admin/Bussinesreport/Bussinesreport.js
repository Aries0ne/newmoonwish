import React from 'react';
import BussinessReportComponent from '../../../Components/BussinessReportComponent';


const col = ['Mobile', 'Email', 'Referal Code', 'Client ID', 'Plan Start Date', 'Plan End Date', 'Plan Status']
const rows = [
  { Mobile: '1324657988', Email: 'dummy@demo.com', refercode: 120, cID: 1235, psd: '15-05-2023', ped: '31-05-2023', planstatus: 'status' },
];


export default function Bussinesreport() {
  // drop down
  const title = 'All Customer ';
  const drpValue = ['Trail Plan Active', 'HGHJG53', 'NJKNK2']

  // drop down
  const title2 = 'All Refer Code';
  const drpValue2 = ['SDTrade', 'Tarde 1']


  return (
    <>
      <BussinessReportComponent
        col={col}
        rows={rows}
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
      />
    </>
  )
}
