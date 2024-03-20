import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { statusOptions } from '@proxy/enums/common';
import { vehicleTypeOptions } from '@proxy/enums/vehicles';
import { VehicleService } from '@proxy/vehicles';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class CreateVehicleComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  image: File;
  statuses = statusOptions;
  vehicleTypes = vehicleTypeOptions;
  imageUrl: string | ArrayBuffer | null = null;

  private buildForm(): void {
    this.form = this.fb.group({
      vehicleType: [null, Validators.required],
      imageName: [''],
      imageContent: [''],
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

    this.vehicleService.create(this.form.value).subscribe(() => {
      this.toasterService.success('::Vehicle:CreateSuccess');
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
