import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DriverLookupDto } from '@proxy/drivers/dto';
import { siteDetailOptions, tripPriorityOptions, tripStatusOptions, tripTypeOptions } from '@proxy/enums/trips';
import { TripService } from '@proxy/trips';
import { VehicleLookupDto } from '@proxy/vehicles/dto';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrl: './create-trip.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class CreateTripComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly tripService = inject(TripService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  tripTypes = tripTypeOptions;
  tripStatuses = tripStatusOptions;
  tripPriorities = tripPriorityOptions;
  siteDetails = siteDetailOptions;
  drivers$: Observable<DriverLookupDto[]>;
  vehicles$: Observable<VehicleLookupDto[]>;
  tripNo: string;

  private buildForm(): void {
    this.form = this.fb.group({
      tripNo: [this.tripNo],
      tripType: [null, Validators.required],
      tripDate: [null, Validators.required],
      tripStatus: [null, Validators.required],
      customerName: ['', Validators.required],
      referDocNo: ['', Validators.required],
      priority: [null, Validators.required],
      remark: [''],
      siteName: ['', Validators.required],
      siteDetail: [null, Validators.required],
      siteAddress: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNo: ['', Validators.required],
      driverId: [null, Validators.required],
      vehicleId: [null, Validators.required],
    });
  }

  constructor() {
    this.drivers$ = this.tripService.getDriverLookup().pipe(map((r) => r.items));
    this.vehicles$ = this.tripService.getVehicleLookup().pipe(map((r) => r.items));
    this.buildForm();
  }

  ngOnInit(): void {
    this.generateTripNo();
    this.watchTripTypeChanges();
  }

  watchTripTypeChanges() {
    this.form.get('tripType').valueChanges.subscribe((selectedValue) => {
      const prefix = selectedValue === 0 ? 'D' : 'C';

      this.form.get('tripNo').setValue(prefix + this.tripNo);
    });
  }

  generateTripNo(): void {
    this.tripService.generateTripNumber().subscribe((tripNo) => {
      this.tripNo = tripNo;
    });
  }

  save(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.tripService.create(this.form.value).subscribe(() => {
      this.toasterService.success('::Trip:CreateSuccess');
      this.router.navigate(['/trips']);
    })
  }
}
