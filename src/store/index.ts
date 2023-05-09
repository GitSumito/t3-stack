// zustand から必要な create 関数をインポート
import { create } from 'zustand';
// updateTaskInput 型をインポート
import { updateTaskInput } from '../schema/todo';

// ステートの型を定義
type State = {
  editedTask: updateTaskInput;
  updateEditedTask: (payload: updateTaskInput) => void;
  resetEditedTask: () => void;
};

// zustand の create 関数を使ってカスタムフック useStore を作成
const useStore = create<State>((set) => ({
  // 編集中のタスクの初期ステートを設定
  editedTask: { taskId: '', title: '', body: '' },

  // updateEditedTask アクション: 編集中のタスクのステートを更新
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),

  // resetEditedTask アクション: 編集中のタスクのステートをリセット
  resetEditedTask: () =>
    set({ editedTask: { taskId: '', title: '', body: '' } }),
}));

// useStore をエクスポート
export default useStore;
