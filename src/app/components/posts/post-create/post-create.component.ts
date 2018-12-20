import { TagsService } from "./../../../services/tags.service";
import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { Post } from "../../../models/post";
import { PostsService } from "../../../services/posts.service";
import { NgForm, FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatSnackBar
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Tag } from "../../../models/tag";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  @ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  @ViewChild("postForm") public postForm: NgForm;
  @Input() editPost: Post;
  isEdit: boolean = false;
  private sub: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<Tag[]>;
  tags: Tag[];
  post: Post = {
    title: "",
    body: "",
    isPublished: false,
    author: "",
    createdBy: "",
    createdDate: new Date(),
    id: ""
  };
  constructor(
    private _postsService: PostsService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _tagService: TagsService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params) {
        const id = params["id"];
        if (id) {
          this._postsService.getPost(id).subscribe(post => {
            this.isEdit = true;
            this.post = post;
            this.postForm.controls["title"].setValue(post.title);
            this.postForm.controls["body"].setValue(post.body);
          });
        }
      }
      this._tagService.getTags().subscribe(tags => {
        this.tags = tags;
      });
    });
  }

  onSubmit({ value, valid }: { value: Post; valid: boolean }) {
    if (!valid) {
      // Show error
      this.snackBar.open("Please fill out the form correctly", null, {
        duration: 2000,
        panelClass: ["error-snackbar"],
        verticalPosition: "top",
        horizontalPosition: "center"
      });
    } else {
      if (this.isEdit) {
        this.post.title = value.title;
        this.post.body = value.body;
        this.post.modifiedDate = new Date();
        this._postsService.updatePost(this.post);
        this.snackBar.open("Post updated succesfully", null, {
          duration: 2000,
          panelClass: ["success-snackbar"],
          verticalPosition: "top",
          horizontalPosition: "center"
        });
      } else {
        value.createdDate = new Date();
        //  TO DO : FIX MANUAL VALUES
        value.author = "bahadir doser";
        value.createdBy = "bahadir doser";
        value.isPublished = true;
        value.publishedDate = new Date();
        this._postsService.addPost(value);
        // Show message
        this.snackBar.open("Post saved succesfully", null, {
          duration: 2000,
          panelClass: ["success-snackbar"],
          verticalPosition: "top",
          horizontalPosition: "center"
        });
        this.post = {
          title: "",
          body: "",
          isPublished: false,
          author: "",
          createdBy: "",
          createdDate: new Date(),
          id: ""
        };
        this.postForm.reset();
      }
    }
  }
  addTag(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || "").trim()) {
        this.tags.push({ name: value.trim() } as Tag);
        this.post.tags.push({ name: value.trim() } as Tag);
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }
    }
  }
  removeTag(tag) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
