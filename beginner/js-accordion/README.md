# Accordion

An accordion component built with HTML, CSS, and JavaScript. It shows a list of JavaScript FAQ questions, and clicking a question expands its answer while collapsing any other open section.

## Learning Goals

- Store content as data in an array of objects
- Render a list of HTML elements from data with `map` and `join`
- Handle clicks with event delegation and `closest`
- Allow only one open section at a time
- Toggle a CSS class with `classList.toggle`
- Animate expanding content with `max-height` and `scrollHeight`

## Features

- Six JavaScript FAQ items generated from the `faqData` array
- Clicking a question expands its answer
- Only one section is open at a time, and opening another one closes the previous one
- Clicking an open question collapses it again
- The icon switches between `+` and `-` to show the state
- Smooth expand and collapse animation
- Hover effects and a highlighted border on the active item
- Soft blue theme with a centered, responsive layout

## Project Structure

```
js-accordion/
├── index.html    # Title and an empty container for the accordion
├── style.css     # Layout, theme, and expand animation
└── app.js        # FAQ data, rendering, and toggle logic
```

## Run Locally

No installation is needed. Open `index.html` in a browser, or use the Live Server extension in VS Code.

## What I Learned

- **Content works best as data.** The questions and answers live in the `faqData` array, and the HTML is generated from it. Adding or editing an item only needs a change in the array, not in the markup.
- **`map` and `join` turn data into HTML.** Each item becomes a template literal string, and `join("")` combines them into one string that is inserted with `innerHTML`.
- **Event delegation keeps the code short.** One `click` listener on the container handles every header, even though the items are created by JavaScript. `event.target.closest(".accordion-header")` finds the header even when the click lands on the icon inside it.
- **Closing the others is a loop.** Before toggling the clicked item, a `forEach` goes through all the other items and removes their `active` class, resets their `max-height`, and restores the `+` icon. This guarantees that only one section is open.
- **`classList.toggle` returns the new state.** It adds the class when it is missing and removes it when it is present, and its return value tells whether the item is now open. That value decides whether to expand or collapse.
- **Animating height needs `max-height`.** A height of `auto` cannot be animated with CSS, so the content starts at `max-height: 0` and is set to its `scrollHeight` in pixels when opened. The CSS `transition` then makes the movement smooth.
- **Small visual feedback improves usability.** The `+` and `-` icon, the hover color, and the highlighted border make it clear which item is open and which can be clicked.

## Source

Project specification from [roadmap.sh: Accordion](https://roadmap.sh/projects/accordion).