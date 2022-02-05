 import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { MultilevelNode, ExpandCollapseStatusEnum } from './app.model';
import {CONSTANT} from './constants';

export class MultilevelMenuService {
  foundLinkObject?: MultilevelNode;
  private expandCollapseStatus: Subject<ExpandCollapseStatusEnum> = new Subject<ExpandCollapseStatusEnum>();
  expandCollapseStatus$: Observable<ExpandCollapseStatusEnum> = this.expandCollapseStatus.asObservable();

  private selectedMenuID: Subject<string> = new Subject<string>();
  selectedMenuID$: Observable<string> = this.selectedMenuID.asObservable();

  private generateId(): string {
    let text = '';
    for (let i = 0; i < 20; i++) {
      text += CONSTANT.POSSIBLE.charAt(Math.floor(Math.random() * CONSTANT.POSSIBLE.length));
    }
    return text;
  }
  addRandomId(nodes: MultilevelNode[]): void {
    nodes.forEach((node: MultilevelNode) => {
      node.id = this.generateId();
      if (node.items !== undefined) {
        this.addRandomId(node.items);
      }
    });
  }
  recursiveCheckId(node: MultilevelNode, nodeId: string): boolean {
    if (node.id === nodeId) {
      return true;
    } else {
      if (node.items !== undefined) {
        return node.items.some((nestedNode: MultilevelNode) => {
          return this.recursiveCheckId(nestedNode, nodeId);
        });
      }
    }

    return false;
  }
  private findNodeRecursively({nodes, link, id}: {nodes: MultilevelNode[], link?: string, id?: string}): void {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const node = nodes[nodeIndex];
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          if (node.link && typeof node.link === 'string' && encodeURI(node.link) === link) {
            this.foundLinkObject = node;
          } else if (node.link) {
            this.foundLinkObject = node;
          } else if (node.id === id) {
            this.foundLinkObject = node;
          } else {
            if (node.items !== undefined) {
              this.findNodeRecursively({
                nodes: node.items,
                link: link ? link : undefined,
                id: id ? id : undefined
              });
            }
          }
        }
      }
    }
  }

  getMatchedObjectByUrl(nodes: MultilevelNode[], link: string): MultilevelNode {
    this.findNodeRecursively({nodes, link});
    return <MultilevelNode>this.foundLinkObject;
  }

  getMatchedObjectById(nodes: MultilevelNode[], id: string): MultilevelNode {
    this.findNodeRecursively({nodes, id});
    return <MultilevelNode>this.foundLinkObject;
  }
  // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
  // https://angular.io/api/common/KeyValuePipe#description
  kvDummyComparerFn(): number {
    return 0;
  }
  setMenuExpandCollapseStatus(status: ExpandCollapseStatusEnum): void {
    this.expandCollapseStatus.next(status ? status : ExpandCollapseStatusEnum.neutral);
  }
  selectMenuByID(menuID: string) {
    this.selectedMenuID.next(menuID);
    return this.foundLinkObject;
  }
}
