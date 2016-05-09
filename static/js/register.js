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
            alert("提交事件!");   
            form.submit();
        },
        errorClass:'input-error',
        validClass:'input-valid',
		errorPlacement: function(error, element) {  
		    var index = error.appendTo(element.parent());
		    $(index).removeClass('input-error');
		}
	});
});

