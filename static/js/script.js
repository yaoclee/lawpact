// 如果窗口高度+100 < 整个文档的高度，就删除hidden类
// 并且用affix方法为该对象添加affix-top类
$(document).ready(function() {
	if ( ($(window).height() + 1) < $(document).height() ) {
	    $('#top-link-block').removeClass('hidden').affix({
	        // 距离父节点顶部100以后，切换为affix类
	        offset: {top:1}
	    });
	}
});

//百度分享配置
window._bd_share_config=
	{"common":
		{"bdSnsKey":{},
		 "bdText":"",
		 "bdMini":"2",
		 "bdPic":"",
		 "bdStyle":"0",
		 "bdSize":"16"
		},
	 "share":{}
	};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
