import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './const/validation.pattern';
import { Icountry } from 'src/model/country';
import { COUNTRIES_META_DATA } from './const/countryData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,DoCheck {
  title = 'reactive';
  signUpForm !:FormGroup;
  countryInfo:Array<Icountry>=[]
  constructor(){

  }
  ngDoCheck(): void {
   if((this.formsmash['permanentAddress'] as FormGroup).controls['tick'].value){this.formsmash['permanentAddress'].patchValue(this.formsmash['currentAddress'].value)}
   
  }
  get formsmash(){
    return this.signUpForm.controls
  }

  ngOnInit(): void {
    this.countryInfo=COUNTRIES_META_DATA;
   this.signUpForm=new FormGroup({
    userName:new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.username)]),
    email:new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.email)]),
    empId: new FormControl(null,[Validators.required]),
    gender:new FormControl(true),
    currentAddress:new FormGroup({
      country:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      zipcode:new FormControl(null,[Validators.required])

    }),
    permanentAddress: new FormGroup({
      tick:new FormControl(false),
      country:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      zipcode:new FormControl(null,[Validators.required])
    }),
    
   })
  }
  onSignUp(){
    console.log(this.signUpForm.value)
  }
}

