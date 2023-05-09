// zustand から必要な create 関数をインポート
import { create } from 'zustand';
// updateTaskInput 型をインポート
import { updateTaskInput } from '../schema/todo';

// ステートの型を定義
// 型を定義することで、ステートとそれを操作する関数の使用方法を明示的にし、
// コードの安全性を向上させることができます。
// 特にTypeScriptを使用する場合、型を定義することでコンパイル時に型エラーを検出でき、バグを防ぐことができます。
type State = {
  // この行は、editedTaskという名前のステートを定義しています。
  // このステートは、現在編集モードにあるタスクの情報を保持します。
  // その型はupdateTaskInputとなっています。
  // つまり、このステートはupdateTaskInput型の値を持つことができます。
  // 例えば、タスクのタイトルや本文など、編集可能なタスクの属性をこのステートに格納します。
  editedTask: updateTaskInput;

  // この行は、editedTaskステートを更新するための関数updateEditedTaskを定義しています。
  // この関数はupdateTaskInput型の引数（このコードではpayloadと名付けられています）を受け取り、
  // editedTaskステートをその新しい値に更新します。
  // この関数の戻り値の型はvoidで、これはこの関数が何も返さないことを意味します。
  updateEditedTask: (payload: updateTaskInput) => void;

  // この行は、editedTaskステートをリセットするための関数resetEditedTaskを定義しています。
  // この関数は引数を受け取らず、editedTaskステートを初期値（あるいは空の値）にリセットします。
  // この関数の戻り値の型もvoidで、これはこの関数が何も返さないことを意味します。
  resetEditedTask: () => void;
};

// Zustandのcreate関数を使ってカスタムフックuseStoreを作成しています。
// create関数は引数にステートとその更新方法を定義する関数を取ります。
// この関数の中でset関数を使ってステートを更新します。

// このuseStoreカスタムフックを使うことで、コンポーネントから編集中のタスクのステートにアクセスしたり、
// そのステートを更新したりすることができます。
// また、Zustandはグローバルステートを提供するので、このuseStoreカスタムフックはアプリケーション内のどのコンポーネントからでも使用することができます。
const useStore = create<State>((set) => ({
  // editedTaskステートの初期値を設定しています。
  // このステートは現在編集中のタスクの情報を保持します。
  // 初期値は空のタスク（タスクID、タイトル、本文がすべて空文字列）としています。
  editedTask: { taskId: '', title: '', body: '' },

  // updateEditedTaskというアクション（ステートを更新する関数）を定義しています。
  // このアクションは新しいタスクのデータ（payload）を引数に取り、set関数を使ってeditedTaskステートをその新しい値に更新します。
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),

  // resetEditedTaskというアクションを定義しています。
  // このアクションは引数を取らず、set関数を使ってeditedTaskステートを初期値（空のタスク）にリセットします。
  resetEditedTask: () =>
    set({ editedTask: { taskId: '', title: '', body: '' } }),
}));

// useStore をエクスポート
export default useStore;
