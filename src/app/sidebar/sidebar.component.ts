import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Chart } from 'chart.js';
import { TaskDetailsService } from '../shared/task-details.service';
import { TaskDetail } from '../shared/task-detail.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  PieChart = [];
  constructor(private taskService: TaskDetailsService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.taskService.retriveTaskDetails();
    //console.log(this.taskService.rdcModel[0])
    //this.taskService.taskList[0].Progress
    // // pie chart:
    // this.PieChart.push(new Chart('pieChart', {
    //   type: 'pie',
    //   data: {
    //     labels: ["To Do", "In Progress", "Done"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [9, 7, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {

    //   }
    // }));

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
    console.log(this.taskService.formData.TaskId)
    console.log(form.value)
    if (this.taskService.formData.TaskId === 0) {
      this.insertData(form);
    }
    else {
      this.updateData(form);
    }

  }

  insertData(form: NgForm) {
    this.taskService.postTaskDetail(form.value).subscribe(
      res => {
        this.resetForm(form)
        this.toast.success('Submitted Successfully', 'Task Details Saved')
        this.taskService.retriveTaskDetails();
      },
      err => {
        console.log(err);
        this.toast.error('Submit Failed', 'Please retry')
      }
    )
  }

  updateData(form: NgForm) {
    this.taskService.updateTaskDetails(form.value).subscribe(
      res => {
        this.resetForm(form)
        this.toast.info('Updated Successfully', 'Task Details Updated')
        this.taskService.retriveTaskDetails();
      },
      err => {
        console.log(err);
        this.toast.error('Update Failed', 'Please retry')
      }
    )
  }

  deleteTaskDetail(id) {
    if (confirm("Do you want to delete this record ???? ")) {
      this.taskService.deleteTaskDetail(id).subscribe(
        res => {
          this.toast.warning('Deleted Successfully', 'Task Details Deleted')
          this.taskService.retriveTaskDetails();
        },
        err => {
          console.log(err);
          this.toast.warning('Delete Failed', 'Please retry')
        }
      )
    }
  }

  calculateDiff(date: string) {
    var date1: any = new Date(date);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  showprogress() {
    this.taskService.taskList.forEach((currentValue, index) => {
      console.log(currentValue.Progress)
    });
  }

  fillForm(Id: TaskDetail) {
    this.taskService.formData = Object.assign({}, Id);
  }



}

