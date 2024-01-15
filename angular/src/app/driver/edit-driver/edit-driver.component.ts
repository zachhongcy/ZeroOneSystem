import { Rest, RestService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from '@proxy/drivers';
import { DriverDto } from '@proxy/drivers/dto';
import { statusOptions } from '@proxy/enums/common';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class EditDriverComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly driverService = inject(DriverService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly restService = inject(RestService);
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  image: File;
  statuses = statusOptions;

  private buildForm(driver: DriverDto): void {
    this.form = this.fb.group({
      driverNo: [driver.driverNo, Validators.required],
      image: [null],
      driverName: [driver.driverName, Validators.required],
      licenseNo: [driver.licenseNo, Validators.required],
      licenseExpiryDate: [new Date(driver.licenseExpiryDate), Validators.required],
      contactNo: [driver.contactNo, Validators.required],
      employeeCategory: [driver.employeeCategory, Validators.required],
      password: [driver.password, Validators.required],
      status: [driver.status, Validators.required],
      remark: [driver.remark],
      emergencyContactName: [driver.emergencyContactName, Validators.required],
      emergencyRelationship: [driver.emergencyRelationship, Validators.required],
      emergencyContactNo: [driver.emergencyContactNo, Validators.required],
      address: [driver.address, Validators.required],
    });
  }

  constructor() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.driverService.get(id)),
        tap(driver => this.buildForm(driver))
      )
      .subscribe();
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

    this.updateDriver(formData).subscribe(() => {
      this.toasterService.success('::Driver:EditSuccess');
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

  private updateDriver = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/driver/${this.id}`,
      body: formData,
    },
    { apiName: 'Default',...config });
}
