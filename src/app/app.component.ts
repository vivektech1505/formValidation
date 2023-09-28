import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { passwordMatch } from 'src/validators/passwordMatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  integerRegex = /^\d+$/
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  title = 'angular_formValidation';
  hobbiesArray: string[] = ['Reading', 'writing', 'singing', 'playing cricket']


  onChange(e: any) {
    const checkedValue = e.target.value;
    const checked = e.target.checked
    console.log(checkedValue, checked)

    const checkedArray = this.registerForm.get('hobbies') as FormArray;
    if (checked) {
      checkedArray.push(new FormControl(checkedValue));
    }
    else {
      let i: number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == checkedValue) {
          checkedArray.removeAt(i)
        }
        i++;
      })
    }
  }


  onSubmit() {
    console.log('submitting form', this.registerForm.value)
    // console.log('country',this.registerForm )
  }

  registerForm = new FormGroup({
    fname: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    lname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    age: new FormControl("", [Validators.required, Validators.max(60), Validators.min(18), Validators.pattern(this.integerRegex)]),
    gender: new FormControl("", Validators.required),
    mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.integerRegex)]),
    email: new FormControl("", [Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),
    confirm_password: new FormControl("", [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),
    accept: new FormControl(false, [Validators.requiredTrue]),
    hobbies: new FormArray([], [Validators.required]),
    country : new FormControl("", [Validators.required])
  }, [passwordMatch("password", "confirm_password")])

  getControl(name: any): AbstractControl | null {
    return (this.registerForm as any).controls[name];
  }
}
