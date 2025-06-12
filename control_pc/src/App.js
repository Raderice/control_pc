import PlayPauseButton from "./component-UI/play";
import Keyboard from "./component-UI/keyboard";
import InputSender from "./component-UI/InputSender";

function App() {
  return (
    <div className="App">
      <PlayPauseButton />
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <InputSender />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
