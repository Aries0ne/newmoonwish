import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, Tooltip, Typography,Checkbox,lighten } from "@mui/material";
import React, { useEffect, useState,useRef } from "react";
import { confirm } from "../../../redux/actions/confirmActions";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { MaterialReactTable, MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,} from "material-react-table";
import "./addsymbol.scss";
import Orderplace from "./orderplace";
import { useDispatch, useSelector } from "react-redux";



const down = (
  <svg
    width="10"
    height="5"
    viewBox="0 0 10 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.93119 1.20379L6.83498 3.30389L5.55506 4.59274C5.01304 5.13575 4.13146 5.13575 3.58945 4.59274L0.206783 1.20379C-0.237274 0.758914 0.0827077 0 0.703081 0H4.36655H8.43489C9.0618 0 9.37525 0.758914 8.93119 1.20379Z"
      fill="#FF231F"
    />
  </svg>
);

const up = (
  <svg
    width="10"
    height="5"
    viewBox="0 0 10 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.93119 3.79621L6.83498 1.69611L5.55506 0.407262C5.01304 -0.135754 4.13146 -0.135754 3.58945 0.407262L0.206783 3.79621C-0.237274 4.24109 0.0827077 5 0.703081 5H4.36655H8.43489C9.0618 5 9.37525 4.24109 8.93119 3.79621Z"
      fill="#008F75"
    />
  </svg>
);



const Marketwatchview = (props) => {
  const { data, buysellOpen, handleClickOpen, removeWatchList ,MarketWatch} = props;
  const [stateData, setStateData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectedAll] = useState(false);
  const [ids, setIDs] = useState([]);
  const [name1 , setname1] = useState('');
  const [isModalOpen1, setModalOpen1] = useState(false);
  const watchname1 = useSelector(state => state.Position.watchname1);


  

  const name1Ref = useRef(name1);
  const handleSelectAll = (e) => {
    const value = e.target.checked;
    const newIDS = [];
    if (stateData?.length > 0) {
      const newData = deepClone(stateData);
      for (let i = 0; i < newData.length; i++) {
        const ele = newData[i];
        ele["checked"] = value;

        if (value === true) {
          newIDS.push(ele.symbol);
        }
      }

      setIDs(newIDS);
      setStateData(newData);
    }
    setSelectedAll(e.target.checked);
  };

  const orderplacebutton = () => {
    setModalOpen1(true);
  }


  useEffect(() => {
    
    if (watchname1 != "") {
      setname1(watchname1);
      name1Ref.current = watchname1;
      console.log(name1,watchname1)
      
    }
  }, [watchname1]);

  useEffect(() => {
 
    // This will log after `name1` has been updated
    console.log("Updated name1:", name1);
  }, [name1]);

  const handleRemoveWatchList = (row) => {
    console.log("Current Name:", name1Ref.current);
    const updatedWatchlistDetails = {
      ...row?.original,
      name: name1Ref.current,  // Use the passed name directly
    };
  
    removeWatchList(updatedWatchlistDetails);
  };

  const [columns, setColumns] = useState([
    
    {
      id: "2",
      accessorKey: "tradingsymbol",
      header: "Symbol Name",
    },
    {
      id: "3",
      accessorKey: "PC",
      header: "LTP",
      Cell: ({ row }) => {
        const d = row?.original;
        return (
          <>
            <Typography
              component={"span"}
              className={Math.sign(d?.PC) === 1 ? "up" : "down"}
            >
              {d?.liveprice} {Math.sign(d?.PC) === 1 ? up : down}
            </Typography>
            <Typography style={{ marginTop: 3, fontSize: 12 }}>
              {Number(d?.liveprice - d?.C).toFixed(2)} ({d.PC}%)
            </Typography>
          </>
        );
      },
    },
    { id: "4", accessorKey: "AP", header: "ATP" },
    { id: "5", accessorKey: "O", header: "Open" },
    { id: "6", accessorKey: "H", header: "High" },
    { id: "7", accessorKey: "L", header: "Low" },
    { id: "8", accessorKey: "C", header: "Close" },
    { id: "9", accessorKey: "BQ", header: "Ask Qty" },
    { id: "10", accessorKey: "SQ", header: "Bid Qty" },
    { id: "11", accessorKey: "OI", header: "Open Interest" },
    { id: "13", accessorKey: "US", header: "Upper Circuit" },
    { id: "14", accessorKey: "DS", header: "Lower Circuit" },
    {
      id: "12",
      accessorKey: "",
      header: "Actions",
      Cell: ({ renderCellValue, row }) => (
        <Box className="tableActions">
          <Box className="actionButton">
            <Button
              className="buy"
              variant="text"
              onClick={() => orderplacebutton("buy", row)}
            >
              <svg
                width="15"
                height="19"
                viewBox="0 0 15 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.622 9.718C11.5927 9.89133 12.416 10.4027 13.092 11.252C13.768 12.1013 14.106 13.0633 14.106 14.138C14.106 15.0567 13.8633 15.8887 13.378 16.634C12.91 17.362 12.2253 17.9427 11.324 18.376C10.4227 18.792 9.374 19 8.178 19H0.95V0.929999H7.84C9.07067 0.929999 10.128 1.138 11.012 1.554C11.896 1.97 12.5633 2.53333 13.014 3.244C13.4647 3.93733 13.69 4.71733 13.69 5.584C13.69 6.624 13.4127 7.49067 12.858 8.184C12.3033 8.87733 11.558 9.38867 10.622 9.718ZM3.914 8.522H7.58C8.55067 8.522 9.30467 8.30533 9.842 7.872C10.3967 7.42133 10.674 6.78 10.674 5.948C10.674 5.13333 10.3967 4.50067 9.842 4.05C9.30467 3.582 8.55067 3.348 7.58 3.348H3.914V8.522ZM7.918 16.582C8.92333 16.582 9.712 16.3393 10.284 15.854C10.856 15.3687 11.142 14.6927 11.142 13.826C11.142 12.942 10.8387 12.24 10.232 11.72C9.62533 11.2 8.81933 10.94 7.814 10.94H3.914V16.582H7.918Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button
              className="sell"
              variant="text"
              onClick={() => buysellOpen("sell", row)}
            >
              <svg
                width="14"
                height="20"
                viewBox="0 0 14 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.904 19.182C5.69067 19.182 4.59867 18.974 3.628 18.558C2.65733 18.1247 1.89467 17.518 1.34 16.738C0.785333 15.958 0.508 15.048 0.508 14.008H3.68C3.74933 14.788 4.05267 15.4293 4.59 15.932C5.14467 16.4347 5.916 16.686 6.904 16.686C7.92667 16.686 8.724 16.4433 9.296 15.958C9.868 15.4553 10.154 14.814 10.154 14.034C10.154 13.4273 9.972 12.9333 9.608 12.552C9.26133 12.1707 8.81933 11.876 8.282 11.668C7.762 11.46 7.034 11.2347 6.098 10.992C4.91933 10.68 3.95733 10.368 3.212 10.056C2.484 9.72667 1.86 9.224 1.34 8.548C0.82 7.872 0.56 6.97067 0.56 5.844C0.56 4.804 0.82 3.894 1.34 3.114C1.86 2.334 2.588 1.736 3.524 1.32C4.46 0.903999 5.54333 0.695999 6.774 0.695999C8.52467 0.695999 9.95467 1.138 11.064 2.022C12.1907 2.88867 12.8147 4.08467 12.936 5.61H9.66C9.608 4.95133 9.296 4.388 8.724 3.92C8.152 3.452 7.398 3.218 6.462 3.218C5.61267 3.218 4.91933 3.43467 4.382 3.868C3.84467 4.30133 3.576 4.92533 3.576 5.74C3.576 6.29467 3.74067 6.754 4.07 7.118C4.41667 7.46467 4.85 7.742 5.37 7.95C5.89 8.158 6.60067 8.38333 7.502 8.626C8.698 8.95533 9.66867 9.28467 10.414 9.614C11.1767 9.94333 11.818 10.4547 12.338 11.148C12.8753 11.824 13.144 12.734 13.144 13.878C13.144 14.7967 12.8927 15.6633 12.39 16.478C11.9047 17.2927 11.1853 17.9513 10.232 18.454C9.296 18.9393 8.18667 19.182 6.904 19.182Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button
              className="bsdel"
              variant="text"
              onClick={() => {
                confirm("Are you sure you want to delete?")
                  .then((e) => {
                    setIDs([]);
                    setSelectedAll(false);
                    handleRemoveWatchList (row);
                  })
                  .catch((err) => {});
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      ),
    },
  ]);

  const closemodal1 = () => {
    setModalOpen1(false);

  }

  useEffect(() => {
    setStateData(data);
  }, [data]);

  const handleSingleSelect = (value, obj) => {
    let newIDS = [...ids];

    if (obj.symbol) {
      if (value === true) {
        newIDS.push(obj.symbol);
      } else if (newIDS.indexOf(obj.symbol) !== -1) {
        newIDS = newIDS.filter((v) => v !== obj.symbol);
      }
      if (value === false) {
        setSelectedAll(false);
      } else if (value === true && newIDS?.length === stateData?.length) {
        setSelectedAll(true);
      }

      setIDs(newIDS);
    }

    const newData = deepClone(stateData);
    for (let i = 0; i < newData?.length; i++) {
      const ele = newData[i];
      if (ele?.symbol === obj?.symbol) {
        ele["checked"] = value;
        break;
      }
    }
    setStateData(newData);
  };

  const handleChange = (field, label) => {
    for (const col of columns) {
      if (col.field === field) {
        col.label = label;
      }
    }
    setColumns([...columns]);
  };

  const onDragEnd = (columns) => {
    setColumns([...columns]);
  };

  const CustomCell = ({ cell }) => {
    return (
      <Box
        sx={{
          color: "black",
          fontSize: "12px",
          padding: "3px",
        }}
        component={"span"}
      >
        {cell?.getValue()}
      </Box>
    );
  };

  // const rows = [
  //   {
  //     symbol: "BANKNIFTY",
  //     token: "39213",
  //     exchange: "NFO",
  //     tradingsymbol: "BANKNIFTY13DEC23C48500",
  //     option: "CE",
  //     expiry: "2023-12-13",
  //     strikeprice: "48500",
  //     liveprice: 251.25,
  //     O: 1602.35,
  //     H: 1602.35,
  //     L: 1578.2,
  //     C: 251.25,
  //     AP: 1590.27,
  //     BQ: 1875,
  //     SQ: 18750,
  //     PC: 0,
  //     OI: 0,
  //   },
  // ];

  // const table = useMaterialReactTable({
  //   columns: columns ?? [],
  //   data: [
  //     {
  //       symbol: "BANKNIFTY",
  //       token: "39213",
  //       exchange: "NFO",
  //       tradingsymbol: "BANKNIFTY13DEC23C48500",
  //       option: "CE",
  //       expiry: "2023-12-13",
  //       strikeprice: "48500",
  //       liveprice: 251.25,
  //       O: 1602.35,
  //       H: 1602.35,
  //       L: 1578.2,
  //       C: 251.25,
  //       AP: 1590.27,
  //       BQ: 1875,
  //       SQ: 18750,
  //       PC: 0,
  //       OI: 0,
  //     },
  //   ],
  //   enableColumnOrdering: true,
  // });
  return (
    <>
      <Box cla className="box1254" >
        <Grid container spacing={1} sx={{width:"100%",overflowX:"scroll"}}>
          <MaterialReactTable
            muiTableHeadCellProps={{
              style: {
                color: "black",
                fontSize: "12px",
                fontWeight: "bold",
                boxShadow: "none",
                width: "100%",
                overflowX:"scroll",
                height:"30px",
                paddingTop:"10px"
              },
            }}
            muiTablePaperProps={{
              sx: {
                boxShadow: "none", // Remove shadow
              },
            }}
            muiTableContainerProps={{
              sx: {
                boxShadow: "none", // Remove shadow from the table container
              },
            }}
            data={stateData || []}
            muiTableBodyCellProps={{ style: { width: "100px" ,boxShadow: "none" } }}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            columns={columns.map((column) => ({
              ...column,
              Cell: column?.Cell ?? CustomCell,
              size: 100,
            }))}
            enableColumnOrdering={true}
            enableSorting={true}
            enableColumnActions={true}
            enableRowSelection={true}
            

            renderTopToolbar={ ({ table }) => {
              const handleDeactivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                  handleRemoveWatchList (row);
                });
              };
        
              const handleActivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                  handleRemoveWatchList (row);
                });
              };
        
              // const handleContact = () => {
              //   table.getSelectedRowModel().flatRows.map((row) => {
              //     alert('contact ' + row.getValue('name'));
              //   });
              // };
        
              return (
                <Box
                  sx={(theme) => ({
                    backgroundColor: lighten(theme.palette.background.default, 0.05),
                    display: 'flex',
                    gap: '0.5rem',
                    p: '8px',
                    justifyContent: 'space-between',
                  })}
                >
                  <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/* import MRT sub-components */}
                    <MRT_GlobalFilterTextField table={table} />
                    <MRT_ToggleFiltersButton table={table} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleDeactivate}
                        variant="contained"
                      >
                        Delete
                      </Button>
                      <Button
                        color="error"
                        disabled={table.getIsSomeRowsSelected()}
                        onClick={handleActivate}
                        variant="contained"
                      >
                        Delete All
                      </Button>
                      
                    </Box>
                  </Box>
                </Box>
              );
            }}
        
            
            // renderTopToolbarCustomActions={({ table }) => {
            //   const selected = table.getSelectedRowModel()?.flatRows;
            //   return (
            //     <>
            //       <Grid
            //         item
            //         xs={12}
            //         sx={{
            //           display: "flex",
            //           alignItems: "center",
            //           gap: "2rem",
            //         }}
            //       >
            //         <Box
            //           sx={{
            //             display: "flex",
            //             marginTop: "10px",
            //             marginLeft: "10px",
            //           }}
            //         >
            //           <Tooltip
            //             arrow
            //             placement="top"
            //             title={
            //               <Typography sx={{ fontSize: "1.4rem" }}>
            //                 Add Symbol
            //               </Typography>
            //             }
            //           >
            //             <Button
            //               className="collapse-btn"
            //               onClick={handleClickOpen}
            //             >
            //               <AddIcon />
            //             </Button>
            //           </Tooltip>
            //           {selected?.length > 0 && (
            //             <Button
            //               onClick={() => {
            //                 confirm("Are you sure you want to continue?")
            //                   .then((e) => {
            //                     // send ids to backend here
            //                     setIDs([]);
            //                     setSelectedAll(false);
            //                   })
            //                   .catch((err) => {});
            //               }}
            //               className="delete-btn btn-danger"
            //             >
            //               Delete
            //             </Button>
            //           )}
            //         </Box>
            //       </Grid>
            //     </>
            //   );
            // }}
          />
          {/* <TableDraggable
              data={data || []}
              editable={true}
              onChange={handleChange}
              columns={columns}
              onDragEnd={onDragEnd}
            /> */}
          {/* )} */}
          {/* <Grid item xs={12}>
            <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
              <Table
                stickyHeader
                sx={{ minWidth: "100%", maxHeight: 550 }}
                className={`table tableData`}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        sx={{
                          padding: 0,
                        }}
                        disabled={!stateData}
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Symbol Name</TableCell>
                    <TableCell>LTP</TableCell>
                    <TableCell>ATP</TableCell>
                    <TableCell>Open</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>Close</TableCell>
                    <TableCell>Ask Qty</TableCell>
                    <TableCell>Bid Qty</TableCell>
                    <TableCell>Open Interest</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stateData?.length > 0 &&
                    (rowsPerPage > 0
                      ? stateData?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : stateData
                    )?.map((d, i) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": { fontSize: 24 },
                                padding: 0,
                              }}
                              checked={ids.includes(d?.symbol)}
                              onChange={(e) =>
                                handleSingleSelect(e.target.checked, d)
                              }
                            />
                          </TableCell>
                          <TableCell>{d?.tradingsymbol}</TableCell>
                          <TableCell>
                            <Typography
                              component={"span"}
                              className={Math.sign(d?.PC) === 1 ? "up" : "down"}
                            >
                              {d?.liveprice}{" "}
                              {Math.sign(d?.PC) === 1 ? up : down}
                            </Typography>
                            <Typography style={{ marginTop: 3, fontSize: 12 }}>
                              {Number(d?.liveprice - d?.C).toFixed(2)} ({d.PC}%)
                            </Typography>
                          </TableCell>
                          <TableCell>{d?.AP}</TableCell>
                          <TableCell>{d?.O}</TableCell>
                          <TableCell>{d?.H}</TableCell>
                          <TableCell>{d?.L}</TableCell>
                          <TableCell>{d?.C}</TableCell>
                          <TableCell>{d?.BQ}</TableCell>
                          <TableCell>{d?.SQ}</TableCell>
                          <TableCell>{d?.OI}</TableCell>
                          <TableCell>
                            <Box className="tableActions">
                              <Box className="actionButton">
                                <Button
                                  className="buy"
                                  variant="text"
                                  onClick={() => buysellOpen("buy", d)}
                                >
                                  <svg
                                    width="15"
                                    height="19"
                                    viewBox="0 0 15 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.622 9.718C11.5927 9.89133 12.416 10.4027 13.092 11.252C13.768 12.1013 14.106 13.0633 14.106 14.138C14.106 15.0567 13.8633 15.8887 13.378 16.634C12.91 17.362 12.2253 17.9427 11.324 18.376C10.4227 18.792 9.374 19 8.178 19H0.95V0.929999H7.84C9.07067 0.929999 10.128 1.138 11.012 1.554C11.896 1.97 12.5633 2.53333 13.014 3.244C13.4647 3.93733 13.69 4.71733 13.69 5.584C13.69 6.624 13.4127 7.49067 12.858 8.184C12.3033 8.87733 11.558 9.38867 10.622 9.718ZM3.914 8.522H7.58C8.55067 8.522 9.30467 8.30533 9.842 7.872C10.3967 7.42133 10.674 6.78 10.674 5.948C10.674 5.13333 10.3967 4.50067 9.842 4.05C9.30467 3.582 8.55067 3.348 7.58 3.348H3.914V8.522ZM7.918 16.582C8.92333 16.582 9.712 16.3393 10.284 15.854C10.856 15.3687 11.142 14.6927 11.142 13.826C11.142 12.942 10.8387 12.24 10.232 11.72C9.62533 11.2 8.81933 10.94 7.814 10.94H3.914V16.582H7.918Z"
                                      fill="white"
                                    />
                                  </svg>
                                </Button>
                                <Button
                                  className="sell"
                                  variant="text"
                                  onClick={() => buysellOpen("sell", d)}
                                >
                                  <svg
                                    width="14"
                                    height="20"
                                    viewBox="0 0 14 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.904 19.182C5.69067 19.182 4.59867 18.974 3.628 18.558C2.65733 18.1247 1.89467 17.518 1.34 16.738C0.785333 15.958 0.508 15.048 0.508 14.008H3.68C3.74933 14.788 4.05267 15.4293 4.59 15.932C5.14467 16.4347 5.916 16.686 6.904 16.686C7.92667 16.686 8.724 16.4433 9.296 15.958C9.868 15.4553 10.154 14.814 10.154 14.034C10.154 13.4273 9.972 12.9333 9.608 12.552C9.26133 12.1707 8.81933 11.876 8.282 11.668C7.762 11.46 7.034 11.2347 6.098 10.992C4.91933 10.68 3.95733 10.368 3.212 10.056C2.484 9.72667 1.86 9.224 1.34 8.548C0.82 7.872 0.56 6.97067 0.56 5.844C0.56 4.804 0.82 3.894 1.34 3.114C1.86 2.334 2.588 1.736 3.524 1.32C4.46 0.903999 5.54333 0.695999 6.774 0.695999C8.52467 0.695999 9.95467 1.138 11.064 2.022C12.1907 2.88867 12.8147 4.08467 12.936 5.61H9.66C9.608 4.95133 9.296 4.388 8.724 3.92C8.152 3.452 7.398 3.218 6.462 3.218C5.61267 3.218 4.91933 3.43467 4.382 3.868C3.84467 4.30133 3.576 4.92533 3.576 5.74C3.576 6.29467 3.74067 6.754 4.07 7.118C4.41667 7.46467 4.85 7.742 5.37 7.95C5.89 8.158 6.60067 8.38333 7.502 8.626C8.698 8.95533 9.66867 9.28467 10.414 9.614C11.1767 9.94333 11.818 10.4547 12.338 11.148C12.8753 11.824 13.144 12.734 13.144 13.878C13.144 14.7967 12.8927 15.6633 12.39 16.478C11.9047 17.2927 11.1853 17.9513 10.232 18.454C9.296 18.9393 8.18667 19.182 6.904 19.182Z"
                                      fill="white"
                                    />
                                  </svg>
                                </Button>
                                <Button
                                  className="bsdel"
                                  variant="text"
                                  onClick={() => {
                                    confirm("Are you sure you want to delete?")
                                      .then((e) => {
                                        setIDs([]);
                                        setSelectedAll(false);
                                        removeWatchList(d);
                                      })
                                      .catch((err) => {});
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              className="tablePagination"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "end" },
                padding: "0 1rem",
              }}
            >
              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                count={stateData?.length}
                rowsPerPage={rowsPerPage}
                SelectProps={{
                  fontSize: "1.6rem",
                  native: false,
                }}
                page={page}
                className="tablePagination"
                onPageChange={(e, value) => setPage(value)}
                onRowsPerPageChange={(e) => {
                  setPage(0);
                  setRowsPerPage(e.target.value);
                }}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Box>



      {isModalOpen1 && (
        <div>
          <Orderplace onClose={closemodal1}></Orderplace>

        </div>
      )}
    </>
  );
};

export default Marketwatchview;
