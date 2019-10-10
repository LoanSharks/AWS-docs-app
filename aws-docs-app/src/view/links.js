import React from "react";
import { getAwsTemplate } from "../service/aws-docs";

export default () => {
  const links = getAwsTemplate();
  console.log(links);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};
