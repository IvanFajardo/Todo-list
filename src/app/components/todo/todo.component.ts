import { Component, OnInit} from '@angular/core';
import { TodoService} from '../../services/todo/todo.service';
import {formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../../model/task';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTodo = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  updateTodo = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  editId: number;
  page = 1;
  pageSize = 5;
  liveDate: Date = new Date();
  formattedLiveDate: string;
  date = formatDate(Date(), 'MMM dd h:MM a', 'en-US');
  filterId: any = 'All';
  filterStatus: boolean = null;
  messageType: string;
  message: string;
  messageStatus: boolean;
  tasks: any;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTask();
    setInterval(() => {
      this.liveDate = new Date();
      this.formattedLiveDate = formatDate(this.liveDate, 'MMM dd yyy h:MM:ss a', 'en-US');
    }, 1);

  }

  getTask() {
    this.todoService.getJson().subscribe(data => {
      this.tasks = data;
    });
  }

  addTask() {
    const value: Task = {
      title: this.newTodo.value,
      status: true,
      date: this.date
    };

    this.sendMessage('Add', this.newTodo.value + ' has been added to the list');
    if ( this.newTodo.invalid ) {
      this.sendMessage('Error', '1-15 characters only');
    } else {
      this.todoService.addJson(value).subscribe(data => {
        this.newTodo.reset(); // Text Field Reset
        this.getTask();
      });
    }
  }

  updateTask(id: number, status: boolean, date) {
    console.log(id);
    console.log(status);
    console.log(date);

    const value: Task = {
      title: this.updateTodo.value,
      status: status ,
      date: date 
    };
    this.sendMessage('Update', 'ID: ' + id + ' has a new title of ' + this.updateTodo.value);
    if ( this.updateTodo.invalid ) {
      this.sendMessage('Error', '1-15 characters only');
    } else {
      this.todoService.updateJson( value , id ).subscribe(data => {
        this.getTask();
      }
      );
    }
  }

  updateTaskStatus(id: number, status: boolean, title: string, date) {
      const value: Task = {
        title: title,
        status: !status,
        date: date
      };
      this.sendMessage('Update', title + ' is ' + ((status) ? 'DONE' : 'ACTIVE'));
      this.todoService.updateJson( value , id ).subscribe(data => {
        this.getTask();
      });
    }

  deleteTask(id) {
    this.sendMessage('Delete', 'ID: ' + id + ' has been deleted from the list');
    this.todoService.deleteJson(id).subscribe(data => {
      this.getTask();
    });
  }

  edittableTask(id) {
    this.editId = id;
  }

  selectedTask() {
    if (this.filterId === 'Active') {this.filterStatus = true; }
    if (this.filterId === 'Done') {this.filterStatus = false; }
    if (this.filterId === 'All') {this.filterStatus = null; }
    console.log(this.filterStatus);
  }

  sendMessage(type: string, message: string) {
    this.messageType = type;
    this.message = message;
    this.messageStatus = true;
  }




}
