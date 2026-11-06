# Cookie Consent

A simple cookie consent banner built with HTML, CSS, and JavaScript. The banner appears at the bottom of the page with a message and two buttons, and fades out when the user accepts or declines.

## Learning Goals

- Select an element with `getElementById`
- Handle clicks with event delegation using a single `click` listener
- Identify which button was clicked with `event.target.id`
- Hide an element smoothly by adding a CSS class with `classList`
- Remove an element from the layout after a transition with `setTimeout`
- Position a banner at the bottom of the screen with `position: fixed`

## Features

- Cookie banner fixed at the bottom of the page, centered and responsive
- Short message about cookies and the privacy policy
- Two buttons: **Decline** and **Accept All**
- Clicking either button fades the banner out and slides it down
- The banner is removed from the layout after the animation ends
- The user's choice is logged to the console
- The choice is not saved yet, so the banner appears again when the page is reloaded
- Soft blue theme with hover effects on the buttons

## Project Structure

```
js-cookie-consent/
├── index.html    # Cookie banner with the message and the two buttons
├── style.css     # Banner layout, button styles, and the hide animation
└── app.js        # Handles the button clicks and hides the banner
```

## Run Locally

No installation is needed. Open `index.html` in a browser, or use the Live Server extension in VS Code. Open the browser console to see the message that shows the user's choice.

## What I Learned

- **One listener can serve several buttons.** The click listener is attached to the banner, and `event.target.id` tells whether the user pressed Accept or Decline. This avoids writing a separate listener for each button.
- **Hiding with a class makes smooth animations possible.** Adding `is-hidden` changes the opacity and position, and the CSS `transition` animates the change. Setting `display: none` directly would make the banner disappear instantly, without any animation.
- **`setTimeout` waits for the animation to finish.** The banner is only removed with `display: none` after 400 milliseconds, the same duration as the CSS transition. If the delay were shorter, the animation would be cut off.
- **A fixed position keeps the banner in view.** With `position: fixed`, the banner stays at the bottom of the screen, and centering it with `left: 50%` and `translateX(-50%)` keeps it in the middle on any screen width.
- **A transform in the hidden state must keep the centering.** The `is-hidden` class uses `translate(-50%, 20px)` instead of only moving down, because replacing the transform would otherwise break the horizontal centering.
- **`pointer-events: none` prevents clicks during the fade-out.** While the banner is disappearing, the buttons cannot be clicked again by accident.
- **Consent needs to be remembered.** Since the choice is only logged, the banner returns after every reload. This showed me why real sites save the user's choice with cookies or `localStorage`, which is a good next improvement.

## Source

Project specification from [roadmap.sh: Cookie Consent](https://roadmap.sh/projects/cookie-consent).