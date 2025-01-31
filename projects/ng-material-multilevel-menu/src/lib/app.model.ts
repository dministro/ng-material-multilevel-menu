import { NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

export interface MultilevelNode {
  id?: string;
  label: string | Promise<string> | Observable<string>;
  faIcon?: string;
  icon?: string;
  imageIcon?: string;
  svgIcon?: string;
  activeFaIcon?: string;
  activeIcon?: string;
  activeImageIcon?: string;
  activeSvgIcon?: string;
  hidden?: boolean | Promise<boolean> | Observable<boolean>;
  link?: string | any[];
  externalRedirect?: boolean;
  hrefTargetType?: string;
  data?: any;
  items?: MultilevelNode[];
  onSelected?: Function;
  disabled?: boolean;
  expanded?: boolean;
  navigationExtras?: NavigationExtras;
  dontEmit?: boolean;
  hasChildren?: boolean;
  isSelected?: boolean;
}

export interface Configuration {
    classname?: string;
    paddingAtStart?: boolean;
    backgroundColor?: string;
    listBackgroundColor?: string;
    fontColor?: string;
    selectedListFontColor?: string;
    interfaceWithRoute?: boolean;
    collapseOnSelect?: boolean;
    highlightOnSelect?: boolean;
    useDividers?: boolean;
    rtlLayout?: boolean;
    customTemplate?: boolean;
}

export interface BackgroundStyle {
    background?: string | null | undefined;
}

export interface ListStyle {
    background?: string;
    color?: string;
}

export enum ExpandCollapseStatusEnum {
    expand = 'expand',
    collapse = 'collapse',
    neutral = 'neutral',
}
