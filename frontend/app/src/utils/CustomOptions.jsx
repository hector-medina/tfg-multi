import React from "react";
import theme from "../theme";

const CustomOptions = ({title}) => {
    var options = {};
    for(var key in theme.components.Appbar.styles) {
      options[key] = theme.components.Appbar.styles[key];
    }
    options.headerTitle = title;
    return options;
};

export default CustomOptions;