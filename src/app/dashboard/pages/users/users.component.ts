import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [ TitleComponent, RouterModule ],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent {

  public userService = inject( UserService )

}
