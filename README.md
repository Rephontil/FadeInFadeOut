# FadeInFadeOut
FadeInFadeOut效果，基于CocosCreator_JS引擎游戏界面推进退出的展示效果工具，使用简单，对项目无侵害，无任何依赖。

[动画效果看这里](https://upload-images.jianshu.io/upload_images/6418628-61e074f4fb6489aa.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000)
# FadeInFadeOur.js使用方法：
-  ①新建FadeInFadeOur全局实例对象; (注： cc.vv是我的游戏项目中全局对象。这个我是参照麒麟子大神那个开源的幽麟游戏源码，应该不少CocosCreator朋友也这么写的吧(*^^*))
```
/**
* 界面淡入淡出动画效果
*/
let FadeInFadeOur = require("FadeInFadeOur");
cc.vv.fadeInFadeOut = new FadeInFadeOur();
cc.vv.fadeInFadeOut.init();
```

- ②设置界面显示效果;
```
this.shareLayer.active = true;
cc.vv.fadeInFadeOut.startFadeIn(this.shareLayer,  this.shareLayer.getChildByName("share_bg"));
```

- ③设置关闭界面效果。
```
closeBtnOnClicked() {
  cc.vv.fadeInFadeOut.startFadeOut();
},

```


