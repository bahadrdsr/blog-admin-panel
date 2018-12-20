import { Component, OnInit } from "@angular/core";
import { TagsService } from "../../services/tags.service";
import { Tag } from "../../models/tag";
import { MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"]
})
export class TagsComponent implements OnInit {
  tags: Tag[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private _tagService: TagsService) {}

  ngOnInit() {
    this.getTags();
  }
  getTags() {
    this._tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this._tagService.addTag({name: value.trim()} as Tag);
      this.tags.push({name: value.trim()} as Tag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this._tagService.deleteTag(tag);
      this.tags.splice(index, 1);
    }
  }
}
