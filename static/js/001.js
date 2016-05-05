var section_num = 11;
var datetimepicker_num = 8;


for (var i=1; i<=datetimepicker_num; i++)
{
	$('#datetimepicker'+i).datetimepicker({
    	locale: 'zh-cn',
    	format: 'YYYY年MM月DD日',
    	dayViewHeaderFormat: 'YYYY MMMM',
    });
}

$(document).ready(function() {
	$("#001-019").hide()
	$("#001-023").hide()
	$("#001-032").hide()
	$("#001-036-2").hide()
	$("#001-036-3").hide()
	$("#001-065").hide()
});

$("input:radio[name='001-019']").click(function(event) {
	var value = $("input:radio[name='001-019']:checked").val();
	if ("出版" == value)
	{
		$("#001-019").show();
	}
	else
	{
		$("#001-019").hide()
	}
});

$("input:radio[name='001-023']").click(function(event) {
	var value = $("input:radio[name='001-023']:checked").val();
	if ("已登记" == value)
	{
		$("#001-023").show();
	}
	else
	{
		$("#001-023").hide()
	}
});

$("input:radio[name='001-032']").click(function(event) {
	var value = $("input:radio[name='001-032']:checked").val();
	if ("有" == value)
	{
		$("#001-032").show();
	}
	else
	{
		$("#001-032").hide()
	}
});

$("input:radio[name='001-036']").click(function(event) {
	var value = $("input:radio[name='001-036']:checked").val();
	if ("一次性支付" == value)
	{
		$("#001-036-1").show()
		$("#001-036-2").hide()
		$("#001-036-3").hide()
	}
	else if ("分两期支付" == value)
	{
		$("#001-036-1").hide()
		$("#001-036-2").show()
		$("#001-036-3").hide()
	}
	else
	{
		$("#001-036-1").hide()
		$("#001-036-2").hide()
		$("#001-036-3").show()
	}
});

$("input:radio[name='001-065']").click(function(event) {
	var value = $("input:radio[name='001-065']:checked").val();
	if ("含税" == value)
	{
		$("#001-065").show()
	}
	else
	{
		$("#001-065").hide()
	}
});

$("input[name=001-015]").change(function(event) {
	$("input[name=001-068]").val($("input[name=001-015]").val())
});

$("input[name=001-016]").change(function(event) {
	$("input[name=001-067]").val($("input[name=001-016]").val())
});

$("input[name=001-043]").change(function(event) {
	if (("" != $("input[name=001-042]").val()) && ("" != $("input[name=001-043]").val()))
	{
		if ((!isNaN($("input[name=001-042]").val())) && (!isNaN($("input[name=001-043]").val())))
		{
			$("input[name=001-044]").val($("input[name=001-042]").val()*$("input[name=001-043]").val()/100)
		}
	}
});

$("input[name=001-046]").change(function(event) {
	if (("" != $("input[name=001-042]").val()) && ("" != $("input[name=001-046]").val()))
	{
		if ((!isNaN($("input[name=001-042]").val())) && (!isNaN($("input[name=001-046]").val())))
		{
			$("input[name=001-047]").val($("input[name=001-042]").val()*$("input[name=001-046]").val()/100)
		}
	}
});

$("input[name=001-053]").change(function(event) {
	if (("" != $("input[name=001-052]").val()) && ("" != $("input[name=001-053]").val()))
	{
		if ((!isNaN($("input[name=001-052]").val())) && (!isNaN($("input[name=001-053]").val())))
		{
			$("input[name=001-054]").val($("input[name=001-052]").val()*$("input[name=001-053]").val()/100)
		}
	}
});

$("input[name=001-056]").change(function(event) {
	if (("" != $("input[name=001-052]").val()) && ("" != $("input[name=001-056]").val()))
	{
		if ((!isNaN($("input[name=001-052]").val())) && (!isNaN($("input[name=001-056]").val())))
		{
			$("input[name=001-057]").val($("input[name=001-052]").val()*$("input[name=001-056]").val()/100)
		}
	}
});

$("input[name=001-059]").change(function(event) {
	if (("" != $("input[name=001-052]").val()) && ("" != $("input[name=001-059]").val()))
	{
		if ((!isNaN($("input[name=001-052]").val())) && (!isNaN($("input[name=001-059]").val())))
		{
			$("input[name=001-060]").val($("input[name=001-052]").val()*$("input[name=001-059]").val()/100)
		}
	}
});

function getVal (selector)
{
	if ('' != selector.val())
	{
		return selector.val();
	}
	else
	{
		return '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>';
	}
}

/* 生成预览HTML */
$('a[href="#sample-view"]').on('show.bs.tab', function (e) {
	var index = $('<div class="a4-warpper"></div>').appendTo($('#sample-view'));
	index = $('<div class="a4-paper"></div>').appendTo(index);
	index = $('<div class="a4-margin"></div>').appendTo(index);
	$('<p class="title">文学作品改编许可合同</p>').appendTo(index);
	$('<p>许可方：(以下简称：“甲方”)：<u>'+getVal($('input[name="001-001"]'))+'</u></p>').appendTo(index);
	$('<p>法定代表人/负责人/证件号码：<u>'+getVal($('input[name="001-002"]'))+getVal($('input[name="001-003"]'))+'</u></p>').appendTo(index);
	$('<p>联系地址：<u>'+getVal($('textarea[name="001-004"]'))+'</u></p>').appendTo(index);
	$('<p>联系电话：<u>'+getVal($('input[name="001-005"]'))+'</u></p>').appendTo(index);
	$('<p>代理人员：<u>'+getVal($('input[name="001-006"]'))+'</u></p>').appendTo(index);
	$('<p>电子邮箱：<u>'+getVal($('input[name="001-007"]'))+'</u></p>').appendTo(index);
	$('<p><br></p>').appendTo(index);
	$('<p>被许可方：(以下简称：“乙方”)：<u>'+getVal($('input[name="001-008"]'))+'</u></p>').appendTo(index);
	$('<p>法定代表人/负责人/证件号码：<u>'+getVal($('input[name="001-009"]'))+getVal($('input[name="001-010"]'))+'</u></p>').appendTo(index);
	$('<p>联系地址：<u>'+getVal($('textarea[name="001-011"]'))+'</u></p>').appendTo(index);
	$('<p>联系电话：<u>'+getVal($('input[name="001-012"]'))+'</u></p>').appendTo(index);
	$('<p>委托人员：<u>'+getVal($('input[name="001-013"]'))+'</u></p>').appendTo(index);
	$('<p>电子邮箱：<u>'+getVal($('input[name="001-014"]'))+'</u></p>').appendTo(index);
	$('<p><br></p>').appendTo(index);
	$('<p><b>鉴于</b>甲、乙方经协商一致，就甲方将其依法拥有著作权的文学作品的相关著作权许可乙方行使之事宜签订如下合同：</p>').appendTo(index);
	$('<p class="list"><b>第一条	定义</b></p>').appendTo(index);
	$('<p class="list">1.1	作品类型：</p>').appendTo(index);
	$('<p class="list">1.1.1	<b>电视连续剧</b>：是指以类似摄制电影方法摄制并取得中国广播影视行政部门颁发的《电视剧发行许可证》的（立场条款）电视连续剧。电视剧主要通过电视台以有线或无线的方式发射信号、通过电视机为信号接收装置并播放，随着科技的发展，电视剧也可在电脑、手机终端上播映，在互联网上在线点播播映。本协议所指的“电视剧”不包括以动画等非真人表演形式摄制和制作的动画电视连续剧等的视听作品。</p>').appendTo(index);
	$('<p class="list">1.1.2	<b>电影</b>：是根据视觉暂留原理，运用照相和录音技术把真人真景的影像和声音连续摄录在胶片上，通过放映来还原影像、声音，使人能在银幕上看见连续活动影像的一门综合性艺术。此处“电影”排除“动画电影”。</p>').appendTo(index);
	$('<p class="list">1.1.3	<b>影视文学剧本</b>：本协议所指的影视文学剧本包括电影文学剧本、电视剧文学剧本、微电影文学剧本及网络剧文学剧本。</p>').appendTo(index);
	$('<p class="list">1.2	权利许可类型：</p>').appendTo(index);
	$('<p class="list">1.2.1	一般性许可：是指授权方授予领权方以非独占、非排他的方式行使所授予的权利的授权行使，在协议授权期限内，授权方可以将其授予甲方行使的权利再授予除甲方之外的第三方行使，且授权方本身亦可以行使该等权利。</p>').appendTo(index);
	$('<p class="list">1.2.2	排他性许可：是指授权方授予领权方以排他的方式行使所授予的权利的授权形式，即在协议授权期限内，授权方不得将其授予甲方行使的权利再授予除甲方之外的第三方行使，但授权方本身可以行使该等权利。</p>').appendTo(index);
	$('<p class="list">1.2.3	独占专有性许可：是指许可方授予被许可方以独占的方式行使所授予的权利的许可形式，即在本协议许可期限内，许可方不得将其授予甲方行使的权利再授予除甲方之外的第三方行使，且许可方本身亦不得行使该等权利。</p>').appendTo(index);
	$('<p class="list">1.3	其他</p>').appendTo(index);
	$('<p class="list">1.3.1	<b>中国大陆</b>：本协议所指的中国大陆是指中华人民共和国境内，不包括香港、澳门特别行政区及台湾地区。</p>').appendTo(index);
	$('<p class="list">1.3.2	<b>一方及双方</b>：本协议所称的一方是指甲乙两方的任意一方，双方是指甲方和乙方。</p>').appendTo(index);
	$('<p class="list"><b>第二条	许可作品</b></p>').appendTo(index);

	var tmpStr = '《'+getVal($('input[name="001-015"]'))+'》';
	tmpStr = tmpStr+'是由'+getVal($('input[name="001-016"]'))+'于'+getVal($('input[name="001-017"]'))+'前';
	tmpStr = tmpStr+getVal($('input[name="001-018"]'))+'创作完成的文学作品(下称“许可作品”)。';
	if ('出版'==$("input:radio[name='001-019']:checked").val())
	{
		tmpStr = tmpStr+'于'+getVal($("input[name='001-020']"));
		tmpStr = tmpStr+'由'+getVal($("input[name='001-021']"))+'首次出版发行，';
		tmpStr = tmpStr+'许可作品的书号为：'+getVal($("input[name='001-022']"))+'。';
		if ('已登记'==$("input:radio[name='001-023']:checked").val())
		{
			tmpStr = tmpStr+'于'+getVal($("input[name='001-024']"))+'完成著作权登记';
			tmpStr = tmpStr+'（登记号为：'+getVal($("input[name='001-025']"))+'）。';
		}
	}
	$('<p class="para">'+tmpStr+'</p>').appendTo(index);

	$('<p class="list"><b>第三条	许可内容</b></p>').appendTo(index);
	$('<p class="list">3.1	许可权利</p>').appendTo(index);

	tmpStr = '甲方授权乙方享有自'+getVal($("input[name='001-026']"))+'起至'+getVal($("input[name='001-027']"));
	tmpStr = tmpStr+'止在'+getVal($("input[name='001-028']"));
	tmpStr = tmpStr+'将许可作品改编成'+getVal($("input[name='001-029']"))+'等';
	tmpStr = tmpStr+getVal($("input[name='001-030']"))+'的权利。';
	$('<p class="para">'+tmpStr+'</p>').appendTo(index);

	$('<p class="list">3.2	附属权利</p>').appendTo(index);
	$('<p class="para">实现前述改编作品及其摄制相关的事项所必须的复制权、翻译权等附属权利，前述附属许可权利的性质为'+getVal($("input[name='001-031']"))+'的权利。</p>').appendTo(index);
	$('<p class="list">3.3	转许可权 </p>').appendTo(index);

	tmpStr = '本合同规定的许可权利，在本合同规定的许可期限及范围内，甲方'+getVal($("input[name='001-032']"))+'权将许可权利转许可其他第三方行使。';
	if ('有' == $("input[name='001-032']").val())
	{
		tmpStr = tmpStr+'甲方应当在转许可事项确定之日起'+getVal($("input[name='001-033']"))+'日内将转许可事项书面通知甲方。';
	}
	$('<p class="para">'+tmpStr+'</p>').appendTo(index);

	$('<p class="list"><b>第四条	作品交付</b></p>').appendTo(index);
	$('<p class="para">本协议签订之日起'+getVal($("input[name='001-034']"))+'个工作日内，甲方向乙方交付许可作品，交付要求如下：</p>').appendTo(index);
	$('<p class="para">a)	完整的可编辑的电子稿件（word或者TXT格式）一套；</p>').appendTo(index);
	$('<p class="para">b)	完整的资质打印件一套或者正式出版物一套。</p>').appendTo(index);
	if ('' != $("textarea[name='001-035']").val())
	{
		$('<p class="para">c)	'+$("textarea[name='001-035']").val()+'</p>').appendTo(index);
	}

	$('<p class="list"><b>第五条	许可费用</b></p>').appendTo(index);
	switch ($("input[name='001-036']").val())
	{
	case '一次性支付':
		$('<p class="list">5.1	一次性支付</p>').appendTo(index);
		$('<p class="para">乙方于本合同签订之日起'+getVal($("input[name='001-037']"))+'日内，一次性向甲方指定账户支付许可费用人民币'+getVal($("input[name='001-038']"))+'万元。甲方指定收款账户如下：'+'</p>').appendTo(index);
		$('<p>户&nbsp;&nbsp;&nbsp;&nbsp;名：'+getVal($("input[name='001-039']"))+'</p>').appendTo(index);
		$('<p>开户行：'+getVal($("input[name='001-040']"))+'</p>').appendTo(index);
		$('<p>账&nbsp;&nbsp;&nbsp;&nbsp;号：'+getVal($("input[name='001-041']"))+'</p>').appendTo(index);
		break;
	case '分两期支付':
		$('<p class="list">5.1	分两期支付</p>').appendTo(index);
		tmpStr = '乙方获得本合同规定的许可权利须向甲方支付许可费用人民币'+getVal($("input[name='001-042']"))+'万元。';
		tmpStr = tmpStr+'前述许可费用分二期支付，第一期款为许可费用的'+getVal($("input[name='001-043']"))+'%';
		tmpStr = tmpStr+'（即人民币'+getVal($("input[name='001-044']"))+'万元 ），';
		tmpStr = tmpStr+'于本合同签订之日起'+getVal($("input[name='001-045']"))+'个工作日内支付，';
		tmpStr = tmpStr+'第二期款为许可费用的'+getVal($("input[name='001-046']"))+'%';
		tmpStr = tmpStr+'（即人民币'+getVal($("input[name='001-047']"))+'万元 ），';
		tmpStr = tmpStr+'于'+getVal($("input[name='001-048']"))+'前支付。甲方指定收款账户如下：';
		$('<p class="para">'+tmpStr+'</p>').appendTo(index);

		$('<p>户&nbsp;&nbsp;&nbsp;&nbsp;名：'+getVal($("input[name='001-049']"))+'</p>').appendTo(index);
		$('<p>开户行：'+getVal($("input[name='001-050']"))+'</p>').appendTo(index);
		$('<p>账&nbsp;&nbsp;&nbsp;&nbsp;号：'+getVal($("input[name='001-051']"))+'</p>').appendTo(index);
		break;
	case '分三期支付':
		$('<p class="list">5.1	分三期支付</p>').appendTo(index);
		tmpStr = '乙方获得本合同规定的许可权利须向甲方支付许可费用人民币'+getVal($("input[name='001-052']"))+'万元。';
		tmpStr = tmpStr+'前述许可费用分三期支付，第一期款为许可费用的'+getVal($("input[name='001-053']"))+'%';
		tmpStr = tmpStr+'（即人民币'+getVal($("input[name='001-054']"))+'万元 ），';
		tmpStr = tmpStr+'于本合同签订之日起'+getVal($("input[name='001-055']"))+'个工作日内支付，';
		tmpStr = tmpStr+'第二期款为许可费用的'+getVal($("input[name='001-056']"))+'%';
		tmpStr = tmpStr+'（即人民币'+getVal($("input[name='001-057']"))+'万元 ），';
		tmpStr = tmpStr+'于'+getVal($("input[name='001-058']"))+'前支付，';
		tmpStr = tmpStr+'第三期款为许可费用的'+getVal($("input[name='001-059']"))+'%';
		tmpStr = tmpStr+'（即人民币'+getVal($("input[name='001-060']"))+'万元 ），';
		tmpStr = tmpStr+'于'+getVal($("input[name='001-061']"))+'前支付。甲方指定收款账户如下：';
		$('<p class="para">'+tmpStr+'</p>').appendTo(index);

		$('<p>户&nbsp;&nbsp;&nbsp;&nbsp;名：'+getVal($("input[name='001-062']"))+'</p>').appendTo(index);
		$('<p>开户行：'+getVal($("input[name='001-063']"))+'</p>').appendTo(index);
		$('<p>账&nbsp;&nbsp;&nbsp;&nbsp;号：'+getVal($("input[name='001-064']"))+'</p>').appendTo(index);
		break;
	default:
		break;
	}

	$('<p class="list">5.2	税费承担</p>').appendTo(index);
	if ('含税' == $("input[name='001-065']").val())
	{
		$('<p class="para">双方一致确定前款规定的许可费用为含税金额，相关的税费（金额为：'+getVal($("input[name='001-075']"))+'元）由乙方予以代扣代缴。</p>').appendTo(index);
	}
	else
	{
		$('<p class="para">双方一致确定前款规定的许可费用为税后金额，因本合同产生的所有税费均由甲方承担，并由乙方负责缴纳。</p>').appendTo(index);
	}

	$('<p class="list"><b>第六条	知识产权归属</b></p>').appendTo(index);
	$('<p class="list">6.1	新作品权属</p>').appendTo(index);
	$('<p class="para">乙方在本同规定的许可期限内改编所得的影视文学剧本及摄制所得的'+getVal($("input[name='001-066']"))+'等作品的著作权及相关权益由甲方独立享有。乙方行使和处分前述改编及摄制所得的作品的著作权时无需另行获得甲方的许可及支付任何费用。</p>').appendTo(index);
	$('<p class="list">6.2	甲方署名</p>').appendTo(index);
	$('<p class="para">双方确定在乙方根据许可作品改编并摄制的电影、电视剧等影视作品中以“本剧/片改编自'+getVal($("input[name='001-067']"))+'的《'+getVal($("input[name='001-068']"))+'》文学作品”的方式为甲方署名。</p>').appendTo(index);
	$('<p class="list"><b>第七条	权利义务</b></p>').appendTo(index);
	$('<p class="list">7.1	权利保证：许可作品系本合同确定的作者独立创作完成，不含有任何侵犯他人知识产权及其他合法权益的内容，未设置任何抵押、担保、质押等可能与本合同许可权利冲突的第三方权益，在许可期限内与乙方取得的许可权利相冲突的权利，否则因此给乙方造成的损失亦由甲方负责赔偿。</p>').appendTo(index);
	$('<p class="list">7.2	优先权：本合同规定的许可权利在同等交易条件下（包括但不限于价格、付款方式及期限等），在本合同许可期限届满后乙方享优先续约权。</p>').appendTo(index);
	$('<p class="list">7.3	宣传义务：在乙方提前'+getVal($("input[name='001-069']"))+'日通知的情况下，甲方愿意参加乙方就许可作品改编的影视剧项目的宣传推广活动，因此产生的所有差旅费用由甲方承担。同时，甲方许可乙方在前述改编的影视项目的宣传推广中使用甲方的肖像及姓名（包括笔名）。</p>').appendTo(index);
	$('<p class="list">7.4	乙方保证根据本合同规定按期足额的支付任何费用及款项。</p>').appendTo(index);
	$('<p class="list">7.5	乙方保证对许可作品行使的任何改编应当忠于原著，不得篡改或歪曲许可作品。</p>').appendTo(index);
	$('<p class="list">7.6	保证独创且不侵犯任何人的权利，保证享有签订及履行本合同的权利，保证乙方行使因本合同所取得的所有权利不会侵害任何人的知识产权及任何合法权益。</p>').appendTo(index);
	$('<p class="list"><b>第八条	违约责任</b></p>').appendTo(index);
	$('<p class="list">8.1	乙方未如期向甲方支付许可费用的，每逾期一日，应向乙方支付逾期款项的'+getVal($("input[name='001-070']"))+'‰作为逾期付款违约金。</p>').appendTo(index);
	$('<p class="list">8.2	任何一方如违反本协议之规定造成相对方损失的，应就该等损失向相对方（进行赔偿。本款所述之“损失”包括但不限于守约方因违约方的违约行为所支出的诉讼费，仲裁费，律师费，调查取证费用，差旅食宿费用，守约方向其他第三方支付的违约金、赔偿金、补偿金或罚金等）。本协议其他条款规定之违约金不足弥补守约方之损失的，违约方应按守约方的损失予以赔偿。</p>').appendTo(index);
	$('<p class="list"><b>第九条	合同解除</b></p>').appendTo(index);
	$('<p class="list">9.1	经双方协商一致，可以解除本合同。</p>').appendTo(index);
	$('<p class="list">9.2	如下情形，甲方有权单方解除本合同：</p>').appendTo(index);
	$('<p>（1）乙方违反本协议约定，经甲方书面催告履约后'+getVal($("input[name='001-071']"))+'日后仍不停止违约行为、未恢复履行的，或已无法恢复履行的；</p>').appendTo(index);
	$('<p>（2）乙方逾期支付许可费用'+getVal($("input[name='001-072']"))+'日以上的。</p>').appendTo(index);
	$('<p class="list">9.3	如下情形，乙方有权解除本合同：</p>').appendTo(index);
	$('<p>甲方的承诺或保证失实导致本合同目的无法实现的；</p>').appendTo(index);
	$('<p>许可作品侵犯他人知识产权或合法权利导致本合同目的无法实现的；</p>').appendTo(index);
	$('<p>甲方拒绝或逾期交付许可作品导致甲方无法获取许可作品的；</p>').appendTo(index);
	$('<p>其他甲方有权解除合同的情形。</p>').appendTo(index);
	$('<p class="list"><b>第十条	法律适用</b></p>').appendTo(index);
	$('<p class="para">本合同解释、履行及争议解决均适用中华人民共和国之法律（香港、澳门及台湾地区的法律不包括在内）。</p>').appendTo(index);
	$('<p class="list"><b>第十一条	争议解决</b></p>').appendTo(index);
	$('<p class="para">双方因合同的解释或履行发生争议，由双方协商解决。协商不成由被告住所地具有管辖权的人民法院起诉。</p>').appendTo(index);
	$('<p class="list"><b>第十二条	标题意义</b></p>').appendTo(index);
	$('<p class="para">本协议中的标题仅为检索方便而设置，合同条款的具体内容应当以条款的具体规定为准，而不应参考该标题进行解释。</p>').appendTo(index);
	$('<p class="list"><b>第十三条	不可抗力</b></p>').appendTo(index);
	$('<p class="list">13.1	本合同履行期限内，如因不可抗力事件导致任何一方部分或全部不能履行本合同项下的义务不视为该方违约，该等义务的履行在不可抗力事件妨碍其履行期间应予中止。但声称遭受不可抗力事件的一方应在事件发生之日起3日内通知相对方，并在7日内向对方提供有关机构出具的有效证明文件，并有责任尽全部合理的努力消除或减轻此等不可抗力事件的影响。</p>').appendTo(index);
	$('<p class="list">13.2	不可抗力事件或其影响终止或消除后，双方须立即恢复履行各自在本合同项下的各项义务。如不可抗力事件导致合同目的无法实现或者致使合同任何一方丧失继续履行本合同的能力，则任何一方有权以书面通知方式解除本合同。</p>').appendTo(index);
	$('<p class="list"><b>第十四条	通知送达</b></p>').appendTo(index);
	$('<p class="list">14.1	乙双方因履行本合同而在双方间发出或者提供的所有通知、文件、资料等（以下统称"通知"），均应按照本合同首部或尾部所列明的联系地址、电子邮箱以邮寄或信誉良好的快递或电子邮件方式送达；一方如果迁址或者变更电子邮箱应当书面通知另两方，否则发至本合同首部所列明的通讯地址或电子邮件系统的通知、文件、资料均视为有效送达。</p>').appendTo(index);
	$('<p class="list">14.2	以邮寄或信誉良好的快递方式送达的，另一方签收（在该地址任何人的签收均视为收件方的授权签收）之日视为送达；签收之日不明确或因收件方无人接收、拒收、迁址导致通知被退回的，以通知递出或者投邮后第五日视为送达。通过电子邮件方式送达的，通知数据电文进入另一方系统之时视为送达；通知数据电文进入另一方系统之时不明确的，以电子邮件发出后的第二日视为送达。　</p>').appendTo(index);
	$('<p class="list"><b>第十五条	附则</b></p>').appendTo(index);
	$('<p class="list">15.1	本补充合同生效后，即成为原合同不可分割的组成部分具有同等的法律效力，与原合同不一致的以本补充合同未转。</p>').appendTo(index);
	$('<p class="list">15.2	本合同经双方平等协商共同拟定、签署，一式'+getVal($("input[name='001-073']"))+'份，自双方签字或盖章时生效，附件与本合同具有相同法律效力。</p>').appendTo(index);
	$('<p class="list">15.3	本合同所指“日”包含本数在内，截止点为当日23点59分59秒。</p>').appendTo(index);
	$('<p>（以下无正文）</p>').appendTo(index);
	$('<p>甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：</p>').appendTo(index);
	$('<p>授权代表：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;授权代表：</p>').appendTo(index);
	$('<p>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</p>').appendTo(index);
})

/* 删除预览HTML */
$('a[href="#sample-view"]').on('hidden.bs.tab', function (e) {
	$('#sample-view').empty();
})

function setTime()
{
	var d=new Date();
	var month=new Array(12);
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";

	var string = month[d.getMonth()]+' '+d.getDate()+', '+d.getHours()+':'+d.getMinutes();
	$('#time').html(string);

	setTimeout('setTime()',500);
}

function setProgress(tmpI)
{
	var percentage = Math.ceil(100/section_num*(tmpI));
	if (tmpI == section_num)
	{
		percentage = 100;
	}

	$('div.progress-bar').attr('aria-valuenow', percentage);
	$('div.progress-bar').text(percentage+'%');
	$('div.progress-bar').css('width', percentage+'%');
}

function setPage(tmpI)
{
	for (var i=1; i<=section_num; i++)
	{
		if (tmpI == i)
		{
			$('#section-'+i).show();
		}
		else
		{
			$('#section-'+i).hide();
		}
	}

	if (1 == tmpI)
	{
		$('button.prev').addClass("disabled");
		$('button.next').removeClass("disabled");
	}
	else if (section_num == tmpI)
	{
		$('button.prev').removeClass("disabled");
		$('button.next').addClass("disabled");
	}
	else
	{
		$('button.prev').removeClass("disabled");
		$('button.next').removeClass("disabled");
	}
	setProgress(tmpI);
}

function setPrev()
{
	for (var i=1; i<=section_num; i++)
	{
		if($('#section-'+i).is(':visible'))
		{
			break;
		}
	}

	if (i > 1)
	{
		setPage(i-1);
	}
}

function setNext()
{
	for (var i=1; i<=section_num; i++)
	{
		if($('#section-'+i).is(':visible'))
		{
			break;
		}
	}

	if (i < section_num)
	{
		setPage(i+1);
	}
}

$('button.prev').click(function(event) {
	setPrev();
});

$('button.next').click(function(event) {
	setNext();
});

$(document).ready(function() {
	setTime();
	setPage(1);
});




