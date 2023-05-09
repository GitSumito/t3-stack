// trpc のインポート
import { trpc } from "../utils/trpc";

// TaskItem コンポーネントをインポート
import { TaskItem } from "./TaskItem";

// TaskList コンポーネントを定義
export const TaskList = () => {
  {/* // タスクリストのデータ、ローディング状態、エラーを取得*/}
  const { data, isLoading, error } = trpc.todo.getTasks.useQuery();

  {/* // ローディング状態の場合、ローディングメッセージを表示*/}
  if (isLoading) {
    return <p>Loading task list...</p>;
  }

  {/* // エラーが発生した場合、エラーメッセージを表示*/}
  if (error) {
    return <p>{error.message}</p>;
  }

  // タスクリストを表示*/}
  return (
    <ul>
      {/* タスクデータを TaskItem コンポーネントに渡して表示 */}
      {data?.map((task) => (
        <TaskItem
          key={task.id}
          taskId={task.id}
          title={task.title}
          body={task.body}
        />
      ))}
    </ul>
  );
};
