
import './App.css';
import LayoutGrid from './LayoutGrid';
import currentLayout from './grid-layouts/test.json';
function App() {
  return (
    <div id="container">
		<header  className="title styled-box">
			<h1 >
			🏹 Quiver Bank
			</h1>
		</header>
		{
			console.log(currentLayout)
		}
		<LayoutGrid layout={currentLayout}>
		</LayoutGrid>
    </div>
  );
}

export default App;
