import { Component, OnInit, Input,EventEmitter, Output} from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from 'src/app/models/Todo';


@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoServices:TodoService) { }

  ngOnInit() {
  }

  //set dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete' : this.todo.completed
    }
    return classes;
  }

  onToggle() {
    //toggle in UI
    this.todo.completed= !this.todo.completed;

    //toggle on server
    this.todoServices.toggleCompleted(this.todo).subscribe(todo =>
      console.log(todo));
  }
  //delete todo on server
  onDelete() {
    this.deleteTodo.emit(this.todo);
}

}