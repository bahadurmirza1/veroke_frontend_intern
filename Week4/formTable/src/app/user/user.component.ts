import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from '../custom-table/custom-table.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserFormComponent, CommonModule, CustomTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  formRecords: any[] = [];
  type: any = 'add';
  findobj: any[] = [];
  actions: any = [
    {key :'view', label:"View"},
    {key :'edit', label:"Edit"},
    {key :'delete', label:"Delete"}

  ];
  cols: any[] = [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'address', label: 'Address' }, { key: 'education', label: 'Education' }, { key: 'actions', label: 'Actions' }];

  updateEntryById = (id: number, newData: Partial<{ name: string; email: string; phone: string; address: string; education: string }>) => {

  this.formRecords.forEach(group => {
      if (group.id === id) {
        // Object.assign(group[0], newData);
        // return;
        group = newData;
        group.id = id;
        return;
      }
    });


    console.log('update form', id, newData)
  };

  onUserFormHandler(data: any) {

    if (data.type == 'add') {
      this.formRecords.push(data.element);
      console.log("Form Data", this.formRecords);

    } else if (data.type == 'view') {

    } else if (data.type == 'edit') {
      
      
      this.formRecords.forEach((group,index:number) => {
        if (group.id == data.element.id) {
          this.formRecords[index] = data.element;
          // group=data.element;
          
        }
      });
 
      console.log('pppppppp',this.formRecords)

      // this.updateEntryById(data.element.id, data.element);
      //this.formRecords.map(r=>r.id===data[1].id ? {...r,...data[0]}:r);
    }
  }
  onUserTableHandler(data: any) {
    this.type = data.type
    this.findobj = this.formRecords.find(r => r.id == data.id);

    console.log(this.findobj);
  }

  // id_MatchHandler() {
  //   this.findobj = this.formRecords.find(r => r.id == this.id_type.id)
  //   console.log(this.findobj);
  // }
}
