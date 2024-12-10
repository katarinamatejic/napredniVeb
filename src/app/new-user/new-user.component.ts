import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  read: boolean = true;
  write: boolean = false;
  deleteP: boolean = false;
  update: boolean = false;

  includeArray: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router:Router) {
    // Initialize the form with validators
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {

    const username = this.userForm.value.username;
    const password = this.userForm.value.password;

    this.userService.addUser(username,password,this.includeArray).subscribe(
      (response) =>{
        this.router.navigate(['/users'])
      }
    )

  }

  handleIncludeCheck(event: any) {
    if (event.target.checked) {
      this.includeArray.push({id: event.target.value});
      }
  };


}
