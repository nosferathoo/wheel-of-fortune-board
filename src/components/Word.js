import Letter from './Letter';
import './Word.css';

function Word(props)
{
    return <div className="Word">
            {props.word.split('').map(letter=><Letter letter={letter} shown={props.shown.includes(letter.toLowerCase())}/>)}
        </div>;
}

export default Word;