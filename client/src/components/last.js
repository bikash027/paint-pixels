import React from 'react';
import convert from './convert';
class Last extends React.PureComponent{
	ClickHandler(e){
		if(e.target!==e.currentTarget){
		// const x=e.nativeEvent.offsetX;
		// const compStyle=window.getComputedStyle(e.target);
		// let color=compStyle.getPropertyValue('backgroundColor');
		// width=parseInt(width);
		let id=parseInt(e.target.id);
		// const v=((id*width/50+x)/width)*100;
		e.stopPropagation();
		this.props.setColor(this.props.hist[id]);
	}
	}
	render(){
		
		const ar=[];
		for(let i=0;i<5;i++){
			const rgb=convert(this.props.hist[i].H,this.props.hist[i].S,this.props.hist[i].V);
			const style={height:'20px',width:'20%',float:'left'};
			style.backgroundColor=rgb;
			ar.push(<div id={i+'id'} style={style}></div>);
		}
		// const ar=this.props.hist.map((color)=>{
		// 	color=convert(color.H,color.S,color.V);
		// 	const style={height:'20px',width:'20%',float:'left',backgroundColor:color};
		// 	return <div id={'id'+} style={style}></div>
		// })
		return(
			<div id='value' onClick={this.ClickHandler.bind(this)} style={{width:'90%'}}>
				{ar}
			</div>
		);
	}
}
export default Last;