import React, { useState } from "react";
import { nanoid } from "nanoid";
import { VscNewFile } from "react-icons/vsc";
import { VscNewFolder } from "react-icons/vsc";
import FileNode from "./FileNode";
import "./Explorer.css";

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

  const [activeTree, setActiveTree] = useState(null);

  const onAddFile = () => {
    if (activeTree) {
    } else {
      setFileStructure((preStruc) => [
        ...preStruc,
        {
          id: nanoid(),
          type: "file",
          name: "New File",
        },
      ]);
    }
  };

  const onAddFolder = () => {
    if (activeTree) {
    } else {
      setFileStructure((preStruc) => [
        ...preStruc,
        {
          id: nanoid(),
          type: "folder",
          name: "New Folder",
        },
      ]);
    }
  };

  return (
    <main className="explorer-main-container">
      <section className="explorer-tools">
        <span className="add-file-icon" onClick={onAddFile}>
          <VscNewFile />
        </span>
        <span className="add-folder-icon" onClick={onAddFolder}>
          <VscNewFolder />
        </span>
      </section>
      {fileStructure.map((node) => (
        <FileNode key={node.id} node={node} setActiveTree={setActiveTree} />
      ))}
    </main>
  );
};

export default Explorer;
