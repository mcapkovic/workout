import React from "react";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import {strings} from '../utils/constants';

function ChartFilters(props) {
  const { filters = [], value = [], onChange } = props;

  function onChangeHandler(type, selected) {
    const newValue = [...value];
    if (!onChange) return;

    if (selected) {
      onChange(newValue.filter((item) => item !== type));
    } else {
      onChange([...newValue, type]);
    }
  }

  return (
    <div className='chart-filters'>
      <span className='chart-filters__title'>Filters:</span>
      {filters.map((filter) => {
        const selected = value.includes(filter);
        return (
          <Button className='chart-filters__button'
            selected={selected}
            onClick={() => onChangeHandler(filter, selected)}
          >
            {strings[filter]}
          </Button>
        );
      })}
    </div>
  );
}

export default ChartFilters;
