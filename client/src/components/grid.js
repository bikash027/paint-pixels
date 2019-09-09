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
		for(let i=0;i<350;i++)
			arr.push('rgb(255,255,255)');
		this.state={
			colors:List(arr),
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
			let colors=this.state.colors;
			const ar=res.data.ar;
			for(let i=0;i<ar.length;i++){
				if(colors.get(ar[i].square)!==ar[i].color)
					colors=colors.set(ar[i].square,ar[i].color)
			}
			// this.updater='diff';
			this.setState({
				colors:colors,
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
		if(this.state.colors===nextState.colors)
			return false;
		if(nextState.updater==='self')
			return false;
		return true;
	}
	sendColor(){
		return this.props.color;
	}
	paint(e){
		if(e.target!==e.currentTarget){
			e.target.style.backgroundColor=this.props.color;
			let id=e.target.id;
			id=parseInt(id);
			const data={
				square:id,
				color:this.props.color
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
				colors:this.state.colors.set(id,this.props.color),
				updater:'self'
			});
			e.stopPropagation();
		}
	}
	render(){
		const content=[];
		const colors=this.state.colors;
		for(let i=0;i<350;i++){
			content.push(<GridItem color={colors.get(i)} ID={i+'grid'} key={i}/>)
		}
		return( 
			<div onClick={this.paint.bind(this)} className="grid">
				{content}
			</div>
		);
	}
}
export default Grid;
