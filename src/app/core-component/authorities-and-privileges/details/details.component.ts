import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/@nextdriven/Services/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(public SharedService:SharedService ) { }

  ngOnInit(): void {
  }
  changeCurrentLang(lang: string) {
    this.SharedService.changeCurrentLang(lang);
  }
  gotoedit(){
    
  }
}
