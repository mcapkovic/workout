import React from "react";
import { getClassNames } from "../utils/common";
import { AnimateSharedLayout } from "framer-motion";
import Separator from './Separator';

function ButtonGroup(props) {
  const { children, className } = props;
  return (
    <div className={getClassNames(className, "button-group")}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
      <Separator horizontal className='button-group__separator' />
    </div>
  );
}

export default ButtonGroup;
