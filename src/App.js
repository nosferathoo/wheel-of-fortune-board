import React, {useEffect, useState} from 'react';

import './App.css';
import Phrase from './components/Phrase';
import Team from './components/Team';
import { Fireworks } from 'fireworks/lib/react';
import Papaparse from 'papaparse';
import NewWindow from 'rc-new-window';
import ButtonGroup from "./components/ButtonGroup";
import Button from "./components/Button";
import applause from "./sounds/applause.wav";
import error from "./sounds/error.wav";


var canType = true;

function App() {
  const sndApplause = new Audio(applause);
  const sndError = new Audio(error);
  
  const [phrases,setPhrases] = useState([]);
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_HjA-M32_p7oHpblGvbKRRQj-S9ZNG-wVMCdHp9wpP7K1NF6BHcQK7kRsJBbg3BcnZul721LgVVuy/pub?gid=0&single=true&output=csv';

  useEffect(()=>{
    Papaparse.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        setPhrases(results.data);
      }
    });
  },[]);
  
  useEffect(()=>{
    if (phrases.length>0)
      newPhrase();
  },[phrases]);
    
  const randomPhrase = () => phrases[Math.floor(Math.random()*phrases.length)];
  const [phrase,setPhrase] = useState({'phrase':'','hint':''});
  const [shown,setShown] = useState("");
  const [score1,setScore1] = useState(0);
  const [score2,setScore2] = useState(0);
  const [activeTeam,setActiveTeam] = useState(0);
  const [showFireworks,setShowFireworks] = useState(false);
  const [showVR,setShowVR] = useState(false);
  
  
  
  const onFocus = () => {
    canType = false;
  }
  
  const onBlur = () => {
    canType = true;
  }
  
  const newPhrase = () => {
    setShown("");
    setPhrase(randomPhrase());
  }
  
  const onChangeTeam = () => {
    setActiveTeam(activeTeam===0?1:0);
  }
  const onScoreAdd = (value) => {
    if (activeTeam===0)
      setScore1(score1+value);
    else
      setScore2(score2+value);
  };
  const onVRClick = () => {
    setShowVR(!showVR);
  }

  const onKeyDown = async (e) => {
    if(e.key.length!==1 || !canType)
      return false;
    let letter = e.key.toLowerCase();
    if (shown.includes(letter))
    {
      return;
    }
    if (!phrase.phrase.toLowerCase().includes(letter))
    {
      sndError.play();
      onChangeTeam();
      return;
    }

    sndApplause.play();
    setShown(shown+letter);
    setShowFireworks(true);
    setTimeout(()=>setShowFireworks(false), 2000);
  }
  

  let fxProps = {
    count: 1,
    interval: 500,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    calc: (props, i) => ({
      ...props,
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight
    })
  }

  
  return (
    <div className="App" tabIndex="0">
      {showFireworks?<Fireworks {...fxProps}/>:''}
      <header className="App-header">
        <p className="Hint">{phrase.hint}</p>
        <Phrase phrase={phrase.phrase} shown={shown} />
        <div className="Teams">
          <Team team={1} active={activeTeam===0} score={score1} setScore={setScore1} onFocus={onFocus} onBlur={onBlur}></Team>
          <Team team={2} active={activeTeam===1} score={score2} setScore={setScore2} onFocus={onFocus} onBlur={onBlur}></Team>
        </div>
        <NewWindow allow="autoplay">
          <div className="Control-window">
            <input onKeyDown={onKeyDown} value={shown}/>
            <p>{phrase.phrase}</p>
            <ButtonGroup>
              {[100,-100].map((score)=><Button text={(score>0?'+':'')+score} onClick={()=>onScoreAdd(score)} />)}
            </ButtonGroup>
            <ButtonGroup className="MainButtons">
              <Button text="↻" onClick={newPhrase} />
              <Button text="←→" onClick={onChangeTeam} />
            </ButtonGroup>
          </div>
        </NewWindow>
      </header>
    </div>
  );
}

export default App;
