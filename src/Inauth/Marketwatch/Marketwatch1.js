import React, { useState } from "react";
import edit from "../../images/Edit.png";
import search from "../../images/Search.png";
import del from "../../images/Delete1.png";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isOverflown } from "@mui/x-data-grid/utils/domUtils";

const Marketwatchview1 = () => {
  const [activeTab, setActiveTab] = useState("London");
  const [watchlists, setWatchlists] = useState([
    { name: "My Watchlist", city: "London" },
    { name: "My Watchlist 1", city: "Paris" },
    { name: "My Watchlist 2", city: "Tokyo" },
  ]);

  const columnsData = [
    { Header: "Short Exchange Name", accessor: "Short Exchange Name" },
    { Header: "Scrip Code", accessor: "Scrip Code" },
    { Header: "Scrip Name", accessor: "Scrip Nam" },
    { Header: "% Change", accessor: "% Change" },
    { Header: "Current", accessor: "Current" },
    { Header: "Bid Qty", accessor: "Bid Qty" },
    { Header: "Bid Price", accessor: "Bid Price" },
    { Header: "Offer Price", accessor: "Offer Price" },
    { Header: "Offer Qty", accessor: "Offer Qty" },
    { Header: "Open", accessor: "Open" },
    { Header: "High", accessor: "High" },
    { Header: "Low", accessor: "Low" },
    { Header: "Close", accessor: "Close" },
    { Header: "Difference", accessor: "Difference" },

    { Header: "Offer Qty", accessor: "1" },
    { Header: "Open", accessor: "7" },
    { Header: "High", accessor: "4" },
    { Header: "Low", accessor: "3" },
    { Header: "Close", accessor: "5" },
    { Header: "Difference", accessor: "8" },

  ];

  const data = [
    { name: "John Doe", age: 28, address: "1234 Main St" },
    { name: "Jane Smith", age: 34, address: "5678 Oak St" },
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

  // Handle column drag and drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(result.source.index, 1);
    updatedColumns.splice(result.destination.index, 0, movedColumn);

    setColumns(updatedColumns);
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

  return (
    <>
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

      <div className="w3-bar w3-black div004">
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
            <button className="addbut">+ Add Symbol</button>
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
