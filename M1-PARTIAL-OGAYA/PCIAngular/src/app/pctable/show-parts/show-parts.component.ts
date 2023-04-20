import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-parts',
  templateUrl: './show-parts.component.html',
  styleUrls: ['./show-parts.component.css']
})
export class ShowPartsComponent implements OnInit {

  constructor(private service: ApiService) {}

  PartsList:any=[];
  //newly added code
  AddEditModalTitle: string= " ";
  ActivateAddEditPartsComponent: boolean = false;
  ActivateBuildPartsComponent: boolean = false;
  BuildModalTitle: String = "";
  //
  part:any;
  ngOnInit(): void {
    this.refreshPartsList();
  }

  addClick() {
    this.part={
      id:0,
      tableName: "",
      name: "",
      code: "",
      brand:"",
      unitPrice:0
    }

    this.AddEditModalTitle="Add PC Parts";
    this.ActivateAddEditPartsComponent=true;
  }

  closeClick() {
    this.ActivateAddEditPartsComponent=false;
    this.refreshPartsList();
  }

  editClick(item:any) {
    this.part=item;
    this.AddEditModalTitle="Edit PC Parts";
    this.ActivateAddEditPartsComponent=true;
  }
  
  deleteClick(item: any) {
    console.log("deleteClick() called with item:", item);
    const data = {
      tableName: item.category,
      id: item.id
    };
    console.log("data to be sent:", data);
    if (confirm('Confirm to Delete?')) {
      this.service.deleteParts(data).subscribe(
        (response) => {
          console.log("deleteParts() returned response:", response);
          alert("The part has been deleted.");
          this.refreshPartsList();
        },
        (error) => {
          console.log("deleteParts() returned error:", error);
          alert("Failed to delete the part. Please try again later.");
        }
      );
    }
  }
  
  //newly added code
  buildClick() {
    this.part={
      tableName: "",
      name: "",
    unitPrice:0}
    this.BuildModalTitle="PC Build Price";
    this.ActivateBuildPartsComponent=true;
  }
  //

  refreshPartsList() {
    this.service.getPartsList().subscribe(data=>{
      this.PartsList = data;
    })
  } 
}