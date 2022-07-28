import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  styled,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { ArrowForward, Delete, Twitter } from "@material-ui/icons";
import React, { Component } from "react";
import Condition from "../lib/conditon";
import { baseRegEx, cleanNonPrintable } from "../utils/common_tools";
import TermAndConditions from "./tac";
const useStyles = (theme) => ({
  imgLogo: {
    width: "100%",
  },
  twitterBtn: {
    background: "#1b95e0",
    "&:hover": {
      background: "#1b95e0",
    },
  },
});

const StyledTextField = styled(TextField)(() => ({
  "& fieldset": {
    borderRadius: 0,
  },
}));

class TextExtractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: Condition.defaultConditions(),
      originCount: 0,
      resultCount: 0,
    };

    this.tfNewCondition = null;
    this.tfOrigin = null;
    this.tfResult = null;

    this.setTfNewCondRef = this.setTfNewCondRef.bind(this);
    this.setTfOriginRef = this.setTfOriginRef.bind(this);
    this.setTfResultRef = this.setTfResultRef.bind(this);

    this.setCondition = this.setCondition.bind(this);
    this.removeCondition = this.removeCondition.bind(this);
    this.handleConvert = this.handleConvert.bind(this);

    this.simpleRegEx = this.simpleRegEx.bind(this);
    this.spechRegEx = this.spechRegEx.bind(this);
    this.asteriskRegEx = this.asteriskRegEx.bind(this);
    this.singleRegEx = this.singleRegEx.bind(this);
  }

  setTfNewCondRef(element) {
    this.tfNewCondition = element;
  }

  setTfOriginRef(element) {
    this.tfOrigin = element;
  }

  setTfResultRef(element) {
    this.tfResult = element;
  }

  setCondition() {
    if (this.tfNewCondition.value.length > 0) {
      //   console.log(this.tfNewCondition);
      this.setState({
        conditions: [
          ...this.state.conditions,
          new Condition("[自定義文字]", this.tfNewCondition.value),
        ],
      });
      this.tfNewCondition.value = "";
    }
  }

  removeCondition(index) {
    this.setState({
      conditions: this.state.conditions.filter((cond, i) => index !== i),
    });
  }

  handleConvert() {
    // console.log(this.tfOrigin.value);
    let result = this.tfOrigin.value;
    this.tfResult.value = "";
    if (result.length > 0) {
      result = result.replace(/[（]/gm, "(");
      result = result.replace(/[）]/gm, ")");

      this.state.conditions.forEach((cond) => {
        let cex = this.spechRegEx(cond.value);
        cex = this.asteriskRegEx(cex);
        cex = this.nextlineRegEx(cex);
        const pattern = new RegExp(this.singleRegEx(cex));

        result = this.simpleRegEx(result, pattern);
        result = this.simpleRegEx(result, /\(.*(\r\n|\r|\n)*.*\)/gm);
      });
    }
    this.tfResult.value = result;
    this.setState({
      resultCount: cleanNonPrintable(result).length,
    });
  }

  simpleRegEx(value, pattern) {
    return baseRegEx(value, pattern, "");
  }

  spechRegEx(pattern) {
    return pattern.replace(/[-/\\^$+()※◇■◆】□【（）|[\]{}]/gm, "\\$&");
  }

  asteriskRegEx(pattern) {
    return pattern.replace(/[*]/gm, ".*");
  }

  singleRegEx(pattern) {
    return pattern.replace(/[?]/gm, ".?");
  }

  nextlineRegEx(pattern) {
    return pattern.replace(/[\n\r]/gm, "\n");
  }

  render() {
    const { classes } = this.props;
    return (
      <Card square>
        <CardHeader
          title={
            <Typography variant="h5" component="h2">
              <b>台本文字数一発抜いてけ君@Web版</b>
            </Typography>
          }
          action={
            <Button
              className={classes.twitterBtn}
              variant="contained"
              color="primary"
              startIcon={<Twitter />}
              disableElevation
              component="a"
              href="https://twitter.com/intent/tweet?text=%E9%9F%B3%E5%A3%B0%E4%BD%9C%E5%93%81%E5%88%B6%E4%BD%9C%E8%80%85%E3%81%82%E3%82%8B%E3%81%82%E3%82%8B%E5%95%8F%E9%A1%8C%0A%E3%80%8C%E5%A3%B0%E5%84%AA%E8%A6%8B%E7%A9%8D%E3%82%82%E3%82%8A%E7%94%A8%E3%81%AB%E5%8F%B0%E8%A9%9E%E3%81%A0%E3%81%91%E6%8A%9C%E3%81%8F%E3%81%AE%E9%9D%A2%E5%80%92%E3%81%8F%E3%81%95%E3%81%99%E3%81%8E%EF%BC%81%E3%80%8D%0A%E3%82%92%E4%B8%80%E7%99%BA%E3%81%A7%E8%A7%A3%E6%B1%BA%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E3%83%84%E3%83%BC%E3%83%AB%0A%0A%E5%8F%B0%E6%9C%AC%E6%96%87%E5%AD%97%E6%95%B0%E4%B8%80%E7%99%BA%E6%8A%9C%E3%81%84%E3%81%A6%E3%81%91%E5%90%9BWeb%E7%89%88&url=https%3A%2F%2Fnuiteke-kun.web.app%2F"
            >
              Share
            </Button>
          }
        />
        <Box m={1}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Box mb={1}>
                <Card variant="outlined" square>
                  <Box m={1}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6">
                          1.計算対象外の設定をする
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          inputRef={this.setTfNewCondRef}
                          helperText={
                            <Typography variant="body2">
                              *抜きたい文字をここに入力してください
                              <br />
                              （ワイルドカード等の正規表現対応）
                            </Typography>
                          }
                          variant="outlined"
                          size="small"
                          multiline
                          rows={4}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={(event) => {
                            this.setCondition();
                          }}
                          disableElevation
                        >
                          抜く文字のリストに追加
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
              <Card variant="outlined" square>
                <Box m={1}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Typography variant="h6">抜く文字のリスト</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <List alignItems="flex-center" dense={true}>
                        {this.state.conditions.map((cond, index) => {
                          return (
                            <ListItem key={`li-cond-${index}`}>
                              <ListItemAvatar>
                                <Chip
                                  color="primary"
                                  size="small"
                                  label={cond.value}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography align="center">
                                    {cond.title}
                                  </Typography>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  onClick={(e) => {
                                    this.removeCondition(index);
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Box mb={1}>
                <Card variant="outlined" square>
                  <Box m={1}>
                    <Box mb={1}>
                      <Typography variant="h6">{`2.台本を以下の場所にコピペする (${this.state.originCount} 文字)`}</Typography>
                      <StyledTextField
                        inputRef={this.setTfOriginRef}
                        className={classes.tfRoot}
                        multiline
                        rows={4}
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        onChange={(element) => {
                          this.setState({
                            originCount: cleanNonPrintable(element.target.value)
                              .length,
                          });
                        }}
                      />
                    </Box>
                    <Box mb={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        fullWidth
                        onClick={(element) => {
                          this.handleConvert();
                        }}
                      >
                        <Typography variant="h6"><b>3.一発抜いてけ君で一発抜く</b></Typography>
                      </Button>
                    </Box>
                    <Box mb={1}>
                      <Typography variant="h6">{`4.計算対象外を抜いた台本を確認する (${this.state.resultCount} 文字)`}</Typography>
                      <StyledTextField
                        inputRef={this.setTfResultRef}
                        className={classes.tfRoot}
                        multiline
                        rows={4}
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        onChange={(element) => {
                          this.setState({
                            resultCount: cleanNonPrintable(element.target.value)
                              .length,
                          });
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              <Card variant="outlined" square>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={8}>
                      <a href="https://xn--gmq92kmxes03f.com/post-2191/">
                        <img
                          className={classes.imgLogo}
                          alt="voice-info logo"
                          src="./ririmu_banner.jpg"
                        />
                      </a>
                      <TermAndConditions />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Typography variant="body1" gutterBottom>
                        <b>
                          ご使用ありがとうございました！ツイッターで感想つぶやいていただけたら嬉しいです！
                        </b>
                      </Typography>
                      <Button
                        component="a"
                        variant="outlined"
                        color="secondary"
                        href="https://xn--gmq92kmxes03f.com/post-2191/"
                        fullWidth
                        endIcon={<ArrowForward />}
                      >
                        兎月りりむ。への声のご依頼はこちら！
                      </Button>
                      <Button
                        component="a"
                        variant="outlined"
                        color="secondary"
                        href="https://xn--gmq92kmxes03f.com/"
                        fullWidth
                        endIcon={<ArrowForward />}
                      >
                        同人音声.com運営『音声作品制作の基礎編❣』
                      </Button>
                      <Button
                        component="a"
                        variant="outlined"
                        color="secondary"
                        href="https://ci-en.dlsite.com/creator/1828"
                        fullWidth
                        endIcon={<ArrowForward />}
                      >
                        Cienは『もっと売れる音声作品制作のコツをみんなで創る応用編』
                      </Button>
                      <Button
                        component="a"
                        variant="outlined"
                        color="secondary"
                        href="https://twitter.com/lilim404"
                        fullWidth
                        endIcon={<Twitter />}
                      >
                        兎月りりむ。のツイッター（フォロー待ってます！）
                      </Button>
                      <Box height={8}></Box>
                      <Button
                        component="a"
                        variant="outlined"
                        color="primary"
                        href="https://voice-info.firebaseapp.com/"
                        fullWidth
                        endIcon={<ArrowForward />}
                      >
                        音声インフォVOICE-INFO 声優情報サイト
                      </Button>
                      <Button
                        component="a"
                        variant="outlined"
                        color="primary"
                        href="https://next-blog-pi-beryl.vercel.app/"
                        fullWidth
                        endIcon={<ArrowForward />}
                      >
                        藤本カズキの個人サイト
                      </Button>
                      <Button
                        component="a"
                        variant="outlined"
                        color="primary"
                        href="https://twitter.com/VOICEINFO_staff"
                        fullWidth
                        endIcon={<Twitter />}
                      >
                        藤本カズキのツイッター
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        <b>Powered by</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <a href="https://xn--gmq92kmxes03f.com/">
                        <img
                          className={classes.imgLogo}
                          alt="voice-info logo"
                          src="./doujin_dottokomu_logo.jpg"
                        />
                      </a>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <a href="https://voice-info.firebaseapp.com/">
                        <img
                          className={classes.imgLogo}
                          alt="voice-info logo"
                          src="./voice_info_logo.png"
                        />
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block">
                        Copyright © 2021 同人音声.com & 兎月りりむ。&
                        音声インフォVOICE-INFO & 藤本カズキ All Rights Reserved.
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }
}

export default withStyles(useStyles)(TextExtractor);
