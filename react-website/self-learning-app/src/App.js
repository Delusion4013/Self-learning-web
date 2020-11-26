import logo from './logo.svg';
import './App.css';
import LayoutGrid from './LayoutGrid';
import currentLayout from './grid-layouts/test';
function App() {
  return (
    <div id="container">
		<header  className="title styled-box">
			<h1 >
				Quiver Bank
			</h1>
		</header>
		<LayoutGrid layout={currentLayout}>
		</LayoutGrid>
    </div>
  );
}

export default App;
