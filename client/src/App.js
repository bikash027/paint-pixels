import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Grid from './components/grid';
import ColorSelect from './components/colorSelect';
class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			color:'rgb(127,127,127)'
		}
	}
	setColor(color){
		this.setState({color:color});
	}
	render() {
	  return (
	    <div style={{width:'100%'}} className="App">
	      <Grid color={this.state.color}/>
	      <ColorSelect setColor={this.setColor.bind(this)}/>
	    </div>
	  );
	}
}

export default App;
