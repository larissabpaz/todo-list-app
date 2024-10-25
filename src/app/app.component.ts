import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoList } from '../models/todo-list.model';

@Component({
  selector: 'app-root',
  standalone: false,
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list-app';
  public mode:String = 'list';
  public todos: any[] = [];
  public form: FormGroup;

  constructor( private fb:FormBuilder) {
    this.form = this.fb.group({
      title:['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
  }
  add(){
    const title =this.form.controls['title'].value;
    const id = this.todos.length +1;
    this.todos.push(new TodoList(id, title,false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }
  
  remove(todo: TodoList){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }
    this.save();
  }
  
  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
    
    this.mode='list';
  }

  load(){
    const data :any = localStorage.getItem('todos');
    if(data){ 
    this.todos = JSON.parse(data);
    }else{
      this.todos =[];
    }
  }

  changeMode(mode:string){
    this.mode=mode;
  }

  markAsDone(todo: TodoList){
  todo.done= true;
  this.save();
 }

  markAsUndone(todo: TodoList){
  todo.done=false;
  this.save();
 }
}
