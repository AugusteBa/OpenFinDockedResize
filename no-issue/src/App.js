import React, { useState, useEffect, useRef } from 'react';
import './App.css';

async function createWindow() {
	// eslint-disable-next-line no-undef
	fin.desktop.System.getAllWindows(function(windowInfoList) {
		windowInfoList.forEach(function(windowInfo) {
			if (windowInfo.childWindows.length === 0) {
				spawnWindow();
			}
		});
	});
}

async function spawnWindow() {
	const childWindow = {
		name: 'child',
		defaultWidth: 300,
		defaultHeight: 300,
		url: 'window.html',
		frame: true,
		autoShow: true
	};
	// eslint-disable-next-line no-undef
	return await fin.Window.create(childWindow);
}

function App() {
	const [showInstruments, setShowInstruments] = useState(false);
	const instruments = ['AAPL', 'MS', 'JBC', 'WR', 'DS', 'TSLA', 'PO', 'VS'];
	const listContainer = useRef(null);

	useEffect(() => {
		createWindow().catch(err => console.log(err));
	}, []);

	useEffect(() => {
		(async () => {
			const win = await window.fin.Window.getCurrent();
			const bounds = await win.getBounds();
			win.resizeTo(
				bounds.width,
				Math.min(listContainer.current.scrollHeight + 235, 600)
			);
		})();
	});

	return (
		<>
			<div className="App">
				<h4>
					Everything works when no conditional rendering takes place
				</h4>
				<ol>
					<li>
						Click on checkbox several times (observe resizing
						working)
					</li>
					<li>
						Dock child window to the side of this window and do the
						same
					</li>
				</ol>
				<input
					type="checkbox"
					value={showInstruments}
					onChange={() => {
						setShowInstruments(!showInstruments);
					}}
				/>
				Show Instruments
			</div>
			<div ref={listContainer}>
				{showInstruments &&
					instruments.map(instrument => {
						return <p key={instrument}>{instrument}</p>;
					})}
			</div>
		</>
	);
}

export default App;
