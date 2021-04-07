import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskDetailsService } from '../shared/task-details.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private taskService: TaskDetailsService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form!=null)
      form.resetForm()
    this.taskService.formData = {
      TaskId : 0,
      TaskName : '',
      Progress : 0,
      DueDate : 0
    }
  }

  onSubmit(form:NgForm){
    this.taskService.postTaskDetail(form.value).subscribe(
      res => {
        this.resetForm(form)
      },
      err => {
        console.log(err);
      }
    )
  }



}
function err(arg0: (res: Object) => void, err: any) {
  throw new Error('Function not implemented.');
}

