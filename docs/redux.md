## Redux 概要

- 使う前に Flux アーキテクチャは理解しておく
- Redux は内部で Context が使われている
- Context と Redux どちらを使うか迷うのは間違い
  - Context 自体は状態管理システムではなく、依存注入メカニズムでしかない
  - Context を使う場合は useState 等を利用して状態管理を行う
- Redux 導入のメリット
  - サーバーからのデータをキャッシュできる
    - `keepUnusedDataFor` 期間以上になったら server に fetch request を行う
    - 差分があれば保存されているキャッシュが更新される
  - グローバルな状態を保存することができ、クライアント側での複雑なデータ管理ができる
- GraphQL を使う場合
  - もし ApolloClient を導入し Redux をキャッシュ用途で使用するなら Redux は不要
  - ApolloClient にはキャッシュ処理が含まれているため
- REST API を使う場合
  - もし swr or ReactQuery を導入し Redux をキャッシュ用途で使用するなら Redux は不要
  - swr or ReactQuery にはキャッシュ処理が含まれているため
- Redux のキャッシュとは
  - 値の更新が発生するとオブジェクトは別のインスタンスになる
  - そのため selector から返されるオブジェクトの比較は常に false になり再レンダリングが走る
- Redux Toolkit とは
  - Redux アプリに必要な package が組み込まれており簡単に Redux のロジックが記述できる
- Redux DevTools Extension とは
  - Redux ストアの状態変化を履歴で確認できるブラウザの拡張機能
- Redux-thunk とは
  - dispatch の非同期を可能にする
  - dispatch された状態を log に記録
  - reducer が処理するのにかかった時間を記録
- Redux-thunk vs Redux-saga
  - どちらも Redux middleware
    - Redux-logger や非同期 api call などの目的で使用
  - Redux-thunk
    - pros
      - action creator に非同期処理を書くことで自由度が高まる
      - 小〜中規模で導入しやすい
    - cons
      - Redux アーキテクチャから若干外れる
      - scale up しにくい
  - Redux-saga
    - pros
      - Redux とは独立して動作する
      - テストが容易
    - cons
      - 書き方が冗長

## 参考

- [When (and when not) to reach for Redux](https://changelog.com/posts/when-and-when-not-to-reach-for-Redux)
- [When should I use Redux?](https://Redux.js.org/faq/general#when-should-i-use-Redux)
