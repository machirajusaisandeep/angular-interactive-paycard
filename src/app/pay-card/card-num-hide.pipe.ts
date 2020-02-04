import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumHide'
})
export class CardNumHidePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let tempVal=""
    if(value.length>0 &&  value.length <= 19){
     if(value.includes('-')){
      let temp=value.split('-');
      console.log(temp)
      temp[1]=temp[1]?temp[1].replace(/[0-9]/g, "X"):temp[1]
      temp[2]=temp[2]?temp[2].replace(/[0-9]/g, "X"):temp[2]
      tempVal=temp.join('-');
      console.log(tempVal)
     }
     else{
      tempVal=value
    }
    }else{
      tempVal=value
    }
    return tempVal;
  }

}
