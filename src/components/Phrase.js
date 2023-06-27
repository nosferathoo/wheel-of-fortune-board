import Word from './Word.js'
import './Phrase.css'

function Phrase(props)
{
    let words = props.phrase.split(' ');
    return <div className="Phrase">
        {words.map(word=><Word word={word} shown={props.shown}/>)}
    </div> 
}

export default Phrase;