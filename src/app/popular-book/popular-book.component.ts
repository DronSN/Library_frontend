import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../book-service.service';
import {Book} from '../model/book';

@Component({
  selector: 'app-popular-book',
  templateUrl: './popular-book.component.html',
  styleUrls: ['./popular-book.component.scss']
})
export class PopularBookComponent implements OnInit {
  books: Book[];
  columns = ['author', 'name'];
  constructor(private bookService: BookServiceService) { }

  ngOnInit(): void {
    this.buttonClick();
    console.log(this.books);
  }

  buttonClick() {
    this.bookService.getBooks().subscribe(x => this.books = x);
  }
}
