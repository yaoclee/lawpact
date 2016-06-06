$(document).ready(function() {
	$('#regiser').validate({
	    rules: {
	      'regiser-account': {
	        required: true,
	        minlength: 5
	      },
	      'regiser-password': {
	        required: true,
	        minlength: 5
	      },
	      'regiser-duplicate-password': {
	        required: true,
	        minlength: 5,
	        equalTo: "#password"
	      },
	      'regiser-email': {
	        required: true,
	        email: true
	      }
	    },
	    messages: {
	      'regiser-account': {
	        required: "请输入账户名称",
	        minlength: "账户名称至少由5个字符"
	      },
	      'regiser-password': {
	        required: "请输入密码",
	        minlength: "密码长度不能小于5个字符"
	      },
	      'regiser-duplicate-password': {
	        required: "请重复输入密码",
	        minlength: "密码长度不能小于5个字符",
	        equalTo: "两次密码输入不一致"
	      },
	      'regiser-email': {
	        required: '请输入您的邮箱',
	        email: '请输入一个合法的邮箱地址'
	      }
	    },
        submitHandler:function(form){
            form.submit();
        },
        errorClass:'input-error',
        validClass:'input-valid'
	});
});

$('div#agreement input[type="checkbox"]').click(function(event) {
	/* Act on the event */
	if ($(this).is(':checked'))
	{
		$('form button[type="submit"]').removeClass('disabled');
	}
	else
	{
		$('form button[type="submit"]').addClass('disabled');
	}
});

$('form button[type="submit"]').click(function(event) {
	if ($(this).is('.disabled'))
	{
		return false;
	}
});

