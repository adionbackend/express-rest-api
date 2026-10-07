// REST API with EXPRESS.JS
// By AdiOnBackend

// Quote application

// Import express and initialize the app
const express = require("express");

const app = express();

// Middleware to tell express to pass incoming requests with JSON body.
// Without this post and update requests won't work
app.use(express.json());

const PORT = 3000;

let quotes = [
    { id: 1, quote: "It works on my machine.", author: "Anonymous" },
    { id: 2, quote: "99 little bugs in the code. Take one down, patch it around, 127 little bugs in the code.", author: "Anonymous" },
    { id: 3, quote: "To err is human, but to really foul things up you need a computer.", author: "Paul Ehrlich" }
];


app.get('/', (req, res) => {
    res.send('Hello World');
})

// Read all the quotes
app.get('/api/quotes', (req, res) => {
    res.status(200).json(quotes);
})

// Read a quote with a specific id
app.get('/api/quotes/:id', (req, res) => {

    // req.params.id is a string so we convert it to an integer
    const quoteId = parseInt(req.params.id)

    // Find the quote in our array
    const quote = quotes.find(q => q.id === quoteId)

    // If it doesn't exist, return a 404 Not Found error
    if (!quote) {
        res.status(404).json({error: "Quote not found"});
    }

    res.status(200).json(quote);

})

// Create a quote
app.post('/api/quotes', (req, res) => {
    
    if (!req.body.quote) {
        res.status(400).json({error: "Please provide a quote"});
    }

    const newQuote = {
        // Generate a new ID (Note: In a real DB, this is done automatically)
        id: quotes.length + 1,
        quote: req.body.quote,
        // If no author is provided, default to "Anonymous"
        author: req.body.author || "Anonymous"
    }

    // Add to our array
    quotes.push(newQuote)

    res.status(201).json(newQuote)

})

// Update a quote

app.put('/api/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id)

    const quote = quotes.find(q => q.id === quoteId);

    if (!quote) {
        res.status(404).json({error: "Cannot find this quote with the provided id"});
    }

    // Update the properties. 
    // If the user didn't send a new quote/author, keep the old one.
    quote.quote = req.body.quote || quote.quote;
    quote.author = req.body.author || quote.author;

    res.status(200).json(quote);

})

// Delete a quote 

app.delete('/api/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id)

    const quoteIndex = quotes.find(q => q.id === quoteId)

    if (quoteIndex === -1) {
        res.status(404).json({error: "Quote not found"});
    }

    quotes.splice(quoteIndex, 1);

    res.status(204).json({msg: "Quote deleted"});
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})