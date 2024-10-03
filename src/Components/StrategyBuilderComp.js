import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logomob from "../images/moonwish-logo.jpeg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputBase,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Inauth/Admin/Strategy/Strategybuilder/Strategybuilder.scss";
import close from "../images/close.png";
// import Strategydrp from "../Inauth/Admin/Strategy/Strategybuilder/Strategydrp";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../Inauth/Table/Table.scss";
import { getStrategyCode } from "../redux/actions/strategyAction";
import { createStrategy } from "../redux/actions/strategyActions";
const StrategyBuilderComp = (props) => {
  const [open, setOpen] = useState(false);
  const [applyData, setapplyData] = useState("none");
  const [selectedOption, setSelectedOption] = useState();
  const [entryData, setEntryData] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [isConditionsValid, setIsConditionsValid] = useState(false);

  const [isPanel2Enabled, setIsPanel2Enabled] = useState(true);
  const [isPanel3Enabled, setIsPanel3Enabled] = useState(true);
  const [isPanel4Enabled, setIsPanel4Enabled] = useState(true);
  const [isPanel5Enabled, setIsPanel5Enabled] = useState(true);
  const [isPanel6Enabled, setIsPanel6Enabled] = useState(true);

  const [isPanel1SubmitEnabled, setIsPanel1SubmitEnabled] = useState(false);
  const [isPanel2SubmitEnabled, setIsPanel2SubmitEnabled] = useState(false);
  const [isPanel3SubmitEnabled, setIsPanel3SubmitEnabled] = useState(false);
  const [isPanel4SubmitEnabled, setIsPanel4SubmitEnabled] = useState(false);
  const [isPanel5SubmitEnabled, setIsPanel5SubmitEnabled] = useState(false);
  const [isBackTestBtnEnabled, setIsBackTestBtnEnabled] = useState(false);

  const [items, setItems] = useState([1]);
  const [keys, setKeys] = useState([]);
  const [isDisabledKeys, setIsDisabledKeys] = useState([]);

  const [options, setOptions] = useState({
    long_entry: "",
    long_sl: "",
    long_target: "",
    missed_long_entry: "",
    missed_long_sl: "",
    missed_long_target: "",
    missed_short_entry: "",
    missed_short_sl: "",
    missed_short_target: "",
    segment: "Equity",
    short_entry: "",
    short_sl: "",
    short_target: "",
    trend_lots: "No",
    trend_rules: "No",
    trend_signal: "Favour",
    type: "Index Futures",
  });

  const [conditionData, setConditionData] = useState({});
  const [actionData, setActionData] = useState({});
  const [cols, setCols] = useState([]);
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [strategyCode, setStrategyCode] = useState();
  const [stratergyname, setStratergyname] = useState("");
  const [strategyUserName, setStrategyUserName] = useState("");

  const strategyCodeData = useSelector((state) => state.Strategy.strategyCode);

  const handleDataChange = (e) => {
    // setParticularsData(e.target.value);
    const { name, value } = e?.target;
    setOptions((prevState) => {
      const updatedOptions = { ...prevState, [name]: value };
      return updatedOptions;
    });
  };

  function areMandatoryFieldsPresent(obj) {
    let isValid = false;

    const mandatoryFields = [
      "indicator",
      "side",
      "action",
      "type",
      "condition",
      "tsl_buffer",
      "target_buffer",
      "target_lots",
      "stop_loss_data",
      "stopp_loss_entry",
    ];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const ActionObject = obj[key];
        for (let index = 0; index < selectedOption; index++) {
          const longStr = `cond${index}Long`;
          const shortStr = `cond${index}Short`;
          if (
            ActionObject.hasOwnProperty(longStr) &&
            ActionObject.hasOwnProperty(shortStr)
          ) {
            const LongObject = ActionObject[longStr];
            const ShortObject = ActionObject[shortStr];

            for (let j = 0; j < mandatoryFields.length; j++) {
              const field = mandatoryFields[j];
              if (
                !LongObject.hasOwnProperty(field) ||
                !ShortObject.hasOwnProperty(field)
              ) {
                return false;
              } else {
                const value1 = LongObject[field];
                const value2 = ShortObject[field];

                if (
                  (value1 !== null &&
                    value1 !== undefined &&
                    value1 !== "" &&
                    value1 !== "0") ||
                  (value2 !== null &&
                    value2 !== undefined &&
                    value2 !== "" &&
                    value2 !== "0")
                ) {
                  isValid = true;
                } else {
                  return false;
                }
              }
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    return isValid;
  }

  useEffect(() => {
    if (areMandatoryFieldsPresent(actionData) === true) {
      setIsPanel4SubmitEnabled(true);
    } else {
      setIsPanel4SubmitEnabled(false);
    }
  }, [actionData]);

  useEffect(() => {
    if (
      options.missed_long_entry.length !== 0 &&
      options.missed_long_target.length !== 0 &&
      options.missed_long_sl.length !== 0 &&
      options.missed_short_entry.length !== 0 &&
      options.missed_short_target.length !== 0 &&
      options.missed_short_sl.length !== 0 &&
      options.long_target.length !== 0 &&
      options.long_sl.length !== 0 &&
      options.short_entry.length !== 0 &&
      options.short_target.length !== 0 &&
      options.short_sl.length !== 0 &&
      options.long_entry.length !== 0 &&
      date.length !== 0
    ) {
      setIsPanel5SubmitEnabled(true);
    } else {
      setIsPanel5SubmitEnabled(false);
    }
  }, [options, date]);

  useEffect(() => {
    setIsPanel2SubmitEnabled(options?.trend_signal.length !== 0);
  }, [options]);

  const checkIsValid = () => {
    let valid = false;
    const mandatoryFields = [
      "indicator",
      "side",
      "lots",
      "eod_data",
      "type",
      "condition",
      "buffer",
    ];
    for (const fieldName in conditionData) {
      if (conditionData.hasOwnProperty(fieldName)) {
        const LongShortObject = conditionData[fieldName];
        for (let index = 0; index < selectedOption; index++) {
          for (let i = 0; i < mandatoryFields.length; i++) {
            const field = mandatoryFields[i];
            if (LongShortObject.hasOwnProperty(field)) {
              const value = LongShortObject[field];
              if (
                value !== "undefined" &&
                value !== null &&
                value !== "" &&
                value !== "0"
              ) {
                valid = true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        }
      }
    }
    return valid;
  };

  useEffect(() => {
    if (checkIsValid() === true) {
      setIsPanel3SubmitEnabled(true);
    } else {
      setIsPanel3SubmitEnabled(false);
    }
  }, [conditionData]);

  useEffect(() => {
    if (
      options?.segment.length !== 0 &&
      options?.type.length !== 0 &&
      options?.trend_rules.length !== 0 &&
      options?.trend_lots.length !== 0 &&
      isConditionsValid
    ) {
      setIsPanel1SubmitEnabled(true);
    } else {
      setIsPanel1SubmitEnabled(false);
    }
  }, [options, isConditionsValid]);

  // download button pdf
  // const handleDownload = () => {
  //   const content = 'Your downloadable content goes here';
  //   const blob = new Blob([content], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'downloaded-content.txt';
  //   a.click();
  // };

  const [templateHTML, setTemplateHTML] = useState("");
  const fetchTemplate = async () => {
    try {
      const response = await axios.get("P&LM.html");
    } catch (error) {
      console.error("Error fetching the P&LM HTML", error);
    }
  };

  // const handleDownload = () => {

  // 	let modifiedHTML = templateHTML.replace(
  // 		'{{tableData}}',
  // 		generateTableHTML()
  // 	);
  // 	console.log("modifiedHtml",modifiedHTML)
  // 	const doc = new jsPDF();
  // 	doc.fromHTML(modifiedHTML, 15, 15);
  // 	doc.save('table_data.pdf');
  // };

  const handleDownload = () => {
    const startX = 13;
    const pageWidth = 510;
    const pageHeight = 300;
    const doc = new jsPDF({
      orientation: "landscape",
      format: [pageWidth, pageHeight],
    });

    const fontSize = 16; // Adjust the font size as needed
    const fontName = "Times-New-Roman"; // Choose an appropriate name for your custom font

    doc.addFont("Times-New-Roman", "normal");
    doc.addFont("Times-New-Roman", "bold");

    doc.setFont(fontName);
    doc.setFontSize(fontSize);

    doc.addImage(logomob, "PNG", startX, 10, 20, 20);

    const addressX = pageWidth - startX; // Adjust the position as needed
    const addressY = 18;
    doc.text(
      "10th Floor, Fairmount, Plot No. 4,\nSector 17, Palm Beach Road, Sanpada, 400705.",
      addressX,
      addressY,
      { align: "right" }
    );

    const straNameX = startX;
    const straNameY = 50;

    doc.text(stratergyname, straNameX, straNameY); // (text, x-coordinate, y-coordinate)

    doc.text(strategyUserName, straNameX, straNameY + 8);

    let sumProfit = 0;
    // Update the table data to include cell styles

    const headers = Object.keys(tableData[0]);
    const table = tableData.map((row) => {
      const profit = row.total_profit;
      sumProfit += profit;
      const isNegative = profit < 0;

      // Style for red (negative) or green (positive) cells
      const cellStyles = {
        textColor: isNegative ? [255, 35, 31] : [34, 218, 126],
      };

      const rowWithStyles = headers.map((header) => {
        let cellContent = row[header];

        // Check if it's a number and format it with two digits after the decimal point
        if (typeof cellContent === "number") {
          cellContent = cellContent.toFixed(2);
        }

        return {
          content: String(cellContent),
          styles: header === "total_profit" ? cellStyles : {},
        };
      });

      return rowWithStyles;
    });

    if (sumProfit) {
      doc.text(
        `Total profit: ${sumProfit.toFixed(2)}`,
        pageWidth - startX,
        straNameY,
        { align: "right" }
      );
    }

    doc.autoTable({
      head: [headers],
      body: table,
      bodyStyles: { minCellWidth: 18 },
      startY: straNameY + 25,
      startX: startX,
    });
    doc.save("table.pdf");
  };

  useEffect(() => {
    if (strategyCodeData?.shortcode) {
      setStrategyCode(strategyCodeData?.shortcode);
    }
  }, [strategyCodeData]);

  const handleInputBuffer = (e, index, side, indicator) => {
    const { name, value } = e.target;

    let key = "cond" + index + side;

    let temp1 = { ...conditionData };
    if (temp1[key]) {
      temp1[key][name] = value;
    } else {
      temp1[key] = {
        indicator: indicator,
        side: side === "Long" ? "Long" : "Short",
        [name]: value,
      };
    }

    setConditionData(temp1);
    console.time("ENd of input buffer collections");
  };

  const handleChangeActionInputBuffer = (
    e,
    index,

    side,
    indicator,
    actionIndex
  ) => {
    const { name, value } = e?.target;
    const key = `cond${index}${side}`;
    const trimmedIndicator = indicator;
    const action = `Action${actionIndex + 1}`;
    let temp1 = { ...actionData };
    const targetKey = `action${actionIndex}_${trimmedIndicator}`;

    if (!temp1[targetKey]) {
      temp1[targetKey] = {};
    }
    if (!temp1[targetKey]) {
      temp1[targetKey] = {};
    }
    if (!temp1[targetKey][key]) {
      temp1[targetKey][key] = {
        indicator: trimmedIndicator,
        side: side === "Long" ? "Long" : "Short",
        action: action,
      };
    }

    temp1[targetKey][key][name] = value;

    setActionData(temp1);
  };

  const handleChangedrp = (e, index, side, indicator) => {
    const { name, value } = e?.target;
    let key = "cond" + index + side;

    let temp1 = { ...conditionData };
    if (temp1[key]) {
      temp1[key][name] = value;
    } else {
      temp1[key] = {
        indicator: indicator,
        side: side === "Long" ? "Long" : "Short",
        [name]: value,
      };
    }

    setConditionData(temp1);

    // let tempData = [...conditionData];
    // const cond1ShortObject = tempData.find((item) => key in item);
    // if (cond1ShortObject) {
    //   cond1ShortObject[key][name] = value;
    // } else {
    //   tempData.push({
    //     [key]: {
    //       indicator: keys[index]?.join("/"),
    //       side: side === "Long" ? "Long" : "Short",
    //       [name]: value,
    //     },
    //   });
    // }

    // setConditionData(tempData);

    // updatedEntryData?.map((e, i) => {
    //   console.log(
    //     "updatedEntryData :>> ",
    //     Object.values(updatedEntryData[i])[0]
    //   );
    // });
  };

  const handleChangeActiondrp = (e, index, side, indicator, actionIndex) => {
    const { name, value } = e?.target;

    const key = `cond${index}${side}`;
    const trimmedIndicator = indicator;
    const action = `Action${actionIndex + 1}`;

    let temp1 = { ...actionData };
    const targetKey = `action${actionIndex}_${trimmedIndicator}`;

    if (!temp1[targetKey]) {
      temp1[targetKey] = {};
    }
    if (!temp1[targetKey][key]) {
      temp1[targetKey][key] = {
        indicator: trimmedIndicator,
        side: side === "Long" ? "Long" : "Short",
        action: action,
      };
    }

    temp1[targetKey][key][name] = value;
    setActionData(temp1);
  };

  const dispatch = useDispatch();

  const runBackTest = () => {
    setIsLoading(true);
    const actionObj = [];
    setExpanded("panel6");

    Object.keys(actionData)?.map((e) => {
      Object?.keys(actionData?.[e])?.map((j) => {
        const temp = actionData?.[e]?.[j];
        actionObj?.push({
          indicator: temp?.indicator,
          side: temp?.side,
          action: temp?.action,

          target_data: drpvals14?.[temp?.target_data - 1]
            ? drpvals14?.[temp?.target_data - 1]
            : "",
          target_buffer: temp?.target_buffer,
          target_lots: temp?.target_lots ? temp?.target_lots?.toString() : "",
          stopp_loss_entry: drpvals8?.[temp?.stopp_loss_entry - 1]
            ? drpvals8?.[temp?.stopp_loss_entry - 1]
            : "",

          stop_loss_data: drpvals14?.[temp?.stop_loss_data - 1]
            ? drpvals14?.[temp?.stop_loss_data - 1]
            : "",
          type: drpvals3?.[temp?.type - 1] ? drpvals3?.[temp?.type - 1] : "",
          condition:
            drpvals4?.[temp?.condition - 1] === "+"
              ? "Plus"
              : drpvals4?.[temp?.condition - 1] === "-"
              ? "Minus"
              : "",
          tsl_buffer: temp?.tsl_buffer,
          msl_buffer: temp?.msl_buffer,
          tsl_data: drpvals7?.[temp?.tsl_data]
            ? drpvals7?.[temp?.tsl_data]
            : "",
        });
      });
    });

    const conditionObj = [];

    Object.keys(conditionData)?.map((e) => {
      conditionObj?.push({
        buffer: conditionData?.[e].buffer,
        condition: conditionData?.[e].condition == 1 ? "Plus" : "Minus",
        eod_data: conditionData?.[e].eod_data,
        indicator: conditionData?.[e].indicator,
        lots: conditionData?.[e].lots,
        side: conditionData?.[e].side,
        type: conditionData?.[e].type == 1 ? "High" : "Low",
      });
      // conditionObj?.push(conditionData?.[e]);
    });

    const parsedObject = {
      segment: options?.segment || "",
      type: options?.type || "",
      symbol: options?.symbol || "BANKNIFTY",
      trend_rules: options?.trend_rules === "Yes" ? true : false,
      trend_lots: options?.trend_lots === "Yes" ? true : false,
      no_condition: Number(selectedOption) || "",
      trend_signal: options?.trend_signal || "",
      long_entry: options?.long_entry || "",
      long_target: options?.long_target || "",
      long_sl: options?.long_sl || "",
      short_entry: options?.short_entry || "",
      short_target: options?.short_target || "",
      short_sl: options?.short_sl || "",
      missed_long_entry: options?.missed_long_entry || "",
      missed_long_target: options?.missed_long_target || "",
      missed_long_sl: options?.missed_long_sl || "",
      missed_short_entry: options?.missed_short_entry || "",
      missed_short_target: options?.missed_short_target || "",
      missed_short_sl: options?.missed_short_sl || "",
      markettime: options?.markettime || "09:15",
      entrydata: conditionObj,
      targetdata: actionObj,
      stratergyname: stratergyname,
      shortcode: strategyCode,
      created_by: strategyUserName,
    };
    const requiredConditionFields = [
      "indicator",
      "side",
      "lots",
      "eod_data",
      "type",
      "condition",
      "buffer",
    ];
    const requiredActionFields = [
      "indicator",
      "action",
      "target_data",
      "target_buffer",
      "target_lots",
      "stop_loss_data",
      "stopp_loss_entry",
      "msl_buffer",
      "tsl_data",
      "type",
      "condition",
      "tsl_buffer",
      "side",
    ];

    const allConditionIncludes = conditionObj.every((obj) =>
      requiredConditionFields.every(
        (field) =>
          obj[field] !== undefined && obj[field] !== null && obj[field] !== ""
      )
    );
    const allActionIncludes = actionObj.every((obj) =>
      requiredActionFields.every(
        (field) =>
          obj[field] !== undefined && obj[field] !== null && obj[field] !== ""
      )
    );

    if (allConditionIncludes && allActionIncludes) {
      dispatch(createStrategy(parsedObject))
        .then((res) => {
          setIsLoading(false);
          if (res?.status === 200) {
            if (res?.data?.data) {
              setTableData(res?.data?.data);
              setIsPanel6Enabled(true);
              setIsBackTestBtnEnabled(true);
            }
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const handleCheckboxChange = (event, index) => {
    const { name, checked } = event.target;
    const updatedKeys = [...keys];

    updatedKeys[index] = updatedKeys[index] || [];
    if (checked) {
      updatedKeys[index] = [...updatedKeys[index], name];
    } else {
      updatedKeys[index] = updatedKeys[index].filter((item) => item !== name);
    }

    for (let i = 0; i < selectedOption; i++) {
      const arr = updatedKeys[i];
      if (i !== index) {
        updatedKeys[i] = arr.filter((e) => e !== name);
      }
    }

    let isValid = false;
    const arr = [];
    for (let i = 0; i < updatedKeys?.length; i++) {
      updatedKeys[i].map((e) => arr.push(e));
      if (selectedOption === "1" && updatedKeys[i].length === 4) {
        isValid = true;
      } else if (updatedKeys[i].length >= 1) {
        isValid = true;
      } else {
        isValid = false;
        break;
      }
    }

    if (
      isValid === true &&
      (!arr.includes("Bullish") ||
        !arr.includes("Bullish Confirmed") ||
        !arr.includes("Bearish") ||
        !arr.includes("Bearish Confirmed"))
    ) {
      isValid = false;
    }

    setIsConditionsValid(isValid);
    setKeys(updatedKeys);
  };

  useEffect(() => {
    if (tableData?.length > 0) {
      setCols(Object?.keys(tableData?.[0]));
    }
  }, [tableData]);

  const rows = [
    {
      entry: "Long Entry : Not Missed",
      condition: "At ORPT",
      Ccheck: "Compare High at ORPT With Entry Price",
      result:
        'If High at "ORPT" is less than ( < ) Entry For Long Trade Order: Not Missed',
    },
    {
      entry: "Long Entry : Missed",
      condition: "At ORPT",
      Ccheck: "Compare High at ORPT With Entry Price",
      result:
        'If High at "ORPT" is Greater than ( < ) Entry For Long Trade Order: Missed',
    },
    {
      entry: "Short Entry :Not Missed",
      condition: "At ORPT",
      Ccheck: "Compare Low at ORPT With Entry Price",
      result:
        'If High at "ORPT" is Greater than ( < ) Entry For Long Trade Order: Not Missed',
    },
    {
      entry: "Short Entry : Missed",
      condition: "At ORPT",
      Ccheck: "Compare Low at ORPT With Entry Price",
      result:
        'If High at "ORPT" is Less than ( < ) Entry For Long Trade Order: Missed',
    },
    {
      entry: "Long SL : Not Missed",
      condition: "At ORPT",
      Ccheck: "Compare Low at ORPT With SL Price",
      result:
        'If High at "ORPT" is Greater than ( > ) SL For Long Trade Order: Not Missed',
    },
    {
      entry: "Long SL : Missed",
      condition: "At ORPT",
      Ccheck: "Compare Low at ORPT With SL Price",
      result:
        'If High at "ORPT" is Greater than ( <= ) SL For Long Trade Order: Missed',
    },
  ];

  const conditionsData = [];

  function Strategydrp(props) {
    const { handleChangedrp, index, side, indicator, data, actionIndex } =
      props;

    const defaultValueFromData = data && data?.[`cond${index}${side}`];

    return (
      <>
        <Box className="formBox">
          <Box className="formItems" sx={{ marginBottom: "0 !important" }}>
            <Typography component={"label"} className="label">
              {props.drpTitle}
            </Typography>
            <Box className="selectionDiv">
              <FormControl className="dropdown-ap" sx={{ width: "100%" }}>
                <Select
                  value={
                    defaultValueFromData?.[props?.name]
                      ? defaultValueFromData?.[props?.name]
                      : "0"
                  }
                  name={props.name}
                  defaultValue=""
                  onChange={(e) =>
                    handleChangedrp
                      ? handleChangedrp(e, index, side, indicator, actionIndex)
                      : ""
                  }
                  className="dropdown"
                >
                  <MenuItem value="0">select</MenuItem>
                  {props.drpvals.map((vals, index) => {
                    return (
                      <MenuItem value={index + 1} key={index}>
                        {vals}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  const actionTotal = (data) => {
    let totalTargetLotsLong = 0;

    for (const actionKey in actionData) {
      const action = actionData[actionKey];
      for (const conditionKey in action) {
        const condition = action[conditionKey];
        if (conditionKey.includes(data) && condition.target_lots) {
          totalTargetLotsLong += parseInt(condition.target_lots, 10);
        }
      }
    }

    return totalTargetLotsLong;
  };
  const conditionTotal = (data) => {
    let totalTargetLotsLong = 0;

    for (const conditionKey in conditionData) {
      const condition = conditionData[conditionKey];
      if (conditionKey?.includes(data) && condition?.lots) {
        totalTargetLotsLong += parseInt(condition?.lots, 10);
      }
    }

    return totalTargetLotsLong;
  };

  // Add Partuculars
  const addItem = () => {
    if (items.length < 5) {
      setItems([...items, items.length + 1]);
    }

    // actionTotal("Long") < conditionTotal("Long") &&
    // actionTotal("Short") < conditionTotal("Short")
  };

  useEffect(() => {
    const items = [];
    for (let index = 0; index < selectedOption; index++) {
      items.push(index + 1);
    }
    setItems(items);
  }, [selectedOption]);

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const pushData = () => {
    if (applyData === "none") {
      setapplyData("flex");
    } else {
      setapplyData("none");
    }
  };

  // Add Symbol Modal
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(getStrategyCode());
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleRunBacktest = () => {
    handleChange("panel6")(null, true);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    const arr = [];
    const arr2 = [];

    if (value === "1") {
      arr.push([
        "Bullish",
        "Bullish Confirmed",
        "Bearish",
        "Bearish Confirmed",
      ]);
      arr2.push([
        "Bullish",
        "Bullish Confirmed",
        "Bearish",
        "Bearish Confirmed",
      ]);
    } else {
      for (let i = 0; i < value; i++) {
        arr.push([]);
        arr2.push([]);
      }
    }

    setKeys(arr);
    setIsConditionsValid(value === "1");
    setSelectedOption(value);
    setIsDisabledKeys(arr2);
  };

  const drpTitle = "Entry Lots";
  const drpvals = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const drpTitle2 = "EOD Data";
  const drpvals2 = [
    "P1D",
    "P2D",
    "P3D",
    "P4D",
    "P5D",
    "P6D",
    "P7D",
    "P8D",
    "P9D",
    "P10D",
  ];
  const drpvals14 = ["System", "Our"];

  const drpTitle3 = "Price";
  const drpvals3 = ["High", "Low"];

  const drpTitle4 = "+ / -";
  const drpvals4 = ["+", "-"];

  const drpTitle5 = "Buffer %";
  const drpvals5 = ["0.01", "0.02", "0.03", "0.04", "0.05", "0.06"];

  const drpTitle6 = "Target Data";
  const drpvals6 = ["Position Open", "Position Close"];

  const drpTitle7 = "Targets Lots";
  const drpvals7 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const drpTitle8 = "Final Stop Loss";
  const drpvals8 = ["max", "min", "msl", "tsl"];

  const drpTitle9 = "Target Buffer";
  const drpvals9 = ["0.01", "0.02", "0.03", "0.04", "0.05", "0.06"];

  const drpTitle12 = "Stoploss TSL Buffer";
  const drpvals12 = ["0.01", "0.02", "0.03", "0.04", "0.05", "0.06"];

  const handlePanel1Submit = () => {
    toast.success("Symbol data saved successfully");
    handleChange("panel2")(null, true);
    setIsPanel2Enabled(true);
  };

  const handlePanel2Submit = () => {
    toast.success("Trend Signal data saved successfully");
    setIsPanel3Enabled(true);
    handleChange("panel3")(null, true);
  };

  const handlePanel3Submit = () => {
    toast.success("No. of Collections data saved successfully");
    setIsPanel4Enabled(true);
    handleChange("panel4")(null, true);
  };

  const handlePanel4Submit = () => {
    toast.success("Particulars Data saved successfully");
    setIsPanel5Enabled(true);
    handleChange("panel5")(null, true);
  };

  const handlePanel5Submit = () => {
    toast.success("Particular 2 Data saved successfully");
    handleChange("panel6")(null, true);
    runBackTest();
  };

  //Symbol Sections
  const conditions = [];
  for (let index = 0; index < selectedOption; index++) {
    // updatedConditions.push({
    //   ...conditionData[index], // Preserve existing properties
    //   indicator: keys?.[index]?.join("/"), // Update the indicator property
    // });
    if (keys && keys[index]) {
      conditions.push(
        <Box key={index} mt={2} padding={1}>
          <Box className="formBox border-ap" sx={{ border: "none !important" }}>
            <Box className="formItems">
              <Box className="inputFields space fullWidth">
                <RadioGroup row defaultValue="1" sx={{ marginLeft: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Bullish"
                        checked={keys[index]?.includes("Bullish")}
                        disabled={isDisabledKeys[index]?.includes("Bullish")}
                        name="Bullish"
                        onChange={(e) => handleCheckboxChange(e, index)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    }
                    label="Bullish"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Bullish Confirmed"
                        checked={keys[index]?.includes("Bullish Confirmed")}
                        disabled={isDisabledKeys[index]?.includes(
                          "Bullish Confirmed"
                        )}
                        name="Bullish Confirmed"
                        onChange={(e) => handleCheckboxChange(e, index)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    }
                    label="Bullish Confirmed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Bearish"
                        checked={keys[index]?.includes("Bearish")}
                        disabled={isDisabledKeys[index]?.includes("Bearish")}
                        name="Bearish"
                        onChange={(e) => handleCheckboxChange(e, index)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    }
                    label="Bearish"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="Bearish Confirmed"
                        checked={keys[index]?.includes("Bearish Confirmed")}
                        disabled={isDisabledKeys[index]?.includes(
                          "Bearish Confirmed"
                        )}
                        name="Bearish Confirmed"
                        onChange={(e) => handleCheckboxChange(e, index)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                    }
                    label="Bearish Confirmed"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
  }

  const handleCollectionSave = () => {
    // updatedEntryData?.map((e, i) => {
    //   console.log(
    //     "updatedEntryData================= :>> ",
    //     Object.values(updatedEntryData[i])[0]
    //   );
    // });
  };

  //No of Collections section

  const collections = [];
  for (let index = 0; index < selectedOption; index++) {
    collections.push(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            component={"label"}
            className="label"
            sx={{ padding: "2rem 0", fontWeight: 600 }}
          >
            {/* Condition {index + 1} */}
            {keys?.[index]?.join("/")}
          </Typography>

          {/* Bullish Form */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={3} lg={2}>
              <Typography component={"label"} className="label">
                Long :
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                data={conditionData}
                name="lots"
                index={index}
                side="Long"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle}
                drpvals={drpvals}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                data={conditionData}
                name="eod_data"
                index={index}
                side="Long"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle2}
                drpvals={drpvals2}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                data={conditionData}
                name="type"
                index={index}
                side="Long"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle3}
                drpvals={drpvals3}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                data={conditionData}
                name="condition"
                index={index}
                side="Long"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle4}
                drpvals={drpvals4}
              />
            </Grid>
            {/* <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                data={conditionData}
                name="buffer"
                index={index}
                side="Long"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle5}
                drpvals={drpvals5}
              />
            </Grid> */}
            <Grid item xs={12} md={2}>
              <Typography
                component={"label"}
                className="label"
                sx={{ marginBottom: 0.6, opacity: 0.7 }}
              >
                Buffer %
              </Typography>
              <Input
                type="number"
                name="buffer"
                onChange={(e) =>
                  handleInputBuffer(e, index, "Long", keys?.[index].join("/"))
                }
                value={
                  conditionData ? conditionData[`cond${index}Long`]?.buffer : ""
                }
                fullWidth
                className="datePicker input"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            component={"label"}
            className="label"
            sx={{ padding: "2rem 0", fontWeight: 600 }}
          >
            {/* Condition {index + 1} */}
            {keys?.[index].join("/")}
          </Typography>

          {/* Berish Form */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={3} lg={2}>
              <Typography component={"label"} className="label">
                Short :
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                name="lots"
                index={index}
                data={conditionData}
                side="Short"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle}
                drpvals={drpvals}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                name="eod_data"
                index={index}
                data={conditionData}
                side="Short"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle2}
                drpvals={drpvals2}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                name="type"
                index={index}
                data={conditionData}
                side="Short"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle3}
                drpvals={drpvals3}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                name="condition"
                index={index}
                data={conditionData}
                side="Short"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle4}
                drpvals={drpvals4}
              />
            </Grid>
            {/* <Grid item xs={6} md={3} lg={2}>
              <Strategydrp
                name="buffer"
                index={index}
                data={conditionData}
                side="Short"
                indicator={keys?.[index].join("/")}
                handleChangedrp={handleChangedrp}
                drpTitle={drpTitle5}
                drpvals={drpvals5}
              />
            </Grid> */}

            <Grid item xs={12} md={2}>
              <Typography
                component={"label"}
                className="label"
                sx={{ marginBottom: 0.6, opacity: 0.7 }}
              >
                Buffer %
              </Typography>
              <Input
                type="number"
                name="buffer"
                onChange={(e) =>
                  handleInputBuffer(e, index, "Short", keys?.[index].join("/"))
                }
                value={
                  conditionData
                    ? conditionData[`cond${index}Short`]?.buffer
                    : ""
                }
                fullWidth
                className="datePicker input"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const ActionsFunc = (actionIndex) => {
    const actions = [];
    for (let index = 0; index < selectedOption; index++) {
      let data =
        actionData?.[`action${actionIndex}_${keys?.[index].join("/")}`];
      actions.push(
        <>
          <Grid key={`action${index}`} item xs={12} sm={12} md={12}>
            <Typography component={"label"} className="label">
              {keys?.[index].join("/")}
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid
                item
                xs={6}
                sm={4}
                lg={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography component={"label"} className="label">
                  Long :
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="target_data"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle6}
                  drpvals={drpvals14}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="target_buffer"
                    index={index}
                    side="Long"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={drpTitle9}
                    drpvals={drpvals9}
                  />
                </Grid> */}

              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  Target Buffer %
                </Typography>
                <Input
                  type="number"
                  name="target_buffer"
                  value={
                    data ? data["cond" + index + "Long"]?.target_buffer : ""
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Long",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  key={actionIndex}
                  fullWidth
                  className="datePicker input"
                />
              </Grid>

              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="target_lots"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle7}
                  drpvals={drpvals7}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="stopp_loss_entry"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle8}
                  drpvals={drpvals8}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="stop_loss_data"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={"Stop Loss Data"}
                  drpvals={drpvals14}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="type"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle3}
                  drpvals={drpvals3}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="condition"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle4}
                  drpvals={drpvals4}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="tsl_buffer"
                    index={index}
                    side="Long"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={drpTitle12}
                    drpvals={drpvals12}
                  />
                </Grid> */}
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="tsl_data"
                  index={index}
                  side="Long"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={"TSL Data"}
                  drpvals={drpvals7}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  TSL Buffer %
                </Typography>
                <Input
                  type="number"
                  name="tsl_buffer"
                  value={
                    actionData?.[
                      "action" + actionIndex + "_" + keys?.[index].join("/")
                    ]?.["cond" + index + "Long"]?.tsl_buffer
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Long",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  fullWidth
                  className="datePicker input"
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="msl_buffer"
                    index={index}
                    side="Long"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={"Stoploss MSL Buffer"}
                    drpvals={drpvals5}
                  />
                </Grid> */}

              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  MSL Buffer %
                </Typography>
                <Input
                  type="number"
                  name="msl_buffer"
                  value={
                    actionData?.[
                      "action" + actionIndex + "_" + keys?.[index].join("/")
                    ]?.["cond" + index + "Long"]?.msl_buffer
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Long",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  fullWidth
                  className="datePicker input"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sm={4}
                lg={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography component={"label"} className="label">
                  Short :
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="target_data"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle6}
                  drpvals={drpvals14}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="target_buffer"
                    index={index}
                    side="Short"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={drpTitle9}
                    drpvals={drpvals9}
                  />
                </Grid> */}
              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  Target Buffer %
                </Typography>
                <Input
                  type="number"
                  name="target_buffer"
                  value={
                    actionData?.[
                      "action" + actionIndex + "_" + keys?.[index].join("/")
                    ]?.["cond" + index + "Short"]?.target_buffer
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Short",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  fullWidth
                  className="datePicker input"
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="target_lots"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle7}
                  drpvals={drpvals7}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="stopp_loss_entry"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle8}
                  drpvals={drpvals8}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="stop_loss_data"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={"Stop Loss Data"}
                  drpvals={drpvals14}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="type"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle3}
                  drpvals={drpvals3}
                />
              </Grid>
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="condition"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={drpTitle4}
                  drpvals={drpvals4}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="tsl_buffer"
                    index={index}
                    side="Short"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={drpTitle12}
                    drpvals={drpvals12}
                  />
                </Grid> */}
              <Grid item xs={6} sm={4} lg={2}>
                <Strategydrp
                  actionIndex={actionIndex}
                  data={data}
                  name="tsl_data"
                  index={index}
                  side="Short"
                  indicator={keys?.[index].join("/")}
                  handleChangedrp={handleChangeActiondrp}
                  drpTitle={"TSL Data"}
                  drpvals={drpvals7}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  TSL Buffer %
                </Typography>
                <Input
                  type="number"
                  name="tsl_buffer"
                  value={
                    actionData?.[
                      "action" + actionIndex + "_" + keys?.[index].join("/")
                    ]?.["cond" + index + "Short"]?.tsl_buffer
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Short",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  fullWidth
                  className="datePicker input"
                />
              </Grid>

              {/* <Grid item xs={6} sm={4} lg={2}>
                  <Strategydrp
                    actionIndex={actionIndex}
                    data={data}
                    name="msl_buffer"
                    index={index}
                    side="Short"
                    indicator={keys?.[index].join("/")}
                    handleChangedrp={handleChangeActiondrp}
                    drpTitle={"Stoploss MSL Buffer"}
                    drpvals={drpvals5}
                  />
                </Grid> */}

              <Grid item xs={12} md={2}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ marginBottom: 0.6, opacity: 0.7 }}
                >
                  MSL Buffer %
                </Typography>
                <Input
                  type="number"
                  name="msl_buffer"
                  value={
                    actionData?.[
                      "action" + actionIndex + "_" + keys?.[index].join("/")
                    ]?.["cond" + index + "Short"]?.msl_buffer
                  }
                  onChange={(e) =>
                    handleChangeActionInputBuffer(
                      e,
                      index,
                      "Short",
                      keys?.[index].join("/"),
                      actionIndex
                    )
                  }
                  fullWidth
                  className="datePicker input"
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }
    return actions;
  };

  return (
    <>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} md={11}>
          <Box className="createStrategy">
            <Button className="createStrategy-btn" onClick={handleClickOpen}>
              <AddIcon />
              Create A New Srategy
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: { xs: "left", md: "center" },
          // display: applyData,
          overflowX: "auto",
        }}
      >
        <Grid itemxs={9} xl={8} md={11} marginTop={3}>
          <Box className="cs-box">
            <Box className="cs-th">
              <Box className="csIitem-th">Strategy Code</Box>
              <Box className="csIitem-th">Strategy Name</Box>
              <Box className="csIitem-th">Strategy User name</Box>
            </Box>
            <Box className="cs-td">
              <Box className="cs-item">
                <Box className="csIitem-td">{strategyCode ?? ""}</Box>
                <Box className="csIitem-td">{stratergyname}</Box>
                <Box className="csIitem-td">{strategyUserName}</Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Symbol Data */}
      <Grid container spacing={2} marginTop={3} justifyContent={"center"}>
        <Grid item xs={12} md={11}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                Symbol
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          Segment
                        </Typography>
                        <RadioGroup
                          name="segment"
                          onChange={handleDataChange}
                          row
                          value={options?.segment}
                          defaultValue="Equity"
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="Equity"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Equity"
                          />
                          <FormControlLabel
                            value="Future"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Futures"
                          />
                          <FormControlLabel
                            value="OptionsBuy"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Options Buy"
                          />
                          <FormControlLabel
                            value="OptionsSell"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Options Sell"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          Futures :{" "}
                        </Typography>
                        <RadioGroup
                          name="type"
                          onChange={handleDataChange}
                          row
                          value={options?.type}
                          defaultValue="Index Futures"
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="Index Futures"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Index Futures"
                          />
                          <FormControlLabel
                            value="Stock Futures"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Stock Futures"
                          />
                          <FormControlLabel
                            value="Currency Futures"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Currency Futures"
                          />
                          <FormControlLabel
                            value="Commodity Futures"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="CommodityFutures"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          Trend Status is Applicable in Rules :{" "}
                        </Typography>
                        <RadioGroup
                          name="trend_rules"
                          onChange={handleDataChange}
                          row
                          value={options?.trend_rules}
                          defaultValue="No"
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="Yes"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          Trend Status is Applicable in Lots :{" "}
                        </Typography>
                        <RadioGroup
                          name="trend_lots"
                          onChange={handleDataChange}
                          row
                          value={options?.trend_lots}
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="Yes"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          No. of Conditions :
                        </Typography>
                        <RadioGroup
                          row
                          // defaultValue='1'
                          value={selectedOption}
                          onChange={handleRadioChange}
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="1"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="1"
                          />
                          <FormControlLabel
                            value="2"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="2"
                          />
                          <FormControlLabel
                            value="3"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="3"
                          />
                          <FormControlLabel
                            value="4"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="4"
                          />
                        </RadioGroup>
                        {conditions}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    disabled={!isPanel1SubmitEnabled}
                    onClick={handlePanel1Submit}
                    className="formSolid-btn"
                  >
                    Save & Submit
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            disabled={!isPanel2Enabled}
            expanded={expanded === "panel2"}
            onChange={isPanel2Enabled ? handleChange("panel2") : null}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                Select Trend Signal
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="formBox" sx={{ border: "none !important" }}>
                    <Box className="formItems">
                      <Box className="inputFields space fullWidth">
                        <Typography component={"label"} className="label">
                          Trade Status :{" "}
                        </Typography>
                        <RadioGroup
                          name="trend_signal"
                          onChange={handleDataChange}
                          row
                          value={options?.trend_signal}
                          sx={{ marginLeft: 2 }}
                        >
                          <FormControlLabel
                            value="Favour"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Favour"
                          />
                          <FormControlLabel
                            value="Against"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Against"
                          />
                          <FormControlLabel
                            value="Both"
                            sx={{ marginRight: "2rem" }}
                            control={<Radio />}
                            label="Favour & Against"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    disabled={!isPanel2SubmitEnabled}
                    className="formSolid-btn"
                    onClick={handlePanel2Submit}
                  >
                    Save & Submit
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            disabled={!isPanel3Enabled}
            expanded={expanded === "panel3"}
            onChange={isPanel3Enabled ? handleChange("panel3") : null}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                No.of Collections
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ overflowX: "auto" }}>
              {collections}

              <Grid item xs={12}>
                <Button
                  disabled={!isPanel3SubmitEnabled}
                  onClick={handlePanel3Submit}
                  className="formSolid-btn"
                >
                  Save & Submit
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            disabled={!isPanel4Enabled}
            expanded={expanded === "panel4"}
            onChange={isPanel4Enabled ? handleChange("panel4") : null}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                Particulars
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {items.map((item, index) => (
                <Box
                  className="border-ap"
                  sx={{ padding: 2, marginBottom: 2 }}
                  key={index}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        component={"label"}
                        className="label"
                        sx={{ fontWeight: 600 }}
                      >
                        Action {index + 1}
                      </Typography>
                    </Grid>
                    {ActionsFunc(index)}
                  </Grid>
                </Box>
              ))}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Tooltip
                      title={
                        <Typography sx={{ fontSize: "1.2rem" }}>Add</Typography>
                      }
                      arrow
                      placement="top"
                    >
                      <Button
                        disabled={items.length >= 5}
                        className="solidButton small download-btn"
                        onClick={addItem}
                        sx={{ marginRight: 1, marginBottom: 0.5 }}
                      >
                        <AddIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title={
                        <Typography sx={{ fontSize: "1.2rem" }}>
                          Remove
                        </Typography>
                      }
                      arrow
                      placement="top"
                    >
                      <Button
                        disabled={items.length <= 0}
                        className="solidButton small squareOff-btn"
                        onClick={() => deleteItem(items.length - 1)}
                        sx={{ marginRight: 1, marginBottom: 0.5 }}
                      >
                        <ClearIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Button
                      disabled={!isPanel4SubmitEnabled}
                      onClick={handlePanel4Submit}
                      className="formSolid-btn"
                    >
                      Save & Submit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            disabled={!isPanel5Enabled}
            expanded={expanded === "panel5"}
            onChange={isPanel5Enabled ? handleChange("panel5") : null}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                Particulars 2
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="selectionDiv bn">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.6rem !important" }}
                    >
                      Normal Order Placement Time (ORPT)
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component={"label"} className="label">
                      Market Start Time{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{
                        marginBottom: 0.6,
                        whiteSpace: "nowrap",
                        opacity: 0.7,
                      }}
                    >
                      Market Start Time
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        views={["hours", "minutes"]}
                        openTo="minutes"
                        className="datePicker"
                        sx={{
                          maxWidth: "100% !important",
                          width: "100% !important",
                        }}
                        value={dayjs(date)}
                        onChange={(e) => {
                          setDate(dayjs(e).format("HH:mm"));
                        }}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long Entry
                    </Typography>
                    <Input
                      type="number"
                      name="long_entry"
                      value={options?.long_entry}
                      onChange={handleDataChange}
                      fullWidth
                      className="datePicker input"
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        views={["minutes"]}
                        openTo="minutes"
                        className="datePicker"
                        sx={{
                          maxWidth: "100% !important",
                          width: "100% !important",
                        }}
                      />
                    </LocalizationProvider> */}
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long Target
                    </Typography>
                    <Input
                      name="long_target"
                      value={options?.long_target}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long StopLoss
                    </Typography>
                    <Input
                      name="long_sl"
                      value={options?.long_sl}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short Entry
                    </Typography>
                    <Input
                      name="short_entry"
                      value={options?.short_entry}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short Target
                    </Typography>
                    <Input
                      name="short_target"
                      value={options?.short_target}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short StopLoss
                    </Typography>
                    <Input
                      name="short_sl"
                      value={options?.short_sl}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ marginTop: 2 }}
                >
                  <Grid item xs={12}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.6rem !important" }}
                    >
                      revised Order Placement Time (RORPT)
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component={"label"} className="label">
                      Market Start Time{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long Entry
                    </Typography>
                    <Input
                      name="missed_long_entry"
                      value={options?.missed_long_entry}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long Target
                    </Typography>
                    <Input
                      name="missed_long_target"
                      value={options?.missed_long_target}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Long StopLoss
                    </Typography>
                    <Input
                      name="missed_long_sl"
                      value={options?.missed_long_sl}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short Entry
                    </Typography>
                    <Input
                      name="missed_short_entry"
                      value={options?.missed_short_entry}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short Target
                    </Typography>
                    <Input
                      name="missed_short_target"
                      value={options?.missed_short_target}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ marginBottom: 0.6, opacity: 0.7 }}
                    >
                      Short StoLoss
                    </Typography>
                    <Input
                      name="missed_short_sl"
                      value={options?.missed_short_sl}
                      onChange={handleDataChange}
                      type="number"
                      fullWidth
                      className="datePicker input"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Button
                  disabled={!isPanel5SubmitEnabled}
                  onClick={handlePanel5Submit}
                  className="formSolid-btn"
                >
                  Save & Submit
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Grid item xs={12}>
            <Button
              onClick={runBackTest}
              className="formSolid-btn"
              disabled={!isBackTestBtnEnabled}
              style={{ marginBottom: "10px" }}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress />
                  Run Backtest
                </Box>
              ) : (
                "Run Backtest"
              )}
            </Button>
          </Grid>
          <Accordion
            disabled={!isPanel6Enabled}
            expanded={expanded === "panel6"}
            onChange={isPanel6Enabled ? handleChange("panel6") : null}
            className="symbolCollapse border-ap"
          >
            <AccordionSummary
              className="collpse-header"
              expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.4rem" }} />}
            >
              <Typography component={"h5"} className="collapse-heading">
                Backtest Report
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "1rem 0 !important" }}>
              {/* <Strategytable cols={cols} rows={rows} /> */}
              <TableContainer
                sx={{ maxHeight: "400px" }}
                id="backtest-table"
                component={Paper}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {cols?.map((column, index) => (
                        <TableCell
                          key={index}
                          style={{ fontSize: "1.6rem", fontWeight: 500 }}
                        >
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.entrydate}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.entrytime}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.entryprice}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.side}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target1price}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target1date}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target1lots}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target2price}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target2date}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target2lots}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target3price}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target3date}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target3lots}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target4price}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row?.target4date}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.target4lots}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.exitprice}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.exitdate}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.exittime}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.exitlots}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.profit1}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.profit2}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.profit3}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.profit4}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.profit6}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.total_profit}
                        </TableCell>
                        <TableCell
                          style={{ fontSize: "1.3rem", fontWeight: 500 }}
                        >
                          {row.remark}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                className="download-btn-strategy"
                onClick={handleDownload}
              >
                Download
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Create A New Srategy */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="commonModal createStrategy"
      >
        <Box className="modalHeader" sx={{ justifyContent: "space-between" }}>
          <Typography component={"h5"}>Create New Strategy</Typography>
          <Button onClick={handleClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent className="modalBody">
          <Box className="formBox" sx={{ border: "none !important" }}>
            <Box className="formItems inputFields space fullWidth">
              <Typography component={"label"} className="label">
                Strategy code
              </Typography>
              <InputBase
                placeholder="Trigger Price"
                value={strategyCode}
                onChange={(e) => setStrategyCode(e.target.value)}
                disabled
              />
            </Box>
            <Box className="formItems inputFields space fullWidth">
              <Typography component={"label"} className="label">
                Strategy Name
              </Typography>
              <InputBase
                placeholder="Strategy Name"
                value={stratergyname}
                onChange={(e) => setStratergyname(e.target.value)}
              />
            </Box>
            <Box className="formItems inputFields space fullWidth">
              <Typography component={"label"} className="label">
                Strategy User Name
              </Typography>
              <InputBase
                placeholder="Strategy User Name"
                value={strategyUserName}
                onChange={(e) => setStrategyUserName(e.target.value)}
              />
            </Box>
            <Button
              className="formSolid-btn"
              sx={{ marginTop: "1.5rem !important" }}
              onClick={handleClose}
              disabled={isLoading}
            >
              Save & Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StrategyBuilderComp;
