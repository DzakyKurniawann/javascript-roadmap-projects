# Simple Tabs

A simple tabs component built with HTML, CSS, and JavaScript. The tab buttons and their content are generated from a list of labels, and clicking a tab shows its content while hiding the others.

## Learning Goals

- Create and add elements with `createElement` and `appendChild`
- Generate repeated UI from an array with `forEach`
- Handle clicks with event delegation using a single `click` listener
- Show and hide content by adding and removing a CSS class with `classList`
- Link each tab button to its content through matching ids
- Set a default active tab when the page loads

## Features

- Three tabs: Overview, Features, and Pricing
- The first tab is active by default
- Clicking a tab shows its content and hides the content of the other tabs
- Tabs and content are generated from the `tabLabels` array, so adding a tab only needs a new label
- The active tab is highlighted, and tab content appears with a short fade-in animation
- Soft blue theme with a centered, responsive card

## Project Structure

```
js-simple-tabs/
├── index.html    # Empty containers for the tab buttons and the tab content
├── style.css     # Layout, theme, active tab styles, and fade-in animation
└── app.js        # Generates the tabs and handles switching
```

## Run Locally

No installation is needed. Open `index.html` in a browser, or use the Live Server extension in VS Code.

## What I Learned

- **Repeated UI can be generated from data.** Instead of writing each button and panel by hand in HTML, I loop over the `tabLabels` array and create the elements with JavaScript. Adding a fourth tab only needs one more label in the array.
- **Matching ids connect a tab to its content.** The button `tabBtn2` belongs to `tabContent2`, so the click handler can find the right panel from the number in the id. Planning this naming before writing the code made the logic simple.
- **Event delegation needs only one listener.** The buttons are created by JavaScript, and one `click` listener checks `event.target.id` to know which one was clicked. This avoids attaching a separate listener to every button.
- **CSS decides what is visible.** JavaScript only adds and removes the `isActive` class with `classList`, while CSS handles hiding, showing, and highlighting. This keeps behavior and appearance separate.
- **The loop handles both cases in one place.** Going through every tab, adding the class to the clicked one and removing it from the rest, guarantees that exactly one tab is active at any time.
- **The default state is set during creation.** Checking `index === 0` while generating the elements makes the first tab active from the start, so no extra setup is needed.
- **A small animation improves the feel.** The `fadeIn` keyframes on `.tab-content` make the switch smoother, and it replays each time a panel changes from `display: none` to `display: block`.

## Source

Project specification from [roadmap.sh: Simple Tabs](https://roadmap.sh/projects/simple-tabs).