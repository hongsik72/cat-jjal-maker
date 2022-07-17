import logo from './logo.svg';
import './App.css';
import React from 'react';
import Title from './components/Title';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


function CatItem(props) {
  return (
    <li>
      <img src={props.img} style={{ width: '150px' }}></img>
    </li>

  )
}

function Favotites({ favorites }) {

  if (favorites.length == 0) {
    return <div>사진 위 하트를 클릭하여 사진을 저장해봐요.</div>
  }

  return (
    <ul className="favorites">
      {
        favorites.map(cat1 => (<CatItem img={cat1} key={cat1} />))
      }
    </ul>
  )
}

const MainCard = ({ img, onHeartclick, AlreadyFavorate }) => {

  const heartIcon = AlreadyFavorate ? "💖" : "♥";

  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="500" />
      <button onClick={onHeartclick}>{heartIcon}</button>
    </div>
  )
}



const org = (
  <div className="main-card">
    <img src="https://cataas.com/cat/60b73094e04e18001194a309/says/react" alt="고양이" width="400" />
    <button>🤍</button>
  </div>
);

const Form = ({ updateMainCat }) => {

  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState('');
  const [msg, setMsg] = React.useState('');

  function handleInpurChange(e) {
    const userValue = e.target.value;
    setValue(userValue.toUpperCase());

    setMsg('');
    if (includesHangul(userValue)) {
      setMsg("한글은 입력할 수 없습니다.");
    }
  }

  function handleFormOnsubmit(event) {
    event.preventDefault();
    setMsg('');
    if (value == '') {
      setMsg("공백은 입력할 수 없습니다.");
      return;
    }
    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormOnsubmit}>
      <input type="text" name="name" placeholder="영어 대사를 입력해주세요" onChange={handleInpurChange} value={value} />
      <button type="submit">생성2</button>
      <p style={{ color: 'red' }}>{msg}</p>
    </form>
  )
}


const App = () => {

  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";


  //const [counter, setCounter] = React.useState(jsonLocalStorage.getItem('count'));
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('count')
  })

  const [mainCat, setMainCat] = React.useState(CAT1);

  //const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem('favorites') || []);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  })

  const AlreadyFavorate = favorites.includes(mainCat);

  async function SetInitialCat() {
    const newCat = await fetchCat("First Cat");
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(
    () => { SetInitialCat(); }, []
  );

  //SetInitialCat();

  async function updateMainCat(value) {

    const newCat = await fetchCat(value);
    setMainCat(newCat);
    //const accCounter = counter + 1;
    //jsonLocalStorage.setItem('count', accCounter);
    //setCounter(jsonLocalStorage.getItem('count'));

    setCounter((prev) => {
      const accCounter = prev + 1;
      jsonLocalStorage.setItem('count', accCounter);
      return accCounter;
    })
  }

  function handleheartclick() {
    //setFavorites([...favorites, CAT3, DOG1]); // 기존 배열에 데이터 추가
    const nextFavorates = [...favorites, mainCat];
    setFavorites(nextFavorates); // 기존 배열에 데이터 추가
    jsonLocalStorage.setItem('favorites', nextFavorates);
  }

  const TitleAhead = counter == null ? "" : counter + "번째 ";

  return (
    <div >
      <Title> {TitleAhead} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartclick={handleheartclick} AlreadyFavorate={AlreadyFavorate} />
      <Favotites favorites={favorites} />
    </div>
  )
}

export default App;
