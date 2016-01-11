# ClickFX.js

Add SVG animations to stuff when you click it!

By [Alex Lindeman](http://ael.me/), more or less forked from [this codepen](http://codepen.io/Reklino/pen/OPEBVJ/) by [@Reklino](http://github.com/Reklino/), with some JS improvements.

## Usage

Add the `.clickfx` class to things you want to have the effect happen to.

Have an SVG handy! Or use the builtin one, with this CSS animation:

    @keyframes dashsplash {
        0% { stroke-dashoffset: -22; }
        100% { stroke-dashoffset: 22; }
    }
    .dash-splash {
        user-select: none;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        #clickfx-effect line {
            fill: none;
            stroke: #FFF;
            stroke-dasharray: 22;
            stroke-dashoffset: 22;
            stroke-miterlimit: 10;
            stroke-opacity: 1;
            stroke-width: 2;
        }
        &.animating svg line {
            animation: dashsplash 0.5s ease;
        }
    }

Include jQuery and ClickFX:

    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="ClickFX.js"></script>

Then activate with just:

    $(document).on('ready', function() {
        new ClickFX();
    });

## Options

    new ClickFX(trigger, options);

- `trigger`: Elements to trigger click effects on
- `options`: JSON array of options:
  - `svg`
      - *inline* SVG to use for the effect
      - Default: the dash splash thing
  - `duration`
      - Length of time on animation, should match whatever's in your CSS 
      - Default: `500`
  - `size`
      - Size of the effect in pixels (square) 
      - Can be set to any integer, or `auto` to calculate the trigger element's size
      - Default: `120`
  - `padding`
      - Padding around the element (basically just adds to size; more useful with `size = 'auto'`)
      - Default: `0`
  - `events`
      - Events to trigger the effect on (`mousedown`, `click`, `hover`, etc.)
      - Default: `mousedown`
  - `attrs`
      - Any other attributes you want to add to the effect container (e.g., `{ 'class': 'whatever', 'data-attr': 'something else' }`)
      - Default: `{ 'class': 'dash-splash' }`

