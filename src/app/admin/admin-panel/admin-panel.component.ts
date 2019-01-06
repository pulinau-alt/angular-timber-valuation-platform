import { UserService } from './../../services/user.service';
import { AuthService } from './../../core/auth.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  users: User[];
  displayedColumns = ['name', 'email', 'manager', 'devOfficer', 'fieldOfficer'];
  dataSource: MatTableDataSource<User>;
  numItems: number;

  constructor(private us: UserService) {
  }

  ngOnInit() {
    const data = this.us.getUsers();
    data.subscribe(userList => {
      this.users = [];
      userList.forEach(e => {
        this.users.push(e);
      });
      this.numItems = this.users.length;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggle(user, role) {
    user.roles[role] = !user.roles[role];
    this.us.updateUser(user.id, user);
    console.log(user);
  }

}
