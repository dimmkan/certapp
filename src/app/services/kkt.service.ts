import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Edses} from "./eds.service";

export interface Kktes {
  id: number,
  organization: string,
  regNumber: string,
  zavNumber: string,
  kktModel: string,
  regDate: Date,
  toDate: Date,
  toDateOF: Date,
  ofd: string,
  fnModel: string,
  zavNumberFN: string,
  comPortNumber: string
}

@Injectable({providedIn:'root'})
export class KktService {

  kktes: Kktes[] = []
  constructor(
    public http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.reloadKktes()
  }

  reloadKktes() {
    this.http.get<Kktes[]>('http://certapi.vybor.local/kkt')
      .subscribe(response =>{
        this.kktes = response
      })
  }

  getById(id: number): Kktes|undefined {
    return this.kktes.find(
      p => p.id == id
    )
  }

  sortKkt(fieldName: string, sortable: boolean) {
    //@ts-ignore
    this.kktes.sort((prev, next) => {
      //@ts-ignore
      if (!sortable){
        //@ts-ignore
        if(prev[fieldName] < next[fieldName]) return -1
        //@ts-ignore
        if(prev[fieldName] > next[fieldName]) return 1
      }else{
        //@ts-ignore
        if(prev[fieldName] < next[fieldName]) return 1
        //@ts-ignore
        if(prev[fieldName] > next[fieldName]) return -1
      }
    })
  }
}
