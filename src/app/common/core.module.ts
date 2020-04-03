import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe, EscapeHtmlPipe } from './pipes';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SafeHtmlPipe,
    EscapeHtmlPipe
  ],
  imports: [
    RouterModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SafeHtmlPipe,
    EscapeHtmlPipe
  ],
  providers: [PostService, CommentService],
})
export class CoreModule { }
