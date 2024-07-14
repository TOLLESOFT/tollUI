import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable()
export class SelectListService {
  selected = new ReplaySubject<any>();
  constructor() { }

}
