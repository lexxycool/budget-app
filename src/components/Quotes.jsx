import React, { useEffect, useState } from 'react'

const Quotes = () => {

    const [currentQuote, setCurrentQuote] = useState(0);
    const quotes = [
        "Success usually comes to those who are too busy to be looking for it.",
        "Don't be afraid to give up the good to go for the great.",
        "I find that the harder I work, the more luck I seem to have.",
        "Opportunities don't happen. You create them.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Fall seven times and stand up eight.",
        "The only limit to our realization of tomorrow is our doubts of today."
    ]

    const [quoteColor, setQuoteColor] = useState("#333");
    const colors = [
        "#8E44AD",
        "#2980B9",
        "#C0392B",
        "#F39C12",
        "#D35400",
        "#34495E",
        "#7F8C8D",
        "#581845",
        "#6C3483",
        "#900C3F"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          const nextQuote = Math.floor(Math.random() * quotes.length);
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          setQuoteColor(randomColor);
          setCurrentQuote(nextQuote);
        }, 30000); 

    return () => clearInterval(interval);
    
    }, []);

  return (
    <div className='quotes'>
        <span style={{color: quoteColor}}>{quotes[currentQuote]}</span>
    </div>
  )
}

export default Quotes