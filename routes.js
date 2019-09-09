 const express = require('express');
// const employee = require('./controllers/');
const nightsWatch=require('./controllers/nightsWatch');
const router = express.Router();

function restrict(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    // res.redirect('/login');
    console.log('what do i do here');
    res.status(400).json({message: "not logged in"})
  }
}
// router.post('/api/register',employee.register);

// router.get('/api/showEmps',restrict,employee.getEmp);
// router.post('/api/addEmp',restrict,employee.addEmp);
// router.post('/api/login',employee.login);
// router.get('/api/logout',employee.logout);
router.post('/api/addBrother',nightsWatch.addBrother);
    
module.exports = router;
