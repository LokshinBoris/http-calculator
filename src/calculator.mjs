import http from 'node:http';
import CalculatorService from './service/CalculatorService.mjs';
import { operations } from './config/operations.mjs';
import { PORT } from './config/operations.mjs';
import CalculatorView from './view/CalculatorView.mjs';
const server=http.createServer();
server.listen(PORT,()=>console.log(`server is listining on port ${server.address().port}`));
new CalculatorService(server,operations);
const view=new CalculatorView();
server.on("request",(req,res)=>recProcessing(req,res) );


    function getOperands(UrlTokens)
    {
        const op1=+UrlTokens[2];
        const op2=+UrlTokens[3];
        if(!isNaN(op1) && !isNaN(op2))
        {
            return [op1, op2];
        }
    }

    function recProcessing(req, res)
    {   
        if (req.url === '/favicon.ico') 
       {
           res.writeHead(204, { 'Content-Type': 'image/x-icon' });
           res.end();
           return;
       }
       
       res.setHeader('content-type', 'text/html');
       
       const UrlTokens=req.url.split('/');
    
       if(testOperation(UrlTokens[1],res))
        {
            const operands=getOperands(UrlTokens);
            if(testOperands(operands,res))           
            {
                server.emit(UrlTokens[1],operands,res);
            }
        }    
    }

    function testOperation(operation,res)
    {
       if(!operations.get(operation))
       {
            let html; 
            html=view.getHtml(`method ${operation} unsupported`, true);
            res.end(html);
            return false;
       }
       return true;
    }

    function testOperands(operands,res)
    {
        if(!operands) 
        {
            let html;
            html=view.getHtml(`wrong operands`, true);
            res.end(html);
            return false;
        }
        return true;
    }