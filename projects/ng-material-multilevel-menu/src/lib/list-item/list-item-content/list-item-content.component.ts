import {Component, Input, OnInit} from '@angular/core';
import {MultilevelNode} from '../../app.model';
import {ExpandedLTR, ExpandedRTL} from '../../animation';
import {CommonUtils} from '../../common-utils';
import {CONSTANT} from '../../constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-list-item-content',
  templateUrl: 'list-item-content.component.html',
  styleUrls: ['list-item-content.component.css'],
  animations: [ExpandedLTR, ExpandedRTL]
})
export class ListItemContentComponent implements OnInit {
  @Input() node?: MultilevelNode;
  @Input() isRtlLayout: boolean = false;

  constructor() {
    // NOOP
  }

  get isLabelAsync(): boolean {
    if (!this.node || !this.node.label || typeof this.node.label === 'string') {
      return false;
    }
    return true;
  }

  get isHiddenAsync(): boolean {
    if (!this.node || typeof this.node.hidden === 'boolean') {
      return false;
    }
    return true;
  }

  get labelAsync(): Promise<string> | Observable<string> {
    return <Promise<string>>this.node?.label
  }

  get hiddenAsync(): Promise<boolean> | Observable<boolean> {
    return <Promise<boolean>>this.node?.hidden
  }

  ngOnInit(): void {
    // NOOP
  }

  getListIcon(node?: MultilevelNode): string {
    if (!node) {
      return '';
    }

    if (!CommonUtils.isNullOrUndefinedOrEmpty(node.icon)) {
      return `icon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.faIcon)) {
      return `faIcon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.imageIcon)) {
      return `imageIcon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.svgIcon)) {
      return `svgIcon`;
    } else {
      return ``;
    }
  }

  getHrefTargetType(): string {
    return (this.node?.hrefTargetType ? this.node?.hrefTargetType : CONSTANT.DEFAULT_HREF_TARGET_TYPE) || '';
  }

  getSelectedSvgIcon(): string {
    return (this.node?.isSelected && this.node?.activeSvgIcon ? this.node?.activeSvgIcon : this.node?.svgIcon) || '';
  }

  getSelectedIcon(): string {
    return (this.node?.isSelected && this.node?.activeIcon ? this.node?.activeIcon : this.node?.icon) || '';
  }

  getSelectedFaIcon(): string {
    return (this.node?.isSelected && this.node?.activeFaIcon ? this.node?.activeFaIcon : this.node?.faIcon) || '';
  }

  getSelectedImageIcon(): string {
    return (this.node?.isSelected && this.node?.activeImageIcon ? this.node?.activeImageIcon : this.node?.imageIcon) || '';
  }

  nodeExpandStatus(): string {
    return this.node?.expanded ? CONSTANT.YES : CONSTANT.NO;
  }
}
