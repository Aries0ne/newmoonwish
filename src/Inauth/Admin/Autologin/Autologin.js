import React from 'react';
import AutoLoginComponent from '../../../Components/AutoLoginComponent';

const col = ['Mobile', 'User ID', 'Api Key', 'Password', 'DOB ', 'Login']

const rows = [
  {
    mobile: '9102366895',
    userid: 'JHKU',
    apikey: '230JDJD',
    password: 'jhdfgkjdfbgjkkj56',
    DOB: '15-05-2023',
    login: '12',
  }
];

export default function Autologin() {
  return (
    <>
      <AutoLoginComponent col={col} rows={rows}/>
    </>
  )
}
