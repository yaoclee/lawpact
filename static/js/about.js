$('.nav-stacked > li > a').each(function(index, el) {
	$(this).click(function(event) {
		var correct = $(this);
		correct.parent().addClass('active');
		$('.nav-stacked > li > a').each(function(index, el) {
			var index = $(this);
			if (!index.is(correct))
			{
				index.parent().removeClass('active');
			}
		});
	});
});