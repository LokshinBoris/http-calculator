import { readFileSync } from "fs"; 

export default class CalculatorView
{
    constructor(filename)
    {
        this.colorResult= "green";
        this.colorError = "red";
        this.fontSize = "40px";
        this.textAlign = "center";
        this.readJSON();
    }

    getHtml(res, isError)
    {
        const color = isError? this.colorError: this.colorResult;
        const txt=`<html><body style="font-size:${this.fontSize}; display:block; text-align:${this.textAlign}; color:${color};">${res}</body></html>`;
        return txt;
    }

    readJSON()
    {
        try
        {
            const js=readFileSync("./src/view/view.json","utf-8");
            const jsonData=JSON.parse(js);
            this.colorResult= jsonData.colorResult;
            this.colorError = jsonData.colorError;
            this.fontSize = jsonData.fontSize;
            this.textAlign = jsonData.textAlign;
           
        }
        catch (err)
        {
            console.log("Error reading", err);
        }
    }
}