
//table中select颜色随选项变化
$(document).ready(function() {
    $('table select').css("background-color",$(this).find("option:selected").css("background-color"));
});

$(document).ready(function() {
    $('table select').change(function() {
        $(this).css("background-color",$(this).find("option:selected").css("background-color"));
    });
});

//calendar配置
$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
			    left:   '',
			    center: 'title',
			    right:  'prevYear,prev,today,next,nextYear'
				},

		weekNumbers:true,

        dayClick: function(date, allDay, jsEvent, view) { 
            $('#add-event').on('show.bs.modal', function (event) {
                $('div.modal-dialog h4').text('添加事件');
                $('input[name="id"]').val('');
                $('textarea[placeholder="事件说明"]').val('');
                $('input[placeholder="开始时间"]').val(date.format('YYYY年MM月DD日'));
                $('input[placeholder="结束时间"]').val(date.format('YYYY年MM月DD日'));
                $('input[name="backgroundColor"]').val('');
                $('select[name="ref"]').val('');
                $('button.btn-danger').hide();
            });
            $('#add-event').modal();
        },

        eventClick: function(calEvent, jsEvent, view) {
            $('#add-event').on('show.bs.modal', function (event) {
                $('div.modal-dialog h4').text('编辑事件');
                $('input[name="id"]').val(calEvent.id);
                $('textarea[placeholder="事件说明"]').val(calEvent.title);
                $('input[placeholder="开始时间"]').val(calEvent.start.format('YYYY年MM月DD日'));
                $('input[placeholder="结束时间"]').val(calEvent.end.add(-1, 'day').format('YYYY年MM月DD日'));
                calEvent.end.add(1, 'day');
                $('input[name="backgroundColor"]').val(calEvent.backgroundColor);
                $('select[name="ref"]').val(calEvent.ref);
                $('button.btn-danger').show();
            });
            $('#add-event').modal();
        },

        events: [
            {
                id     : 1,
                title  : 'aaa',
                start  : '2016-04-25',
                end    : '2016-04-27',
                backgroundColor:'rgb(79,246,6)',
                ref    :20
            },
            {
                id     : 2,
                title  : 'bbb',
                start  : '2016-04-26',
                end    : '2016-04-28',
                backgroundColor:'rgb(255,0,0)',
                ref    :30
            }
        ]
    })
});

$('div.modal-footer button.btn-primary').click(function(event) {
    var start = $.fullCalendar.moment($('input[placeholder="开始时间"]').val(), 'YYYY年MM月DD日');
    var end = $.fullCalendar.moment($('input[placeholder="结束时间"]').val(), 'YYYY年MM月DD日');
    end.add(1, 'day');

    if ('' == $('input[name="id"]').val())
    {
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);

        //新建事件
        jQuery.post(
            'url', 
            {
                title:  $('textarea[placeholder="事件说明"]').val(),
                start:  start.format('YYYY-MM-DD'),
                end:    end.format('YYYY-MM-DD'),
                backgroundColor:  'rgb('+r+','+g+','+b+')',
                ref:    $('select[name="ref"]').val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });
    }
    else
    {
        //修改事件
        jQuery.post(
            'url', 
            {
                id:     $('input[name="id"]').val(),
                title:  $('textarea[placeholder="事件说明"]').val(),
                start:  start.format('YYYY-MM-DD'),
                end:    end.format('YYYY-MM-DD'),
                ref:    $('select[name="ref"]').val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });
    }

    $('#add-event').modal('hide');
    $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
});

$('div.modal-footer button.btn-danger').click(function(event) {
    //删除事件
    jQuery.post(
        'url', 
        {
            id:     $('input[name="id"]').val()
        },
        function (data, textStatus, jqXHR){
            alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
        });

    $('#add-event').modal('hide');
    $('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
});

$('a[href="#calendar-view"]').on('shown.bs.tab', function (e) {
	$('#calendar').fullCalendar('render');
})

for (var i=1; i<=2; i++)
{
    $('#datetimepicker'+i).datetimepicker({
        locale: 'zh-cn',
        format: 'YYYY年MM月DD日',
        dayViewHeaderFormat: 'YYYY MMMM',
    });
}

var row_per_page = 10;
var max_row_num = $('table.info tbody').find('tr').length;
var max_page_num = Math.ceil(max_row_num/row_per_page);
var current_page = 1;

function MakeRefOpt()
{
    $('select[name="ref"]').empty();
    for (var i=0; i<max_row_num; i++)
    {
        var value = $('table.info tbody tr:eq('+i+') td:eq(0)').text();
        var text = $('table.info tbody tr:eq('+i+') td:eq(1) input').val();

        $('<option value="'+value+'">'+text+'</option>').appendTo($('select[name="ref"]'));
    }
}

function setPage(tmp_page)
{
    var min_row = tmp_page*row_per_page-row_per_page;
    if (tmp_page == max_page_num)
    {
        var max_row = max_row_num;
    }
    else
    {
        max_row = tmp_page*row_per_page;
    }
    for (var i=0; i<max_row_num; i++)
    {
        if ((i>=min_row)&&(i<max_row))
        {
            $('table.info tbody tr:eq('+i+')').show();
        }
        else
        {
            $('table.info tbody tr:eq('+i+')').hide();
        }
    }

    if (1 >= max_page_num)
    {
        $('button.prev').addClass("disabled");
        $('button.next').addClass("disabled");
    }
    else if (1 == tmp_page)
    {
        $('button.prev').addClass("disabled");
        $('button.next').removeClass("disabled");
    }
    else if (max_page_num == tmp_page)
    {
        $('button.prev').removeClass("disabled");
        $('button.next').addClass("disabled");
    }
    else
    {
        $('button.prev').removeClass("disabled");
        $('button.next').removeClass("disabled");
    }

    if (0 == max_row_num)
    {
        $('table.info caption').text('您共有'+max_row_num+'份合同');
    }
    else
    {
        $('table.info caption').text('您共有'+max_row_num+'份合同，显示第'+(min_row+1)+'-'+max_row+'份合同...');
    }
}

function setPrev()
{
    if (current_page > 1)
    {
        current_page --;
        setPage(current_page);
    }
}

function setNext()
{
    if (current_page < max_page_num)
    {
        current_page ++;
        setPage(current_page);
    }
}

$('button.prev').click(function(event) {
    setPrev();
});

$('button.next').click(function(event) {
    setNext();
});

$(document).ready(function() {
    setPage(1);
    MakeRefOpt();
});

$('table.info tbody button.delete').each(function(index, el) {
    $(this).click(function(event) {
        //删除合同
        jQuery.post(
            'url', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });

        id:$(this).parents('tr').remove();
        max_row_num --;
        max_page_num = Math.ceil(max_row_num/row_per_page);
        if (current_page > max_page_num)
        {
            current_page = max_page_num;
        }
        setPage(current_page);
        MakeRefOpt();
    });
});

$('table.info tbody input[name="lable"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改lable
        jQuery.post(
            'url', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                lable:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });
    });
});

$('table.info tbody input[name="name"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改name
        jQuery.post(
            'url', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                name:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });
    });
});

$('table.info tbody select[name="status"]').each(function(index, el) {
    $(this).change(function(event) {
        //修改status
        jQuery.post(
            'url', 
            {
                id:$(this).parents('tr').children('td:eq(0)').text(),
                status:$(this).val()
            },
            function (data, textStatus, jqXHR){
                alert($(this).parents('tr').children('td:eq(0)').text()+'被成功删除');
            });
    });
});

$('button.search_btn').click(function(event) {
    var search_text=$('input[type="search"]').val();

    if ('' == search_text)
    {
        //显示所有合同
        setPage(1);
    }
    else
    {
        $('table.table.info tbody').children().each(function(index, el) {
            var id = $(this).children('td:eq(0)').text();
            var name = $(this).find('input[name="name"]').val();
            var type = $(this).children('td:eq(2)').text();
            var state = $(this).children('td:eq(3)').text();
            var status = $(this).find('select').val();
            var tag = $(this).find('input[name="lable"]').val();

            if ((id.match(search_text)) ||
                (name.match(search_text)) ||
                (type.match(search_text)) ||
                (state.match(search_text)) ||
                (status.match(search_text)) ||
                (tag.match(search_text))
                )
            {
                $(this).show();
            }
            else
            {
                $(this).hide();
            }
        });
        $('button.prev').addClass("disabled");
        $('button.next').addClass("disabled");
        $('caption').text("");
    }
});

$('input[type="search"]').keypress(function(event) {
    if (13 == event.keyCode)
    {
        $('button.search_btn').click();
    }
});

