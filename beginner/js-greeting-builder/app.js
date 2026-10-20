function formatName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function getGreeting(timeOfDay) {
    if (timeOfDay === 'morning') return 'Good morning';
    if (timeOfDay === 'afternoon') return 'Good afternoon';
    return 'Good evening';
}

function createGreeting(firstName, lastName, timeOfDay) {
    const greeting = getGreeting(timeOfDay);
    const name = formatName(firstName, lastName);
    return `${greeting}, ${name}`;
}

console.log(createGreeting('Ava', 'Stone', 'morning'));
console.log(createGreeting('Noah', 'Kim', 'evening'));
console.log(createGreeting('Mina', 'Patel', 'afternoon'));
console.log(createGreeting('Mina', 'Patel', 'afternoo'));