import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pay-card',
  templateUrl: './pay-card.component.html',
  styleUrls: ['./pay-card.component.css']
})
export class PayCardComponent implements OnInit,OnDestroy {
  payCardForm:FormGroup;
  allSubscribes:Subscription[]=[];
  isFrontview:boolean=true;
  cardType:string
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
      this.payCardForm=this.formBuilder.group({
        cardNumber:['',[Validators.required,Validators.maxLength(19)]],
        month:['',[Validators.required,Validators.maxLength(2),Validators.max(12),Validators.min(1)]],
        year:['',[Validators.required,Validators.maxLength(4)]],
        nameOnCard:['',[Validators.required,Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]],
        cvv:['',[Validators.required,Validators.maxLength(3)]],
      });
     this.allSubscribes.push(
      this.payCardForm.controls.cardNumber.valueChanges.subscribe((value)=>{
        this.detectCardType(value.replace(/-/g, ''))
      })
     ) 
   
  }
  setView(view){
    if(view === 'back'){
      this.isFrontview=false
    }else{
      this.isFrontview=true
    }
  }
  

  detectCardType(number: string) {
    let patterns = {
      electron: new RegExp("/^(4026|417500|4405|4508|4844|4913|4917)\d+$/") ,
      maestro:new RegExp("/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/") ,
      dankort: new RegExp("/^(5019)\d+$/"),
      interpayment:new RegExp("/^(636)\d+$/") ,
      unionpay: new RegExp("/^(62|88)\d+$/"),
      visa: new RegExp("/^4\d{3}?\d{4}?\d{4}?\d{4}$/"),
      mastercard: new RegExp("/^5[1-5][0-9]{14}$/"),
      amex: new RegExp("/^3[47][0-9]{13}$/"),
      diners: new RegExp("/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/"),
      discover: new RegExp( "/^6(?:011|5[0-9]{2})[0-9]{12}$/"),
      jcb: new RegExp("/^(?:2131|1800|35\d{3})\d{11}$/")
    }
    
    for (let key in patterns) {
      if (patterns[key].test(number)) {
        this.cardType = key;
      }
    }
  }

  checkFormError(control,error){
    return (this.payCardForm.controls[control].hasError(error))&&((this.payCardForm.controls[control].touched) || (this.payCardForm.controls[control].dirty))
  }
  

  ngOnDestroy(){
    this.allSubscribes.forEach(value => value.unsubscribe())
  }
}
