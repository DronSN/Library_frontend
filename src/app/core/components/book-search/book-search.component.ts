import {Component, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FindBooksService} from '../../../services/find-books/find-books.service';
import {FindComponentService} from '../../services/find-component.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  @Output()
  value = '';
  constructor(
    public findComponentService: FindComponentService
  ) { }

  ngOnInit(): void {
  }
}
