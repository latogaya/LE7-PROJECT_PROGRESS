import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-build-parts',
  templateUrl: './build-parts.component.html',
  styleUrls: ['./build-parts.component.css']
})
export class BuildPartsComponent implements OnInit {

  PartsList: any;
  unitPrice!: number;
  caseCurrentPrice!: number;
  gpuCurrentPrice!: number;
  cpuCurrentPrice!: number;
  fansCurrentPrice!: number;
  moboCurrentPrice!: number;
  ssdCurrentPrice!: number;
  ramCurrentPrice!: number;
  psuCurrentPrice!: number;
  totalPrice: string = "";

  showPrice() {
    this.totalPrice = this.getTotalPrice();
  }
  constructor(private service: ApiService) { }
  
  caseList: any = [];
  gpuList: any = [];
  cpuList: any = [];
  fansList: any = [];
  moboList: any = [];
  ssdList: any = [];
  ramList: any = [];
  psuList: any = [];
  part:any;

  ngOnInit(): void {
    this.casePartsList();
    this.cpuPartsList();
    this.gpuPartsList();
    this.fansPartsList();
    this.moboPartsList();
    this.ssdPartsList();
    this.ramPartsList();
    this.psuPartsList();
    this.refreshPartsList();
  }

  casePartsList() {
    this.service.getPartsList().subscribe(data => {
      this.caseList = data.filter(part => part.category === 'CASES');
    });
  }

  gpuPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.gpuList = data.filter(part => part.category === 'GPU');
    });
  }

  cpuPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.cpuList = data.filter(part => part.category === 'CPU');
    });
  }

  fansPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.fansList = data.filter(part => part.category === 'FANS');
    });
  }

  moboPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.moboList = data.filter(part => part.category === 'MOBO');
    });
  }

  ramPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.ramList = data.filter(part => part.category === 'RAM');
    });
  }

  ssdPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.ssdList = data.filter(part => part.category === 'SSD');
    });
  }

  psuPartsList() {
    this.service.getPartsList().subscribe(data => {
      this.psuList = data.filter(part => part.category === 'PSU');
    });
  }

  refreshPartsList() {
    this.service.getPartsList().subscribe(data=>{
      this.PartsList = data;
    })
  }

  caseUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.caseList.length) {
      const selectedCase = this.caseList[index];
      this.caseCurrentPrice = selectedCase.unitPrice;
    }
  }

  gpuUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.gpuList.length) {
      const selectedGpu = this.gpuList[index];
      this.gpuCurrentPrice = selectedGpu.unitPrice;
      console.log( this.gpuCurrentPrice);
    }
  }

  moboUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.moboList.length) {
      const selectedmobo = this.moboList[index];
      this.moboCurrentPrice = selectedmobo.unitPrice;
      console.log( this.moboCurrentPrice);
    }
  }

  cpuUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.cpuList.length) {
      const selectedcpu = this.cpuList[index];
      this.cpuCurrentPrice = selectedcpu.unitPrice;
      console.log( this.cpuCurrentPrice);
    }
  }

  fansUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.fansList.length) {
      const selectedfans = this.fansList[index];
      this.fansCurrentPrice = selectedfans.unitPrice;
      console.log( this.fansCurrentPrice);
    }
  }

  psuUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.psuList.length) {
      const selectedpsu = this.psuList[index];
      this.psuCurrentPrice = selectedpsu.unitPrice;
      console.log( this.psuCurrentPrice);
    }
  }

  ramUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.ramList.length) {
      const selectedram = this.ramList[index];
      this.ramCurrentPrice = selectedram.unitPrice;
      console.log( this.ramCurrentPrice);
    }
  }

  ssdUnitPrice(e: any) {
    const index = e.target.selectedIndex - 1;
    if (index >= 0 && index < this.ssdList.length) {
      const selectedssd = this.ssdList[index];
      this.ssdCurrentPrice = selectedssd.unitPrice;
      console.log( this.ssdCurrentPrice);
    }
  }

  getTotalPrice(): string {
    const totalPrice = (this.gpuCurrentPrice || 0) + (this.caseCurrentPrice || 0) + (this.moboCurrentPrice || 0)
    + (this.cpuCurrentPrice || 0) + (this.fansCurrentPrice || 0) + (this.psuCurrentPrice || 0) + (this.ramCurrentPrice || 0)
    + (this.ramCurrentPrice || 0);
    return `$ ${totalPrice.toFixed(2)}`;
  } 
}