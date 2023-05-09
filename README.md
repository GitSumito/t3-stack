# 本アプリケーションの説明

タスク登録: ユーザーが新しいタスクを登録するとき、フロントエンドからは createTask APIが呼び出されます。これには新しいタスクの詳細が含まれます。その後、サーバー側のcreateTaskメソッドが呼び出され、新しいタスクがデータベースに保存されます。

タスク変更: ユーザーが既存のタスクを変更するとき、フロントエンドからは updateTask APIが呼び出されます。これには変更したいタスクのIDと新しい詳細が含まれます。その後、サーバー側のupdateTaskメソッドが呼び出され、該当のタスクがデータベースで更新されます。

タスク削除: ユーザーがタスクを削除するとき、フロントエンドからは deleteTask APIが呼び出されます。これには削除したいタスクのIDが含まれます。その後、サーバー側のdeleteTaskメソッドが呼び出され、該当のタスクがデータベースから削除されます。


# Diagram
```
Client         Server           Database
  |              |                 |
  |---createTask--->              |
  |              |---createTask--->|
  |              |<---taskCreated--|
  |<--taskCreated--|              |
  |              |                 |
  |---updateTask--->              |
  |              |---updateTask--->|
  |              |<--taskUpdated---|
  |<--taskUpdated--|              |
  |              |                 |
  |---deleteTask--->              |
  |              |---deleteTask--->|
  |              |<--taskDeleted---|
  |<--taskDeleted--|              |
  |              |                 |
```

# 呼び出され方について

createTaskというアクションが起こるとき、いくつかのファイルがそれぞれの役割に基づいて順番に呼び出されます。以下にその順序を示します。

Client（フロントエンド）: src/components/TaskForm.tsx
ユーザーが新しいタスクを作成するためにフォームを送信すると、ここでcreateTaskというメソッドが呼び出されます。

Client→Server（API呼び出し）: src/utils/trpc.ts
createTaskメソッドが呼び出されると、フロントエンドからサーバーへのAPIリクエストが行われます。このファイルでは、APIリクエストを作成し、そのレスポンスを受け取るための方法が定義されています。

Server（APIエンドポイント）: src/server/trpc/router/todo.ts
このファイルでは、createTaskという名前のAPIエンドポイントが定義されています。ここで、リクエストの入力を検証し、対応するデータベース操作を行います。

Server→Database（データベース操作）: src/server/prisma.ts
ここでは、Prisma Clientを使用してデータベースとのやりとりを行います。具体的には、新しいタスクをデータベースに保存します。

Database→Server（データベースからの応答）: src/server/prisma.ts
データベースからの応答を受け取り、それをサーバー側のAPIエンドポイントに返します。

Server→Client（APIの応答）: src/utils/trpc.ts
APIエンドポイントからの応答を受け取り、それをフロントエンドに返します。

Client（フロントエンドの応答処理）: src/components/TaskForm.tsx
APIからの応答を受け取り、その結果に基づいてUIを更新します。


# how to work
```
# docker 起動
docker compose up -d

# migrate
npx prisma migrate dev

# chack database
npx prisma studio

# start app
yarn dev
```