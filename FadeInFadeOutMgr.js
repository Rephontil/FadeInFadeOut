/*
 * 界面FadeInFadeOut效果
 * @Author: Damo 
 * @Date: 2018-09-19 19:16:48 
 * @Last Modified by: Damo
 * @Last Modified time: 2019-01-12 10:16:13
 */

/**
 WARNING:据反映CocosCreator2.0版本已经废弃了cc.eventManager这个监听管理类。该脚本中涉及到的cc.eventManager相关代码行都可以注释掉，不会影响效果~，如有问题，欢迎GitHub提问或Rephontil168@163.com。
 */
cc.Class({
    extends: cc.Component,

    properties: {
        /**动画速度 */
        defaultAnimSpeed: 0.15,
        /**界面图层队列 */
        viewQueue: new Array(),
        /**最顶层视图对象 => { "pageNode": pageNode, "allNodeContainer": allNodeContainer } */
        toppestViewObject: null,
    },

    init() {
        // 动画 
        var cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        var cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        this.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.defaultAnimSpeed, 255), cc.scaleTo(this.defaultAnimSpeed, 1.0)), cbFadeIn);
        this.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(this.defaultAnimSpeed, 0), cc.scaleTo(this.defaultAnimSpeed, .2)), cbFadeOut);
    },

    /**
     * 执行弹进动画
     * @param {界面根节点(包含黑色蒙版)} pageNode 
     * @param {需要进行缩放的根节点（也就是去掉黑色蒙版后所有子节点父视图）} allNodeContainer 
     */
    startFadeIn(pageNode, allNodeContainer) {
        cc.eventManager.pauseTarget(allNodeContainer, true);
        allNodeContainer.position = cc.p(0, 0);
        allNodeContainer.setScale(.2);
        allNodeContainer.opacity = 0;
        allNodeContainer.runAction(this.actionFadeIn);

        let viewObject = { "pageNode": pageNode, "allNodeContainer": allNodeContainer };
        this.viewQueue.push(viewObject);
        console.log("界面上FadeInFadeOut弹窗层数", this.viewQueue.length);
    },

    /**
     *  弹进动画完成回调
     */
    onFadeInFinish() {
        let index = this.viewQueue.length - 1;
        let viewObject = this.viewQueue[index];
        cc.eventManager.resumeTarget(viewObject.allNodeContainer, true);
    },

    /**
     * 执行弹出动画
     */
    startFadeOut() {
        this.toppestViewObject = this.viewQueue.pop();
        cc.eventManager.pauseTarget(this.toppestViewObject.allNodeContainer, true);
        this.toppestViewObject.allNodeContainer.runAction(this.actionFadeOut);
    },

    /**
     * 弹出动画完成回调
     */
    onFadeOutFinish() {
        this.toppestViewObject.pageNode.active = false;
        this.toppestViewObject = null;
        console.log("界面上FadeInFadeOut弹窗层数", this.viewQueue.length);
    },

});
