import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

export interface Edses {
  id: number,
  organization: string,
  position: string,
  fullname: string,
  inn: string,
  certificateSerial: string,
  vendor: string,
  usageType: string,
  fromDate: Date,
  toDate: Date,
  comment: string,
  fileName: string
}

@Injectable({providedIn: 'root'})
export class EdsService{

  edses: Edses[] = []
  constructor(
    public http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.reloadEdses()
  }

  reloadEdses(){
    this.http.get<Edses[]>('http://certapi.vybor.local/eds')
      .subscribe(response =>{
        this.edses = response
      })
  }

  getById(id: number): Edses|undefined {
    return this.edses.find(
      p => p.id == id
    )
  }

  sortEds(fieldName: string, sortable: boolean) {
    //@ts-ignore
    this.edses.sort((prev, next) => {
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
