// next-auth/react ライブラリから signIn 関数をインポート
import { signIn} from 'next-auth/react';

// Auth コンポーネントを定義
// 引数を受け取らない場合、このような書き方をする
// Authが関数型コンポーネントであることを示していますが、特定のプロパティを受け取ることを明示していません。
// これは、Authコンポーネントがプロパティを受け取らない、またはプロパティの型について明示的に指定しない場合に使用されます。
export const Auth = () => {
  return (
    // div 要素を返す
    <div>
      {/* ボタン要素を返す*/}
      {/* クリックすると、signIn 関数が呼び出され、GitHubを使った認証プロセスが開始する */}
      <button 
        // ボタンのスタイルを定義
        className="rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-800" 
        // クリック時のイベントハンドラ
        onClick={() => signIn('github')}>
        {/* // ボタンのテキストを設定*/}
        GitHub Auth
      </button>
    </div>
  )
}
