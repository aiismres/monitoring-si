import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MonitoringSi } from './MonitoringSi';
import { Sverka2 } from './Sverka2';
import { ISiObj1 } from './app.types';

function App() {
  const [siState, setSiState] = useState<ISiObj1[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/monitoringsi"
          element={<MonitoringSi siState={siState} setSiState={setSiState} />}
        />
        <Route
          path="/monitoringsi/sverka2"
          element={<Sverka2 siState={siState} setSiState={setSiState} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
