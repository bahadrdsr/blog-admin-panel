import { PostsService } from './../../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  id : string;
  post : Post;
  private sub: any;
  titleEditing : boolean = false;
  constructor(private route: ActivatedRoute, private _postService : PostsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._postService.getPost(this.id).subscribe(post => {
        this.post = post;
      });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleTitleEdit(){
    this.titleEditing = !this.titleEditing;
  }
}
