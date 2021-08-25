let readline= require("readline-sync");
let fs= require("fs")
let Information = JSON.parse(fs.readFileSync("d.json").toString());
let Id = readline.questionInt("Enter Your ID :");
let Name = readline.question("Enter Your Full Name :");
let Age = readline.questionInt("Enter Your Age :");
let Salary = readline.questionFloat("Enter Your Salary :");
let Email = readline.questionEMail("Enter Your Email :");
let data = {id:Id,name:Name,age:Age,salary:Salary,email:Email,date:new Date()};
Information.push(data);
debugger;
let InformationString = JSON.stringify(Information);
fs.writeFileSync("d.json",InformationString);