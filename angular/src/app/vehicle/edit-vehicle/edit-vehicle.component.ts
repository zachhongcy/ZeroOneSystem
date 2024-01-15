import { Rest, RestService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { statusOptions } from '@proxy/enums/common';
import { vehicleTypeOptions } from '@proxy/enums/vehicles';
import { VehicleService } from '@proxy/vehicles';
import { VehicleDto } from '@proxy/vehicles/dto';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class EditVehicleComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly restService = inject(RestService);
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  image: File;
  statuses = statusOptions;
  vehicleTypes = vehicleTypeOptions;

  private buildForm(vehicle: VehicleDto): void {
    this.form = this.fb.group({
      vehicleType: [vehicle.vehicleType, Validators.required],
      image: [null],
      vehiclePlate: [vehicle.vehiclePlate, Validators.required],
      vehicleModel: [vehicle.vehicleModel, Validators.required],
      roadTaxExpiryDate: [new Date(vehicle.roadTaxExpiryDate), Validators.required],
      serviceDate: [new Date(vehicle.roadTaxExpiryDate), Validators.required],
      status: [vehicle.status, Validators.required],
      remark: [vehicle.remark],
    });
  }

  constructor() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.vehicleService.get(id)),
        tap(productGroup => this.buildForm(productGroup))
      )
      .subscribe();
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

    this.updateVehicle(formData).subscribe(() => {
      this.toasterService.success('::Vehicle:EditSuccess');
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

  private updateVehicle = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/vehicle/${this.id}`,
      body: formData,
    },
    { apiName: 'Default',...config });
}
