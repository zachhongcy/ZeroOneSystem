import { Rest, RestService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { statusOptions } from '@proxy/enums/common';
import { vehicleTypeOptions } from '@proxy/enums/vehicles';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class CreateVehicleComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly restService = inject(RestService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  image: File;
  statuses = statusOptions;
  vehicleTypes = vehicleTypeOptions;

  private buildForm(): void {
    this.form = this.fb.group({
      vehicleType: [null, Validators.required],
      image: [''],
      vehiclePlate: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      roadTaxExpiryDate: [null, Validators.required],
      serviceDate: [null, Validators.required],
      status: [null, Validators.required],
      remark: [''],
    });
  }

  constructor() {
    this.buildForm();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('vehicleType', this.form.value.vehicleType);
    formData.append('image', this.image);
    formData.append('vehiclePlate', this.form.value.vehiclePlate);
    formData.append('vehicleModel', this.form.value.vehicleModel);
    formData.append('roadTaxExpiryDate', (new Date(this.form.value.roadTaxExpiryDate)).toDateString());
    formData.append('serviceDate', (new Date(this.form.value.serviceDate)).toDateString());
    formData.append('status', this.form.value.status);
    formData.append('remark', this.form.value.remark);

    this.createVehicle(formData).subscribe(() => {
      this.toasterService.success('::Vehicle:CreateSuccess');
      this.router.navigate(['/vehicles']);
    })
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    this.image = files[0];
  }

  private createVehicle = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/vehicle',
      body: formData,
    },
    { apiName: 'Default',...config });
}
