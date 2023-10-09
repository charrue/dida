import { Filter, ProjectProfile, Tag, TaskBean, TaskParam } from "./types";
import { formatTaskParam, generateTaskCreated } from "./utils";

interface Options {
  username: string;
  password: string;
  apiHost?: string;
  host?: string;
}

type ArrayOrSingle<T> = T | T[];

export class Dida {
  options: Options;
  cookies = "";
  uncompletedTasks: TaskBean[] = [];
  notes: TaskBean[] = [];
  projectProfiles: ProjectProfile[] = [];
  tags: Tag[] = [];
  filters: Filter[] = [];
  projectGroups: any[] = [];

  private expTime = 0;

  constructor(options: Options) {
    this.options = {
      apiHost: "https://api.dida365.com",
      host: "https://dida365.com",
      ...options,
    };
  }

  request(url: string, options?: RequestInit) {
    const headers = {
      cookie: this.cookies,
      "Content-Type": "application/json",
      "x-device":
        '{"platform":"web","os":"macOS 10.15.7","device":"Chrome 114.0.0.0","name":"","version":4562,"id":"64217d45c3630d2326189adc","channel":"website","campaign":"","websocket":""}',
      ...(options?.headers ?? {}),
    };

    return fetch(this.options.apiHost + url, {
      ...options,
      method: options?.method ?? "GET",
      headers,
    });
  }

  async checkLogin() {
    if (this.cookies && this.expTime && this.expTime > Date.now()) {
      return;
    }

    const url = `${this.options.apiHost}/api/v2/user/signon?wc=true&remember=true`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: this.options.username,
        password: this.options.password,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-device":
          '{"platform":"web","os":"macOS 10.15.7","device":"Chrome 114.0.0.0","name":"","version":4562,"id":"64217d45c3630d2326189adc","channel":"website","campaign":"","websocket":""}',
      },
    });

    this.cookies = res.headers.get("set-cookie") ?? "";
    this.expTime = Date.now() + 1000 * 60 * 60 * 24;
  }

  async fetchAllUnCompleted() {
    await this.checkLogin();

    const res = await this.request("/api/v2/batch/check/0", {
      method: "GET",
    });

    const result = await res.json();
    const list: TaskBean[] = result.syncTaskBean.update;
    const notes: TaskBean[] = [];
    const uncompletedTasks: TaskBean[] = [];
    list.forEach((item) => {
      if (item.kind === "NOTE") {
        notes.push(item);
      } else {
        uncompletedTasks.push(item);
      }
    });
    this.uncompletedTasks = uncompletedTasks;
    this.notes = notes;

    this.projectProfiles = result.projectProfiles as ProjectProfile[];
    this.filters = result.filters as Filter[];
    this.tags = result.tags as Tag[];
    this.projectGroups = result.projectGroups;
  }

  async create(task: TaskParam) {
    await this.checkLogin();

    const addTasks = Array.isArray(task) ? task.map(formatTaskParam) : [formatTaskParam(task)];
    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        add: addTasks,
        addAttachments: [],
        delete: [],
        deleteAttachments: [],
        update: [],
        updateAttachments: [],
      }),
    });
  }

  async delete(task: ArrayOrSingle<{ taskId: string; projectId: string }>) {
    await this.checkLogin();
    const deleteTasks = Array.isArray(task) ? task : [task];

    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        delete: deleteTasks,
        deleteAttachments: [],
        add: [],
        addAttachments: [],
        update: [],
        updateAttachments: [],
      }),
    });
  }

  async update(task: TaskParam) {
    await this.checkLogin();

    task.modifiedTime = generateTaskCreated();
    const updateTasks = Array.isArray(task) ? task.map(formatTaskParam) : [formatTaskParam(task)];
    console.log(updateTasks, task);
    return this.request("/api/v2/batch/task", {
      method: "POST",
      body: JSON.stringify({
        update: updateTasks,
        updateAttachments: [],
        add: [],
        addAttachments: [],
        delete: [],
        deleteAttachments: [],
      }),
    });
  }
}
