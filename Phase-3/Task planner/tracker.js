let fs= require("fs")
let tasks = JSON.parse(fs.readFileSync("task.json").toString());
let http = require("http");
let url = require("url");
let addtask=`


       <h1>Task Planner</h1>
        </div>
        <h2 >Task Add</h2><br/>
        <form  action="register">
               <label>Emp Id: </label>
        <input type="text" name="empid"  />
        <br/>
            <label>Task Id: </label>
            <input type="text" name="taskid" />
            <br/>
           <label>Task:</label>
            <input type="text" name="task" />
            <br/>
    
            <label>Deadline:</label></div>
            <input type="date" name="dateline" />
       <br/>

           <input type="submit" value="Add Task"  />
                   </form>
`
let deletetask=`

        <h2 >Delete Task</h2><br/>
        <form  action="delete">
        
        <br/>
            <label>Task Id :</label>
            <input type="text"  name="taskid"/>
        <br/>

           <input type="submit" value="Delete Task" />
                   </form>
     `

let table=` 
<h2 >List All Task</h2><br/>
<form  action="table">
<div class="col-2"><input type="submit" value="Show Task" class="btn btn-outline-warning" /></div>
</form>
</body>
</html>`

let server = http.createServer((request,response)=> {
let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
     if(urlInfo.pathname == "/register"){
         let Task = urlInfo.query;
         let result = tasks.find(l=>l.taskid == Task.taskid);
        response.writeHead(200,{"content-type":"text/html"});
            if(result == undefined){
            let data = {empid:Task.empid,taskid:Task.taskid,task:Task.task,dateline:Task.dateline};
            tasks.push(data);
            let taskString = JSON.stringify(tasks);
            fs.writeFileSync("task.json",taskString);
            // alert("Data stored in file");
            response.write(addtask)
            response.write(deletetask);
            response.write(table);  
            }else{
            response.write("Task Id Must Be Unique")
            response.write(addtask)
            response.write(deletetask);  
            response.write(table);
            }
        }else if(urlInfo.pathname == "/delete"){
            let Task = urlInfo.query;
            let result = tasks.find(l=>l.taskid == Task.taskid);
           response.writeHead(200,{"content-type":"text/html"});
               if(result != undefined){
               const index = tasks.findIndex(x => x.taskid === Task.taskid);
               if (index !== undefined) tasks.splice(index, 1);
                let taskString = JSON.stringify(tasks);
                fs.writeFileSync("task.json",taskString);
                response.write(addtask)
                response.write(deletetask);  
                response.write(table);
            }else{
            response.write("Task Id not Exist")
            response.write(addtask)
            response.write(deletetask);  
            response.write(table);
            }
        }else if(urlInfo.pathname == "/table"){
            let tableStart = "<table border=1><tr><th>Employee ID</th><th>Task ID</th><th>Task Name</th><th>Deadline</th></tr>";
            let tableData = "";
            for (let task of tasks) {
                tableData += "<tr><td>"+task.empid+"</td><td>"+task.taskid+"</td><td>"+task.task+"</td><td>"+task.dateline+"</td></tr>";
            }
            response.write(addtask);  
            response.write(deletetask);  
            response.write(tableStart+tableData+"</table>");
        }else{
    response.write(addtask);  
    response.write(deletetask);  
    response.write(table);
}
}
    response.end();
})
server.listen(9090,()=>console.log("Server running on port number 9090"))