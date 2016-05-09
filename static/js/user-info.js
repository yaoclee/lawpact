$("input:radio[name='change-passwaord']").click(function(event) {
	var value = $("input:radio[name='change-passwaord']:checked").val();
	if ("修改" == value)
	{
		$("#origin-password").show();
		$("#new-password").show();
		$("#re-new-password").show();
	}
	else
	{
		$("#origin-password").hide();
		$("#new-password").hide();
		$("#re-new-password").hide();
	}
});
