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
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  image: File;
  statuses = statusOptions;
  vehicleTypes = vehicleTypeOptions;
  imageUrl: string | ArrayBuffer | null = null;

  private buildForm(vehicle: VehicleDto): void {
    this.form = this.fb.group({
      vehicleType: [vehicle.vehicleType, Validators.required],
      imageName: [''],
      imageContent: [''],
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
        tap(vehicle => {
          this.buildForm(vehicle);
          this.setImageUrl(vehicle.id)
        })
      )
      .subscribe();
  }

  private setImageUrl(id: string): void {
    this.vehicleService.getImageContent(id).subscribe((imageContent) => {
      this.imageUrl = 'data:image/png;base64,' + imageContent;
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.vehicleService.update(this.id, this.form.value).subscribe(() => {
      this.toasterService.success('::Vehicle:EditSuccess');
      this.router.navigate(['/vehicles']);
    })
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    const image = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.form.get('imageName').setValue(image.name);
      const imageUrlString = reader.result as string;
      this.form.get('imageContent').setValue(imageUrlString.split(',')[1]);
    }
  }
}
