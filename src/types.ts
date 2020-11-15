export interface TaskMeta {
  id: number;
}

export interface TaskContents {
  done: boolean;
  summary: string;
}

export type Task = TaskMeta & TaskContents

export type TaskUpdate = TaskMeta & Partial<TaskContents>

export type TaskTemporary = Partial<TaskUpdate>

export interface SortingRule {
  key: string;
  desc: boolean;
  icon: string;
  label: string;
}
