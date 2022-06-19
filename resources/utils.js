const EMPTY_HEART = "🤍";
const FULL_HEART = "💖";

const CAT1s = "https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2";
const CAT2s = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqOBsBiH_8A-8kUpg3gRTt7MvfPB6BkMWeFiNnTZ65xwAnLY5X2ybnua_1U2jxP_XxoTg&usqp=CAU";
const CAT3s = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrBeGoWZOSg4jrmFP0i7GZmJ3xGc8OJi6DmPArhgTSfgqlfLxBAUhtzHBb6_63lHQxko&usqp=CAU";
const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

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
