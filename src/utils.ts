import { TaskBean, TaskParam } from "./types";

function random() {
  return Math.floor(Math.random() * 16777215);
}

export function generateTaskId() {
  return `${Date.now().toString(16).slice(-8)}${random().toString(16).slice(-6)}${random()
    .toString(16)
    .slice(-4)}${random().toString(16).slice(-6)}`;
}

export function generateTaskCreated() {
  return `${new Date().toISOString().slice(0, -1)}+0000`;
}

export function formatTaskParam(task: TaskParam): TaskParam {
  const createdTime = task.createdTime ? task.createdTime : generateTaskCreated();

  const {
    id = generateTaskId(),
    title,
    projectId,
    columnId,
    content,
    assignee,
    dueDate,
    exDate = [],
    isAllDay = true,
    isFloating = false,
    items = [],
    kind = "TEXT",
    priority = 0,
    progress = 0,
    reminders = [],
    sortOrder = 0,
    startDate = createdTime,
    modifiedTime = createdTime,
    status = 0,
    tags = [],
    timeZone = "Asia/Shanghai",
    creator = null,
    etag = null,
  } = task;

  return {
    id,
    title,
    projectId,
    columnId,
    content,
    assignee,
    createdTime,
    dueDate,
    exDate,
    isAllDay,
    isFloating,
    items,
    kind,
    modifiedTime,
    priority,
    progress,
    reminders,
    sortOrder,
    startDate,
    status,
    tags,
    timeZone,
    creator,
    etag,
  };
}

export function taskBeanToTaskParam(task: TaskBean): TaskParam {
  const {
    id,
    title,
    projectId,
    columnId,
    content,
    dueDate,
    exDate,
    isAllDay,
    isFloating,
    items,
    kind,
    modifiedTime,
    priority,
    progress,
    reminders,
    sortOrder,
    status,
    tags,
    timeZone,
    createdTime,
  } = task;

  return {
    id,
    title,
    content,
    projectId,
    columnId,
    sortOrder,
    assignee: undefined,
    exDate,
    timeZone,
    isFloating,
    isAllDay,
    priority,
    status,
    reminders,
    items,
    progress,
    dueDate,
    kind,
    createdTime,
    modifiedTime,
    startDate: createdTime,
    tags,
  };
}
