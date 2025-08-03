import { useState } from "react";
import { nanoid } from "nanoid";
import { FaUpload, FaFileCirclePlus, FaFolderPlus } from "react-icons/fa6";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FileNode from "./FileNode";
import "../styles/Explorer.css";

export const ItemTypes = {
  FILE: 'file',
  FOLDER: 'folder',
};

const Explorer = () => {

  const [fileStructure, setFileStructure] = useState([]);

  const [activeTree, setActiveTree] = useState(null);

  const addStructure = (data, structure, activeTree) => {
    if (!data.length || !activeTree) {
      return [...data, structure];
    }

    return data.map((node) => {
      if (node.id === activeTree) {
        const updatedNode = {
          ...node,
          children: node.children
            ? [...node.children, structure]
            : [structure],
        };
        return updatedNode;
      } else if (node.children) {
        return {
          ...node,
          children: addStructure(node.children, structure, activeTree),
        };
      } else {
        return node;
      }
    });
  };


  const onUpload = (e) => {
    const files = Array.from(e.target.files);

    const updatedStructure = files.reduce((structure, file) => {
      const uploadedFile = {
        id: nanoid(),
        type: ItemTypes.FILE,
        name: file.name || "new",
      };

      return addStructure(structure, uploadedFile, activeTree);
    }, fileStructure);
    console.log(updatedStructure)
    setFileStructure(updatedStructure);

    e.target.value = "";
  }

  const onAddFile = () => {
    const newFile = {
      id: nanoid(),
      type: ItemTypes.FILE,
      name: "New File",
    };
    const updateStructure = addStructure(fileStructure, newFile, activeTree);
    setFileStructure(updateStructure);
  };

  const onAddFolder = () => {
    const newFolder = {
      id: nanoid(),
      type: ItemTypes.FOLDER,
      name: "New Folder",
      children: [],
    };
    const updateStructure = addStructure(fileStructure, newFolder, activeTree);
    setFileStructure(updateStructure);
  };

  const renameNode = (data, id, newName) => {
    return data.map((node) => {
      if (node?.id === id) return { ...node, name: newName };
      else
        return node?.children
          ? { ...node, children: renameNode(node.children, id, newName) }
          : node;
    });
  };

  const onRenameNode = (id, newName) => {
    setFileStructure((preStruc) => renameNode(preStruc, id, newName));
  };

  const deleteNode = (data, id) => {
    data.forEach((node, index) => {
      if (node.id === id) {
        data.splice(index, 1);
      } else if (node.hasOwnProperty("children"))
        deleteNode(node.children ?? [], id);
    });
    return data;

  };

  const onDeleteNode = (id) => {
    const newStructure = JSON.parse(JSON.stringify(fileStructure));
    const updatedStructure = deleteNode(newStructure, id);

    if (id === activeTree) setActiveTree(null);
    setFileStructure(updatedStructure);
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  console.log(fileStructure)

  const onDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("id");
    console.log("dre", draggedId, "targetId", targetId)
    // let draggedItem = fileStructure.find((item) => item.id === draggedId);
    // setStructure(
    //   updateStructure(deleteItem(structure, draggedId), targetId, draggedItem)
    // );
  };

  return (
    <main className="explorer-main-container">
      <section className="explorer-tools">
        <span className="upload-icon" >
          <FaUpload />
          <input type="file" className="upload-input" onChange={onUpload} />
        </span>
        <span className="add-file-icon" onClick={onAddFile}>
          <FaFileCirclePlus />
        </span>
        <span className="add-folder-icon" onClick={onAddFolder}>
          <FaFolderPlus />
        </span>

      </section>
      <DndProvider backend={HTML5Backend}>
        {fileStructure.map((node) => (
          <FileNode
            key={node.id}
            node={node}
            setActiveTree={setActiveTree}
            onDeleteNode={onDeleteNode}
            onRenameNode={onRenameNode}
            onDragStart={onDragStart}
            onDrop={onDrop}
            itemTypes={ItemTypes}
          />
        ))}
      </DndProvider>
    </main>
  );
};

export default Explorer;
