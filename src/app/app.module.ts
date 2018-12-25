import { PostsService } from './services/posts.service';
import { environment } from './../environments/environment';
import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InfoComponent } from './components/info/info.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostDeleteComponent } from './components/posts/post-delete/post-delete.component';
import { TagsComponent } from './components/tags/tags.component';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { CommentCreateComponent } from './components/comments/comment-create/comment-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    PostsComponent,
    CommentsComponent,
    SettingsComponent,
    InfoComponent,
    PostCreateComponent,
    PostDeleteComponent,
    TagsComponent,
    PostDetailComponent,
    CommentCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot(),
  ],
  entryComponents: [PostDeleteComponent],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
