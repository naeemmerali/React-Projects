import { nanoid } from 'nanoid'

export default function Question(props){

    

    const selections = props.options.map(option => {

        let styles = {}

        // conditional styling to highlight the users selection while quiz is in progress
        if (!props.showAnswers){
            styles = props.selected === option ? {backgroundColor: 'white'} : {backgroundColor: 'none'}
        }
        // conditional styling to highlight the users selection when quiz is finished to show the correct answer, and have all other answers greyed out if the user answered correctly
        else if (props.showAnswers && props.correctAns === props.selected){
            styles = props.correctAns === option ? {backgroundColor: '#94D7A2'} : {backgroundColor: '', color: 'grey', border: '1px solid grey'}
        }
        // sets the styles to show the users wrong answer in red, the correct answer in green and other options in grey when the quiz is finished
        else if (props.showAnswers && props.correctAns !== props.selected){
            if (props.correctAns === option) styles = {backgroundColor: '#94D7A2'}
            else if (props.selected === option) styles = {backgroundColor: '#F8BCBC'}
            else {styles = {backgroundColor: '', color: 'grey', border: '1px solid grey'}}
        }
        

        return <div className='option' style={styles} key={nanoid()} onClick={(event) => props.updateSelection(props.id, event.target.innerText)}>{option}</div>
    })


    // returns the question and the options for the possible answers 
    return(
        <div className='question-container'>
            <h1 className='question'>{props.question}</h1>
            <div className='answers-container'>
                {selections}
            </div>
        </div>
    )
}



