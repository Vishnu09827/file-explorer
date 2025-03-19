import React, { useState } from "react";
import {
  FaPen,
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaTrashAlt,
} from "react-icons/fa";
import "./FileNode.css";

const FileNode = ({ node, isChild = false, setActiveTree, onDeleteNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = (id) => {
    setIsOpen((prev) => !prev);
    setActiveTree(id);
  };

  const renderFolder = () => (
    <div className="folder-section">
      <div className="folder-name-section">
        <div className="folder" onClick={() => toggleFolder(node.id)}>
          {isOpen ? <FaFolderOpen /> : <FaFolder />} {node.name}
        </div>
        <div className="node-tools">
          <div className="edit-icon">
            <FaPen />
          </div>
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
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderFile = () => (
    <div className="file-section">
      <div className="file">
        <FaFile /> {node.name}
      </div>
      <div className="node-tools">
        <div className="edit-icon">
          <FaPen />
        </div>
        <div className="delete-icon" onClick={() => onDeleteNode(node.id)}>
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );

  return (
    <section className={`file-node-section ${isChild ? "child" : ""}`}>
      {node.type === "folder" ? renderFolder() : renderFile()}
    </section>
  );
};

export default FileNode;
