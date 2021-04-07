import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskDetailsService } from '../shared/task-details.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private taskService: TaskDetailsService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.taskService.retriveTaskDetails();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm()
    this.taskService.formData = {
      TaskId: 0,
      TaskName: '',
      Progress: 0,
      DueDate: ''
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.taskService.postTaskDetail(form.value).subscribe(
      res => {
        this.resetForm(form)
        this.toast.success('Submitted Successfully', 'Task Details Saved')
        this.taskService.retriveTaskDetails();
      },
      err => {
        console.log(err);
        this.toast.error('Submitted Failed', 'Please retry')
      }
    )
  }

  calculateDiff(date: string){
    var date1:any = new Date(date);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

    return diffDays;
}



}

