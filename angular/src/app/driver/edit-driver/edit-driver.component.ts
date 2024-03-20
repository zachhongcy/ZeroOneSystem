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
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  image: File;
  statuses = statusOptions;
  imageUrl: string | ArrayBuffer | null = null;

  private buildForm(driver: DriverDto): void {
    this.form = this.fb.group({
      driverNo: [driver.driverNo, Validators.required],
      imageName: [''],
      imageContent: [''],
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
        tap(driver => {
          this.buildForm(driver);
          this.setImageUrl(driver.id);
        })
      )
      .subscribe();
  }

  private setImageUrl(id: string): void {
    this.driverService.getImageContent(id).subscribe((imageContent) => {
      this.imageUrl = 'data:image/png;base64,' + imageContent;
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.driverService.update(this.id, this.form.value).subscribe(() => {
      this.toasterService.success('::Driver:EditSuccess');
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
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.form.get('imageName').setValue(image.name);
      const imageUrlString = reader.result as string;
      this.form.get('imageContent').setValue(imageUrlString.split(',')[1]);
    }
  }
}
