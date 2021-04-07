import { Injectable } from '@angular/core';
import { TaskDetail } from './task-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  formData = new TaskDetail();

  constructor() { }
}
