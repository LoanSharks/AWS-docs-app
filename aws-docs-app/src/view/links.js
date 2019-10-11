import React, { useEffect, useState } from "react";
import { getAwsTemplate } from "../service/aws-docs";

// export default async function() {
//   const links = await getAwsTemplate();
//   console.log(links);
//   return null;
// }

export default () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getAwsTemplate().then(setLinks);
  }, []);

  return (
    <React.Fragment>
      {links.map(link => (
        <div>
          <label>name</label>
          <div>{link.name}</div>
          <label>size</label>
          <div>{link.size}</div>
          <label>doc id</label>
          <div>{link.docId}</div>
        </div>
      ))}
    </React.Fragment>
  );
};
