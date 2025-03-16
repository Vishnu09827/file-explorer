import React, { use, useState } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import "./FileNode.css";

const FileNode = ({ node, isChild = false, setActiveTree }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = (id) => {
    setIsOpen(!isOpen);
    setActiveTree(id);
  };

  return (
    <section className={`file-node-section ${isChild ? "child" : ""}`}>
      {node.type === "folder" ? (
        <div className="folder-section">
          <span onClick={() => toggleFolder(node.id)} className="folder">
            {isOpen ? <FaFolderOpen /> : <FaFolder />} {node.name}
          </span>
          {isOpen &&
            node.children?.map((child) => (
              <FileNode
                key={child.id}
                node={child}
                isChild={true}
                setActiveTree={setActiveTree}
              />
            ))}
        </div>
      ) : (
        <div className="file">
          <FaFile /> {node.name}
        </div>
      )}
    </section>
  );
};

export default FileNode;
