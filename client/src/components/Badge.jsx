import React from "react";
import random from "randomcolor";

const Badge = (props) => {
  const color = random({
    luminosity: "light",
  });
  return (
    <span
      className={`px-2 text-sm leading-5 font-semibold rounded-full hidden md:inline-flex`}
      style={{
        fontWeight: 800,
        backgroundColor: color,
        color: " #36454F",
      }}
    >
      {props.tag}
    </span>
  );
};

export default Badge;
