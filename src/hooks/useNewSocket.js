import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { POSITION_SOCKET_URL } from "../config";
import {
  getPortfolioIndicatorsData,
  getSocketIndicatorsData,
} from "../redux/actions/adminActions";
import { getAlertSegmentSymbols } from "../redux/actions/alertActions";
import {
  getLiveData,
  getProfitLoss,
  getWatchListLiveData,
  getWatchListSocket,
  getaddsymboldata,
  admingetWatchListLiveData
} from "../redux/actions/commonActions";
import { getLivePositions } from "../redux/actions/positionAction";
export function useSocket(endpoint) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const reconnectIntervalRef = useRef(null);
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    const token = localStorage.getItem("token");
    const url = `${POSITION_SOCKET_URL}/${endpoint}/?authorization=${token}`;
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log("Connected :>>", endpoint);
      setIsConnected(true);
      clearReconnection();
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (endpoint === "liveprice") {
        dispatch(getLiveData(message));
      } else if (endpoint === "liveposition") {
        dispatch(getLivePositions(message));
      } else if (endpoint === "watchlistupdate") {
        dispatch(getWatchListLiveData(message));
      } else if (endpoint === "profit") {
        dispatch(getProfitLoss(message));
      } else if (endpoint === "alert") {
        dispatch(getAlertSegmentSymbols(message));
      } else if (endpoint === "indicator") {
        dispatch(getSocketIndicatorsData(message));
      } else if (endpoint === "indicator1") {
        dispatch(getPortfolioIndicatorsData(message));
      } else if (endpoint === "watchlist") {
        dispatch(getaddsymboldata(message));
      }
      else if (endpoint === "adminwatchlist") {
        dispatch(admingetWatchListLiveData(message));
      }
    };

    wsRef.current.onclose = (event) => {
      setIsConnected(false);
      console.log("closed :>>", endpoint, event.code, event.reason);

      if (event.code !== 4000 && !reconnectIntervalRef.current) {
        reconnectIntervalRef.current = setInterval(() => {
          console.log("Reconnecting :>> ", endpoint);
          wsRef.current.close();
          connect();
        }, 10000);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("logs 555 WebSocket Error:", error);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const clearReconnection = () => {
    if (reconnectIntervalRef.current) {
      clearInterval(reconnectIntervalRef.current);
      reconnectIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (endpoint) {
      connect();
    }

    return () => {
      manuallyClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const manuallyClose = () => {
    if (wsRef.current) {
      wsRef.current.close(4000, "Custom reason for closure");
    }
    clearReconnection();
  };

  return {
    isConnected,
    socket: wsRef.current,
    sendMessage,
    close: manuallyClose,
  };
}
