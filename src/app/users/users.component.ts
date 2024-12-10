import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  permissions: any = localStorage.getItem('permisions')
  users:any = []


  constructor(private userService:UserServiceService, private router:Router){

  }

  checkCreatePermision(){
    if(localStorage.getItem('create')){
      return true;
    }

    return false;
  }

  checkEditPermition(){

    if(localStorage.getItem('update')){
      return true;
    }

    return false;
  }

  checkDeletePermition(){
    if(localStorage.getItem('delete')){
      return true;
    }

    return false;
  }

  editUser(id:string){
    localStorage.setItem('editId', id);
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(
      (data) => {

        this.users.length = 0;

        for(const user of data){
          this.users.push(user)
          this.checkEditPermition()
        }
      }
    )
  }

  addUser(){
    this.router.navigate(['/new'])
  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      (response) => {
        for(const user of response){
          this.users.push(user)
          this.checkEditPermition()
        }
      }
    )
  }

}
