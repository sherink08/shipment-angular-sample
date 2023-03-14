import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-status-validator',
  templateUrl: './status-validator.component.html',
  styleUrls: ['./status-validator.component.scss'],
})
export class StatusValidatorComponent implements OnInit {
  status: string = '';
  volume: number | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataState.subscribe((data: any) => {
      if (data == "error") {
        this.status = "";
      } else {
        this.volume = (data.length * data.width * data.height);
        if (data.capacity.capacity >= this.volume) {
          this.status = "Approved";
        } else {
          this.status = "Denied";
        }
      }
    });
  }
}
