export enum TaskStatus {
  UnCompleted = 0,
  Abandoned = -1,
  Completed = 2,
}

export enum ServeType {
  Dida = "dida",
  TickTick = "ticktick",
}

export interface TaskBean {
  id: string;
  projectId: string;
  sortOrder: number;
  title: string;
  exDate: any[];
  repeatTaskId: any;
  content: string;
  repeatFrom: any;
  desc: string;
  timeZone: string;
  isFloating: boolean;
  isAllDay: boolean;
  reminder: string;
  reminders: any[];
  priority: number;
  status: number;
  items: any[];
  progress: number;
  attachments: Array<{
    createdTime: string;
    fileName: string;
    fileType: string;
    id: string;
    path: string;
    size: number;
  }>;
  dueDate?: string;
  modifiedTime: string;
  etag: string;
  deleted: number;
  createdTime: string;
  creator: number;
  focusSummaries: any[];
  commentCount: number;
  columnId: string;
  kind: "NOTE" | "TEXT";
  deletedTime: number;
  tags: string[];
}

export interface ProjectProfile {
  id: string;
  name: string;
  isOwner: boolean;
  color: string;
  inAll: boolean;
  sortOrder: number;
  sortOption: {
    groupBy: string;
    orderBy: string;
  };
  sortType: string;
  userCount: number;
  etag: string;
  modifiedTime: string;
  closed: boolean;
  muted: boolean;
  transferred: any;
  groupId: any;
  viewMode: any;
  notificationOptions: any[];
  teamId: any;
  permission: any;
  kind: string;
  timeline: {
    range: any;
    sortType: string;
    sortOption: {
      groupBy: string;
      orderBy: string;
    };
  };
  needAudit: boolean;
  openToTeam: any;
  teamMemberPermission: any;
  source: number;
}

export interface Tag {
  name: string;
  rawName: string;
  label: string;
  sortOrder: number;
  sortType: string;
  color: string;
  etag: string;
  type: number;
}

export interface Filter {
  id: string;
  name: string;
  rule: string;
  sortOrder: number;
  sortType: string;
  viewMode: any;
  timeline: {
    range: any;
    sortType: string;
    sortOption: any;
  };
  etag: string;
  createdTime: string;
  modifiedTime: string;
  sortOption: any;
}

export type TaskParam = Partial<
  Pick<
    TaskBean,
    | "id"
    | "title"
    | "content"
    | "projectId"
    | "columnId"
    | "sortOrder"
    | "exDate"
    | "timeZone"
    | "isFloating"
    | "isAllDay"
    | "reminders"
    | "priority"
    | "status"
    | "items"
    | "progress"
    | "dueDate"
    | "createdTime"
    | "modifiedTime"
    | "kind"
    | "tags"
  >
> & {
  title: string;
  projectId: string;
  startDate?: string;
  assignee?: string | null;
  etag?: string | null;
  creator?: number | null;
};
