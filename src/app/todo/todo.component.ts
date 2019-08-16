import { Component, OnInit} from '@angular/core';
import { TodoService, JSONData } from './todo.service';
import {formatDate } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  //data: JSONData;
  private newTodo;
  private updateTodo;
  private EditId: number;
  page = 1;
  pageSize = 5;
  date = formatDate(Date(), 'MMM dd h:MM a', 'en-US');
  filter: any = 'All';
  filterStatus: boolean = null;
  messageType: string;
  message: string;
  messageStatus: boolean;
  data: Observable <JSONData>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.data = this.todoService.get();
  }

  add() {
    this.sendMessage('Add', this.newTodo + ' has been added to the list');
    this.todoService.add({
      title: this.newTodo,
      status: true,
      date: this.date
    });
    this.get();
  }

  update(id: number, status: boolean, date) {
    this.sendMessage('Update', 'ID: ' + id + ' has a new title of ' + this.updateTodo);
    this.todoService.update({
      title: this.updateTodo,
      status: status,
      date: date
    }, id );
    this.get();
  }

  updateStatus(id: number, status: boolean, title: string, date) {
      this.sendMessage('Update', title + ' is ' + (status) ? 'DONE' : 'ACTIVE');
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

  sendMessage(type: string, message: any) {
    this.messageType = type;
    this.message = message;
    this.messageStatus = true;
  }




}
