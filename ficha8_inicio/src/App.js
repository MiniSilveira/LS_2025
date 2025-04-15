import "./assets/styles/App.css";

import { Header, Footer , ControlPanel, GamePanel } from "./components";

export default function App() {
  return (
    <div id="container">
        <Header />
        
      <main>
        <ControlPanel />
        <GamePanel />
      </main>
      
      <Footer />
      
     </div>
  );
}

