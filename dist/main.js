(()=>{"use strict";const e=new class{constructor(e,t){this.model=e,this.view=t}handleCreateProject(e){this.model.createProject(e)}start(e){this.linkViewAllProjects(e),this.linkCreateProjectForm(e)}linkViewAllProjects(e){document.getElementById("linkViewAllProjects").addEventListener("click",(function(){e.view.displayProjects(e.model.projects)}))}linkCreateProjectForm(e){document.getElementById("linkCreateProjectForm").addEventListener("click",(function(t){t.preventDefault(),e.view.createProjectForm()})),document.getElementById("projectCreateButton").addEventListener("click",(function(t){t.preventDefault(),e.createProjectHandler()}))}createProjectHandler(){let e=document.getElementById("projectName").value;console.log(e),console.log("test"),document.getElementById("projectNameButton").addEventListener("click",(function(t){t.preventDefault(),""!==document.getElementById("projectName").value?this.checkProjectExists(e,controllerObject.model.projects)?(this.addToProjects(e),alert("project created"),e.value=""):console.log("project already exists! add another project name!"):alert("please enter a project name")}))}checkProjectExists(e,t){let r=[];return t.map((e=>r.push(e.name))),!!r.includes(str.trim(e))}addToProjects(e){controllerObject.model.projects.createProject(e)}}(new class{constructor(){this.projects=[{name:"Test Project 1",todos:[{title:"item1",description:"desc1",dueDate:"11/11/2020",priority:"high",notes:"test1 notes",checklist:!1},{title:"item2",description:"desc2",dueDate:"11/11/2020",priority:"high",notes:"test2 notes",checklist:!1}]},{name:"Test Project 2",todos:[]},{name:"Test Project 2",todos:[]}]}createToDo(e,t,r,o,c,l){return{title:e,description:t,dueDate:r,priority:o,notes:c,checklist:l}}createProject(e){const t={title:e,todoList:[]};this.projects.push(t)}hello(){console.log("hello")}},new class{constructor(){this.pages=["linkViewAllProjects","linkViewAllTodos","linkCreateProjectForm","linkCreateTodosForm"],this.currentPage=null}createFormTextElement(e,t){let r=document.createElement("input");return r.setAttribute("type","text"),r.setAttribute("id",`${e}`),r.setAttribute("class","form-control"),r.setAttribute("placeholder",`${t}`),r}clearDisplay(){document.getElementById("display").innerHTML=""}resetValue(e){e.value=""}createFormGroupDiv(){let e=document.createElement("div");return e.setAttribute("class","form-group"),e}toggleActive(){this.pages.map((e=>{let t=document.getElementById(`${e}`);t.classList.contains("active")&&t.classList.remove("active")})),document.getElementById(`${this.currentPage}`).classList.add("active")}createFormGroup(){return document.createElement("form")}createLabel(e,t){let r=document.createElement("label");return r.setAttribute("for",`${e}`),r.innerHTML=`${t}`,r}createFormButton(e,t,r){let o=document.createElement("button");return o.innerHTML=`${t}`,o.setAttribute("id",`${e}`),o.setAttribute("class","btn"),o.setAttribute("class",`btn-${r}`),o}displayProjects(e){this.currentPage="linkViewAllProjects",this.toggleActive(),this.clearDisplay(),e.map((e=>{let t=document.createElement("div");t.innerHTML=`${e.name}`,document.getElementById("display").appendChild(t)}))}viewAllToDos(e){this.clearDisplay();let t=[];e.map((e=>e.todos.map((e=>{t.push(e)}))))}createProjectForm(){this.currentPage="linkCreateProjectForm",this.toggleActive(),this.clearDisplay();let e=[];e.push(this.createLabel("projectCreateName","Project Name")),e.push(this.createFormTextElement("projectCreateName","create project name"));let t=this.createFormGroupDiv(),r=this.createFormGroup();e.map((function(e){t.append(e)})),r.appendChild(t),r.appendChild(this.createFormButton("projectCreateButton","submit","primary")),document.getElementById("display").appendChild(r)}});e.start(e)})();