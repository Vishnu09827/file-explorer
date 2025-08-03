import React, { useState } from "react";
import {
  FaGripVertical,
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaTrashAlt,
} from "react-icons/fa";
import "../styles/FileNode.css";

const FileNode = ({
  node,
  isChild = false,
  setActiveTree,
  onDeleteNode,
  onRenameNode,
  onDragStart,
  onDrop,
  itemTypes
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = (id) => {
    setIsOpen((prev) => !prev);
    setActiveTree(id);
  };

  const renderFolder = () => (
    <div
      className="folder-section"
      draggable
      onDragStart={(e) => onDragStart(e, node.id)}
      onDrop={(e) => onDrop(e, node.id)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="folder-name-section">
        <div className="folder" onClick={() => toggleFolder(node.id)}>
          <div className="drag-icon">
            <FaGripVertical />
          </div>
          {isOpen ? <FaFolderOpen /> : <FaFolder />}
          <input
            className="folderName"
            type="text"
            value={node.name}
            onChange={(e) => onRenameNode(node.id, e.target.value)}
          />
        </div>
        <div className="node-tools">
          <div className="delete-icon" onClick={() => onDeleteNode(node.id)}>
            <FaTrashAlt />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="folder-children">
          {node.children?.map((child) => (
            <FileNode
              key={child.id}
              node={child}
              isChild={true}
              setActiveTree={setActiveTree}
              onDeleteNode={onDeleteNode}
              onRenameNode={onRenameNode}
              onDragStart={onDragStart}
              onDrop={onDrop}
              itemTypes={itemTypes}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderFile = () => (
    <div className="file-section" onClick={() => setActiveTree(null)} draggable
      onDragStart={(e) => onDragStart(e, node.id)}
      onDrop={(e) => onDrop(e, node.id)}
      onDragOver={(e) => e.preventDefault()}>
      <div className="file">
        <div className="drag-icon">
          <FaGripVertical className="file-move-icon" />
        </div>
        <FaFile />{" "}
        <input
          className="fileName"
          type="text"
          value={node.name}
          onChange={(e) => onRenameNode(node.id, e.target.value)}
        />
      </div>
      <div className="node-tools">
        <div className="delete-icon" onClick={() => onDeleteNode(node.id)}>
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );

  return (
    <section className={`file-node-section ${isChild ? "child" : ""}`}>
      {node.type === itemTypes.FOLDER ? renderFolder() : renderFile()}
    </section>
  );
};

export default FileNode;
