import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  id:number=0;
  type:string="add";
  records:any[]=[];
  setAllRecords:any[]=[]
  PrevRecord:any;
  localData:any[]=[];
  constructor() { }

  getLocalData(){
    this.records=localStorage.getItem('AllRecords')?JSON.parse(localStorage.getItem('AllRecords')!):[];
    return this.records;
  }
  setLocalData(obj:any){
    this.setAllRecords=this.getLocalData();

    this.setAllRecords.splice(0,0,obj);

    localStorage.setItem("AllRecords",JSON.stringify(this.setAllRecords));

  }
  setIdType(id:number,type:string){
    this.id=id;
    this.type=type;
  }
  getIdType():any{
    return {id:this.id,type:this.type};
  }
  findobj:any;
  getObjbyId(id:number):any{
    this.localData=this.getLocalData();
    this.localData.forEach((r:any,index:number) => {
      if(r.id==id){
        this.findobj=this.localData[index];
      }
    });
    return this.findobj;
  }
  delObjbyId(id:number){
    this.localData=this.getLocalData();
    this.localData.forEach((r:any,index:number) => {
      if(r.id==id){
        this.localData.splice(index,1)
      }
    });

    localStorage.setItem('AllRecords',JSON.stringify(this.localData))
  }
  updateObjbyId(obj:any){
    this.localData=this.getLocalData();
    this.localData.forEach((r:any,index:number) => {
      if(r.id==obj.id){
        this.localData[index]=obj;
      }
    });
    localStorage.setItem('AllRecords',JSON.stringify(this.localData))
  }
}
