import { Pipe } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum:any) {
    if (rawNum) {
     
      if (rawNum.includes('+') == false) {
        let newStr = "";
        let i = 0;

        for (; i < Math.floor(rawNum.length / 3) - 1; i++) {
          if (i == 0)
            newStr = '(' + rawNum.substr(i * 3, 3) + ")-";
          else
            newStr = newStr + rawNum.substr(i * 3, 3) + "-";
        }
        return newStr + rawNum.substr(i * 3);
      }
      if (rawNum.includes('+') == true) {
        let newStr = rawNum.substr(0, 2)
        rawNum = rawNum.substr(2, rawNum.length)
        let i = 0;

        for (; i < Math.floor(rawNum.length / 3) - 1; i++) {
          if (i == 0)
            newStr =newStr+ '(' + rawNum.substr(i * 3, 3) + ")-";
          else
            newStr = newStr + rawNum.substr(i * 3, 3) + "-";
        }
        return newStr + rawNum.substr(i * 3);
      }
    }

  }
}