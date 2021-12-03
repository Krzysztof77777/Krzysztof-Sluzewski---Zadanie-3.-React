const { useEffect, useState, useRef } = React;

const App = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [lastQuote, setLastQuote] = useState("");
  const [acctualQuote, setAcctualQuote] = useState("");

  const lastQuoteBtn = useRef();

  useEffect(() => {
    transferAllQuotes();
    lastQuoteBtn.current.disabled = true;
  }, []);

  const transferAllQuotes = () => {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json",
      {
        method: "get",
      }
    )
      .then((r) => r.json())
      .then((data) => setAllQuotes(data));
  };

  const drawNewQuote = () => {
    if (acctualQuote) {
      lastQuoteBtn.current.disabled = false;
    }
    setLastQuote(acctualQuote);
    let newQuote = false;
    while (!newQuote) {
      const randomIndexOfAllQuotes = Math.floor(
        Math.random() * allQuotes.length
      );
      if (acctualQuote !== allQuotes[randomIndexOfAllQuotes]) {
        newQuote = true;
        return setAcctualQuote(allQuotes[randomIndexOfAllQuotes]);
      }
    }
  };

  const backToLastQuote = () => {
    lastQuoteBtn.current.disabled = true;
    setLastQuote("");
    setAcctualQuote(lastQuote);
  };

  return (
    <React.Fragment>
      <h1>Krzysztof Sluzewski - Zadanie 3. React</h1>
      <button className="drawQuote" onClick={drawNewQuote}>
        Wylosuj cytat
      </button>
      <button
        className="backToLastQuote"
        ref={lastQuoteBtn}
        onClick={backToLastQuote}
      >
        Powrót do poprzedniego cytatu
      </button>
      <h2>Aktualnie wyświetlany cytat to:</h2>
      <p>{acctualQuote.author}</p>
      <p>{acctualQuote.quote}</p>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
