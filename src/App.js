import { useState, useEffect, useRef } from 'react';
import './App.css';
import { getCharacter, getPeople } from './api/people';



const  App = () => {
  
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false});
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [details, setDetails] = useState({});

  useEffect(() => {
    getPeople()
    .then(data => setPeople(data.results))
    .catch(handleError);
  }, []);

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError);
  }, [currentCharacter]);


  const handleError = error => {
    setErrorState({ hasError: true, message: error.message });
  };


  const showDetails = character => {
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
  };

  const onChangeTextSearch = e => {
    e.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  }


  return (
    <>
      <input 
        ref={inputSearch} 
        onChange={onChangeTextSearch}
        type="text" 
        placeholder='Busca un personaje' 
      />

      <ul>
        {errorState.hasError &&  <div>{errorState.message}</div>}

        {people.map(character => (
          <li key={character.name} onClick = {() => showDetails(character)}>
            {character.name}
          </li>
        ))}
      </ul>

      {details && (
        <aside>
        <h1>{details.name}</h1>
        <ul>
          <li>height: {details.height}</li>
          <li>mass: {details.mass}</li>
          <li>Year of Birth: {details.birth_year}</li>
        </ul>
       </aside>
      )}
    </>
  );
}

export default App;
