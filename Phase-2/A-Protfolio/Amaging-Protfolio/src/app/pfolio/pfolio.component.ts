import { Component, OnInit } from '@angular/core';
import {contact} from '../contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pfolio',
  templateUrl: './pfolio.component.html',
  styleUrls: ['./pfolio.component.css']
})
export class PfolioComponent implements OnInit {
  name:string="";
  userName:string="";
  passw:string="";
  msg:string="";
  b1:string="Sign Up";
  flag1:boolean = true;
  flag2:boolean = false;
  flag3:boolean =false;
  contacts:Array<contact>=new Array();

  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })
  SignupRef = new FormGroup({
    firstname:new FormControl("",[Validators.required]),
    lastname:new FormControl("",[Validators.required]),
    username:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }
  checkUser() {
    let login = this.loginRef.value
    if(login.user==this.userName && login.pass==this.passw){
        this.pFolio()
    }else {
      alert("Your Username or your Password is Wrong Try Again..!  ")
    }
    this.loginRef.reset();
  }
  Login(){
      this.flag1=false;
      this.flag2=true
}
SignUp(){
  this.flag1=true;
  this.flag2=false;
}
pFolio(){
  this.flag1=false;
  this.flag2=false;
  this.flag3=true;
}
signout(){
  this.flag1=true;
  this.flag2=false;
  this.flag3=false;

}
addContact(nameRef:any,phoneRef:any){
  let name = nameRef.value;
  let phone=phoneRef.value;
  let cont = new contact(name,phone);
  this.contacts.push(cont);
}
adduser(){
  let Signup = this.SignupRef.value

this.name= Signup.firstname+" "+Signup.lastname;
this.userName=Signup.username;
this.passw=Signup.password; 
this.SignupRef.reset();
this.SignUp(); 

}

}
