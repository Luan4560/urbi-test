import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  invalidName()
  {
    return (this.submitted && this.userForm.controls.name.errors != null);
  }

  invalidEmail() 
  {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidPassword()
  {
    return (this.submitted && this.userForm.controls.password.errors != null);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log('Works')
    if(this.userForm.invalid === true) {
      return
    } else {
      this.registered = true;
    }
  }

}

  
