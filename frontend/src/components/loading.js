import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ spokes, black }) => (
  <ReactLoading type={spokes} color={black} height={80} width={80} />
);

export default Loading;
