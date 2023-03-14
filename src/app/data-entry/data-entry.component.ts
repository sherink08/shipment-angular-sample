import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
})
export class DataEntryComponent implements OnInit {
  data = [
    { label: 'small-shipment', capacity: 350 },
    { label: 'medium-shipment', capacity: 550 },
    { label: 'big-shipment', capacity: 750 },
    { label: 'duckling-shipment', capacity: 2500 },
  ];

  dataFormGroup: FormGroup;
  lErr: boolean = false;
  wErr: boolean = false;
  hErr: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataFormGroup = this.fb.group({
      capacity: ['', Validators.required],
      length: ['', [Validators.required,
      Validators.pattern("^[0-9]*$")]],
      width: ['', [Validators.required,
      Validators.pattern("^[0-9]*$")]],
      height: ['', [Validators.required,
      Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() {
    this.dataFormGroup.valueChanges.subscribe((value: any) => {
      console.log(value)
      if (this.findInvalidControls()) {
        this.dataService.recieve(value);
      } else {
        this.dataService.recieve("error");
      }
    });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.dataFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    if (invalid.length == 0) {
      return true;
    } else {
      if (invalid.includes("length")) {
        this.lErr = true;
      } else {
        this.lErr = false;
      }

      if (invalid.includes("width")) {
        this.wErr = true;
      } else {
        this.wErr = false;
      }

      if (invalid.includes("height")) {
        this.hErr = true;
      } else {
        this.hErr = false;
      }

      return false;
    }

  }
}
