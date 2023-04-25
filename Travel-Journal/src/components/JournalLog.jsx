import { PositionIcon } from "./Icons.jsx"

export default function JournalEntry(props){
    return (
    <div className="journal-container">
        <img src={props.imgURL} className="location-img" alt="" />
        <div className="entry-info-container">
            <div className="location-info">
                <PositionIcon />
                <p className="location-country">{props.title}</p>
                <a href={props.link} className="map-link">View On Google</a>
            </div>
            <h1 className="location-title">{props.location}</h1>
            <h2 className="dates">{props.startDate} - {props.endDate}</h2>
            <p className="decsription">{props.description}</p>
        </div>
    </div>
    )
}