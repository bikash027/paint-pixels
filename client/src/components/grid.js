import React from "react";
import './cantthinkofname.css';
import GridItem from './griditem'
import axios from 'axios';
const {List} =require('immutable');
class Grid extends React.Component {
	constructor(props){
		super(props);
		this.t='';
		// this.updater='diff';
		const arr=[];
		for(let i=0;i<1296;i++)
			arr.push('rgb(255,255,255)');
		this.colors=arr;
		this.active=false;
		this.state={
			updater:'diff'
		}
	}
	componentDidMount(){
		this.t=setInterval(()=>{this.getData()},1000);
	}
	getData(){
		axios.get('/api')
		// .then(res=>res.data)
		.then(res=>{
			// console.log(res.data);
			let colors=this.colors;
			const ar=res.data.ar;
			ar.sort(function(a,b){
				return a.time-b.time;
			})
			for(let i=0;i<ar.length;i++){
				// if(colors[ar[i].square]!==ar[i].color)
					// colors=colors.set(ar[i].square,ar[i].color)
					colors[ar[i].square]=ar[i].color;
			}
			// this.updater='diff';
			this.setState({
				updater:'diff'
			});
		})
		.catch(err=>{
			console.log(err);
		});
	}
	componentWillUnmount(){
		clearInterval(this.t);
	}
	shouldComponentUpdate(nextProps,nextState){
		if(this.props!==nextProps)
			return true;
		// if(this.state.colors===nextState.colors)
			// return false;
		if(nextState.updater==='self')
			return false;
		return true;
	}
	sendColor(){
		return this.props.color;
	}
	// paint(e){
	// 	if(e.target!==e.currentTarget){
	// 		const color=this.props.color;
	// 		e.target.style.backgroundColor=color;
	// 		let id=e.target.id;
	// 		id=parseInt(id);
	// 		this.colors[id]=color;
	// 		const data={
	// 			square:id,
	// 			color:color
	// 		}
	// 		axios.post('/api',data)
	// 		.then(res=>{
	// 	      console.log(res);
	// 	    })
	// 	    .catch((err)=>{
	// 	      console.log(err);
	// 	    });
	// 	    // this.updater='self';
	// 		this.setState({
	// 			// colors:this.state.colors.set(id,this.props.color),
	// 			updater:'self'
	// 		});
	// 		e.stopPropagation();
	// 	}
	// }
	dpaint(e){
		if(e.target!==e.currentTarget && this.active===true){
			const color=this.props.color;
			e.target.style.backgroundColor=color;
			let id=e.target.id;
			id=parseInt(id);
			this.colors[id]=color;
			const data={
				square:id,
				color:color,
				time:Date.now()
			}
			axios.post('/api',data)
			.then(res=>{
		      console.log(res);
		    })
		    .catch((err)=>{
		      console.log(err);
		    });
		    // this.updater='self';
			this.setState({
				// colors:this.state.colors.set(id,this.props.color),
				updater:'self'
			});
			e.stopPropagation();
		}
	}
	render(){
		const content=[];
		const colors=this.colors;
		for(let i=0;i<1296;i++){
			content.push(<GridItem color={colors[i]} ID={i+'grid'} key={i}/>)
		}
		return( 
			<div onMouseDown={()=>{this.active=true;}}
				 onMouseUp={()=>{this.active=false;}}
				 onMouseOver={this.dpaint.bind(this)}
				 className="grid">
				{content}
			</div>
		);
	}
}
export default Grid;
