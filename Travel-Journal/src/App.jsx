import Header from "./components/Header"
import JournalEntry from "./components/JournalLog"
import Footer from "./components/Footer"
import Data from "./data.js"

function App() {

  let entries = Data.map(entry => {
    return (
      <JournalEntry 
        key={entry.id}
        title={entry.title}
        location={entry.location}
        link={entry.googleMapsUrl}
        imgURL={entry.imageUrl}
        startDate={entry.startDate}
        endDate={entry.endDate}
        description={entry.description}
      />
    )
  })

  return (
    <>
      <Header />
      {entries}
      <Footer />
    </>
  )
}

export default App
