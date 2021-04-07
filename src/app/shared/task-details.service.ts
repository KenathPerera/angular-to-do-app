import { Injectable } from '@angular/core';
import { TaskDetail } from './task-detail.model';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  formData = new TaskDetail();
  readonly base_url = 'http://localhost:64318/api/'

  constructor(private http:HttpClient) { }

  postTaskDetail(formData:TaskDetail){
  return this.http.post(this.base_url+"TaskDetail",formData)
  }
}
