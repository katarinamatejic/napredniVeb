import { Component, OnInit } from '@angular/core';
import { UserServiceService} from '../service/user-service.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Permisions } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  permisions: any = []

  constructor(private userService: UserServiceService, private toastr:ToastrService, private router:Router){

  }

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
        (response)=>{

          localStorage.clear()

          localStorage.setItem('jwt', response.jwt)

          for(const permision of response.permisions){
            if(permision.naziv === 'can_create_users'){
              localStorage.setItem('create', permision.id);
            }else if(permision.naziv === 'can_update_users'){
              localStorage.setItem('update', permision.id);
            }else if(permision.naziv === 'can_delete_users'){
              localStorage.setItem('delete', permision.id);
            }else if(permision.naziv === 'can_read_users'){
              localStorage.setItem('read', permision.id);
            }
          }

          this.router.navigate(['/users'])

        },
        (err)=>{

          if (err.status == 401)
           this.toastr.error('Auth Eroor');
          else
            this.toastr.error('Unatorised');

        }
    )
  }

}
