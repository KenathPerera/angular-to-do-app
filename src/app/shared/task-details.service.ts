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
  toDoCount = 0;
  inProgressCount = 0;
  doneCount = 0;
  todayDue = 0;
  overDue = 0;

  constructor(private http: HttpClient) { }

  postTaskDetail(formData: TaskDetail) {
    return this.http.post(this.base_url + "TaskDetail", formData)
  }

  updateTaskDetails(formData: TaskDetail) {
    return this.http.put(this.base_url + "TaskDetail/" + formData.TaskId, formData)
  }

  retriveTaskDetails() {
    this.http.get(this.base_url + "TaskDetail")
      .toPromise()
      .then(res => {
        this.taskList = res as TaskDetail[];
        this.toDoCount = 0;
        this.inProgressCount = 0;
        this.doneCount = 0;
        this.todayDue = 0;
        this.overDue = 0;
        for (var task of this.taskList) {
          if(this.calculateDiff(task.DueDate) == 0){
            this.todayDue++;
          }
          else if(this.calculateDiff(task.DueDate) < 0){
            this.overDue++;
          }

          if (task.Progress == 1) {
            this.toDoCount++;
          }
          else if (task.Progress == 2) {
            this.inProgressCount++;
          }
          else {
            this.doneCount++;
          }
        }
        console.log(this.toDoCount)
      })
  }

  deleteTaskDetail(id) {
    return this.http.delete(this.base_url + "TaskDetail/" + id)
  }

  calculateDiff(date: string) {
    var date1: any = new Date(date);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
