import React from "react";
import { groupByDay } from "../utils/common";

function reduceCounts(accumulator, currentValue) {
  return accumulator + currentValue.count;
}

function useSingleBarData(datePeriod, data) {
  const memoizedData = React.useMemo(() => {
    const groups = groupByDay(data);
    return datePeriod.map((date) => ({
      date,
      count: groups[date] ? groups[date].reduce(reduceCounts, 0) : null,
    }));
  }, [datePeriod, data]);

  return memoizedData;
}

export default useSingleBarData;
