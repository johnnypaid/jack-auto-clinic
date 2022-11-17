import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewEntryService } from '../service/new-entry.service';
import { ProductionService } from '../service/production.service';
import { PromptMessageService } from '../service/prompt-message.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit, OnDestroy {
  showErr = false;
  error = '';
  passport: any;
  chasNum: string[] = [];
  chasData: any = [];

  productionForm = this.formBuilder.group({
    conversion: [''],
    conDate: [''],
    con_stat: [''],
    chassisNum: [''],
    containerNum: [''],
    painting: [''],
    paint_started: [''],
    paint_stat: [''],
    mechanical: [''],
    mec_started: [''],
    mec_stat: [''],
    electrical: [''],
    elec_started: [''],
    elec_stat: [''],
    upholstery: [''],
    up_started: [''],
    up_stat: [''],
    trimmer: [''],
    trim_started: [''],
    trim_stat: [''],
    dashboard: [''],
    dash_started: [''],
    dash_stat: [''],
    detailing: [''],
    det_started: [''],
    det_stat: [''],
    qc: [''],
    qc_started: [''],
    qc_stat: [''],
    sold_to: [''],
    remarks: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductionService,
    private message: PromptMessageService,
    private chasisService: NewEntryService
  ) {}

  ngOnInit(): void {
    this.passport = localStorage.getItem('token');
    console.log(localStorage.getItem('current'));
    this.getAllChasis();
  }

  onSubmit() {
    console.log(this.productionForm.value);
    console.log(this.productionForm.valid);


    if (this.productionForm.value.chassisNum === '') {
      this.error = 'Please enter chassis number.';
      this.showErr = true;
    } else {
      this.showErr = false;

      const index = this.chasData.findIndex((el: any) => {
        return el.chassisNum === this.productionForm.value.chassisNum;
      });

      console.log(index)

      if (index === -1) {
        this.error = 'Container number is required';
        this.showErr = true;
      } else {
        this.showErr = false;
        this.productionForm.value.containerNum = this.chasData[index].containerNum;
      }


      try {
        if (this.productionForm.value.conDate !== '') {
          let newCondate = this.productionForm.value.conDate;
          let conDay,
            conMonth = '';

          newCondate.month < 10
            ? (conMonth = '0' + newCondate.month)
            : (conMonth = newCondate.month);
          newCondate.day < 10
            ? (conDay = '0' + newCondate.day)
            : (conDay = newCondate.day);

          this.productionForm.value.conDate = `${newCondate.year}-${conMonth}-${conDay}`;
        }

        if (this.productionForm.value.paint_started !== '') {
          let newPaintdate = this.productionForm.value.paint_started;
          let paintMonth,
            paintDay = '';

          newPaintdate.month < 10
            ? (paintMonth = '0' + newPaintdate.month)
            : (paintMonth = newPaintdate.month);
          newPaintdate.day < 10
            ? (paintDay = '0' + newPaintdate.day)
            : (paintDay = newPaintdate.day);

          this.productionForm.value.paint_started = `${newPaintdate.year}-${paintMonth}-${paintDay}`;
        }

        if (this.productionForm.value.mec_started !== '') {
          let newMecdate = this.productionForm.value.mec_started;
          let mecMonth,
            mecDay = '';

          newMecdate.month < 10
            ? (mecMonth = '0' + newMecdate.month)
            : (mecMonth = newMecdate.month);
          newMecdate.day < 10
            ? (mecDay = '0' + newMecdate.day)
            : (mecDay = newMecdate.day);

          this.productionForm.value.mec_started = `${newMecdate.year}-${mecMonth}-${mecDay}`;
        }

        if (this.productionForm.value.elec_started !== '') {
          let newElectdate = this.productionForm.value.elec_started;
          let electMonth,
            electDay = '';

          newElectdate.month < 10
            ? (electMonth = '0' + newElectdate.month)
            : (electMonth = newElectdate.month);
          newElectdate.day < 10
            ? (electDay = '0' + newElectdate.day)
            : (electDay = newElectdate.day);

          this.productionForm.value.elec_started = `${newElectdate.year}-${electMonth}-${electDay}`;
        }

        if (this.productionForm.value.up_started !== '') {
          let newUpdate = this.productionForm.value.up_started;
          let upMonth,
            upDay = '';

          newUpdate.month < 10
            ? (upMonth = '0' + newUpdate.month)
            : (upMonth = newUpdate.month);
          newUpdate.day < 10
            ? (upDay = '0' + newUpdate.day)
            : (upDay = newUpdate.day);

          this.productionForm.value.up_started = `${newUpdate.year}-${upMonth}-${upDay}`;
        }

        if (this.productionForm.value.trim_started !== '') {
          let newTrimdate = this.productionForm.value.trim_started;
          let trimMonth,
            trimDay = '';

          newTrimdate.month < 10
            ? (trimMonth = '0' + newTrimdate.month)
            : (trimMonth = newTrimdate.month);
          newTrimdate.day < 10
            ? (trimDay = '0' + newTrimdate.day)
            : (trimDay = newTrimdate.day);

          this.productionForm.value.trim_started = `${newTrimdate.year}-${trimMonth}-${trimDay}`;
        }

        if (this.productionForm.value.dash_started.year != undefined) {
          let newDashdate = this.productionForm.value.dash_started;
          let dashMonth,
            dashDay = '';

          newDashdate.month < 10
            ? (dashMonth = '0' + newDashdate.month)
            : (dashMonth = newDashdate.month);
          newDashdate.day < 10
            ? (dashDay = '0' + newDashdate.day)
            : (dashDay = newDashdate.day);

          this.productionForm.value.dash_started = `${newDashdate.year}-${dashMonth}-${dashDay}`;
        }

        if (this.productionForm.value.det_started !== '') {
          let newDetdate = this.productionForm.value.det_started;
          let detMonth,
            detDay = '';

          newDetdate.month < 10
            ? (detMonth = '0' + newDetdate.month)
            : (detMonth = newDetdate.month);
          newDetdate.day < 10
            ? (detDay = '0' + newDetdate.day)
            : (detDay = newDetdate.day);

          this.productionForm.value.det_started = `${newDetdate.year}-${detMonth}-${detDay}`;
        }

        if (this.productionForm.value.qc_started !== '') {
          let newQcdate = this.productionForm.value.qc_started;
          let qcMonth,
            qcDay = '';

          newQcdate.month < 10
            ? (qcMonth = '0' + newQcdate.month)
            : (qcMonth = newQcdate.month);
          newQcdate.day < 10
            ? (qcDay = '0' + newQcdate.day)
            : (qcDay = newQcdate.day);

          this.productionForm.value.qc_started = `${newQcdate.year}-${qcMonth}-${qcDay}`;
        }

        this.prodService
          .newProduction(this.productionForm.value, this.passport)
          .subscribe(
            (resdata) => {
              console.log(resdata);
              if (resdata.status === 200) {
                this.message.setMessage('Succesfully added');
                this.productionForm.reset();
                this.error = '';
                this.showErr = false;
                this.resetProductionForm();
              }
            },
            (error) => {
              console.log(error.error);
              this.error = error.error;
              this.showErr = true;
            }
          );
      } catch (error) {}
    }
  }

  getAllChasis() {
    this.chasisService.getAllEntry(this.passport).subscribe((res) => {
      this.chasData = res.body;
      console.log(this.chasData)
      for (let i = 0; i < this.chasData.length; i++) {
        this.chasNum.push(this.chasData[i].chassisNum);
      }
    });
  }

  resetProductionForm() {
    this.productionForm.reset({
      conversion: '',
      conDate: '',
      con_stat: '',
      chassisNum: '',
      painting: '',
      paint_started: '',
      paint_stat: '',
      mechanical: '',
      mec_started: '',
      mec_stat: '',
      electrical: '',
      elec_started: '',
      elec_stat: '',
      upholstery: '',
      up_started: '',
      up_stat: '',
      trimmer: '',
      trim_started: '',
      trim_stat: '',
      dashboard: '',
      dash_started: '',
      dash_stat: '',
      detailing: '',
      det_started: '',
      det_stat: '',
      qc: '',
      qc_started: '',
      qc_stat: '',
      sold_to: '',
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('current');
  }
}
