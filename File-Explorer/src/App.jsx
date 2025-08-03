import { FaEllipsisH } from "react-icons/fa";
import Explorer from "./components/Explorer";

function App() {
  return (
    <main className="main-container">
      <header>
        <h1>Explorer</h1>
        <div className="action-section">
          <FaEllipsisH />
        </div>
      </header>
      <Explorer />
    </main>
  );
}

export default App;
