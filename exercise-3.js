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
            throw new Error("The operand must be add, sub, mult, or div");
    }
}

app.get('/op/:op/:firstOp/:secondOp', function (req, res) {
    var num1 = parseInt(req.params.firstOp);
    var num2 = parseInt(req.params.secondOp);
    try{
        var solution = operate(req.params.op,num1,num2);
    }
    catch(e){
        res.send(400, e.message);
    }
    var requestedObject = {
        operator: req.params.op,
        firstOperand: num1,
        secondOperand: num2,
        solution: solution
    };
    
    res.json(requestedObject);

});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
