
/*********************************** 初始化 ***************************************/

var section_num;

/* radio-inner-input初始化 */
function InitRadioInnerInput()
{
	$("input:radio.radio-inner-input").each(function(index, el) {
		var name = $(this).attr("name");
		var value = $(this).val();
		var input = $(this).next("input");

		$("input:radio[name='"+name+"']").click(function(event) {
			/* Act on the event */
			if (value == $("input:radio[name='"+name+"']:checked").val())
			{
				input.show();
			}
			else
			{
				input.hide();
			}
		});
	});
}

function InitDatetimepicker()
{
	$('.date').each(function(index, el) {
		$(this).datetimepicker({
	    	locale: 'zh-cn',
	    	format: 'YYYY年MM月DD日',
	    	dayViewHeaderFormat: 'YYYY MMMM',
	    });
	});
}

$(document).ready(function() {
	InitRadioInnerInput();
	InitDatetimepicker();
	section_num = $('div.section-box').length;
});

/* 设置时间显示 */
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

/*********************************** 添加按钮统一处理 ***************************************/

$(document).ready(function() {
	$('[data-add]').each(function(index, el) {
		var num = 1;
		var html = $(this).html();
		var root = $(this);
		$('#'+$(this).data('add')).click(function(event) {
			/* Act on the event */
			num ++;

			html = html.replace(/[0-9]{3}-[0-9]{3}-[0-9]+/g, function (substr){
				return substr.replace(/[0-9]+$/g, num);
			});

			$(html).appendTo(root);

			/* 刷新inner input */
			InitRadioInnerInput();
			/* 刷新datetimepicker */
			InitDatetimepicker();
		});
	});
});

/*********************************** 表单切换统一处理 ***************************************/
$(document).ready(function() {
	$('[data-switch][data-toggle]').each(function(index, el) {
		var this_element = $(this);

		function ToggleSwitch()
		{
			var value = $("input[name='"+this_element.data("switch")+"']:checked").val()
			if (-1 == this_element.data("toggle").indexOf(value))
			{
				this_element.hide();
			}
			else
			{
				this_element.show();
			}
		}

		ToggleSwitch();

		$("input[name='"+this_element.data("switch")+"']").click(function(event) {
			/* Act on the event */
			ToggleSwitch();
		});
	});
});

/*********************************** 自动填写 ***************************************/

/* 阿拉伯数字转大写汉字 */
function DX(n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
	    return "<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>元整";
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
	    n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
	    n = n.substring(0, p) + n.substr(p+1, 2);
	    unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
	    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

/*********************************** 预览控制 ***************************************/

/* 获取表单取值，没有则返回下横线 */
function GetVal (selector)
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

/* 获取radio或者check的取值，返回一个选择或未选择的符号 */
function GetSelectionVal (radioName, checkVal)
{
	if (checkVal == $("input[name='"+radioName+"']:checked").val())
	{
		/* 选中 */
		return '&#9745;'
	}
	else
	{
		/* 未选中 */
		return '&#9744;'
	}
}

/* 生成预览HTML */
function preview_html()
{
	var index = $('<div class="a4-warpper"></div>').appendTo($('#sample-view'));
	index = $('<div class="a4-paper"></div>').appendTo(index);
	index = $('<div class="a4-margin"></div>').appendTo(index);
	$('<p class="title">电视剧剧本委托创作合同</p>').appendTo(index);
	if ('none'!= $('[data-switch="002-001"][data-toggle="委托方为公司"]').css('display'))
	{
		$('<p>委托方：<u>'+GetVal($('input[name="002-002"]'))+'</u>有限公司(以下简称：“甲方”)</p>').appendTo(index);
		$('<p>负责人姓名：<u>'+GetVal($('input[name="002-003"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-004"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-005"]'))+'</u></p>').appendTo(index);
		$('<p>联系人员：<u>'+GetVal($('input[name="002-006"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-007"]'))+'</u></p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-001"][data-toggle="委托方为工作室"]').css('display'))
	{
		$('<p>委托方：<u>'+GetVal($('input[name="002-008"]'))+'</u>工作室(以下简称：“甲方”)</p>').appendTo(index);
		$('<p>负责人姓名：<u>'+GetVal($('input[name="002-009"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-010"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-011"]'))+'</u></p>').appendTo(index);
		$('<p>联系人员：<u>'+GetVal($('input[name="002-012"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-013"]'))+'</u></p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-001"][data-toggle="委托人为个人"]').css('display'))
	{
		$('<p>委托方：<u>'+GetVal($('input[name="002-014"]'))+'</u></p>').appendTo(index);
		$('<p>证件号码：<u>'+GetVal($('input[name="002-015"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-016"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-017"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-018"]'))+'</u></p>').appendTo(index);
	}
	$('<p><br></p>').appendTo(index);
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为个人"]').css('display'))
	{
		$('<p>受托方：<u>'+GetVal($('input[name="002-020"]'))+'</u>(以下简称：“乙方”)</p>').appendTo(index);
		$('<p>证件号码：<u>'+GetVal($('input[name="002-021"]'))+'</u></p>').appendTo(index);
		$('<p><i>（证件类型：'+GetSelectionVal('002-022', '居民身份证')+'居民身份证、'+GetSelectionVal('002-022', '护照')+'<u>'+GetVal($('input[name="002-023"]'))+'</u>护照、'+GetSelectionVal('002-022', '港澳通行证')+'港澳通行证、'+GetSelectionVal('002-022', '湾居民来往大陆通行证')+'台湾居民来往大陆通行证）</i></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-024"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-025"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-026"]'))+'</u></p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为多个个人的团队"]').css('display'))
	{
		$('<p>受托方：(以下合称：“乙方”或者“受托方”)</p>').appendTo(index);
		for (var i = 1; $('input[name="002-027-'+i+'"]').length>0; i++) 
		{
			$('<p>姓名'+i+'：<u>'+GetVal($('input[name="002-027-'+i+'"]'))+'</u></p>').appendTo(index);
			$('<p>证件号码：<u>'+GetVal($('input[name="002-028-'+i+'"]'))+'</u></p>').appendTo(index);
			$('<p><i>（证件类型：'+GetSelectionVal('002-029-'+i, '居民身份证')+'居民身份证、'+GetSelectionVal('002-029-'+i, '护照')+'<u>'+GetVal($('input[name="002-030-'+i+'"]'))+'</u>护照、'+GetSelectionVal('002-029-'+i, '港澳通行证')+'港澳通行证、'+GetSelectionVal('002-029-'+i, '湾居民来往大陆通行证')+'台湾居民来往大陆通行证）</i></p>').appendTo(index);
		};
		$('<p>乙方代表人：<u>'+GetVal($('input[name="002-031"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-032"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-033"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-034"]'))+'</u></p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为公司"]').css('display'))
	{
		$('<p>受托方：<u>'+GetVal($('input[name="002-035"]'))+'</u>有限公司(以下简称：“乙方”)</p>').appendTo(index);
		$('<p>负责人姓名：<u>'+GetVal($('input[name="002-036"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-037"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-038"]'))+'</u></p>').appendTo(index);
		$('<p>联系人员：<u>'+GetVal($('input[name="002-039"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-040"]'))+'</u></p>').appendTo(index);
		$('<p>证件号码：<u>'+GetVal($('input[name="002-041"]'))+'</u></p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为工作室"]').css('display'))
	{
		$('<p>受托方：<u>'+GetVal($('input[name="002-042"]'))+'</u>影视文化工作室(以下简称：“乙方”)</p>').appendTo(index);
		$('<p>负责人姓名：<u>'+GetVal($('input[name="002-043"]'))+'</u></p>').appendTo(index);
		$('<p>联系地址：<u>'+GetVal($('input[name="002-044"]'))+'</u></p>').appendTo(index);
		$('<p>联系电话：<u>'+GetVal($('input[name="002-045"]'))+'</u></p>').appendTo(index);
		$('<p>联系人员：<u>'+GetVal($('input[name="002-046"]'))+'</u></p>').appendTo(index);
		$('<p>电子邮箱：<u>'+GetVal($('input[name="002-047"]'))+'</u></p>').appendTo(index);
		$('<p>证件号码：<u>'+GetVal($('input[name="002-048"]'))+'</u></p>').appendTo(index);
	}
	$('<p>以下甲方、乙方合称“双方”，单方称“一方”。<br></p>').appendTo(index);
	$('<p><br></p>').appendTo(index);

	$('<p><b>鉴于条款</b></p>').appendTo(index);
	$('<p>依据《中华人民共和国合同》《中华人民共和国著作权法》等法律法规，甲、乙方经协商一致，就乙方接受甲方委托，创作电视连续剧《'+GetVal($('input[name="002-049"]'))+'》（ 暂定名，以下简称“本剧”“项目”）剧本事宜达成如下协议条款，以兹共同遵守及执行：</p>').appendTo(index);

	$('<p class="list"><b>第一条	项目简介</b></p>').appendTo(index);
	$('<p>本项目是一部'+GetVal($('input[name="002-050"]'))+'题材的电视连续剧，共计'+GetVal($('input[name="002-051"]'))+'集，每集时长约'+GetVal($('input[name="002-052"]'))+'分钟（最终的集数和时长以电视剧主管部门审批核准的为准）。</p>').appendTo(index);

	$('<p class="list"><b>第二条	创作内容</b></p>').appendTo(index);
	if ('none'!= $('[data-switch="002-053"][data-toggle="改编型剧本"]').css('display'))
	{
		$('<p>双方一致确定，乙方接受甲方委托依据《'+GetVal($('input[name="002-054"]'))+'》（下称“原著作品”）改编创作如下内容：<u><i>'+GetSelectionVal('002-104', '故事大纲')+'故事大纲、'+GetSelectionVal('002-105', '人物小传')+'人物小传、'+GetSelectionVal('002-106', '分集大纲')+'分集大纲、'+GetSelectionVal('002-107', '分集剧本')+'分集剧本</i></u>以及其他双方一致确定的创作内容。原著作品作者授权书由甲方提供（详见附件）。</p>').appendTo(index);
	}
	else
	{
		$('<p>双方一致确定，乙方接受甲方委托独立创作如下内容：<u><i>'+GetSelectionVal('002-104', '故事大纲')+'故事大纲、'+GetSelectionVal('002-105', '人物小传')+'人物小传、'+GetSelectionVal('002-106', '分集大纲')+'分集大纲、'+GetSelectionVal('002-107', '分集剧本')+'分集剧本</i></u>以及其他双方一致确定的创作内容。</p>').appendTo(index);
	}

	$('<p class="list"><b>第三条	创作要求</b></p>').appendTo(index);
	if ('none'!= $('[data-switch="002-104"][data-toggle="故事大纲"]').css('display'))
	{
		$('<p>故事大纲：故事大纲应表述出剧本的立意，阐明编剧在思想内涵及其外延两个方面的感悟，概括描绘剧本的主要线索、主要事件、基本冲突、主要人物、人物关系的主要纠葛和剧本的总体风格等，字数不应少于'+GetVal($('input[name="002-055"]'))+'字；</p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-105"][data-toggle="人物小传"]').css('display'))
	{
		$('<p>人物小传：即关于电影主要人物的鲜明性格特征、主要经历以及和剧中其他相关人物的纠葛的描写，字数不应少于'+GetVal($('input[name="002-056"]'))+'字，主要人物数量不少于'+GetVal($('input[name="002-057"]'))+'个；</p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-106"][data-toggle="分集大纲"]').css('display'))
	{
		$('<p>分集大纲：即每一集完整的故事框架，应清晰地将剧本的主要情节线条和主要人物进行连接，字数不应少于'+GetVal($('input[name="002-058"]'))+'字；</p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-107"][data-toggle="分集剧本"]').css('display'))
	{
		$('<p>分集剧本：即完整的电影拍摄文字底本，应对每一集的拍摄场景、情节、人物以及对白等一切内容及元素均进行详细描写，字数总计不少于'+GetVal($('input[name="002-059"]'))+'字，每集供拍摄的场景不少于'+GetVal($('input[name="002-060"]'))+'个；</p>').appendTo(index);
	}
	$('<p>其他创作要求：'+GetVal($('textarea[name="002-061"]'))+'。</p>').appendTo(index);

	$('<p class="list"><b>第四条	创作流程</b></p>').appendTo(index);
	if ('none'!= $('[data-switch="002-062"][data-toggle="是"]').css('display'))
	{
		$('<p>创作阶段</p>').appendTo(index);
		$('<p>第一阶段：乙方应于'+GetVal($('input[name="002-063"]'))+'前完成故事大纲及人物小传的初稿并经甲方审核通过。</p>').appendTo(index);
		$('<p>第二阶段：乙方应于'+GetVal($('input[name="002-064"]'))+'前完成分集大纲初稿并经甲方审核通过。</p>').appendTo(index);
		$('<p>第三阶段</p>').appendTo(index);
		for (var i = 1; $('input[name="002-065-'+i+'"]').length>0; i++) 
		{
			$('<p>乙方应于'+GetVal($('input[name="002-065-'+i+'"]'))+'前完成完整第'+GetVal($('input[name="002-066-'+i+'"]'))+'集至第'+GetVal($('input[name="002-067-'+i+'"]'))+'集剧本初稿并经甲方审核通过。</p>').appendTo(index);
		};
		$('<p>双方一致确定原则上前一阶段创作成果未经甲方审核通过前，不得进行后续阶段的创作。如因审核、修改等原因，导致未能在前述期限完成相关阶段创作的，相应期限自动顺延，但双方另行确定创作期限的除外。</p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-062"][data-toggle="否"]').css('display'))
	{
		$('<p>乙方的创作分为3个阶段，按顺序分别为：第一阶段故事大纲及人物小传、第二分集大纲以及第三阶段分集剧本阶段。乙方应于本合同签订之日起'+GetVal($('input[name="002-068"]'))+'日内向甲方交付项目的故事大纲及人物小传，后续阶段的创作期限由双方另行协商确定，但原则上前一阶段创作成果未经甲方审核通过前，乙方不得进行后续阶段的创作。</p>').appendTo(index);
	}

	$('<p class="list"><b>第五条	交付与认可</b></p>').appendTo(index);
	$('<p class="list">5.1	乙方应当以电子邮件的方式向甲方指定的联络人以及指定的电子邮箱交付合同约定的创作成果的可修改、编辑的电子文档。</p>').appendTo(index);
	$('<p class="list">5.2	甲方自收到乙方任意一阶段创作成果之日起'+GetVal($('input[name="002-069"]'))+'日内向乙方提出修改意见，逾期未提出修改意见的视为甲方认可乙方的创作成果。乙方应当在双方确定的修改期限内完成相关创作成果的修改并交付甲方。甲方对剧本的审核通过以甲方明示的书面（含电子邮件方式）确认为准。</p>').appendTo(index);

	$('<p class="list"><b>第六条	创作报酬</b></p>').appendTo(index);
	$('<p class="list">6.1	报酬金额：乙方完成本合同项下之所有工作及义务的，甲方向乙方支付报酬总额为：人民币'+DX($('input[name="002-070"]').val())+'（￥'+GetVal($('input[name="002-070"]'))+'）。</p>').appendTo(index);
	$('<p class="list">6.2	支付期限：</p>').appendTo(index);
	$('<p class="list">6.3	本合同签署之日起'+GetVal($('input[name="002-071"]'))+'日内，甲方向乙方支付稿酬人民币'+DX($('input[name="002-072"]').val())+'（￥'+GetVal($('input[name="002-072"]'))+'）；</p>').appendTo(index);
	$('<p class="list">6.4	甲方审核通过乙方完成的故事大纲和人物小传之日起'+GetVal($('input[name="002-073"]'))+'日内，向支付乙方人民币'+DX($('input[name="002-074"]').val())+'（￥'+GetVal($('input[name="002-074"]'))+'）；</p>').appendTo(index);
	$('<p class="list">6.5	甲方审核通过乙方完成的分集大纲之日起'+GetVal($('input[name="002-075"]'))+'日内，向支付乙方人民币'+DX($('input[name="002-076"]').val())+'（￥'+GetVal($('input[name="002-076"]'))+'）；</p>').appendTo(index);
	var i;
	for (i = 1; $('input[name="002-077-'+i+'"]').length>0; i++) 
	{
		$('<p class="list">6.'+(5+i).toString()+'	甲方审核通过乙方完成的剧本第'+GetVal($('input[name="002-077-'+i+'"]'))+'集至第'+GetVal($('input[name="002-078-'+i+'"]'))+'集之日起'+GetVal($('input[name="002-079-'+i+'"]'))+'内，向甲方支付乙方人民币'+DX($('input[name="002-080-'+i+'"]').val())+'（￥'+GetVal($('input[name="002-080-'+i+'"]'))+'）；</p>').appendTo(index);
	};
	$('<p>税费承担</p>').appendTo(index);
	if ('none'!= $('[data-switch="002-081"][data-toggle="是"]').css('display'))
	{
		if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为个人 受托方为多个个人的团队"]').css('display'))
		{
			$('<p>本条确定的创作报酬为含税金额，乙方收取所有报酬的税费由甲方负责代扣代缴。</p>').appendTo(index);
		}
		if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为公司 受托方为工作室"]').css('display'))
		{
			$('<p>本条确定的创作报酬为含税金额，乙方收任意一笔款项之日起向甲方开具合法有效的'+$('input:radio[name="002-082"]:checked').val()+'。</p>').appendTo(index);
			if ('none'!= $('[data-switch="002-082"][data-toggle="增值税专用发票"]').css('display'))
			{
				$('<p>甲方开票信息如下：</p>').appendTo(index);
				$('<p>开票名称：<u>'+GetVal($('input[name="002-083"]'))+'</u></p>').appendTo(index);
				$('<p>纳税人识别号：<u>'+GetVal($('input[name="002-084"]'))+'</u></p>').appendTo(index);
				$('<p>联系地址：<u>'+GetVal($('input[name="002-085"]'))+'</u></p>').appendTo(index);
				$('<p>联系电话：<u>'+GetVal($('input[name="002-086"]'))+'</u></p>').appendTo(index);
				$('<p>开户银行：<u>'+GetVal($('input[name="002-087"]'))+'</u></p>').appendTo(index);
				$('<p>银行账号：<u>'+GetVal($('input[name="002-088"]'))+'</u></p>').appendTo(index);
			}
		}
	}
	if ('none'!= $('[data-switch="002-081"][data-toggle="否"]').css('display'))
	{
		if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为个人 受托方为多个个人的团队"]').css('display'))
		{
			$('<p>本条确定的创作报酬为不含税金额，乙方收取所有报酬的税费由甲方承担。</p>').appendTo(index);
		}
		if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为公司 受托方为工作室"]').css('display'))
		{
			$('<p>本条确定的创作报酬为不含税金额，甲方支付任意一笔报酬时应当同时向乙方支付该笔款项'+GetVal($('input[name="002-089"]'))+'%的税金。乙方应当自收任意一笔报酬及其税金之日起的'+GetVal($('input[name="002-090"]'))+'日内，甲方开具合法有效的'+$('input:radio[name="002-091"]:checked').val()+'。</p>').appendTo(index);
			if ('none'!= $('[data-switch="002-091"][data-toggle="增值税专用发票"]').css('display'))
			{
				$('<p>甲方开票信息如下：</p>').appendTo(index);
				$('<p>开票名称：<u>'+GetVal($('input[name="002-092"]'))+'</u></p>').appendTo(index);
				$('<p>纳税人识别号：<u>'+GetVal($('input[name="002-093"]'))+'</u></p>').appendTo(index);
				$('<p>联系地址：<u>'+GetVal($('input[name="002-094"]'))+'</u></p>').appendTo(index);
				$('<p>联系电话：<u>'+GetVal($('input[name="002-095"]'))+'</u></p>').appendTo(index);
				$('<p>开户银行：<u>'+GetVal($('input[name="002-096"]'))+'</u></p>').appendTo(index);
				$('<p>银行账号：<u>'+GetVal($('input[name="002-097"]'))+'</u></p>').appendTo(index);
			}
		}
	}
	$('<p class="list">6.'+(5+i).toString()+'	支付方式</p>').appendTo(index);
	$('<p>甲乙双方一致同意将本合同规定之稿酬汇入乙方指定的如下银行：</p>').appendTo(index);
	$('<p>银行名称：<u>'+GetVal($('input[name="002-098"]'))+'</u>。</p>').appendTo(index);
	$('<p>账户名称：<u>'+GetVal($('input[name="002-099"]'))+'</u>。</p>').appendTo(index);
	$('<p>账户号码：<u>'+GetVal($('input[name="002-100"]'))+'</u>。</p>').appendTo(index);

	$('<p class="list"><b>第七条	承诺与保证</b></p>').appendTo(index);
	$('<p class="list">7.1	甲方保证与承诺：</p>').appendTo(index);
	$('<p class="list">7.1.1	甲方担保并声明甲方有完整之权利及授权签署本合同；</p>').appendTo(index);
	$('<p class="list">7.1.2	甲方保证于本合同存续期间内，不签署任何与本合同权益相冲突之合同；</p>').appendTo(index);
	$('<p class="list">7.1.3	甲方保证在本合同签署后'+GetVal($('input[name="002-101"]'))+'年内使用该剧本（拍摄及发行、广播等）；</p>').appendTo(index);
	$('<p class="list">7.1.4	甲方保证在影视剧音像产品上市初赠送乙方音像制品10套，剧照15张，海报5张；</p>').appendTo(index);
	$('<p class="list">7.1.5	其他：'+GetVal($('textarea[name="002-108"]'))+'。</p>').appendTo(index);
	$('<p class="list">7.2	乙方保证与承诺：</p>').appendTo(index);
	$('<p class="list">7.2.1	乙方担保并声明乙方有完整之权利及授权签署本合同，依本合同约定创作的剧本不含有侵犯他人著作权和其他权益的内容。如因上述权利的行使侵犯他人著作权或其他权益，经仲裁机构或者人民法院裁决认定，甲方因此造成的经济损失（给第三方的赔付等），由乙方负责赔偿。</p>').appendTo(index);
	$('<p class="list">7.2.2	乙方保证甲方在本合同生效后在授权地区拥有本合同规定之权利，包括在本合同签定前，未接受任何第三方以与甲方相同的方式创作合同约定之剧本，也不在本合同有效期内为任何第三人创作相同题材的剧本。</p>').appendTo(index);
	$('<p class="list">7.2.3	亲自完成保证</p>').appendTo(index);
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为个人 受托方为多个个人的团队"]').css('display'))
	{
		$('<p>乙方亲自完成甲方委托的全部创作任务，未经甲方书面许可，乙方不得将本合同项下甲方委托的全部或部分创作任务转委托和/或分包给任何第三方。</p>').appendTo(index);
	}
	if ('none'!= $('[data-switch="002-019"][data-toggle="受托方为公司 受托方为工作室"]').css('display'))
	{
		$('<p>任何创作阶段的创作工作及创作成果均由双方一致指定的</p>').appendTo(index);
		for (var i = 1; $('input[name="002-102-'+i+'"]').length>0; i++) 
		{
			$('<p>姓名：<u>'+GetVal($('input[name="002-102-'+i+'"]'))+'</u>、证件号码：<u>'+GetVal($('input[name="002-103-'+i+'"]'))+'</u>；</p>').appendTo(index);
		};
		$('<p>亲自创作完成，未经甲方书面许可，乙方不得将本合同项下甲方委托的全部或部分创作任务转委托和/或分包给任何其他人创作。</p>').appendTo(index);
	}

	$('<p class="list"><b>第八条	保密义务</b></p>').appendTo(index);
	$('<p class="list">8.1	未经相对方书面同意，任何一方不得向任何第三方泄露本合同以及本合同相关的一切信息。若本合同未生效，任何一方不得向任何第三方泄露在签约过程中知悉或者取得的且无法自公开渠道获得的另一方的文件及资料（包括商业秘密、公司计划、运营活动、产品方案等）。</p>').appendTo(index);
	$('<p class="list">8.2	甲乙双方保证在讨论、签订、执行本合同过程中所知悉的属于相对方且无法自公开渠道获得的另一方的文件及资料（包括商业秘密、公司计划、运营活动、产品方案等）予以保密。但法律、法规另有规定或双方另有约定的除外。</p>').appendTo(index);
	$('<p class="list">8.3	在本合同终止后，甲乙双方在本条款项下的义务并不随之终止，双方仍需遵守本合同至保密条款，履行其所承担的保密义务，直至对方同意其解除此项义务，或者事实上不会因违反本合同的保密条款而给对方造成任何形式的损害时为止。</p>').appendTo(index);
	$('<p class="list">8.4	任何一方违反上述保密义务，应当赔偿相对方的损失。</p>').appendTo(index);

	$('<p class="list"><b>第九条	违约责任</b></p>').appendTo(index);
	$('<p>任何一方如违反本协议之规定造成相对方损失的，应就该等损失向相对方（进行赔偿。本款所述之“损失”包括但不限于守约方因违约方的违约行为所支出的诉讼费，仲裁费，律师费，调查取证费用，差旅食宿费用，守约方向其他第三方支付的违约金、赔偿金、补偿金或罚金等）。本协议其他条款规定之违约金不足弥补守约方之损失的，违约方应按守约方的损失予以赔偿。</p>').appendTo(index);

	$('<p class="list"><b>第十条	争议解决</b></p>').appendTo(index);
	$('<p>本合同解释、履行及争议解决均适用中华人民共和国之法律（香港、澳门及台湾地区的法律不包括在内）。双方因合同的解释或履行发生争议，由双方协商解决。协商不成的，任意一方可向被告住所地具有管辖权的人民法院提起诉讼解决。</p>').appendTo(index);

	$('<p class="list"><b>第十一条	标题说明条款</b></p>').appendTo(index);
	$('<p>本协议中的标题仅为检索方便而设置，合同条款的具体内容应当以条款的具体规定为准，而不应参考该标题进行解释。</p>').appendTo(index);

	$('<p class="list"><b>第十二条	不可抗力条款</b></p>').appendTo(index);
	$('<p>本合同所称不可抗力是指受影响一方不能合理控制的，无法预料或即使可预料到也不可避免且无法克服，并于本合同签订日之后出现的，使该方对本合同全部或部分的履行在客观上成为不可能或不实际的任何事件。此等事件包括但不限于自然灾害如水灾、火灾、旱灾、伤病、台风、地震，以及社会事件如战争（不论曾否宣战）、动乱、罢工，政府行为或法律规定等。</p>').appendTo(index);
	$('<p>本合同履行期限内，如因不可抗力事件导致任何一方部分或全部不能履行本合同项下的义务不视为该方违约，该等义务的履行在不可抗力事件妨碍其履行期间应予中止。但声称遭受不可抗力事件的一方应在事件发生之日起5日内通知相对方，并在10日内向对方提供有关机构出具的有效证明文件，并有责任尽全部合理的努力消除或减轻此等不可抗力事件的影响。</p>').appendTo(index);
	$('<p>不可抗力事件或其影响终止或消除后，双方须立即恢复履行各自在本合同项下的各项义务。如不可抗力事件导致合同目的无法实现或者致使合同任何一方丧失继续履行本合同的能力，则任何一方有权以书面通知方式解除本合同。</p>').appendTo(index);

	$('<p class="list"><b>第十三条	变更与修改</b></p>').appendTo(index);
	$('<p>本合同非经甲乙双方书面同意，不得任意修改或变更，如需修改或变更，双方应通过协商达成一致后签订补充合同，作为本合同附件。</p>').appendTo(index);

	$('<p class="list"><b>第十四条	通知与送达</b></p>').appendTo(index);
	$('<p class="list">14.1	乙双方因履行本合同而在双方间发出或者提供的所有通知、文件、资料等（以下统称"通知"），均应按照本合同<b>首部或尾部</b>所列明的联系地址、电子邮箱以邮寄或信誉良好的快递或电子邮件方式送达；一方如果迁址或者变更电子邮箱应当书面通知另两方，否则发至本合同首部所列明的通讯地址或电子邮件系统的通知、文件、资料均视为有效送达。</p>').appendTo(index);
	$('<p class="list">14.2	以邮寄或信誉良好的快递方式送达的，另一方签收（在该地址任何人的签收均视为收件方的授权签收）之日视为送达；签收之日不明确或因收件方无人接收、拒收、迁址导致通知被退回的，以通知递出或者投邮后<b>第五日视为</b>送达。通过电子邮件方式送达的，通知数据电文进入另一方系统之时视为送达；通知数据电文进入另一方系统之时不明确的，以电子邮件发出后的<b>第二日</b>视为送达。</p>').appendTo(index);

	$('<p class="list"><b>第十五条	协议附则</b></p>').appendTo(index);
	$('<p class="list">15.1	<b>协议生效：</b>本补充合同生效后，即成为原合同不可分割的组成部分具有同等的法律效力，与原合同不一致的以本补充合同未转。</p>').appendTo(index);
	$('<p class="list">15.2	<b>补充合同效力：</b>本合同经双方平等协商共同拟定、签署，一式两份，自双方签字或盖章时生效，附件与本合同具有相同法律效力。</p>').appendTo(index);
	$('<p class="list">15.3	<b>合同“日”解释：</b>本合同所指“日”包含本数在内，截止点为当日23点59分59秒。</p>').appendTo(index);

	$('<p class="center">（以下无正文）</p>').appendTo(index);
	$('<p class="center">----（签署页）----</p>').appendTo(index);
	$('<p>甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：</p>').appendTo(index);
	$('<p>授权代表：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;授权代表：</p>').appendTo(index);
	$('<p>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</p>').appendTo(index);
}

/* 生成预览HTML */
$('a[href="#sample-view"]').on('show.bs.tab', function (e){
	preview_html();
})

/* 删除预览HTML */
$('a[href="#sample-view"]').on('hidden.bs.tab', function (e) {
	$('#sample-view').empty();
})

/*********************************** 翻页控制 ***************************************/

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
	if ($('#pagination').css('display') == 'none')
	{
		for (var i=1; i<=section_num; i++)
		{
			$('#section-'+i).show();
		}
	}
	else
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

/*********************************** 合同提交 ***************************************/

/* 为提交给后端的html添加CSS */
function ReplaceCSS(text)
{
	var para_reg = new RegExp('class="para"','g');
	var para_replace = 'style="font-size:14pt;line-height:1.5;text-indent:28pt;text-align:justify"';

	var list_reg = new RegExp('class="list"','g');
	var list_replace = 'style="font-size:14pt;line-height:1.5;padding-left:0.74cm;text-indent:-0.74cm;text-align:justify"';

	var title_reg = new RegExp('class="title"','g');
	var title_replace = 'style="font-size:28pt;font-weight:bold;line-height:1.5;text-align:center"';

	var center_reg = new RegExp('class="center"','g');
	var center_replace = 'style="text-align:center"';

	text = text.replace(para_reg, para_replace);
	text = text.replace(list_reg, list_replace);
	text = text.replace(title_reg, title_replace);
	text = text.replace(center_reg, center_replace);

	return text;
}

/* html提交给后端 */
$('button[type="submit"]').click(function(event) {
	/* 添加html的字符串，提交给后台 */
	preview_html();
	var head = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"></head><body>';
	var html = ReplaceCSS($('div.a4-margin').html());
	//var html = $('div.a4-margin').html();
	$("<input hidden type='text' name='html' value='"+head+html+"</body></html>'>").insertBefore(this);
	$('#sample-view').empty();

	/* 创建合同后默认添加的事件 */
});

/*$("form").submit(function(e){
    e.preventDefault();
    alert("Submit prevented");
});*/

/*********************************** 表单校验 ***************************************/

$(document).ready(function() {
	$('#002').validate({
	    rules: {
	      '002-007': {
	        email: true
	      },
	      '002-013': {
	        email: true
	      },
	      '002-018': {
	        email: true
	      },
	      '002-026': {
	        email: true
	      },
	      '002-034': {
	        email: true
	      },
	      '002-040': {
	        email: true
	      },
	      '002-047': {
	        email: true
	      }
	    },
	    messages: {
	      '002-007': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-013': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-018': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-026': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-034': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-040': {
	        email: "请输入一个合法的邮箱地址"
	      },
	      '002-047': {
	        email: "请输入一个合法的邮箱地址"
	      }
	    },
        submitHandler:function(form){
            form.submit();
        },
        errorClass:'input-error',
        validClass:'input-valid'
	});
});


/*********************************** 移动端界面处理 ***************************************/

//删除所有data-hint，因为在移动端没有悬停，但该属性会占用宽度
function RemoveHint()
{
	if ($('#pagination').css('display') == 'none')
	{
		$('[data-hint]').each(function(index, el) {
			$(this).removeAttr('data-hint');
		});
	}
}

$(document).ready(function() {
	RemoveHint();
});


