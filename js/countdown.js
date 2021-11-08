(function ($) {
	$.fn.countdown = function (options, callback) {
		var $self = $(this);

		var settings = {
			'date': null,
		}

		if (options) {
			$.extend(settings, options);
		}

		// parse date (only once)
		$self.eventDate = Date.parse(settings.date) / 1000;
		$self.$metric = $self.find('.metric');
		$self.$unit = $self.find('.unit');
		$self.templates = {
			metric: $self.$metric.clone(),
			unit: $self.$unit.clone()
		};

		function countdownProcessor() {
			var eventDate = $self.eventDate;
			var currentDate = Math.floor($.now() / 1000);

			if (eventDate <= currentDate) {
				clearInterval(interval);
				callback.call(this);

			} else {
				var secondsBetween = eventDate - currentDate;

				var days = Math.floor(secondsBetween / (60 * 60 * 24));
				secondsBetween -= days * 60 * 60 * 24;

				var hours = Math.floor(secondsBetween / (60 * 60));
				secondsBetween -= hours * 60 * 60;

				var minutes = Math.floor(secondsBetween / 60);
				secondsBetween -= minutes * 60;

				var seconds = secondsBetween;

				//update the HTML
				var $metric = $($self.templates.metric);
				var $unit = $($self.templates.unit);

				$metric.find('.days').text(days);
				$metric.find('.hours').text(hours);
				$metric.find('.minutes').text(minutes);
				$metric.find('.seconds').text(seconds);

				days == 1 ? $self.find('.refDays').text('Day') : $unit.find('.refDays').text('D');
				hours == 1 ? $self.find('.refHours').text('Hour') : $unit.find('.refHours').text('H');
				minutes == 1 ? $self.find('.refMinutes').text('Minute') : $unit.find('.refMinutes').text('M');
				seconds == 1 ? $self.find('.refSeconds').text('Second') : $unit.find('.refSeconds').text('S');

				$self.$metric.html($metric.html());
				$self.$unit.html($unit.html());
			}
		}

		countdownProcessor();
		var interval = setInterval(countdownProcessor, 1000);
	}

})(jQuery);

$(document).ready(function () {
	$('table#nextlaunch.time').countdown({ date: '11 Nov 2021 20:00:00 UTC' }, function () {
		var tbl = $('table#nextlaunch.time');
		tbl.find('.days').text('0');
		tbl.find('.hours').text('0');
		tbl.find('.minutes').text('0');
		tbl.find('.seconds').text('0');
		tbl.find('.refDays').text('D');
		tbl.find('.refHours').text('H');
		tbl.find('.refMinutes').text('M');
		tbl.find('.refSeconds').text('S');
	});
});
