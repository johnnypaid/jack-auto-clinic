import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductionService } from '../service/production.service';
import { PromptMessageService } from '../service/prompt-message.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  showErr = false;
  error = '';
  passport: any;

  productionForm = this.formBuilder.group({
    conDate: ['', Validators.required],
    chassisNum: ['', Validators.required],
    painting: ['', Validators.required],
    paint_started: ['', Validators.required],
    paint_stat: ['', Validators.required],
    mechanical: ['', Validators.required],
    mec_started: ['', Validators.required],
    mec_stat: ['', Validators.required],
    electrical: ['', Validators.required],
    elec_started: ['', Validators.required],
    elec_stat: ['', Validators.required],
    upholstery: ['', Validators.required],
    up_started: ['', Validators.required],
    up_stat: ['', Validators.required],
    trimmer: ['', Validators.required],
    trim_started: ['', Validators.required],
    trim_stat: ['', Validators.required],
    dashboard: ['', Validators.required],
    dash_started: ['', Validators.required],
    dash_stat: ['', Validators.required],
    detailing: ['', Validators.required],
    det_started: ['', Validators.required],
    det_stat: ['', Validators.required],
    qc: ['', Validators.required],
    qc_started: ['', Validators.required],
    qc_stat: ['', Validators.required],
    sold_to: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductionService,
    private message: PromptMessageService) { }

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
  }

  onSubmit() {
    console.log(this.productionForm.value);

    if (this.productionForm.value.chassisNum === '') {
      this.error = 'Please enter chassis number.';
      this.showErr = true;
    } else {
      this.showErr = false;
      let con_date, paint_date, mec_date, elec_date, up_date, trim_date, dash_date, det_date, qc_date = '';
      try {
        if (this.productionForm.value.conDate.year !== undefined) {
          let newCondate = this.productionForm.value.conDate;
          let conDay, conMonth = '';
          if (newCondate.month < 10 ) {
            conMonth = '0' + newCondate.month;
          };
          if (newCondate.day < 10 ) {
            conDay = '0' + newCondate.day;
          };
          con_date = newCondate.year + '-' + conDay + '-' + conDay;
          this.productionForm.value.conDate = con_date;
        } else {
          this.productionForm.value.conDate = '';
        }
        if (this.productionForm.value.paint_started.year !== undefined) {
          let newPaintdate = this.productionForm.value.paint_started;
          let paintMonth, paintDay = '';
          if (newPaintdate.month < 10 ) {
            paintMonth = '0' + newPaintdate.month;
          };
          if (newPaintdate.day < 10 ) {
            paintDay = '0' + newPaintdate.day;
          };
          paint_date = newPaintdate.year + '-' + paintMonth + '-' + paintDay;
          this.productionForm.value.paint_started = paint_date;
        } else {
          this.productionForm.value.paint_started = '';
        }
        if (this.productionForm.value.mec_started.year !== undefined) {
          let newMecdate = this.productionForm.value.mec_started;
          let mecMonth, mecDay = '';
          if (newMecdate.month < 10 ) {
            mecMonth = '0' + newMecdate.month;
          };
          if (newMecdate.day < 10 ) {
            mecDay = '0' + newMecdate.day;
          };
          mec_date = newMecdate.year + '-' + mecMonth + '-' + mecDay;
          this.productionForm.value.mec_started = mec_date;
        } else {
          this.productionForm.value.mec_started = '';
        }
        if (this.productionForm.value.elec_started.year !== undefined) {
          let newElectdate = this.productionForm.value.elec_started;
          let electMonth, electDay = '';
          if (newElectdate.month < 10 ) {
            electMonth = '0' + newElectdate.month;
          };
          if (newElectdate.day < 10 ) {
            electDay = '0' + newElectdate.day;
          };
          elec_date = newElectdate.year + '-' + electMonth + '-' + electDay;
          this.productionForm.value.elec_started = elec_date;
        } else {
          this.productionForm.value.elec_started = '';
        }
        if (this.productionForm.value.up_started.year !== undefined) {
          let newUpdate = this.productionForm.value.up_started;
          let upMonth, upDay = '';
          if (newUpdate.month < 10 ) {
            upMonth = '0' + newUpdate.month;
          };
          if (newUpdate.day < 10 ) {
            upDay = '0' + newUpdate.day;
          };
          up_date = newUpdate.year + '-' + upMonth + '-' + upDay;
          this.productionForm.value.up_started = up_date;
        } else {
          this.productionForm.value.up_started = '';
        }
        if (this.productionForm.value.trim_started.year !== undefined) {
          let newTrimdate = this.productionForm.value.trim_started;
          let trimMonth, trimDay = '';
          if (newTrimdate.month < 10 ) {
            trimMonth = '0' + newTrimdate.month;
          };
          if (newTrimdate.day < 10 ) {
            trimDay = '0' + newTrimdate.day;
          };
          trim_date = newTrimdate.year + '-' + trimMonth + '-' + trimDay;
          this.productionForm.value.trim_started = trim_date;
        } else {
          this.productionForm.value.trim_started = '';
        }
        if (this.productionForm.value.dash_started.year !== undefined) {
          let newDashdate = this.productionForm.value.dash_started;
          let dashMonth, dashDay = '';
          if (newDashdate.month < 10 ) {
            dashMonth = '0' + newDashdate.month;
          };
          if (newDashdate.day < 10 ) {
            dashDay = '0' + newDashdate.day;
          };
          dash_date = newDashdate.year + '-' + dashMonth + '-' + dashDay;
          this.productionForm.value.dash_started = dash_date;
        } else {
          this.productionForm.value.dash_started = '';
        }
        if (this.productionForm.value.det_started.year !== undefined) {
          let newDetdate = this.productionForm.value.det_started;
          let detMonth, detDay = '';
          if (newDetdate.month < 10 ) {
            detMonth = '0' + newDetdate.month;
          };
          if (newDetdate.day < 10 ) {
            detDay = '0' + newDetdate.day;
          };
          det_date = newDetdate.year + '-' + detMonth + '-' + detDay;
          this.productionForm.value.det_started = det_date;
        } else {
          this.productionForm.value.det_started = '';
        }
        if (this.productionForm.value.qc_started.year !== undefined) {
          let newQcdate = this.productionForm.value.qc_started;
          let qcMonth, qcDay = '';
          if (newQcdate.month < 10 ) {
            qcMonth = '0' + newQcdate.month;
          };
          if (newQcdate.day < 10 ) {
            qcDay = '0' + newQcdate.day;
          };
          qc_date = newQcdate.year + '-' + qcMonth + '-' + qcDay;
          this.productionForm.value.qc_started = qc_date;
        } else {
          this.productionForm.value.qc_started = '';
        }

        console.log(this.productionForm.value);
        this.prodService.newProduction(this.productionForm.value, this.passport)
          .subscribe(resdata => {
            console.log(resdata);
          }, error => {
            console.log(error.error);
          });
      } catch (error) {

      }

    }
  }

}
