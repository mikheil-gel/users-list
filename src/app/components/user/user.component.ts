import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: User | null;
  friendList: boolean = false;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let id;
    this.route.params.subscribe((params: Params) => {
      id = params['id'];
      this.friendList = false;

      this.usersService.getUser(id).subscribe(
        (user) => {
          this.user = user;
          this.titleService.setTitle(
            `User: ${user.prefix} ${user.name} ${user.lastName}`
          );
          this.friendList = true;
        },
        () => {
          this.router.navigate(['/']);
        }
      );
    });
  }
}
