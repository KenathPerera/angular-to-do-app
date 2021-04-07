import { Component, OnInit } from '@angular/core';
import { TaskDetailsService } from '../shared/task-details.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private taskService:TaskDetailsService) { }

  ngOnInit() {
  }


  

}
