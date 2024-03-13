import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  /*
  // component가 재실행될 때마다 이 코드가 재실행될 필요도 없다.
  // 어플리케이션 전체 생명 주기에서 단 한 번만 실행되어도 상관 없다.
  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
  );
  */

  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  /*
  // 불필요한 useEffect의 예시
  // - 이 코드는 싱크가 맞게, 즉시 실행된다.
  //   - 콜백 함수나 프로미스 같은 게 없다.
  //   - 한 줄씩 차례대로 그대로 실행된다.
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    const storedPlaces = storedIds.map((id) =>
      AVAILABLE_PLACES.find((place) => place.id === id)
    );

    setPickedPlaces(storedPlaces);
    // 그렇다고 하더라도 이 부분은 무한 루프를 유발할 수 있으므로 위로 올릴 때 없애야 한다. state 업데이트를 이용하는 게 아니라 재실행 시의 초기값을 이용해야 한다.
  }, []);
  */

  // 1. 리액트는 component 함수의 실행이 완료된 후에 useEffect()에 전달된 함수를 실행한다.
  // 2. useEffect()가 실행되면서 state를 업데이트한다.
  // 3. component 함수가 다시 실행된다.
  // 4. 리액트는 의존성 배열도 함께 지켜보고 있고, 의존성의 값이 변화했을 때만 useEffect()를 다시 실행시킨다.
  useEffect(() => {
    /*
    - 아래 코드 전체가 side effects이다. 왜??
      - 사용자의 위치 파악하는 코드 => 앱에 필요하긴 하지만 컴포넌트 함수의 주된 목적과는 직접적인 연관성이 없음
      - 또한 () 안의 콜백 함수는 바로 완료되지 않으며, 이 컴포넌트의 다른 함수들이 모두 실행 완료된 후 실행될 것
    - (cf.) 모든 컴포넌트 함수의 주된 목적은 렌더링 가능한 JSX 코드를 반환하는 것
      - 현재 이 컴포넌트의 다른 코드들은 컴포넌트가 리턴하는 JSX와 직접 연관된 부분 (ex.) 이벤트 리스너, state 설정
    */
    navigator.geolocation.getCurrentPosition((position) => {
      /* (cf.) navigator는 브라우저가 제공하는 객체 */
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    // - 이 부분은 JSX 스냅샷으로 바로 이어지지만
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /*
    - 이 부분은 JSX와 직접 연관되지 않으므로 side effect이다.
    - 그런데 이 코드를 useEffect()로 묶어줄 필요는 없다.
      - 우선 function component안의 function 안에 있는 코드이므로 useEffect()를 애초에 사용할 수 없다.(hook 규칙 위반)
      - 코드 내에서 state를 업데이트하지 않으므로 무한 루프에 빠지는 것과 관련이 없다.
      - 설령 이 코드가 state를 업데이트한다고 하더라도 component 함수가 재실행될 때가 아니라 사용자 입력이 있을 때만 실행되므로 무한 루프에 빠지지 않는다.
    */
    /* 
    - useEffect() hook은
      (1) 무한 루프 방지용 (2) 컴포넌트 함수가 최소 한 번 실행된 이후에 작동해야하는 코드인 경우
      사용함을 명심
    */
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]) // localStorage에 저장되는 데이터도 문자열 형태여야함
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..." // fallback: 대비책, 대체물
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
