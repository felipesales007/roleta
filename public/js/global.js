let data = [
    {id: '', color: '#29417e', text: '100'},
    {id: '', color: '#1d61ac', text: 'Repetir'},
    {id: '', color: '#169ed8', text: '200'},
    {id: '', color: '#209b6c', text: '+50'},
    {id: '', color: '#60b236', text: '300'},
    {id: '', color: '#efe61f', text: 'Repetir'},
    {id: '', color: '#f7a416', text: '400'},
    {id: '', color: '#e6471d', text: '-40'},
    {id: '', color: '#dc0936', text: '+60'},
    {id: '', color: '#e5177b', text: '500'},
    {id: '', color: '#be107f', text: '-30'},
    {id: '', color: '#881f7e', text: '600'},
    {id: '', color: '#5c1f88', text: 'Repetir'},
    {id: '', color: '#441f88', text: '-80'},
];

let RouletteWheel = function (el, items) {
    this.$el = $(el);
    this.items = items || [];
    this._bis = false;
    this._angle = 0;
    this._index = 0;
    this.options = {
        angleOffset: -90
    }
}

_.extend(RouletteWheel.prototype, Backbone.Events);

RouletteWheel.prototype.spin = function (_index) {
    let count = this.items.length;
    let delta = 360 / count;
    let index = !isNaN(parseInt(_index)) ? parseInt(_index) : parseInt(Math.random() * count);

    let a = index * delta + ((this._bis) ? 1440 : -1440);

    this._bis = !this._bis;
    this._angle = a;
    this._index = index;

    let $spinner = $(this.$el.find('.spinner'));

    let _onAnimationBegin = function () {
        this.$el.addClass('busy');
        this.trigger('spin:start', this);
    }

    let _onAnimationComplete = function () {
        this.$el.removeClass('busy');
        this.trigger('spin:end', this);
    }

    $spinner.velocity('stop').velocity({
        rotateZ: a + 'deg'
    }, {
        easing: 'easeOutQuint',
        duration: 1000,
        begin: $.proxy(_onAnimationBegin, this),
        complete: $.proxy(_onAnimationComplete, this)
    });
}

RouletteWheel.prototype.render = function () {
    let $spinner = $(this.$el.find('.spinner'));
    let D = this.$el.width();
    let R = D * .5;

    let count = this.items.length;
    let delta = 360 / count;

    for (let i = 0; i < count; i++) {

        let item = this.items[i];

        let color = item.color;
        let text = item.text;
        let ikon = item.ikon;

        let html = [];
        html.push('<div class="item" ');
        html.push('data-index="' + i + '" ');
        html.push('data-type="' + item.type + '" ');
        html.push('>');
        html.push('<span class="label">');
        if (ikon)
            html.push('<i class="material-icons">' + ikon + '</i>');
        html.push('<span class="text">' + text + '</span>');
        html.push('</span>');
        html.push('</div>');

        let $item = $(html.join(''));

        let borderTopWidth = D + D * 0.0025;
        let deltaInRadians = delta * Math.PI / 180;
        let borderRightWidth = D / (1 / Math.tan(deltaInRadians));

        let r = delta * (count - i) + this.options.angleOffset - delta * .5;

        $item.css({
            borderTopWidth: borderTopWidth,
            borderRightWidth: borderRightWidth,
            transform: 'scale(2) rotate(' + r + 'deg)',
            borderTopColor: color
        });

        let textHeight = parseInt(((2 * Math.PI * R) / count) * .5);

        $item.find('.label').css({
            transform: 'translateY(' + (D * -.25) + 'px) translateX(' + (textHeight * 1.03) + 'px) rotateZ(' + (90 + delta * .5) + 'deg)',
            height: textHeight + 'px',
            lineHeight: textHeight + 'px',
            textIndent: (R * .1) + 'px'
        });

        $spinner.append($item);
    }

    $spinner.css({
        fontSize: parseInt(R * 0.06) + 'px'
    });
}

RouletteWheel.prototype.renderMarker = function () {
    let $markers = $(this.$el.find('.markers'));
    let D = this.$el.width();
    let R = D * .5;

    let count = this.items.length;
    let delta = 360 / count;

    let borderTopWidth = D + D * 0.0025;
    let deltaInRadians = delta * Math.PI / 180;
    let borderRightWidth = (D / (1 / Math.tan(deltaInRadians)));

    let i = 0;
    let $markerA = $('<div class="marker">');
    let $markerB = $('<div class="marker">');

    let rA = delta * (count - i - 1) - delta * .5 + this.options.angleOffset;
    let rB = delta * (count - i + 1) - delta * .5 + this.options.angleOffset;

    $markerA.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rA + 'deg)',
        borderTopColor: '#FFF'
    });

    $markerB.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rB + 'deg)',
        borderTopColor: '#FFF'
    });

    $markers.append($markerA);
    $markers.append($markerB);
}

RouletteWheel.prototype.bindEvents = function () {
    this.$el.find('.button').on('click', $.proxy(this.spin, this));
}

let spinner;
$(window).ready(function () {
    spinner = new RouletteWheel($('.roulette'), data);
    spinner.render();
    spinner.bindEvents();

    spinner.on('spin:start', function (r) {
        console.log('spin start!');
    });
    spinner.on('spin:end', function (r) {
        console.log('spin end! -->' + r._index);
    });
});
