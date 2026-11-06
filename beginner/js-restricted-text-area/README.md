# Restricted Textarea

A textarea with a live character counter and a maximum character limit. The counter updates as the user types, and it changes style when the limit is reached.

## Learning Goals

- Select elements with `getElementById`
- Read an HTML attribute with `getAttribute` and convert it with `parseInt`
- Listen to typing with the `input` event
- Read the current text length with `value.length`
- Update text on the page with `textContent`
- Toggle a CSS class with `classList` to give visual feedback

## Features

- Textarea with a label and a placeholder
- Live character counter that updates on every keystroke
- The maximum limit is set once in the HTML `maxlength` attribute, and the script reads it and shows it next to the counter
- The browser stops further input once the limit is reached
- When the limit is reached, the counter turns red and grows slightly
- The counter returns to normal when characters are deleted
- Soft blue theme with a focus effect on the textarea

## Project Structure

```
js-restricted-textarea/
├── index.html    # Label, textarea with maxlength, and the counter
├── style.css     # Layout, theme, and the limit-reached style
└── app.js        # Updates the counter and the limit-reached state
```

## Run Locally

No installation is needed. Open `index.html` in a browser, or use the Live Server extension in VS Code.

## What I Learned

- **The `input` event fires on every change.** It reacts to typing, pasting, and deleting, so the counter always shows the correct number. The `keyup` event would miss changes such as pasting with the mouse.
- **`value.length` gives the live character count.** Reading the length of the textarea value inside the event handler is all that is needed to track what the user has typed.
- **One source of truth for the limit.** The limit is defined only in the `maxlength` attribute. The script reads it with `getAttribute` and `parseInt`, then shows it on the page, so changing the number in the HTML updates both the limit and the display without touching the script.
- **HTML can already do part of the job.** The `maxlength` attribute stops the user from typing more characters, so JavaScript only needs to handle the feedback, not the restriction itself.
- **Attributes are strings.** `getAttribute("maxlength")` returns text, so it must be converted to a number with `parseInt` before it can be compared with `currentLength`.
- **A class can switch the visual state.** Adding and removing `is-limit-reached` lets CSS handle the red color and the scale effect, while JavaScript only decides when the state applies.
- **Removing the class is as important as adding it.** The `else` branch brings the counter back to normal when the user deletes text, so the warning does not stay on the screen.

## Source

Project specification from [roadmap.sh: Restricted Textarea](https://roadmap.sh/projects/restricted-textarea).