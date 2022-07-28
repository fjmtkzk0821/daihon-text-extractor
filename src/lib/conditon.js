class Condition {
    constructor(title, value) {
        this.title = title;
        this.value = value;
    }
    static defaultConditions() {
        return [
            new Condition("（全角かっこに囲まれたテキスト）","（*）"),
            new Condition("(半角かっこに囲まれたテキスト)","(*)"),
            new Condition("SE:効果音など と直後の改行","ＳＥ：*"),
            new Condition("SE:効果音など と直後の改行","SE:*"),
            new Condition("トラック1、トラック2など","トラック?"),
            new Condition("全角スペース","　"),
            new Condition("半角スペース"," "),
            new Condition("◇:効果音など と直後の改行","◇*"),
            new Condition("■:効果音など と直後の改行","■*"),
            new Condition("◆:効果音など と直後の改行","◆*"),
            new Condition("□:効果音など と直後の改行","□*"),
            new Condition("//:演技指示など と直後の改行","//*"),
            new Condition("【このかっこに囲まれたテキスト】","【*】"),
            new Condition("※から始まるテキスト と直後の改行","※*"),
        ];
    }
}

export default Condition;
