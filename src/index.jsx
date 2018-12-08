import React from "react";
import PropTypes from "prop-types";
import { timeDiff, units } from "./functions";

const IS_RTF_SUPPORTED = "RelativeTimeFormat" in Intl;

function RelativeTimeLabel(
  {
    locale,
    ["from"]: dateFrom,
    to: dateTo,
    unit,
    unitFallback,
    unitFallbackPlural,
    isPrecise,
    labelToString,
    __DO_NOT_USE_force_disabled_api__,
    ...props
  }
) {
  if (props.children || props.render) {
    console.warn("RelativeTimeLabel does not render children");
  }
  const diff = timeDiff(dateFrom, dateTo);
  const result = parseFloat(Math.round(diff(unit)));
  let label;
  if (!IS_RTF_SUPPORTED || __DO_NOT_USE_force_disabled_api__) {
    console.warn(
      "The RelativeTimeFormat API is not supported in this browser."
    );
    const diff = timeDiff(dateFrom, dateTo);
    const [navLang] = window.navigator.language.split("-");
    const isEnglishLocale = navLang === "en";
    const safeUnit = !isEnglishLocale ? unitFallback : unit;

    let result = diff(unit);
    if (isPrecise) {
      result = Math.round(result);
    }
    const moddedResult = result < 0 ? -1 * result : 1 * result;
    label = `${isEnglishLocale && result > 0 ? "in " : ""}${moddedResult.toLocaleString()} ${safeUnit}${Math.floor(moddedResult) !== 1 ? !isEnglishLocale && unitFallbackPlural ? unitFallbackPlural : "s" : ""}${isEnglishLocale && result <= 0 ? " ago" : ""}`;
  } else {
    const rtf = new Intl.RelativeTimeFormat(locale);
    label = rtf.format(result, unit);
  }
  return typeof labelToString === "function" ||
    typeof labelToString === "boolean"
    ? typeof labelToString === "function" ? labelToString(label) : label
    : React.createElement(props.element, props, label);
}

RelativeTimeLabel.defaultProps = {
  element: "span",
  to: new Date(Date.now()),
  unit: "hour",
  isPrecise: true
};
RelativeTimeLabel.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  locale: IS_RTF_SUPPORTED
    ? PropTypes.string.isRequired
    : PropTypes.oneOf([null]),
  from: PropTypes.instanceOf(Date).isRequired,
  to: PropTypes.instanceOf(Date),
  unit: IS_RTF_SUPPORTED ? PropTypes.string : PropTypes.oneOf(units),
  unitFallback: IS_RTF_SUPPORTED
    ? PropTypes.oneOf([null])
    : PropTypes.string.isRequired,
  unitFallbackPlural: IS_RTF_SUPPORTED
    ? PropTypes.oneOf([null])
    : PropTypes.string.isRequired,
  isPrecise: PropTypes.bool,
  labelToString: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  __DO_NOT_USE_force_disabled_api__: PropTypes.bool
};

export default RelativeTimeLabel;
