import { Component, OnInit } from '@angular/core';
import {FindComponentService} from '../../core/services/find-component.service';
import {FindBooksService} from '../../services/find-books/find-books.service';
import {Book} from '../../model/book';
import {NavigationEnd, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-books-not-login',
  templateUrl: './books-not-login.component.html',
  styleUrls: ['./books-not-login.component.scss']
})
export class BooksNotLoginComponent implements OnInit {

  navigationSubscription: Subscription;
  books: Book[];
  constructor(
    public findComponentService: FindComponentService,
    public findBooksService: FindBooksService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit(): void {
    // this.findBooksService.getBooks(this.findComponentService.search)
    //   .subscribe(x => this.books = x );
  }

  private initialiseInvites() {
    this.findBooksService.getBooks(this.findComponentService.search)
      .subscribe(x => this.books = x );
  }
}
