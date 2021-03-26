import React from "react";
import { getClassNames } from "../utils/common";
import { AnimateSharedLayout } from "framer-motion";
import Separator from './Separator';

function ButtonGroup(props) {
  const { children, className, style } = props;
  return (
    <div className={getClassNames(className, "button-group")} style={style}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
      <Separator horizontal className='button-group__separator' />
    </div>
  );
}

export default ButtonGroup;
