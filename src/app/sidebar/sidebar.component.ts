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
    this.reloadPage();
  }

  reloadPage() {
    this.resetForm();
    this.taskService.retriveTaskDetails();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.showprogress();
    }, 1000);
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
    if (this.taskService.formData.TaskId === 0) {
      this.insertData(form);
    }
    else {
      this.updateData(form);
    }

  }

  insertData(form: NgForm) {
    console.log(form.value)
    this.taskService.postTaskDetail(form.value).subscribe(
      res => {
        this.resetForm(form)
        this.toast.success('Submitted Successfully', 'Task Details Saved')
        this.reloadPage();
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
        this.reloadPage();
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
          this.reloadPage();
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

  count = 0;
  showprogress() {
    console.log(this.taskService.toDoCount)
    this.PieChart.push(new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["To Do", "In Progress", "Done"],
        datasets: [{
          label: '# of Votes',
          //data:[1,2,0],
          data: [this.taskService.toDoCount, this.taskService.inProgressCount, this.taskService.doneCount],
          backgroundColor: [
            '#007bff',
            '#ffc107',
            '#28a745'
          ],
          borderWidth: 1
        }]
      },
      options: {

      }
    }));
  }

  fillForm(Id: TaskDetail) {
    this.taskService.formData = Object.assign({}, Id);
  }



}

