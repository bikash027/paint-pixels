import React from "react";
// import './cantthinkofname.css';
// style={{backgroundColor:this.state.color}} onClick={this.clickHandler.bind(this)}
class GridItem extends React.PureComponent {
	// constructor(props){
	// 	super(props);
	// 	this.state={
	// 		color:'rgb(255,255,255)'
	// 	}
	// }
	// clickHandler(){
	// 	const color=this.props.sendColor();
	// 	this.setState({color:color});
	// }
	render() {
		return( 
			<div id={this.props.ID} style={{backgroundColor:this.props.color}}>
			</div>
		);
	}
}

export default GridItem;
