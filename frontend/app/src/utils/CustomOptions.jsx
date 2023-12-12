import React from "react";
import theme from "../theme";

const CustomOptions = ({title, headerBackVisible=true}) => {
    var options = {};
    for(var key in theme.components.Appbar.styles) {
      options[key] = theme.components.Appbar.styles[key];
    }
    options.headerTitle = title;
    options.headerBackVisible = headerBackVisible;
    return options;
};

export default CustomOptions;