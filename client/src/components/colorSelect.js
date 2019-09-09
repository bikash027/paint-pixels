import React from "react";
import './cantthinkofname.css';
import Wheel from './color_wheel3.png';
import Value from './value';
import convert from './convert';
import Last from './last';
class ColorSelect extends React.PureComponent {
	constructor(props){
		super(props);
		this.state={
			H:0,
			S:0,
			V:50
		}
		this.hist=[{
						H:0,S:0,V:50
				   },
				   {
						H:0,S:0,V:50
				   },
				   {
						H:0,S:0,V:50
				   },
				   {
						H:0,S:0,V:50
				   },
				   {
						H:0,S:0,V:50
				   }];
	}
	setValue(v){
		const color=convert(this.state.H,this.state.S,v);
		this.props.setColor(color);
		this.hist.pop();
		this.hist.unshift({
			H:this.state.H,
			S:this.state.S,
			V:v
		});
		this.setState({
			V:v
		});
	}
	setColor(color){
		const col=convert(color.H,color.S,color.V);
		this.props.setColor(col);
		this.setState({
			...color
		});
	}
	findHS(e){
		const x=e.nativeEvent.offsetX-100.5;
		const y=100.5-e.nativeEvent.offsetY;
		const r=Math.sqrt(x*x+y*y);
		let angle=Math.acos(x/r);
		if(y<0)
			angle=2*(Math.PI)-angle;
		angle=angle*180/(Math.PI);
		// const s=r>100?100:r;
		const color=convert(angle,r,this.state.V);
		this.props.setColor(color);
		this.hist.pop();
		this.hist.unshift({
			H:angle,
			S:r,
			V:this.state.V
		});
		this.setState({
			H:angle,
			S:r
		});
		
	}
	render() {
		const color=convert(this.state.H,this.state.S,this.state.V);
		return( 
			<div className="ColorSelect">
				<p>Select color here:</p>
				<div id='wheel' >
					<img onClick={this.findHS.bind(this)} src={Wheel} alt='color wheel' />
				</div>
				<Value H={this.state.H} S={this.state.S} setValue={this.setValue.bind(this)}/>
				<p style={{marginTop:'50px'}}>selected color is:</p>
				<div style={{
							  width:'40%',
							  height:'100px',
							  backgroundColor:color
				           }}></div>
				<p>{color}</p>
				<p>last 5 selected colors:</p>
				<Last hist={this.hist} setColor={this.setColor.bind(this)}/>
			</div>
		);
	}
}
export default ColorSelect;
