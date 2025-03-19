import React, { useState } from "react";
import { nanoid } from "nanoid";
import { VscNewFile } from "react-icons/vsc";
import { VscNewFolder } from "react-icons/vsc";
import FileNode from "./FileNode";
import "./Explorer.css";

const Explorer = () => {
  const [fileStructure, setFileStructure] = useState([]);

  const [activeTree, setActiveTree] = useState(null);

  const addStructure = (data, structure, activeTree) => {
    for (const node of data) {
      if (node.id === activeTree) {
        if (node.hasOwnProperty("children") && node.children.length)
          node.children.push(structure);
        else node.children = [{ ...structure }];
      } else if (node.hasOwnProperty("children"))
        addStructure(node.children ?? [], structure, activeTree);
    }
    return data;
  };

  const onAddFile = () => {
    const newFile = {
      id: nanoid(),
      type: "file",
      name: "New File",
    };
    const newStructure = JSON.parse(JSON.stringify(fileStructure));
    if (!newStructure.length || !activeTree)
      setFileStructure((preStruc) => [...preStruc, newFile]);
    else {
      const updateStructure = addStructure(newStructure, newFile, activeTree);
      setFileStructure(updateStructure);
    }
  };

  const onAddFolder = () => {
    const newFolder = {
      id: nanoid(),
      type: "folder",
      name: "New Folder",
      children: [],
    };
    const newStructure = JSON.parse(JSON.stringify(fileStructure));
    if (!newStructure.length || !activeTree)
      setFileStructure((preStruc) => [...preStruc, newFolder]);
    else {
      const updateStructure = addStructure(newStructure, newFolder, activeTree);
      setFileStructure(updateStructure);
    }
  };

  const deleteNode = (data, id) => {
    data.forEach((node, index) => {
      if (node.id === id) {
        if (node.hasOwnProperty("children")) setActiveTree(null);
        data.splice(index, 1);
      } else if (node.hasOwnProperty("children"))
        deleteNode(node.children ?? [], id);
    });
    return data;
  };

  const onDeleteNode = (id) => {
    const newStructure = JSON.parse(JSON.stringify(fileStructure));
    const updatedStructure = deleteNode(newStructure, id);
    setFileStructure(updatedStructure);
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
        <FileNode
          key={node.id}
          node={node}
          setActiveTree={setActiveTree}
          onDeleteNode={onDeleteNode}
        />
      ))}
    </main>
  );
};

export default Explorer;
