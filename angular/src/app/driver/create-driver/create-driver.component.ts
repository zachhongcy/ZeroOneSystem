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
  private readonly driverService = inject(DriverService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  image: File;
  statuses = statusOptions;
  driverNo: string;
  imageUrl: string | ArrayBuffer | null = null;

  private buildForm(): void {
    this.form = this.fb.group({
      driverNo: [this.driverNo],
      imageName: [''],
      imageContent: [''],
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
    this.setDriverNo();
  }

  setDriverNo(): void {
    this.driverService.getDriverNo().subscribe((driverNo) => {
      this.driverNo = driverNo;
      this.form.get('driverNo').setValue(this.driverNo);
    });
  }
  
  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.driverService.create(this.form.value).subscribe(() => {
      this.toasterService.success('::Driver:CreateSuccess');
      this.router.navigate(['/drivers']);
    });
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    const image = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.form.get('imageName').setValue(image.name);
      const imageUrlString = reader.result as string;
      this.form.get('imageContent').setValue(imageUrlString.split(',')[1]);
    }
    reader.readAsDataURL(image);
  }
}
