var express = require('express');
var app = express();

function operate(operand,num1,num2){
    switch(operand){
        case 'add':
            return num1+num2;
        case 'sub':
            return num1-num2;
        case 'mult':
            return num1*num2;
        case 'div':
            return num1/num2;
        default:
            return 'invalid';
    }
}

app.get('/op/:op/:firstOp/:secondOp', function (req, res) {
    var solution = operate(req.params.op,req.params.firstOp,req.params.secondOp);
    var requestedObject = {
        operator: req.params.op,
        firstOperand: req.params.firstOp,
        secondOperand: req.params.secondOp,
        solution: solution
    };
    if(solution === 'invalid'){
        res.sendStatus(400);
    }
    else{
        res.send(JSON.stringify(requestedObject));
    }
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
