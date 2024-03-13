import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

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
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
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
