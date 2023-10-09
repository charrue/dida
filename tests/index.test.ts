import { beforeEach, describe, expect, test } from "vitest";

import { Dida } from "../src";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("dida", () => {
  let dida: Dida;
  const { env } = import.meta;
  beforeEach(() => {
    dida = new Dida({
      username: env.VITE_DIDA_USERNAME,
      password: env.VITE_DIDA_PASSWORD,
    });
  });

  // eslint-disable-next-line max-statements
  test("add or delete", async () => {
    const taskTitle = "NEW_TASK";
    await dida.fetchAllUnCompleted();

    function existTask(title = taskTitle) {
      return dida.uncompletedTasks.find((item) => item.title === title);
    }

    const existedTask = existTask();
    if (existedTask) {
      const res = await dida.delete({
        taskId: existedTask.id,
        projectId: existedTask.projectId,
      });
      const deleteResult = await res.json();
      console.log("delete result", deleteResult);

      await dida.fetchAllUnCompleted();

      expect(existTask()).toBeUndefined();
      return;
    }

    const res = await dida.create({
      title: taskTitle,
      projectId: "eb0a415582e952f00c2f3cb3",
      content: "NEW_TASK_CONTENT",
      columnId: "4a8048ab8d0331b6d4367440",
    });
    const addResult = await res.json();
    console.log("add result", addResult);

    await dida.fetchAllUnCompleted();
    const newTask = existTask();
    expect(newTask).toBeDefined();

    if (newTask) {
      const newTaskTitle = "NEW_TASK_TITLE";
      const uRes = await dida.update({
        ...newTask,
        title: newTaskTitle,
      });
      const updateResult = await uRes.json();
      console.log("update result", updateResult);

      await dida.fetchAllUnCompleted();
      const updatedTask = existTask(newTaskTitle);
      const prevTask = existTask(taskTitle);
      expect(prevTask).toBeUndefined();
      expect(updatedTask).toBeDefined();
    }
  });
});
