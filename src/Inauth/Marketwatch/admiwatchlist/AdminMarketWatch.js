
import edit from "../../../images/Edit.png";
import search from "../../../images/Search.png";
import del from "../../../images/Delete1.png";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isOverflown } from "@mui/x-data-grid/utils/domUtils";
import AdminAddsymbol from "./Marketwatchview/adminaddsymbol";
import AdminMarketwatchview from "./Marketwatchview/AdminMarketwatchview";
import { useSocket } from "../../../hooks/useNewSocket";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Tooltip, Typography, InputBase } from "@mui/material";
import { confirm } from "../../../redux/actions/confirmActions";

import * as XLSX from "xlsx";
import UploadIcon from '@mui/icons-material/Upload';
import { generatePopup } from "../../../utils/popup";
import Dropdown from "../../Dropdown/Dropdown";
import {
  uploadBulkwatchlist
} from '../../../redux/actions/alertActions';

import {admingetWatchlistName,admincreateWatchlistName} from '../../../redux/actions/positionAction';
import { CSVLink } from 'react-csv';

const AdminMarketWatch= () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("London");
  const [isModalOpen, setModalOpen] = useState(false);
  const watchListUpdateSocket = useSocket("adminwatchlist");
  const [selectAll, setSelectedAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
 
  const [watchlistsubmitname , setInputwatchlistsubmit] = useState("");
  const [inputvaluepopup, setInputvaluePopup] = useState("");



  



  const AdminLive = useSelector(
    (state) => state?.CommonReducer?.AdminLive
  );

  const watchlistNameData = useSelector((state) => state.Position.adminwatchlistName);
  const [watchlists, setWatchlists] = useState([]);
  useEffect(() => {
    dispatch(admingetWatchlistName());
  }, [dispatch]);


  

  useEffect(() => {
    if (watchlistNameData && Array.isArray(watchlistNameData)) {
      const mappedWatchlists = watchlistNameData.map(item => ({
        name: item.name,
        city: item.name // Assuming `owner` is what you want to display as `city`
      }));
      setWatchlists(mappedWatchlists); // Update the state with the API response
    }
  }, [watchlistNameData]);

  const removeWatchList = (obj) => {
    // dispatch(deleteWatchList(obj));
  };
  // const [watchlists, setWatchlists] = useState([
  //   { name: "My Watchlist", city: "London" },
  //   { name: "My Watchlist 1", city: "Paris" },
  //   { name: "My Watchlist 2", city: "Tokyo" },
  // ]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlepopsubmit = () => {
    if (watchlists.length >= 5) {
      generatePopup("error", "Maximum 5 watchlist permitted.");
      return;
    } else{
    if (inputvaluepopup != ""){
      dispatch( admincreateWatchlistName(
        { name: inputvaluepopup }
      ));
      dispatch(admingetWatchlistName());
    }}
  }

  const handleBulkUploadwatchlist = (event) => {
    const formData = new FormData();
    const fileData = event.target.files[0];
    formData.append('file', fileData);
    formData.append('name', 'watchlist');
    dispatch(uploadBulkwatchlist(formData));
  };


  const [selectedStock, setSelectedStock] = useState();
  const [sell, setbuy] = useState("buy");
  const [buysell, setbuysell] = useState("Buy");
  const [bsopen, setbsopen] = useState(false);
  const buysellOpen = (value, data) => {
    const stock = data?.original;
    console.log("stock :>> ", stock);
    if (stock?.exchange === "NSE" && value?.toLowerCase() === "sell") {
      return generatePopup(
        "error",
        "Short Selling is not allowed in this segment."
      );
    }
    // dispatch(
    //   getAlertFutureData({
    //     exchange: stock?.exchange,
    //     symbol: stock?.symbol,
    //   })
    // ).then((res) => {
    //   if (stock?.token) {
    //     if (stock?.exchange === "NSE") {
    //       setQty(1);
    //     } else {
    //       setSelectedQuantity(res?.[0]?.lot);
    //       setQty(res?.[0]?.lot);
    //     }
    //   }
    // });

    setSelectedStock(stock);
    setbuy(value);
    setbuysell(value);
    setbsopen(true);

  };


  const columnsData = [
    {
      Header: "", // No header or leave blank for the checkbox column
      accessor: "select",
      Cell: ({ row }) => (
        <input
          type="checkbox"
        // checked={selectedRows.includes(row.id)}
        // onChange={() => handleRowSelect(row.id)}
        />
      ), // Add a checkbox for each row
    },
    { Header: "Short Exchange Name", accessor: "ShortExchangeName" },
    { Header: "Scrip Code", accessor: "ScripCode" },
    {
      Header: "Scrip Name", accessor: "ScripName",
      Cell: ({ value }) => (
        <span
          style={{
            color: '#576197', // Red if less than 0, green otherwise
          }}
        >
          {value}
        </span>
      ),
    },
    { Header: "% Change", accessor: "Change", sortType: 'basic' },
    {
      Header: "Current", accessor: "Current",
      Cell: ({ value }) => (
        <span
          style={{
            color: value < 0 ? 'red' : 'green', // Red if less than 0, green otherwise
          }}
        >
          {value}
        </span>
      ),
    },
    { Header: "Bid Qty", accessor: "BidQty" },
    { Header: "Bid Price", accessor: "BidPrice" },
    { Header: "Offer Price", accessor: "OfferPrice" },
    { Header: "Offer Qty", accessor: "OfferQty" },
    { Header: "Open", accessor: "Open" },
    { Header: "High", accessor: "High" },
    { Header: "Low", accessor: "Low" },
    { Header: "Close", accessor: "Close" },
    { Header: "Difference", accessor: "Difference" },
    {

      accessor: "",
      Header: "Actions",
      Cell: ({ renderCellValue, row }) => (
        <Box className="tableActions">
          <Box className="actionButton">
            <Button
              className="buy"
              variant="text"
              onClick={() => buysellOpen("buy", row)}
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
                    // setIDs([]);
                    setSelectedAll(false);
                    removeWatchList(row?.original);
                  })
                  .catch((err) => { });
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      ),
    },
  ];
  const [tableData, setTableData] = useState([]);

  const [table1Data, setTable1Data] = useState();
  useEffect(() => {
    console.log(AdminLive)
    setTable1Data(AdminLive?.slice(0, 50));

  }, [AdminLive]);

  useEffect(() => {


    // Parse the incoming WebSocket data and map it to your table structure
    const updatedData = AdminLive.map((item) => ({
      ShortExchangeName: item.exchange,
      ScripCode: item.token,
      ScripName: item.tradingsymbol,
      Change: '0', // If you have % change in response, map it here
      Current: item.liveprice,
      BidQty: item.BQ, // Assuming BQ is Bid Quantity
      BidPrice: item.O, // Map Bid Price if available
      OfferPrice: item.AP, // Map Offer Price if available
      OfferQty: item.SQ, // Assuming SQ is Offer Quantity
      Open: item.O, // Assuming O is Open price
      High: item.H,
      Low: item.L,
      Close: item.C,
      Difference: '0', // Compute or use value from response if available
    }));

    // Set the updated data in the state
    setTableData(updatedData);

    if (sortConfig.key) {
      reapplySort(sortConfig.key, sortConfig.direction, updatedData);
    }

    // Cleanup the socket on unmount


  }, [AdminLive]);

  // Function to switch between tabs
  const openCity = (cityName) => {
    setActiveTab(cityName);
    setInputvaluePopup(cityName);
    watchListUpdateSocket.sendMessage({
      remark: "watchlist",  // Define message type, if needed
      name: cityName,  // Send input value as symbol
      });
  };

  // Function to add a new watchlist
  const addWatchlist = () => {
    if (watchlists.length >= 5) {
      alert("Maximum limit of 5 watchlists reached!");
      return;
    }
    
  
    setShowModal(true);
  };

  // Function to delete a watchlist
  const deleteWatchlist = (indexToDelete) => {
    const updatedWatchlists = watchlists.filter(
      (_, index) => index !== indexToDelete
    );
    setWatchlists(updatedWatchlists);

    // If the deleted watchlist was active, reset the active tab
    if (
      activeTab === watchlists[indexToDelete].city &&
      updatedWatchlists.length > 0
    ) {
      setActiveTab(updatedWatchlists[0].city);
    } else if (updatedWatchlists.length === 0) {
      setActiveTab("");
    }
  };
  const closeModal = () => setShowModal(false);

  const [columns, setColumns] = useState(columnsData);
  const [visibleColumns, setVisibleColumns] = useState(
    columnsData.reduce(
      (acc, column) => ({ ...acc, [column.accessor]: true }),
      {}
    )
  );

  // Memoize table columns to avoid re-renders
  const filteredColumns = React.useMemo(
    () => columns.filter((col) => visibleColumns[col.accessor]),
    [columns, visibleColumns]
  );






  const reapplySort = (column, direction, data = tableData) => {
    const sorted = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [sortedData, setSortedData] = useState([]);
  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key: column, direction });
    reapplySort(column, direction);
  };










  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: filteredColumns,

      data: sortedData.length ? sortedData : tableData,
    });

  const closemodal = () => {
    setModalOpen(false);

  }

  const handleClick = () => {
    setModalOpen(true);

  }

  // Handle column drag and drop
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, exit
    if (!destination) return;

    // Reorder columns based on the drag result
    const reorderedColumns = Array.from(columns);
    const [movedColumn] = reorderedColumns.splice(source.index, 1);
    reorderedColumns.splice(destination.index, 0, movedColumn);

    setColumns(reorderedColumns);
  };

  // Toggle column visibility
  const toggleColumnVisibility = (accessor) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [accessor]: !prevState[accessor],
    }));
  };


  const [showDropdown, setShowDropdown] = useState(false);
  const handleEditClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
    ...(isDragging && {
      background: "#e0f7fa", // Pop-out color while dragging
      transform: "scale(1.1)", // Pop-out effect (increase size slightly)
      zIndex: 999, // Make sure it's above other columns
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Add shadow for pop-out
    }),
  });



  const exportToExcel = (data, fileName = "watchlist_data.xlsx") => {
    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Watchlist");

    // Export the workbook
    XLSX.writeFile(workbook, fileName);
  };

  const watchValues = ["market1", "market2", "market3", "SL-M"];

  return (
    <>





      {isModalOpen && (
        <div>
          <AdminAddsymbol onClose={closemodal} marketwatchname = {inputvaluepopup}></AdminAddsymbol>

        </div>
      )}
      <h1 className="head">Watchlists</h1>
      <div className="line">
        <div className="dropdown">
          {/* <button className="dropbtn">Select Predifined Watchlist</button>
          <div className="dropdown-content">
            <a href="#">List 1</a>
            <a href="#">List 2</a>
            <a href="#">List 3</a>
          </div> */}
          <Box
            className="inputFields space fullWidth"
            
            sx={{
              "& > .selectionDiv": {
                padding: "0 !important",
                marginTop: "0 !important",
                border: "none !important",
                height: "35px",
                width:"300px",
                

              },
            }}
          >
            <Dropdown
              sx={{ height: "30px", fontSize: "12px" }}
              val={watchValues}
              value=""
              
            />
          </Box>
        </div>
        <div className="div01">
          {/* <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={edit} className="stratlogo" onClick={handleEditClick} // On image click, toggle dropdown visibility
              style={{ cursor: 'pointer' }} alt="edit" />
            {showDropdown && (
              <div className="column-settings">
                {columns.map((col) => (
                  <div key={col.accessor}>
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.accessor]}
                      onChange={() => toggleColumnVisibility(col.accessor)}
                    />
                    <label>{col.Header}</label>
                  </div>
                ))}
              </div>
            )}
          </div> */}
          {/* <img src={search} className="stratlogo" alt="search" />
          <img src={del} className="stratlogo" alt="delete" /> */}
          <a className="text01" onClick={() => exportToExcel(tableData)}>Export to Excel</a>
          <Typography
            component={'label'}
            className='bulk_alert_item fileUpload'
          >
            <InputBase
              type='file'
              accept='.csv'
              sx={{ opacity: '0', visibility: 'hidden' }}
              onChange={(e) => {
                handleBulkUploadwatchlist(e);

              }}
            />
            <UploadIcon />

          </Typography>
        </div>
      </div>

      <div className="w1-bar w3-black div004">
        {watchlists.map((watchlist, index) => (
          <div key={index} className="watchlist-tab">
            <button
              className={`w3-bar-item w3-button tablebutton ${activeTab === watchlist.city ? "active-tab" : ""
                }`}
              onClick={() => openCity(watchlist.city)}
            >
              {watchlist.name}
            </button>

            <button
              className="delete-tab-btn"
              onClick={() => deleteWatchlist(index)}
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={addWatchlist}
          className="add-watchlist-btn"
          disabled={watchlists.length >= 5}
        >
          + Create New Watchlist
        </button>
      </div>


      <hr></hr>



      {watchlists.map((watchlist, index) => (
        <div
          key={index}
          id={watchlist.city}
          className="city"
          style={{ display: activeTab === watchlist.city ? "block" : "none", background: "white", padding: "20px", borderRadius: '20px', marginTop: '20px' }}
        >
          {/* <h2>{watchlist.city}</h2>
          <p>{watchlist.city} is a beautiful city.</p> */}
          <div className="div006">
            <div className="div007">
              <p className="text0123">Indices</p>
              <p className="text003">Total 52 Items</p>
            </div>
            <button className="addbut" onClick={handleClick}>+ Add Symbol</button>
          </div>
          <div>
            <div>
              <div className="scroll" style={{ overflowX: "scroll" }}>


                {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable
                    droppableId="droppable-columns"
                    direction="horizontal"

                  >
                    {(provided) => (
                      <table
                        {...getTableProps()}
                        ref={provided.innerRef}
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column, index) => (
                                <Draggable
                                  key={column.id}
                                  draggableId={column.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <th
                                      {...column.getHeaderProps()}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        fontWeight: "400",
                                        padding: "8px",
                                        background: "#FBFBFB",
                                        borderBottom: "1px solid #CCCCCC",
                                        minWidth: "120px",
                                        height: "35px",
                                      }}

                                    >

                                      {column.render("Header")}
                                      <button style={{backgroundColor:"transparent",border:"none",height:"6px"}} onClick={() => handleSort(column.id)}>
                                        {sortConfig.key === column.id ? (
                                          sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                                        ) : '⇅'}
                                      </button>

                                    </th>
                                  )}
                                </Draggable>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                  <td
                                    {...cell.getCellProps()}
                                    style={{
                                      borderBottom: "1px solid #CCCCCC",
                                      height: "35px",
                                      padding: "8px",
                                      fontSize: "12px"
                                    }}
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </Droppable>
                </DragDropContext> */}
                <AdminMarketwatchview
                  data={table1Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={inputvaluepopup}
                />
              </div>
            </div>
          </div>
        </div>
      ))}







{showModal && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            <p>Create new watchlist!</p>
            <input type="text" 
              value={inputvaluepopup} 
              onChange={(e) => setInputvaluePopup(e.target.value)}  className="inpmod" placeholder="WatchList Name "></input>
            <button onClick={handlepopsubmit} className="subbut">Submit</button>
            <button className="close-btn1" onClick={closeModal}>X</button>
          </div>
        </div>
      )}









    </>
  );
};

export default AdminMarketWatch;
