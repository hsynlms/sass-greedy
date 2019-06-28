# What is sass-greedy?
**sass-greedy** is a flexible, lightweight and simple grid generator for SASS. It only generates `row` and `column` styles and supports multiple grid generation.

If you would like to have more control of the grid generation process, see mixin injection.

sass-greedy uses [include-media](https://github.com/eduardoboucas/include-media) to give the support of breakpoint for your grid system.

# What is mixin injection?
sass-greedy has `three mixin injections` to give you `more flexibility` while building your own grid system(s). You have access to reach `greedy options` in all three injections as well. Let's dive into deep.

## How to access greedy options in the mixin injection?
`greedy-options` function is available inside all mixin injections. Its the combination of greedy defaults (1) and the provied grid options (2).

**1. sass-greedy defaults**
```scss
$_defaults: (
  'row-class': 'row',               // row class name (output e.g.: .row)
  'column-class': 'column',         // column class name (output e.g.: .column)
  'numbered-column-class': 'slice'  // numbered column class name (output e.g.: .slice-1, slice-2 etc.)
);
```

**2. grid options**
Provided grid generation options. e.g.:
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

## Mixin injections

### Custom row mixin injection
sass-greedy runs `custom row mixin injection` which is provided by you externally `before generating column styles`. It gives you the flexibility to add `custom css styles for row element of the grid`.

Let's assume that you wish to have `.no-gutters` css style that can be used for any row element of your grid system. Here is an example to do it in sass-greedy:

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
sass-greedy runs `custom size mixin injection` which is provided by you externally `while looping column sizes`.

Let's assume that you wish to have `.flex-row-reverse` css style to have the flexibility to change the flex row direction in any provided size. Here is an example to do it in sass-greedy:

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
sass-greedy runs `custom column mixin injection` which is provided by you externally `while generating each numbered column styles for each provided sizes`.

Let's assume that you wish to have `.order` css style to have the flexibility to change the order of the flex grid columns in any provided size. Here is an example to do it in sass-greedy:

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
