import React, { useState } from "react";
import "./newalert.scss";
import rebot from "../../../images/Reboot.png";
import search from "../../../images/search1.png";

export default function AlertComponent() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Triggered");

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown after selecting
  };
  const tableData = [
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',

    },
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',
    },
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',
    },
  ];


  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]); // Deselect all if all are selected
    } else {
      setSelectedRows(tableData.map((_, index) => index)); // Select all
    }
  };






  return (
    <div className="divbox">
      <div className="div1001">
        <div className="div2">
          <div className="div3">
            <h6 className="text1">Alert</h6>
            <img src={rebot} className="ree" />
          </div>
          <p className="text2">Total 52 alerts</p>
        </div>
        <button className="alertbut">+ Add Alert</button>
      </div>

      <div className="divinner">
        <div className="div4">
          <p className="text3">Search For Alert</p>
          <div className="input-container">
            <img src={search} className="ree" />
            <input placeholder="Search alert" />
          </div>
        </div>
        <div className="div4">
          <p className="text3">Select Status</p>
          <div className="dropdown-container">
            <button onClick={handleToggleDropdown} className="dropdown-trigger">
              {selectedOption}
              <span className={`arrow ${showDropdown ? "up" : "down"}`}>▾</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => handleSelectOption("Option 1")}
                >
                  Option 1
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => handleSelectOption("Option 2")}
                >
                  Option 2
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => handleSelectOption("Option 3")}
                >
                  Option 3
                </div>
              </div>
            )}
          </div>
        </div>
        <button className="deletbut">Delete</button>
        <button className="deletbut">Bulk Delete</button>
      </div>


      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === tableData.length}
                  onChange={handleSelectAll}

                />
                {/* <label>Select All</label> */}
              </th>
              <th>Status</th>
              <th>Time</th>
              <th>Scrip</th>
              <th>Value</th>
              <th>Condition</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                <td className={row.status === 'Completed' ? 'status-completed' : 'status-pending'}>{row.status}</td>
                <td>{row.time}</td>
                <td>{row.scrip}</td>
                <td>{row.value}</td>
                <td>{row.condition}</td>
                <td>{row.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
