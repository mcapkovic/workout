import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../context";

function usePageChange() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [appState = {}, setAppState] = React.useContext(AppContext);
  const { appBarData = {} } = appState;

  function pageChange(data) {
    const { path, title = "", hideStart = true } = data;
    history.push(path);
    setAppState({
      ...appState,
      appBarData: { ...appBarData, title, hideStart },
    });
  }

  return { pageChange, pathname };
}

export default usePageChange;
