import { CommentCreateComponent } from './components/comments/comment-create/comment-create.component';
import { TagsComponent } from './components/tags/tags.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostsComponent } from './components/posts/posts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InfoComponent } from './components/info/info.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'info', component:InfoComponent},
  {path:'settings', component:SettingsComponent},
  {path:'posts', component:PostsComponent},
  {path:'posts/detail/:id', component:PostDetailComponent},
  {path:'posts/edit/:id', component:PostCreateComponent},
  {path:'posts/compose', component:PostCreateComponent},
  {path:'comments', component:CommentsComponent},
  {path:'comments/new', component:CommentCreateComponent},
  {path:'tags', component:TagsComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
