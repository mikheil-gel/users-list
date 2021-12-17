import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersList } from 'src/app/models/usersList';
import { List } from 'src/app/models/list';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('bar', { read: ElementRef }) barRef!: ElementRef;
  @Input() title: string = 'Users List';
  @Input() userId: number = 0;
  page = 1;
  size = 20;
  totalUsers!: number;
  usersList: List[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsersList(this.page, this.size);
  }

  ngAfterViewInit(): void {
    this.ObserveView();
  }

  fillData(data: UsersList) {
    this.totalUsers = data.pagination.total;
    this.usersList.push(...data.list);
  }

  getUsersList(page: number, size: number) {
    if (this.userId === 0) {
      this.usersService.getUsersList(page, size).subscribe((data) => {
        this.fillData(data);
      });
    } else {
      this.usersService
        .getUsersFriendsList(this.userId, page, size)
        .subscribe((data) => {
          this.fillData(data);
        });
    }
  }

  ObserveView() {
    let el = this.barRef.nativeElement as Element;
    let observer: IntersectionObserver;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    let obsFunc = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((element) => {
        if (element.isIntersecting && this.page * this.size < this.totalUsers) {
          this.page++;
          this.getUsersList(this.page, this.size);
        }
      });
    };

    observer = new IntersectionObserver(obsFunc, options);
    observer.observe(el);
  }
}
