import { Injectable } from '@angular/core';
import { TaskDetail } from './task-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  formData = new TaskDetail();
  readonly base_url = 'http://localhost:64318/api/'
  taskList: TaskDetail[];
  rdcModel: any;

  constructor(private http: HttpClient) { }

  postTaskDetail(formData: TaskDetail) {
    return this.http.post(this.base_url + "TaskDetail", formData)
  }

  updateTaskDetails(formData: TaskDetail){
    return this.http.put(this.base_url + "TaskDetail/"+formData.TaskId, formData)
  }

  retriveTaskDetails() {
    this.http.get(this.base_url + "TaskDetail")
      .toPromise()
      .then(res => {
        this.taskList = res as TaskDetail[];
      })
  }

  deleteTaskDetail(id){
    return this.http.delete(this.base_url + "TaskDetail/"+id)
  }
}
