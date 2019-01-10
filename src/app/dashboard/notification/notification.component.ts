import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Notification } from '../../core/models/notification';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationForm: FormGroup;
  notification: Notification;
  

  constructor(private notifyService: NotificationService) {  }

  ngOnInit() {
    this.notificationForm = new FormGroup({
      subject: new FormControl(),
      body: new FormControl(),
   });
  }
  
  
  onSubmit(){
    this.notifyService.addNotification();
    // this.notification.subject = '';
    // this.notification.body = '';
  }


  
}
