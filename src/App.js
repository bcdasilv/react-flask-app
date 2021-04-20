import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./better";
import Forum from "./Forum";
import Cal from "./Cal";
import Home from "./Home";
import App1 from "./App1"
import {Switch, Route} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

class App extends React.Component {					
	
   render(){	
      return (	
		<BrowserRouter>		
			
			<div className='App'>
				<h1 class="top">Get Involved - Cal Poly </h1>
				<div class="it">
				<Header/>
				</div>
				<Switch>
					<Route path="/calendar" component={Cal}/>
					<Route path="/forum" component={Forum}/>
					<Route path="/post" component={App1}/>
					<Route path="/" component={Home}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
	}
}

export default App;
