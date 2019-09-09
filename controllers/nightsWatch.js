const db=require('../utils/database.js');
controllers={}
controllers.getEmp=function(req,res){
	db.execute("select * from employee")
	.then(([employees])=>{
		if(employees.length>0){
			console.log("here");
			res.status(200).json({employees});
		}
		else{
			console.log("there");
			res.status(204).json({ message: "No faculty data found" });
		}
	})
	.catch(err=>{
		res.status(500).json({message: "something went wrong"})
	});

}

// controllers.addBrother=function(req,res){
// 	console.log(req.body);
// 	const name=req.body.name;
// 	const job=req.body.job;
// 	const castle=req.body.castle;
// 	const order=req.body.order;
// 	db.execute("select * from castles where name=?",[castle])
// 	.then(([Castle])=>{
// 		return db.execute("select * from orders where name=?",[order]);
// 	})
// 	.then(([Order])=>{
// 		return db.execute("insert into brothers(name,job,castleId,orderId) values(?,?,?,?)",[name,
// 																							 job,
// 																							 Castle[0].castleId,
// 																							 Order[0].orderId]);
// 	})
// 	.then()
// 	db.execute("insert into brothers(name,) values(?,?)",[req.body.empName,req.body.branchId])
// 	.then(([user])=>{
// 		res.status(201).json({ message: "New employee added to database" });
//     })
//     .catch(err => {
//       res.status(500).json({ message: "error" });
//       console.log(err);
//     });
// }
controllers.addBrother=async function(req,res){
	console.log(req.body);
	const name=req.body.name;
	const job=req.body.job;
	const castle=req.body.castle;
	const order=req.body.order;
	try{
		const Castle = await db.execute("select * from castles where name=?",[castle]);
		console.log(Castle);
		console.log(Castle[0][0].castleId);
		const Order = await db.execute("select * from orders where name=?",[order]);
		console.log(Order[0][0].orderId);
		await db.execute("insert into brothers(name,job,castleId,orderId) values(?,?,?,?)",[name,
																							job,
																							Castle[0][0].castleId,
																							Order[0][0].orderId]);
		db.execute("update castles set strength=strength+1 where castleId=?",[Castle[0][0].castleId]);
		res.status(201).json({ message: "New brother enlisted" });
	}
	catch(e){
		console.log(e);
		res.status(500).json({ message: "some kind of trouble" });
	}
}
controllers.register=function(req,res){
	db.execute('insert into users values(?,?)'[req.body.name,req.body.password])
	.then(([user])=>{
		res.status(201).json({message:'successfully signed-up'});
	})
	.catch(err=>{
		res.status(500).json({ message: "error" });
    	console.log(err);
	})
}

controllers.login=function(req,res){
	db.execute('select * from users where name=?',[req.body.name])
	.then(([user])=>{
		if(user.length==0){

			return res.status(404).json({ email: "email not found" });
      	}
      	if(user[0].password!=req.body.password){
      		
      		return res.status(400).json({ message:"incorrect password" });
      	}
      	req.session.regenerate(function(){
	        // Store the user's primary key
	        // in the session store to be retrieved,
	        // or in this case the entire user object
        	req.session.user = user[0];
        	req.session.success = 'Authenticated as ' + user[0].name;
        	console.log(req.session);
	        //   + ' click to <a href="/logout">logout</a>. '
	        //   + ' You may now access <a href="/restricted">/restricted</a>.';
	        // res.redirect('back');
	        res.status(201).json({message:'successfully signed-in'});
      	});
	})
	.catch(err=>{
		res.status(500).json({ message: "error" });
    	console.log(err);
	})
}
controllers.logout=function(req,res){
	req.session.destroy(function(){
    	// res.redirect('/');
    res.status(201).json({message: "logged out"});
  	});
}
module.exports=controllers;