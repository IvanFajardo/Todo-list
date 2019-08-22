import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css']
})
export class MessageAlertComponent implements OnInit {

  @Input() message: string;
  @Input() messageType: string;

  constructor() { }

  ngOnInit() {
  }

  closeMessage() {
    this.message = null;
    this.messageType = null;
  }

}
