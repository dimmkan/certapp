import {Component, OnInit, TemplateRef} from '@angular/core';
import {Edses, EdsService} from "../../services/eds.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-eds',
  templateUrl: './eds.component.html',
  styleUrls: ['./eds.component.scss']
})
export class EdsComponent implements OnInit {
  //@ts-ignore
  form: FormGroup
  currentPg: any
  edsFilter: any = {}
  edsSortToDate: boolean = false;
  edsSortAccountId: boolean = false;
  edsSortOrganization: boolean = false;
  edsSortFullName: boolean = false;

  constructor(
    public edsService: EdsService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      organization: new FormControl('', Validators.required),
      position: new FormControl(null),
      fullname: new FormControl('', Validators.required),
      accountId: new FormControl(null),
      inn: new FormControl('', Validators.required),
      certificateSerial: new FormControl(''),
      vendor: new FormControl('', Validators.required),
      usageType: new FormControl('', Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    })
  }


  addEds() {
    const formData = <Edses>{...this.form.value}
    this.edsService.http.post(`http://nodecertapi.vybor.local:3000/eds/add`, {
      organization: formData.organization,
      position: formData.position,
      fullname: formData.fullname,
      accountId: formData.accountId,
      inn: formData.inn,
      certificateSerial: formData.certificateSerial,
      vendor: formData.vendor,
      usageType: formData.usageType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      comment: formData.comment
    }).subscribe(
      () => {
        this.edsService.reloadEdses()
        this.form.reset()
      }
    )
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {backdropClass: 'light-dark-backdrop', size: 'xl'});
  }

  deleteFile($event: MouseEvent) {
    //@ts-ignore
    let id = $event.target.id.substr(2)
    this.edsService.http.delete(`http://nodecertapi.vybor.local:3000/eds/deletefile/${id}`)
      .subscribe(
        response => {
          this.edsService.reloadEdses()
        }
      )
  }

  onFileChanged($event: Event) {
    //@ts-ignore
    const selectedFile = $event.target.files[0]
    //@ts-ignore
    const id = $event.target.id.substr(1)
    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name)
    this.edsService.http.post(`http://nodecertapi.vybor.local:3000/eds/addfile/${id}`, uploadData)
      .subscribe(response => {
          this.edsService.reloadEdses()
        }
      );
  }
}
