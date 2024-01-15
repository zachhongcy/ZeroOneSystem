import { Rest, RestService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '@proxy/drivers';
import { statusOptions } from '@proxy/enums/common';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrl: './create-driver.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class CreateDriverComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly restService = inject(RestService);
  private readonly driverService = inject(DriverService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  image: File;
  statuses = statusOptions;
  driverNo: string;

  private buildForm(): void {
    this.form = this.fb.group({
      driverNo: [this.driverNo],
      image: [null],
      driverName: ['', Validators.required],
      licenseNo: ['', Validators.required],
      licenseExpiryDate: [null, Validators.required],
      contactNo: ['', Validators.required],
      employeeCategory: [0, Validators.required],
      password: ['', Validators.required],
      status: [null, Validators.required],
      remark: [''],
      emergencyContactName: ['', Validators.required],
      emergencyRelationship: ['', Validators.required],
      emergencyContactNo: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.generateDriverNo();
  }

  generateDriverNo(): void {
    this.driverService.generateDriverNumber().subscribe((driverNo) => {
      this.driverNo = driverNo;
      this.form.get('driverNo').setValue(this.driverNo);
    });
  }
  
  save(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('driverNo', this.form.value.driverNo);
    formData.append('image', this.image);
    formData.append('driverName', this.form.value.driverName);
    formData.append('licenseNo', this.form.value.licenseNo);
    formData.append('licenseExpiryDate', (new Date(this.form.value.licenseExpiryDate)).toDateString());
    formData.append('contactNo', this.form.value.contactNo);
    formData.append('employeeCategory', this.form.value.employeeCategory);
    formData.append('password', this.form.value.password);
    formData.append('status', this.form.value.status);
    formData.append('remark', this.form.value.remark);
    formData.append('emergencyContactName', this.form.value.emergencyContactName);
    formData.append('emergencyContactNo', this.form.value.emergencyContactNo);
    formData.append('emergencyRelationship', this.form.value.emergencyRelationship);
    formData.append('address', this.form.value.address);

    this.createDriver(formData).subscribe(() => {
      this.toasterService.success('::Driver:CreateSuccess');
      this.router.navigate(['/drivers']);
    });
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    this.image = files[0];
  }

  private createDriver = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/driver',
      body: formData,
    },
    { apiName: 'Default',...config });
}
