// import React, { useEffect } from 'react';
// import './Dashboard.scss'
// import AdminDashComponent from '../../../Components/AdminDashComponent';
// import { useDispatch, useSelector } from 'react-redux';
// import { dashboardCount, todayDashboardCount } from '../../../redux/actions/adminActions';
// // import DashboardAdmin from './Dashboard/Dashboard'

// export default function Dashboard() {
//   const icon = <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M9.25 10.75C10.2389 10.75 11.2056 10.4568 12.0279 9.90735C12.8501 9.35794 13.491 8.57705 13.8694 7.66342C14.2478 6.74979 14.3469 5.74446 14.1539 4.77455C13.961 3.80465 13.4848 2.91373 12.7855 2.21447C12.0863 1.51521 11.1954 1.039 10.2255 0.846076C9.25555 0.65315 8.25021 0.752166 7.33658 1.1306C6.42295 1.50904 5.64206 2.14991 5.09265 2.97215C4.54324 3.7944 4.25 4.7611 4.25 5.75C4.25 7.07608 4.77678 8.34785 5.71447 9.28554C6.65215 10.2232 7.92392 10.75 9.25 10.75Z" fill="white" />
//     <path d="M18.75 13.5C19.4917 13.5 20.2167 13.2801 20.8334 12.868C21.4501 12.456 21.9307 11.8703 22.2145 11.1851C22.4984 10.4998 22.5726 9.74584 22.4279 9.01841C22.2833 8.29098 21.9261 7.6228 21.4017 7.09835C20.8772 6.5739 20.209 6.21675 19.4816 6.07206C18.7542 5.92736 18.0002 6.00162 17.3149 6.28545C16.6297 6.56928 16.044 7.04993 15.632 7.66661C15.2199 8.2833 15 9.00832 15 9.75C15 10.7446 15.3951 11.6984 16.0983 12.4017C16.8016 13.1049 17.7554 13.5 18.75 13.5Z" fill="white" />
//     <path d="M18 22.0001C18 21.3425 24.8995 21.8684 25.1339 21.634C25.3683 21.3996 25.5 21.0817 25.5 20.7501C25.499 19.5819 25.1706 18.4373 24.552 17.4462C23.9334 16.4552 23.0495 15.6573 22.0004 15.1432C20.9514 14.6291 19.7792 14.4193 18.617 14.5376C17.4547 14.656 16.3489 15.0977 15.425 15.8126C14.2006 14.5931 12.6426 13.7634 10.9473 13.4282C9.25199 13.0929 7.4954 13.2672 5.89903 13.929C4.30267 14.5909 2.93802 15.7106 1.97718 17.1469C1.01634 18.5833 0.502338 20.272 0.5 22.0001C0.5 22.3317 0.631696 22.6496 0.866116 22.884C1.10054 23.1184 1.41848 23.2501 1.75 23.2501H16.75C17.0815 23.2501 17.3995 23.1184 17.6339 22.884C17.8683 22.6496 18 22.3317 18 22.0001Z" fill="white" />
//   </svg>

//   const dispatch = useDispatch();

//   const handelSubmit = () => {
//     dispatch(todayDashboardCount())
//     dispatch(dashboardCount())
//   }

//   useEffect(() => {
//     handelSubmit()
//   }, [])

//   const overAllview = useSelector((state) => state.Admin.todaycount)
//   const overallview = [
//     { category: 'Overall Customer', customer: overAllview.totalusers },
//     { category: 'Subscription Active', customer: overAllview.subscriptionactive },
//     { category: 'Subscription Expired', customer: overAllview.subscriptionexpire },
//     { category: 'Demo Active', customer: overAllview.demoactive },
//     { category: 'Demo Expired', customer: overAllview.demoexpire },
//     // { category: 'Payment', customer: '615' },
//     // { category: 'Commission', customer: '150' },
//   ]

//   const todayView = useSelector((state) => state.Admin.dashboardcount)
//   const todayview = [
//     { category: 'Overall Customer', customer: todayView.totalusers },
//     { category: 'Subscription Active', customer: todayView.subscriptionactive },
//     { category: 'Subscription Expired', customer: todayView.subscriptionexpire },
//     { category: 'Demo Active', customer: todayView.demoactive },
//     { category: 'Demo Expired', customer: todayView.demoexpire },
//     // { category: 'Payment', customer: '615' },
//     // { category: 'Commission', customer: '150' },
//   ]

//   return (
//     <>
//       <AdminDashComponent icon={icon} overallview={overallview} todayview={todayview} handelSubmit={handelSubmit} />
//       {/* <DashboardAdmin /> */}
//     </>

//   )
// }

import React from 'react'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Dashboardview from './Dashboardview/Dashboardview';
import Userview from './Userview/Userview';
import Tradedetails from './Tradedetails/Tradedetails';
import Livepostion from './Livepostion/Livepostion';
import Paperpostion from './Paperpostion/Paperpostion';

const Dashboard = () => {
  // admin tab
  const [value, setValue] = React.useState('admintab1');
  const handleChange = (e, newValue = 'string') => {
    setValue(newValue);
  };
  return (
    <>
      <Box className='tabs'>
        <TabContext value={value}>
          <TabList className='main-tab' onChange={handleChange}>
            <Tab label="Dashboard View" value={"admintab1"} />
            <Tab label="User View" value={"admintab2"} />
            {/* <Tab label="Trade Details" value={"admintab3"} /> */}
            {/* <Tab label="Live Position" value={"admintab4"} /> */}
            {/* <Tab label="Paper Position" value={"admintab5"} /> */}
          </TabList>

          <Box className='tabBox' border={'none !important'}>
            <TabPanel value={"admintab1"} sx={{ padding: 0 }}><Dashboardview /></TabPanel>
            <TabPanel value={"admintab2"} sx={{ padding: 0 }}><Userview /></TabPanel>
            {/* <TabPanel value={"admintab3"} sx={{ padding: 0 }}><Tradedetails /></TabPanel> */}
            {/* <TabPanel value={"admintab4"} sx={{ padding: 0 }}><Livepostion /></TabPanel> */}
            {/* <TabPanel value={"admintab5"} sx={{ padding: 0 }}><Paperpostion /></TabPanel> */}
          </Box>
        </TabContext>
      </Box>
    </>
  )
}

export default Dashboard