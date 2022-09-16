import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApiHandler } from './util/api';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF
  const apiHandler = new ApiHandler("glpat-B9TXUoQw83CPzkAxQuNF", "gitlab-visualizer");

  useEffect(() => {

    const init = async () => {
      await apiHandler.init();
      apiHandler.getCommits().then(d => console.log(d))
    };

    init();

  })

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
