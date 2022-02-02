import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Kktes, KktService} from "../../services/kkt.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-kkt',
  templateUrl: './kkt.component.html',
  styleUrls: ['./kkt.component.scss']
})
export class KktComponent implements OnInit {

  //@ts-ignore
  form: FormGroup
  currentPg: any;
  kktFilter: any = {};
  kktSortToDate = false;
  kktSortToDateOF: boolean = false;

  constructor(
    public kktService: KktService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      organization: new FormControl('', Validators.required),
      regNumber: new FormControl('', Validators.required),
      zavNumber: new FormControl('', Validators.required),
      kktModel: new FormControl('', Validators.required),
      regDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      toDateOF: new FormControl(null, Validators.required),
      ofd: new FormControl('', Validators.required),
      fnModel: new FormControl('', Validators.required),
      zavNumberFN: new FormControl('', Validators.required),
      comPortNumber: new FormControl(''),
    })
  }

  addKkt(){
    const formData = <Kktes>{...this.form.value}
    this.kktService.http.post(`http://nodecertapi.vybor.local:3000/kkt/add`, {
      organization: formData.organization,
      regNumber: formData.regNumber,
      zavNumber: formData.zavNumber,
      kktModel: formData.kktModel,
      regDate: formData.regDate,
      toDate: formData.toDate,
      toDateOF: formData.toDateOF,
      ofd: formData.ofd,
      fnModel: formData.fnModel,
      zavNumberFN: formData.zavNumberFN,
      comPortNumber: formData.comPortNumber
    }).subscribe(
      () => {
        this.kktService.reloadKktes()
        this.form.reset()
      }
    )
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {backdropClass: 'light-dark-backdrop', size: 'xl'});
  }
}
