import CalculatorView from "../view/CalculatorView.mjs";
import { operations } from '../config/operations.mjs';
const view = new CalculatorView();
export default class CalculatorService 
{
    constructor(emitter, operations) 
    {
       for(const key of operations.keys())
       {
        emitter.addListener(key, (operands, response) => 
            {
                    const res = operations.get(key)(operands[0], operands[1]);
                    response.end(view.getHtml(res, false));              
            });    
       }
    }
}