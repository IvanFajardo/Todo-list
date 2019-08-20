import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css']
})
export class MessageAlertComponent implements OnInit {

  @Input() Message: string;
  @Input() Type: string;
  temp: any;
  statusClose: boolean;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.Message = null;
    this.Type = null;
  }

}
