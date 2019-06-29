# What is sass-greedy?
> **sass-greedy** is a flexible, lightweight and simple grid generator for Sass.

[![NPM](https://nodei.co/npm/sass-greedy.png)](https://nodei.co/npm/sass-greedy/)

Basically, it generates row and column styles and supports breakpoints for responsiveness and multiple grid generation. There are three mixin injections to give you more flexibility while building your own grid.

sass-greedy uses [include-media](https://github.com/eduardoboucas/include-media) to give the support of breakpoints for your responsive grid system.

# What is mixin injection?
Mixin injection allows you to put custom grid styles in a simple way to have `more control/flexibility` on the grid system. You have access to reach `greedy options` to be used if it's necessary for all mixin injections.

Greedy options are the combination of greedy defaults and the grid options provided when sass-greedy invoked.

> Greedy defaults can be overridden in the grid options.

**1. sass-greedy defaults**
```scss
$_defaults: (
  'row-class': 'row',               // row class name (output e.g.: .row)
  'column-class': 'column',         // column class name (output e.g.: .column)
  'numbered-column-class': 'slice'  // numbered column class name (output e.g.: .slice-1, slice-2 etc.)
);
```

**2. grid options**
```scss
@include greedy((
  'columns': 14,        // number of the grid columns
  'gutter': 1.6rem,     // grid columns gutter size
  'sizes': (            // grid sizes (output e.g.: .slice-xs-1, slice-xl-2 etc.). supports breakpoints
    '',                 // mandatory. empty string size also here to generate columns if no breakpoint / responsive design needed
    ('name': 'xs', 'breakpoint': '<sm'),
    ('name': 'sm', 'breakpoint': '>=sm'),
    ('name': 'md', 'breakpoint': '>=md'),
    ('name': 'lg', 'breakpoint': '>=lg'),
    ('name': 'xl', 'breakpoint': '>=xl')
  )
));
```

Let's dive deep.

# Mixin injections

### Custom row mixin injection
sass-greedy runs `custom row mixin injection` which is defined externally before generating grid column styles.

Let’s assume that you wish to have **no-gutters** CSS style for row element of the grid system to remove spacings. Here is an example to do it in sass-greedy:

```scss
@mixin greedy-custom-row-mixins() {
  // no-gutters for row element
  .no-gutters {
    margin-left: 0;
    margin-right: 0;
  
    &> .#{greedy-options('column-class')} {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

// output example
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.no-gutters {
  margin-left: 0;
  margin-right: 0;
}
.no-gutters > .column {
  padding-left: 0;
  padding-right: 0;
}
```

### Custom size mixin injection
sass-greedy runs `custom size mixin injection` which is defined externally `while looping column sizes`.

Let’s assume that you wish to have **flex-row-reverse** CSS style to have the flexibility to change the row flex direction in any provided breakpoint size. Here is an example to do it in sass-greedy:

```scss
@mixin greedy-custom-size-mixins($size, $breakpoint) {
  $flex-name: 'flex';
  
  @if $size and $size != '' {
    $flex-name: '#{$flex-name}-#{$size}';
  }

  // e.g.: flex-row-reverse
  .#{$flex-name}-row-reverse {
    flex-direction: row-reverse;
  }
}

// output example
.flex-row-reverse {
  flex-direction: row-reverse;
}

// for the size of sm which is provided in options
@media (min-width: 576px) {
  .flex-sm-row-reverse {
    flex-direction: row-reverse;
  }
}

// for the size of xl which is provided in options
@media (min-width: 1200px) {
  .flex-xl-row-reverse {
    flex-direction: row-reverse;
  }
}
```

### Custom column mixin injection
sass-greedy runs `custom column mixin injection` which is defined externally `while generating each numbered column styles in all provided sizes`.

Let’s assume that you wish to have **order** CSS style to have the flexibility to change the order of the flex grid columns in any provided breakpoint size. Here is an example to do it in sass-greedy:

```scss
@mixin greedy-custom-column-mixins($size, $iteration) {
  $order-name: 'order';
  
  @if $size and $size != '' {
    $order-name: '#{$order-name}-#{$size}';
  }
  
  // e.g.: order-3
  .#{$order-name}-#{$iteration} {
    order: #{$iteration};
  }
}

// output example
.order-1 {
  order: 1;
}

.order-2 {
  order: 2;
}

.order-3 {
  order: 1;
}

// for the size of md which is provided in options
@media (min-width: 768px) {
  .order-md-2 {
    order: 2;
  }
  
  .order-md-3 {
    order: 3;
  }
}

// for the size of xl which is provided in options
@media (min-width: 1200px) {
  .order-xl-3 {
    order: 3;
  }
  
  .order-xl-4 {
    order: 4;
  }
}
```

# License
This project is licensed under the terms of the [MIT license](https://github.com/hsynlms/sass-greedy/blob/master/LICENSE).
