import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Kktes, KktService} from "../../services/kkt.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-kkt-item',
  templateUrl: './kkt-item.component.html',
  styleUrls: ['./kkt-item.component.scss']
})
export class KktItemComponent implements OnInit {

  //@ts-ignore
  kkt: Kktes
  //@ts-ignore
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public kktService: KktService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      //@ts-ignore
      this.kkt = this.kktService.getById(+params.id)
    })

    this.form = new FormGroup({
      organization: new FormControl('', Validators.required),
      regNumber: new FormControl('', Validators.required),
      zavNumber: new FormControl('', Validators.required),
      kktModel: new FormControl('', Validators.required),
      regDate: new FormControl(new Date(), Validators.required),
      toDate: new FormControl(new Date(), Validators.required),
      ofd: new FormControl('', Validators.required),
      fnModel: new FormControl('', Validators.required),
      zavNumberFN: new FormControl('', Validators.required),
      comPortNumber: new FormControl('')
    })
  }

  deleteKkt() {
    this.route.params.subscribe((params: Params) => {
      this.kktService.http.delete(`http://nodecertapi.vybor.local:3000/kkt/delete/${params.id}`)
        .subscribe(
          () => {
            this.kktService.kktes = this.kktService.kktes.filter(p => p.id != +params.id)
            this.router.navigate(['/kkt'])
          }
        )
    })
  }

  updateKkt() {
    this.route.params.subscribe((params: Params) => {
      this.kktService.http.put(`http://nodecertapi.vybor.local:3000/kkt/update/${params.id}`, {
        organization: this.kkt.organization,
        regNumber: this.kkt.regNumber,
        zavNumber: this.kkt.zavNumber,
        kktModel: this.kkt.kktModel,
        regDate: this.kkt.regDate,
        toDate: this.kkt.toDate,
        ofd: this.kkt.ofd,
        fnModel: this.kkt.fnModel,
        zavNumberFN: this.kkt.zavNumberFN,
        comPortNumber: this.kkt.comPortNumber
      }).subscribe(
        () => {
          this.router.navigate(['/kkt'])
        }
      )
    })
  }

}
