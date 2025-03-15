import React, { use, useState } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import "./FileNode.css";

const FileNode = ({ node, isChild = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <section className={`file-node-section ${isChild ? "child" : ""}`}>
      {node.type === "folder" ? (
        <div className="folder-section">
          <span onClick={toggleFolder} className="folder">
            {isOpen ? <FaFolderOpen /> : <FaFolder />} {node.name}
          </span>
          {isOpen &&
            node.children?.map((child) => (
              <FileNode key={child.id} node={child} isChild={true} />
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
