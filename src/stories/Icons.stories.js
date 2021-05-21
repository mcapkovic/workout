import React from "react";
import { AccessTime24Filled, wrapIcon, Person24Regular } from "@fluentui/react-icons";

export default {
  title: "Icons",
};

const iconStyleProps = {
  primaryFill: "purple",
  className: "iconClass",
};
const WrappedAccessTime24Filled = wrapIcon(<AccessTime24Filled />);

export const Icons = () => (
  <div>
    <Person24Regular {...iconStyleProps}  />
    <AccessTime24Filled {...iconStyleProps}  />
    <WrappedAccessTime24Filled {...iconStyleProps} aria-label="AccessTime24"/>
  </div>
);
