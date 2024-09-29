import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formdata:FormGroup;
  id:number=1;
  AllRecords:any[]=[];
  PrevRecords:any;
  paramID:any;
  paramType:any;
  editsRecord:any;
  private subscription:Subscription=new Subscription();

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private routeNav:Router){
    this.formdata=this.fb.group({
      id:[],
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.subscription=this.route.params.subscribe(params => {
      this.paramID = params['id'];
      this.paramType=params['type']
      console.log('Item ID:', this.paramID,'Item Type:', this.paramType);
    });

    if(this.paramType=='edit'){
      this.AllRecords=localStorage.getItem('AllRecords')?JSON.parse(localStorage.getItem('AllRecords')!):[];
      this.editsRecord=this.AllRecords.find(r=>r.id==this.paramID);
      this.formdata.patchValue(this.editsRecord);
    }else if(this.paramType=='view'){
      this.AllRecords=localStorage.getItem('AllRecords')?JSON.parse(localStorage.getItem('AllRecords')!):[];
      this.editsRecord=this.AllRecords.find(r=>r.id==this.paramID);
      this.formdata.patchValue(this.editsRecord);
    }

  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  gotoTable(){
    this.routeNav.navigate([''])
  }

  onSubmit(){

    if(this.formdata.invalid){
      alert("Please Fill the Required Fields!")
    }
    else{
    if(this.paramType=='add'){
      this.addNew();
    }
    else if(this.paramType=='edit'){
      this.editRecord();  
    }else if(this.paramType=='view'){
      this.viewRecord();
    }

    }
  }
  addNew(){
    if(this.AllRecords.length==0){
      this.PrevRecords=localStorage.getItem('AllRecords');
    this.PrevRecords=this.PrevRecords?JSON.parse(this.PrevRecords):[];
    if(this.PrevRecords.length>=1){
    this.PrevRecords.forEach((element:any) => {
      this.AllRecords.push(element);
    });
  }
    }
    // this.AllRecords.length==0?this.id=1:this.id=this.AllRecords.length+1
    this.id=this.AllRecords.length+1;
    this.formdata.value.id=this.id;
    this.AllRecords.push(this.formdata.value);
    localStorage.setItem('AllRecords',JSON.stringify(this.AllRecords));
    console.warn(this.AllRecords)
    this.formdata.reset();
  }

  editRecord(){
    // this.PrevRecords=localStorage.getItem('AllRecords');
    // this.PrevRecords=this.PrevRecords?JSON.parse(this.PrevRecords):[];

    this.AllRecords.forEach((r:any,index:number) => {
      if(r.id==this.paramID){
        this.formdata.value.id=Number(this.paramID);
        this.AllRecords[index]=this.formdata.value;
      }
    });

    console.log('Updated Records',this.AllRecords)
    localStorage.setItem('AllRecords',JSON.stringify(this.AllRecords));
    this.routeNav.navigate([''])

  }

  viewRecord(){
    this.routeNav.navigate([''])
  }

}
