import {
  getLiveData,
  getProfitLoss,
  getWatchListLiveData,
  getWatchListSocket,
} from "../redux/actions/commonActions";
import { POSITION_SOCKET_URL } from "../config";
import { getLivePositions } from "../redux/actions/positionAction";
import { getAlertSegmentSymbols } from "../redux/actions/alertActions";
import {
  getPortfolioIndicatorsData,
  getSocketIndicatorsData,
} from "../redux/actions/adminActions";

export async function socket(endPoint) {
  return await new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");

    var ws = new WebSocket(
      `${POSITION_SOCKET_URL}/${endPoint}/?authorization=${token}`
    );

    ws.onopen = () => {
      // ws.send({});
      console.log("connected");

      if (ws && ws.readyState === WebSocket.OPEN) {
        resolve(ws);
        // return ws;
      }
    };
  });
}

export function messageEvent(ws, endPoint, dispatch, data = {}) {
  if (ws && endPoint == "watchlist") {
    ws.send(JSON.stringify(data));
  }

  if (ws && endPoint == "alert") {
    ws.send(JSON.stringify(data));
  }

  if (ws && endPoint == "indicator") {
    ws.send(JSON.stringify(data));
  }

  if (ws && endPoint == "indicator1") {
    ws.send(JSON.stringify(data));
  }

  // Handle incoming messages
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (endPoint == "liveprice") {
      dispatch(getLiveData(message));
    } else if (endPoint == "liveposition") {
      dispatch(getLivePositions(message));
    } else if (endPoint == "watchlist") {
      dispatch(getWatchListSocket(message));
    } else if (endPoint == "watchlistupdate") {
      dispatch(getWatchListLiveData(message));
    } else if (endPoint == "profit") {
      dispatch(getProfitLoss(message));
    } else if (endPoint == "alert") {
      dispatch(getAlertSegmentSymbols(message));
    } else if (endPoint == "indicator") {
      // console.log("===", message);
      dispatch(getSocketIndicatorsData(message));
    } else if (endPoint == "indicator1") {
      // console.log("===", message);
      dispatch(getPortfolioIndicatorsData(message));
    }
  };
}
