import React, { useState } from "react";
import edit from "../../images/Edit.png";
import search from "../../images/Search.png";
import del from "../../images/Delete1.png";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isOverflown } from "@mui/x-data-grid/utils/domUtils";
import Addsymbol from "./Marketwatchview/addsymbol";

const Marketwatchview1 = () => {
  const [activeTab, setActiveTab] = useState("London");
  const [isModalOpen,setModalOpen] = useState(false);
  const [watchlists, setWatchlists] = useState([
    { name: "My Watchlist", city: "London" },
    { name: "My Watchlist 1", city: "Paris" },
    { name: "My Watchlist 2", city: "Tokyo" },
  ]);

  const columnsData = [
    { Header: "Short Exchange Name", accessor: "ShortExchangeName" },
    { Header: "Scrip Code", accessor: "ScripCode" },
    { Header: "Scrip Name", accessor: "ScripNam" },
    { Header: "% Change", accessor: "Change" },
    { Header: "Current", accessor: "Current" },
    { Header: "Bid Qty", accessor: "BidQty" },
    { Header: "Bid Price", accessor: "BidPrice" },
    { Header: "Offer Price", accessor: "OfferPrice" },
    { Header: "Offer Qty", accessor: "OfferQty" },
    { Header: "Open", accessor: "Open" },
    { Header: "High", accessor: "High" },
    { Header: "Low", accessor: "Low" },
    { Header: "Close", accessor: "Close" },
    { Header: "Difference", accessor: "Difference" },

    { Header: "Offer Qty", accessor: "a" },
    { Header: "Open", accessor: "b" },
    { Header: "High", accessor: "c" },
    { Header: "Low", accessor: "d" },
    { Header: "Close", accessor: "e" },
    { Header: "Difference", accessor: "f" },

  ];

  const data = [
    { ShortExchangeName: "John Doe", ScripCode: 28, ScripNam: "1234 Main St" ,Change:"54",Current:"45",BidQty:"43",BidPrice:"34",OfferPrice:"34",OfferQty:"45",Open:"45",High:"45",Low:"45",Close:"54",Difference:"434",a:"45",b:"$5",c:"434",d:"44",e:"54",f:"353"},
    { ShortExchangeName: "John Doe", ScripCode: 28, ScripNam: "1234 Main St" ,Change:"54",Current:"45",BidQty:"43",BidPrice:"34",OfferPrice:"34",OfferQty:"45",Open:"45",High:"45",Low:"45",Close:"54",Difference:"434",a:"45",b:"$5",c:"434",d:"44",e:"54",f:"353"},
  ];

  // Function to switch between tabs
  const openCity = (cityName) => {
    setActiveTab(cityName);
  };

  // Function to add a new watchlist
  const addWatchlist = () => {
    if (watchlists.length >= 5) {
      alert("Maximum limit of 5 watchlists reached!");
      return;
    }
    const newWatchlist = {
      name: `My Watchlist ${watchlists.length}`,
      city: `City${watchlists.length}`,
    };
    setWatchlists([...watchlists, newWatchlist]);
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: filteredColumns,
      data,
    });

    const closemodal = () => {
      setModalOpen(false);
  
    }

    const handleClick= () => {
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

  return (
    <>
      { isModalOpen && (
        <div>
          <Addsymbol onClose={closemodal}></Addsymbol>
          
        </div>
      )}
      <h1 className="head">Watchlists</h1>
      <div className="line">
        <div className="dropdown">
          <button className="dropbtn">Select Predifined Watchlist</button>
          <div className="dropdown-content">
            <a href="#">List 1</a>
            <a href="#">List 2</a>
            <a href="#">List 3</a>
          </div>
        </div>
        <div className="div01">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={edit}  className="stratlogo" onClick={handleEditClick} // On image click, toggle dropdown visibility
        style={{ cursor: 'pointer' }}  alt="edit" />
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
        </div>
          <img src={search} className="stratlogo" alt="search" />
          <img src={del} className="stratlogo" alt="delete" />
          <p className="text01">Export to Excel</p>
        </div>
      </div>

      <div className="w1-bar w3-black div004">
        {watchlists.map((watchlist, index) => (
          <div key={index} className="watchlist-tab">
            <button
              className={`w3-bar-item w3-button tablebutton ${
                activeTab === watchlist.city ? "active-tab" : ""
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
          style={{ display: activeTab === watchlist.city ? "block" : "none",background:"white", padding:"20px",borderRadius:'20px',marginTop:'20px' }}
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
              <div className="scroll" style={{overflowX:"scroll"}}>
                
                
                <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                        fontWeight:"400",
                                        padding: "8px",
                                        background: "#FBFBFB",
                                        borderBottom:"1px solid #CCCCCC",
                                        minWidth:"90px",
                                     height:"35px",
                                      }}
                                      
                                    >
                                      {column.render("Header")}
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
                                     borderBottom:"1px solid #CCCCCC",
                                     height:"35px",
                                      padding: "8px",
                                      fontSize:"12px"
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
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Marketwatchview1;
