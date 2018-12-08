import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import RelativeTimeLabel from "../src/index";
const now = new Date(Date.now());
const fromDate = `${now.getMonth() + 1}/${Math.ceil(Math.random() * 31)}/${now.getFullYear()}`;
storiesOf("RelativeTimeLabel", module)
  .add("basic", () => {
    return (
      <React.Fragment>
        <RelativeTimeLabel
          locale="en"
          unit="day"
          from={new Date(fromDate)}
          to={now}
          style={{
            backgroundColor: "#ddd",
            borderRadius: ".25rem",
            color: "#333",
            display: "inline-block",
            fontFamily: "sans-serif",
            lineHeight: 1,
            padding: ".5rem .5rem"
          }}
        />
        <p style={{ color: "#999" }}>
          {now.toLocaleDateString()} to {fromDate}
        </p>
      </React.Fragment>
    );
  })
  .add("stringified", () => {
    return (
      <React.Fragment>
        <RelativeTimeLabel
          locale="en"
          unit="day"
          from={new Date(fromDate)}
          to={now}
          labelToString
        />
        <p style={{ color: "#999" }}>
          {now.toLocaleDateString()} to {fromDate}
        </p>
      </React.Fragment>
    );
  })
  .add("string and transformed", () => {
    return (
      <React.Fragment>
        <RelativeTimeLabel
          locale="en"
          unit="day"
          from={new Date(fromDate)}
          to={now}
          labelToString={str => {
            return [...str].map((c, i) => i % 2 ? c.toUpperCase() : c).join("");
          }}
        />
        <p style={{ color: "#999" }}>
          {now.toLocaleDateString()} to {fromDate}
        </p>
      </React.Fragment>
    );
  })
  .add("React element", () => {
    const Heading2 = ({ children, ...props }) => <h2 {...props}>{children}</h2>;
    return (
      <React.Fragment>
        <RelativeTimeLabel
          element={Heading2}
          locale="en"
          unit="day"
          from={new Date(fromDate)}
          to={now}
        />
        <p style={{ color: "#999" }}>
          {now.toLocaleDateString()} to {fromDate}
        </p>
      </React.Fragment>
    );
  });
