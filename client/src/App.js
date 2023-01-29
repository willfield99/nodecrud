import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> Hiya </h1>

      <label> Movie Name:</label>
      <input type="text" name="movieName" />
      <label> Movie Review: </label>
      <input type="text" name="review" />

      <button> Submit </button>
    </div>
  );
}

export default App;
