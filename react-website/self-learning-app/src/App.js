
import './App.css';
import LayoutGrid from './LayoutGrid'; 
import currentLayout from './grid-layouts/test.json'; //Can just omit the file type
function App() {
  return (
    <div id="container">
		<header  className="title styled-box">
			<h1>
			🏹 Quiver Bank
			</h1>
		</header>
		{
			console.log(currentLayout) //NB: Useful for debugging, you can pretty much just output anything to console and it'll either format it or just convert it to a string
		}
		<LayoutGrid layout={currentLayout}>
		</LayoutGrid>
    </div>
  );
}

export default App;
