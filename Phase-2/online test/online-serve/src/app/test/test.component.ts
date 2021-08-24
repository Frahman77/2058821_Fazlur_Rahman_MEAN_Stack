import { Component, OnInit } from '@angular/core';
import { TestService} from '../test.service';
import { FormBuilder, FormGroup  } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myForm:FormGroup;
  questions: any = [];
  selectedAnswers:string[]=[];
  out:string = "";
  constructor(public testSer: TestService,public form:FormBuilder) {
    this.myForm = form.group({});
   }

  ngOnInit(): void {
    this.testSer.git().subscribe(ques=> {
      for (let q of ques) {
        this.myForm.addControl(q.question, this.form.control(''));
        this.questions.push(q);
     }
   });
  }


  submit(){
    Object.keys(this.myForm.value).forEach((key)=> this.selectedAnswers.push(this.myForm.value[key]));
    let quizGrade:number = 0;
    for(let i = 0; i < this.questions.length; i++) {
this.corrct(i)
      if(this.questions[i].correctAns == this.selectedAnswers[i]) {
        quizGrade++;
      } else {
        this.checkF(i)
      }
    }
    this.out = "<h2>" + quizGrade + "/10 ";
    if(quizGrade < 7) {
      this.out += "Failed.</h2>" 
    } else {
      this.out += " Passed!</h2>"
    }
    this.myForm.disable()
  }
  corrct(i: any){

    let a=this.questions[i].correctAns;
    if(this.questions[i].ans1==a){
      this.questions[i].ans1= a+ " correct answer"
    }
    else if(this.questions[i].ans2==a){
      this.questions[i].ans2= a+ " correct answer"
    }
    else if(this.questions[i].ans3==a){
      this.questions[i].ans3= a+ " correct answer"
    }
      else if(this.questions[i].ans4==a){
      this.questions[i].ans4= a+ " correct answer"

    }

  }
  checkF(i:any){
  let z=this.selectedAnswers[i];
  if(this.questions[i].ans1==z){
    this.questions[i].ans1= z+ " answer wrong"
  }
  else if(this.questions[i].ans2==z){
    this.questions[i].ans2= z+ " answer wrong"
  }
  else if(this.questions[i].ans3==z){
    this.questions[i].ans3= z+ " answer wrong"
  }
    else if(this.questions[i].ans3==z){
    this.questions[i].ans3= z+ " answer wrong"
  }
}

}



