import React, { useState } from "react";
import {nanoid} from "nanoid";
import FileNode from "./FileNode";

const Explorer = () => {
  const [fileStructure, setFileStructure] = useState([
    {
      id: nanoid(),
      type: "folder",
      name: "New Folder",
      children: [
        {
          id: nanoid(),
          type: "folder",
          name: "New Folder",
          children: [
            {
              id: nanoid(),
              type: "folder",
              name: "New Folder",
            },
            {
              id: nanoid(),
              type: "file",
              name: "New File",
            },
          ],
        },
        {
          id: nanoid(),
          type: "file",
          name: "New File",
        },
      ],
    },
  ]);

  return (
    <main className="explorer-main-container">
      {fileStructure.map((node) => (
        <FileNode key={node.id} node={node} />
      ))}
    </main>
  );
};

export default Explorer;
