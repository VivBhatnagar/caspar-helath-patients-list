import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient.modal';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'csp-pateint-details',
  templateUrl: './pateint-details.component.html',
  styleUrls: ['./pateint-details.component.scss'],
})
export class PateintDetailsComponent {
  public isDeleteModalOpen = false;
  public isLoadingData = true;
  public patientData: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.patientsService.initialPatients.length === 0) {
      this.patientsService.getPatientsList().subscribe((res) => {
        this.patientsService.initialPatients = res.map((patient: any) =>
          Patient.fromJson(patient)
        );
        this.getPateintById();
      });
    } else {
      this.getPateintById();
    }
  }

  private getPateintById(): void {
    this.activatedRoute?.queryParams?.subscribe((queryParams) => {
      this.patientData = this.patientsService.getPatientById(queryParams['id']);
      this.isLoadingData = false;
    });
  }

  /**
   * openDeleteModal
   */
  public openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }

  /**
   * onCloseClick
   */
  public onCloseClick(): void {
    this.isDeleteModalOpen = false;
  }

  /**
   * handleDelete this handler will delete the patient from database
   */
  public handleDelete(id: string): void {
    this.patientsService.initialPatients =
      this.patientsService.initialPatients.filter((item) => item.id !== id);
    this.isDeleteModalOpen = false;
    this.router.navigate(['/home']);
  }
}
