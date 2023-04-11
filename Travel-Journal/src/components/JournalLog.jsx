import Data from "../data.js"
import { PositionIcon } from "./Icons.jsx"

const entries = Data[0]

export default function JournalEntry(){
    return (
    <div classList="journal-container">
        <img src={entries.imageUrl} alt="" />
        <div classList="entry-info-container">
            <div>
                <PositionIcon />
                <p>{entries.location}</p>
                <a href={entries.googleMapsUrl}>View On Google</a>
            </div>
            <h1>{entries.title}</h1>
            <h2>{entries.startDate} - {entries.endDate}</h2>
            <p>{entries.description}</p>
        </div>
    </div>
    )
}