import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-edit-parts',
  templateUrl: './add-edit-parts.component.html',
  styleUrls: ['./add-edit-parts.component.css']
})
export class AddEditPartsComponent implements OnInit {

  constructor(private service: ApiService) {}


  @Input() part:any;
  id!: number;
  name!: string;
  brand!: string;
  code!:string;
  category!:string;
  tableName!:string;
  unitPrice!:number;

  ngOnInit(): void{
    console.log(this.part);
    this.id = this.part.id;
    this.name = this.part.name;
    this.brand = this.part.brand;
    this.code = this.part.code;
    this.category = this.part.category;
    this.tableName = this.part.tableName;
    this.unitPrice = this.part.unitPrice;
  }

  addParts() {
    var val = {
      tableName:this.tableName,
      name:this.name,
      code:this.code, 
      brand:this.brand,
      unitPrice: +this.unitPrice,
    };
    console.log(val);
    this.service.addParts(val).subscribe(res=>{
      alert("The part has been Created.");
    });
  }

  updateParts() {
    var val = { 
      id: this.id,
      tableName:this.category,
      name:this.name,
      code:this.code, 
      brand:this.brand,
      unitPrice: +this.unitPrice,
    };
    console.log(val);
    this.service.updateParts(val).subscribe(res=>{
      alert("The part has been Updated.");
        });
  }
}