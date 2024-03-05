/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Pacifico"', 'cursive']
        // '""' 작은 따옴표 안에 큰 따옴표까지 쓴 건 외부에서 불러온 폰트에만 적용되는 규칙
        // tailwind 기존 fontFamily 구성에 새 폰트를 추가하는 작업
        // - index.html에서는 이미 가져오고 있지만,
        //   구성 파일을 수정, 새로운 유틸리티 클래스를 만들어 tailwind로 쉽게 사용할 수 있도록 하는 작업이라고 생각하면 될 것
      }
    },
  },
  plugins: [],
}

