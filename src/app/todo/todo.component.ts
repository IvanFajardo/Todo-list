import { Component, OnInit} from '@angular/core';
import { TodoService, JSONData } from './todo.service';
import {formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTodo = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  private updateTodo = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  private EditId: number;
  page = 1;
  pageSize = 5;
  liveDate: Date = new Date();
  dateLive: string;
  date = formatDate(Date(), 'MMM dd h:MM a', 'en-US');
  filter: any = 'All';
  filterStatus: boolean = null;
  messageType = new Observable();
  message = new Observable();
  messageStatus: boolean;
  data: Observable <JSONData>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.get();
    setInterval(() => {
      this.liveDate = new Date();
      this.dateLive = formatDate(this.liveDate, 'MMM dd yyy h:MM:ss a', 'en-US');
    }, 1);

  }

  get() {
    this.data = this.todoService.get();
  }

  add() {
    this.sendMessage('Add', this.newTodo.value + ' has been added to the list');
    if ( this.newTodo.invalid ) {
      this.sendMessage('Error', '1-15 characters only');
    } else {
      this.todoService.add({
        title: this.newTodo.value,
        status: true,
        date: this.date
      });
      this.newTodo.reset();
    }
    this.get();
  }

  update(id: number, status: boolean, date) {
    this.sendMessage('Update', 'ID: ' + id + ' has a new title of ' + this.updateTodo.value);
    if ( this.updateTodo.invalid ) {
      this.sendMessage('Error', '1-15 characters only');
    } else {
      this.todoService.update({
        title: this.updateTodo.value,
        status: status,
        date: date
      }, id );
    }
    this.get();
  }

  updateStatus(id: number, status: boolean, title: string, date) {
      this.sendMessage('Update', title + ' is ' + ((status) ? 'DONE' : 'ACTIVE'));
      this.todoService.update({
      title: title,
      status: !status,
      date: date
    }, id );
      this.get();
  }

  delete(id) {
    this.sendMessage('Delete', 'ID: ' + id + ' has been deleted from the list');
    this.todoService.delete(id);
    this.get();
  }

  edittable(id) {
    this.EditId = id;
  }

  selected() {
    if (this.filter === 'Active') {this.filterStatus = true; }
    if (this.filter === 'Done') {this.filterStatus = false; }
    if (this.filter === 'All') {this.filterStatus = null; }
    console.log(this.filterStatus);
  }

  sendMessage(type: any, message: any) {
    this.messageType = type;
    this.message = message;
    this.messageStatus = true;
  }




}
