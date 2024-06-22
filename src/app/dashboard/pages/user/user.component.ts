import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { TitleComponent } from '@shared/title/title.component';
import { User } from '../../../interfaces/req-response';
import { UserService } from '@services/user.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [ TitleComponent ],
  template: `
    <app-title title="User" />

    @if ( user() ) {
      <section>
        <img
          [srcset]="user()!.avatar"
          [alt]="user()!.first_name"
        />

        <div>
          <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
          <p>{{ user()!.email }}</p>
        </div>

      </section>
    } @else {
      <p>Cargando información</p>
    }

  `,
})
export default class UserComponent {

  private route = inject( ActivatedRoute );
  private userService = inject( UserService );

  // public user = signal<User | undefined>(undefined);
  // toSignal: nos permite tomar un observable y regresar una señal:
  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({ id }) => this.userService.getUserById( id ) )
    )
  )

}
