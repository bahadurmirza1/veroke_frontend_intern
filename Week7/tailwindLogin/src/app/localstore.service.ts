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
    this.records=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[];
    return this.records;
  }
  setLocalData(obj:any){
    this.setAllRecords=this.getLocalData();

    this.setAllRecords.push(obj);

    localStorage.setItem("token",JSON.stringify(this.setAllRecords));

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

    localStorage.setItem('token',JSON.stringify(this.localData))
  }
  updateObjbyId(obj:any){
    this.localData=this.getLocalData();
    this.localData.forEach((r:any,index:number) => {
      if(r.id==obj.id){
        this.localData[index]=obj;
      }
    });
    localStorage.setItem('token',JSON.stringify(this.localData))
  }
}
