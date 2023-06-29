import { Helmet } from "react-helmet";

export default function Landing(props){
    return (
        // start page of the quiz with a dynamic meta tag which matches the background of the app on mobile devices
        <div className="landing-container">
            <Helmet><meta name="theme-color" content='#D1DCF6'/></Helmet>
            <h1 className="landing-title">Quizzicle</h1>
            <p>The no frills study app that lets you master knowledge on a wide array of topics!</p>
            <button onClick={props.beginQuiz}>Start Quiz</button>
        </div>
    )
}