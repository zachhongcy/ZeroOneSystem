import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DriverLookupDto } from '@proxy/drivers/dto';
import { siteDetailOptions, tripPriorityOptions, tripStatusOptions, tripTypeOptions } from '@proxy/enums/trips';
import { TripService } from '@proxy/trips';
import { TripDto } from '@proxy/trips/dto';
import { VehicleLookupDto } from '@proxy/vehicles/dto';
import { Observable, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class EditTripComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly tripService = inject(TripService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  tripTypes = tripTypeOptions;
  tripStatuses = tripStatusOptions;
  tripPriorities = tripPriorityOptions;
  siteDetails = siteDetailOptions;
  drivers$: Observable<DriverLookupDto[]>;
  vehicles$: Observable<VehicleLookupDto[]>;

  private buildForm(trip: TripDto): void {
    this.form = this.fb.group({
      tripNo: [trip.tripNo, Validators.required],
      tripType: [trip.tripType, Validators.required],
      tripDate: [new Date(trip.tripDate), Validators.required],
      tripStatus: [trip.tripStatus, Validators.required],
      customerName: [trip.customerName, Validators.required],
      referDocNo: [trip.referDocNo, Validators.required],
      priority: [trip.priority, Validators.required],
      remark: [trip.remark],
      siteName: [trip.siteName, Validators.required],
      siteAddress: [trip.siteAddress, Validators.required],
      contactPerson: [trip.contactPerson, Validators.required],
      contactNo: [trip.contactNo, Validators.required],
      driverId: [trip.driverId, Validators.required],
      vehicleId: [trip.vehicleId, Validators.required],
    });
  }

  constructor() {
    this.drivers$ = this.tripService.getDriverLookup().pipe(map((r) => r.items));
    this.vehicles$ = this.tripService.getVehicleLookup().pipe(map((r) => r.items));
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.tripService.get(id)),
        tap(driver => this.buildForm(driver))
      )
      .subscribe();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.tripService.update(this.id, this.form.value).subscribe(() => {
      this.toasterService.success('::Trip:EditSuccess');
      this.router.navigate(['/trips']);
    })
  }
}
