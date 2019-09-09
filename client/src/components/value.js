import React from 'react';
import convert from './convert';
class Value extends React.PureComponent{
	ClickHandler(e){
		if(e.target!==e.currentTarget){
		const x=e.nativeEvent.offsetX;
		const compStyle=window.getComputedStyle(e.target.parentElement);
		let width=compStyle.getPropertyValue('width');
		width=parseInt(width);
		let id=parseInt(e.target.id);
		const v=((id*width/50+x)/width)*100;
		e.stopPropagation();
		this.props.setValue(v);
	}
	}
	render(){
		
		const ar=[];
		for(let i=0;i<50;i++){
			const rgb=convert(this.props.H,this.props.S,i*2);
			const style={height:'20px',width:'2%',float:'left'};
			style.backgroundColor=rgb;
			ar.push(<div id={''+i} style={style}></div>);
		}
		return(
			<div id='value' onClick={this.ClickHandler.bind(this)} style={{width:'90%'}}>
				{ar}
			</div>
		);
	}
}
export default Value;