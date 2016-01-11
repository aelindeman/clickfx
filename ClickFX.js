/* ClickFX.js | Alex Lindeman | 2015-12-22 */

'use strict';
(function() {

	var options, clickfx;

	/* Class constructor */
	function ClickFX(trigger, options) {
		trigger = trigger || '.clickfx';

		// check dependencies
		switch (true) {
			case (!window.jQuery):
				console.error('jQuery is required');
				return;
			default: break; // good to go
		}

		// instantiate
		if (!(this instanceof ClickFX)) {
			return new ClickFX(trigger, options);
		}

		// default settings
		var defaults = {
			svg: '\
<svg id="clickfx-effect" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 100 100">\
<line x2="50" y2="22" x1="50" y2="0"/>\
<line x1="50" y1="100" x2="50" y2="78"/>\
<line x2="30.2010098" y2="30.2010098" x1="14.6446609" y1="14.6446609"/>\
<line x1="85.3553391" y1="85.3553391" x2="69.7989883" y2="69.7989883"/>\
<line x2="22" y2="50" x1="0" y1="50"/>\
<line x1="100" y1="50" x2="78" y2="50"/>\
<line x2="30.2010098" y2="69.7989883" x1="14.6446609" y1="85.3553391"/>\
<line x1="85.3553391" y1="14.6446609" x2="69.7989883" y2="30.2010098"/>\
</svg>', // svg to use for effect
			duration: 500, // set to same as css!
			size: 120, // integer or 'auto'
			padding: 0, // extra space around splash
			events: 'mousedown',
			attrs: { // additional attributes (class, data-*, etc.)
				'class': 'dash-splash'
			},
			id: 'clickfx-wrapper-' + Date.now()
		};

		this.options = $.extend(defaults, options);
		this.clickfx = this.get_clickfx();

		var c = this;
		$(trigger).on(this.options.events, function() {
			c.trigger(this);
		});

		return this;
	}

	/* Creates the clickfx DOM element, or returns the existing one */
	ClickFX.prototype.get_clickfx = function() {
		if (!this.clickfx) {
			this.clickfx = $(document.createElement('div'))
				.attr('id', this.options.id)
				.attr(this.options.attrs)
				.css({
					'height': (this.options.size + this.options.padding) + 'px',
					'width': (this.options.size + this.options.padding) + 'px',
				})
				.append(this.options.svg)
				.appendTo('body');
		}
		return this.clickfx;
	};

	/* Displays the clickfx on an element */
	ClickFX.prototype.trigger = function(element) {
		var e = $(element),
			s = this.get_clickfx();

		var z = (e.data('size')) ?
				parseInt(e.data('scale').replace(/[^0-9]/, '')) :
				(this.options.size == 'auto') ?
					Math.max(e.outerHeight(), e.outerWidth()) + this.options.padding : // auto-resize
					this.options.size + this.options.padding;
		var x = e.offset().left + (e.outerWidth() / 2) - (z / 2),
			y = e.offset().top + (e.outerHeight() / 2) - (z / 2);

		// move to the element
		s.css({
			'left': x + 'px',
			'top': y + 'px',
			'height': z + 'px',
			'width': z + 'px',
		});

		// run the animation
		s.addClass('animating').delay(this.options.duration).queue(function(next) {
			$(this).removeClass('animating');
			next();
		});
	};

	/* Register the class in the window object */
	if (typeof window == 'object' && typeof window.document == 'object') {
		window.ClickFX = ClickFX;
	}

})();
