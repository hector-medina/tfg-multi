import React from "react";
import theme from "../theme";

const CustomOptions = ({title, headerBackVisible=true, headerBackTitleVisible=false}) => {
    var options = {};
    for(var key in theme.components.Appbar.styles) {
      options[key] = theme.components.Appbar.styles[key];
    }
    options.headerTitle = title;
    options.headerBackVisible = headerBackVisible;
    options.headerBackTitleVisible = headerBackTitleVisible;
    return options;
};

export default CustomOptions;