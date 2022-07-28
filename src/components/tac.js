import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  txtWarning: {
    color: "red",
    fontWeight: "bold",
  },
}));

export default function TermAndConditions() {
  const classes = useStyles();
  return (
    <Typography variant="caption" paragraph>
      <ul>
        <li>
          当アプリは誰でも無料で使用可能です。兎月りりむ。所轄のサーバー上で動作しています。企画/運営/設計/Excel版開発：
          <a href="https://twitter.com/lilim404">兎月りりむ。</a>
          　Web版開発：<a href="https://twitter.com/fjmtkzk0821">藤本カズキ</a>
        </li>
        <li>
          ブラウザ上で処理は完結します。サーバーへの送信/共有はされませんのでご安心ください。
        </li>
        <li>
          バグ報告は大歓迎です。藤本カズキ(
          <a href="https://twitter.com/fjmtkzk0821">@fjmtkzk0821</a>
          )までご一報ください。
        </li>
        <li>
          テキスト、画像、プログラム等の構成情報の無断転載・無断使用を固く禁じます。また、いかなる媒体であっても著作権者の許可のない引用・組込を厳禁いたします。
        </li>
      </ul>
      <p className={classes.txtWarning}>＜抜き過ぎによるトラブルに注意！＞</p>
      <ul>
        <li>
          当アプリは演技指示やSEなどの「声に出さないけれども文字数が長くなってしまう部分」を抜き、
          <b>"サークル様側が不利すぎる見積もりとならないようにすること"</b>
          を目的としています。
        </li>
        <li>
          あくまで文字数計算は全体の工数を見積もるために適した手段というだけであり、実際には演技内容などにより見積もり金額は変動する場合がありますのでご注意ください。
        </li>
        <li>
          台詞内に含まれる句読点(、。)や感嘆符(！)、疑問符(？)、感情を表す記号(ハート記号）、三点リーダー(…)については兎月りりむ。は基本的に見積もり計算対象とさせていただいております。
        </li>
        <li>
          演技指示、効果音、記号などが計算対象/計算対象外
          となるかにつきましては、ご依頼先の各声優様のガイドラインを事前にご確認いただくことを推奨しております。
        </li>
        <li>
          使用に関わる一切の事項において著作者は責を負いかねます。自己責任での使用をお願いいたします。
        </li>
      </ul>
    </Typography>
  );
}
