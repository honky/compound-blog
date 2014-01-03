$(function() {

	$(".language-switch").click(function() {
		$.ajax({
			url: $(this).attr("href"),
			cache: false
		}).done(function() {
			location.reload();
		});
		return false;
	});

});