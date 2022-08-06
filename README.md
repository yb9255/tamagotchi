# Web Tamagotchi

![LOGO](https://i.pinimg.com/originals/7e/c0/39/7ec0399de0e72dc73388e9306d7c4745.png)


### Introduction

- 웹에서 플레이할 수 있는 다마고치입니다. **데스크탑 플레이(24인치 iMac)를 기준으로 만들어졌습니다.**
- 다마고치를 먹여주고, 재워주고, 놀아주다보면 다마고치가 성장합니다. 다마고치를 성장시키고 행복도를 증가시키는게 목표인 게임입니다.
- 간단한 프로필도 작성이 가능합니다.
- 사용자가 로그아웃이나 화면을 끈 후 다시 로그인 한다면, 이전의 수치가 그대로 유지되어 있습니다.

---


### Motivation

- **Vanilla JS 프로젝트를 기획한 이유**

아이디어를 찾기 위해 여러 컨퍼런스 영상을 참고하던 도중 제네레이터 함수를 기반으로 다마고치를 만드는 영상을 발견했습니다. 영상을 보면서 ES2017에 도입된 Async / Await가 어떤 원리로 비동기 코드를 동기적인 흐름처럼 보이도록 제어할 수 있는지 원리에 대해서 공부할 수 있게 되었습니다. 또한 Async / Await의 활용은 웹 개발에서 기초 중에 기초이지만 그 원리에 대해서는 깊게 생각해보지 않은 저 자신에 대해서도 반성하게 되었습니다.

그와 동시에, 제가 바닐라 자바스크립트에 대해서 얼마나 깊게 이해하고 있나에 대한 의문도 들었습니다. 그리고 제가 작성한 리액트 코드가 실제 브라우저에서 어떻게 번들되어서 동작하는지에 대해서도 잘 모르는 것 같았습니다. 그래서 바닐라 자바스크립트의 다양한 기능을 사용하고, 이를 써서 리액트 기능을 일부 모방하는 프로젝트를 기획해보자는 마음이 들었습니다.

- **다마고치를 선택한 이유**

웹 다마고치를 만들어 보는 것이 자바스크립트의 여러 기능들을 많이 활용해야 하는 프로젝트라는 생각이 들었기 때문입니다. 그래서 라이브러리의 활용을 최소화 하고 자바스크립트 내장 기능만으로 프로젝트를 만들었습니다. 동시에 자바스크립트를 활용해서 리액트에서 지원하는 기초적인 기능(State 변화에 따른 화면 리페인팅 혹은 리렌더링, SPA)도 시도해보고자 했습니다.

---

### Tech Stack



- **Vanilla JS**

  다마고치 프로젝트의 경우 프로필 페이지로 이동하는 것 정도를 제외하면 잦은 화면 리렌더링이 발생하지 않습니다. 또한 프로젝트의 목적 중 하나가 리액트 코드가 어떤 원리로 동작하는지 이해하는 것이었기 때문에, 리액트에 의존하지 않고 모든 상태 변화와 페이지 전환을 관리해 보는 것이 좋다고 생각해서 바닐라 자바스크립트로 프로젝트를 진행했습니다.


- **Node.js / Express / MongoDB**

  이번 프로젝트에서 서버사이드 작업은 사용자의 다마고치 데이터를 보관, 제공하는 단순 CRUD 역할만 담당합니다. 데이터 구조나 서버에서의 작업이 복잡하지 않은 반면에 실시간 업데이트는 자주 발생합니다. 이런 잦은 IO 처리에 node.js와 NoSQL을 쓰는게 적합하다고 여겨서 express와 MongoDB를 사용했습니다. 배포에는 AWS Elastic Beanstalk를 사용했습니다.


- **firebase, firebase-admin**

  사용자의 다마고치 정보를 저장하기 위해 파이어베이스 구글 로그인을 사용했습니다.


- **jsonwebtoken**

  구글 로그인 시, 서버는 브라우저가 보낸 accessToken을 기반으로 어떤 사용자가 로그인 요청을 했는지 파악합니다. 그 다음 브라우저에 해당 사용자의 MongoDB ObjectId를 담은 JWT를 리스폰스로 보냅니다. 이 서버 토큰은 이후 브라우저가 현재 사용자가 로그인했음을 서버에 인증하는데 사용됩니다.

---

### Links

- **메인 페이지(Netlify)** : https://yb-web-tamagotchi.netlify.app
- **Github Repo(Frontend)** : https://github.com/yb9255/tamagotchi
- **Github Repo(Backend)** : https://github.com/yb9255/tamagotchi-server

---


### Planning

#### Week 1

- 아이디어 브레인 스토밍
- 아이디어 선택 후 구체화
- 아이디어 칸반보드, 목업 작성
- 프로젝트 관련 자료 수집

#### Week 2
- 기존 아이디어에서 부족한 점, 잘못된 점 보완/수정
- Webpack 설정
- 개발 진행

#### Week 3
- 디버깅
- 테스트 코드 작성
- 리드미 초안 작성
- Netlify, AWS 배포

---


### Features

<details>
<summary>Login Page</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 21 06](https://user-images.githubusercontent.com/92532339/179760530-29e8ef2c-e39f-494e-8601-ab59ebb4c9e8.gif)

  <br />
    
  - 로그인을 하지 않았을 때 나오는 화면입니다.
  - 로그인을 하지 않았을 경우, 다른 url을 입력해도 로그인 페이지로 돌아옵니다.
  - 로그인 이후에는 해당 라우트로 접속을 시도해도 메인 페이지로 리다이렉팅 됩니다.
  - 가운데 구글 소셜 로그인 버튼이 있습니다.

</div>
</details>

<details>
<summary>Game Start</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 31 22](https://user-images.githubusercontent.com/92532339/179762707-f00f3ec5-da7b-4d7f-8f26-a20a510f34d0.gif)

  
  <br />
  
  - 사용자가 맨 처음 게임을 시작할 때 화면입니다. 
  - 프로필 페이지가 없으며, 직접 프로필 라우트를 입력해도 해당 화면으로 돌아옵니다.

</div>
</details>

<details>
<summary>Egg Phase</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-28 at 23 08 41](https://user-images.githubusercontent.com/92532339/181526089-21cd8c78-1c91-4c3b-9b6f-21d950f0c163.gif)

  
  <br />
  
  - 게임 시작 상황에서 버튼을 누르면 알이 화면에 출력됩니다. 게임 시작 사운드도 출력됩니다.
  - 아무 버튼이나 누르면 알이 흔들리면서 소리가 나옵니다. 
  - 일정 횟수 이상 누르면 알이 깨어나는 애니메이션과 함꼐 아이 상태의 다마고치가 나옵니다.
  - 아이일 때부터 프로필 페이지 링크, help 메뉴가 화면에 출력됩니다.
  
</div>
</details>

<details>
<summary>Child Phase</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 46 01](https://user-images.githubusercontent.com/92532339/179765842-d141d1ab-5cee-404f-ab45-e4aa0f1a7875.gif)

  
  <br />

  - 아이 상태가 되면서 네비게이션 바에서 프로필 링크가 활성화됩니다. 
  - 아이 상태때부터 맨 왼쪽 버튼은 메뉴 키기 / (메뉴가 켜져 있는 상태에서는) 메뉴 변경하기 버튼이 됩니다.
  - 가운데 버튼은 메뉴 선택하기 버튼이 됩니다.
  - 오른쪽 버튼은 메뉴 취소 버튼이 됩니다.
  - 각 버튼마다 사운드가 있습니다.
  - 아이일때부터 게임 즐거움, 배고픔, 피곤함 수치 등이 실시간으로 변동됩니다.
  - 아이일때부터 화면 왼쪽에 행복한 상태, 화난 상태가 표시됩니다. 행복한 상태일 때 행복도, 경험치가 올라갑니다. 화난 상태일떄는 행복도, 경험치가 감소합니다.
  - 행복도는 프로필 페이지에서 확인이 가능하나, 경험치는 사용자가 확인할 수 없습니다.

  <br/>
</div>
</details>


<details>
<summary>Adult Phase</summary>
<div markdown="1">
   <br />
  
  ![스크린샷 2022-07-19 오후 11 21 00](https://user-images.githubusercontent.com/92532339/179773739-49b35945-a5cf-4b65-9303-40ff927e524f.png)

  
   <br />
  
  - 아이 상태에서 행복한 상태가 일정 시간 이상 지속되면 어른으로 진화합니다.
  - 어른일때의 할 수 있는 행동은 아이와 큰 차이가 없습니다. 
  - 행복도가 올라가고 내려가는 조건은 아이일 때와 같습니다.

</div>
</details>

<details>
<summary>Pet State</summary>
<div markdown="1">
  <br />
  
  ![스크린샷 2022-07-19 오후 10 57 56](https://user-images.githubusercontent.com/92532339/179768526-16860a8a-94bd-4871-8c3d-3360b1d65f60.png)

  
  <br />

  - 아이일때부터는 메뉴에서 상태를 확인할 수 있습니다.
  - 배고픔, 즐거움, 피곤함 수치가 있습니다.
  - 배고픔, 피곤함 수치는 브라우저가 메인화면을 가리키는 동안 시간이 지나면서 올라가고, 즐거움 수치는 줄어듭니다.
  - 브라우저가 비활성화, 프로필 보는 상태, 메뉴가 켜진 상태일 때는 이 수치 변화가 일시중지 됩니다.
  - 이 수치의 변화에 따라 행복함, 화남 등의 상태가 변경됩니다.
  - 행복함 수치인 상태를 유지시키면서 가만히 놔두면 경험치, 행복도가 올라갑니다.

  <br />
  
  ![Recording 2022-07-19 at 23 01 40 (1)](https://user-images.githubusercontent.com/92532339/179769548-420eedde-794d-425f-92d8-4de7d74f3d3d.gif)

  
  <br />

  - 피곤함 수치가 10이 되면 강제로 수면에 빠집니다. 이런 경우 즐거움 수치가 0으로 리셋되고, 피곤함 수치는 절반만 줄어듭니다.

  <br/>
</div>
</details>


<details>
<summary>Eating Animation</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 53 10](https://user-images.githubusercontent.com/92532339/179767473-92999f25-cba3-4231-a44e-9709a3ee9c3c.gif)

  
  <br />

  ![Recording 2022-07-19 at 23 24 15](https://user-images.githubusercontent.com/92532339/179774417-c195ced5-249c-4bba-a40e-0f9bb650735b.gif)

  
  <br />
  
  - 식사를 하면 배고픔 수치가 내려갑니다.
  - 짧은 식사 사운드가 재생됩니다.
  - 배고픔 수치가 일정 수치 이하이면 식사를 거부합니다.
  - 행복한 상태가 되기 위해서는 배고픔 수치가 일정 이하여야 합니다.

</div>
</details>

<details>
<summary>Playing Animation</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 23 07 13](https://user-images.githubusercontent.com/92532339/179770574-c46163fa-ad3b-43aa-b3a1-1c1d2a2da5bd.gif)

  
  <br />
  
  
  ![Recording 2022-07-19 at 23 25 31](https://user-images.githubusercontent.com/92532339/179774685-ba312113-a44a-4d6a-83c3-cea5a454eac7.gif)

  
  <br />
  
  - 놀이를 하면 즐거움 수치가 올라갑니다.
  - 짧은 놀이 사운드가 재생됩니다.
  - 놀이 시 피곤함 수치도 동시에 올라갑니다. 
  - 즐거움 수치가 높은 경우 놀이를 거부합니다.
  - 행복한 상태가 되기 위해서는 즐거움 수치가 일정 이여야 합니다.


</div>
</details>

<details>
<summary>Sleeping Animation</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 23 11 32](https://user-images.githubusercontent.com/92532339/179771516-aa621c2f-557d-4c1d-a31d-3eaca2c9d604.gif)

  
  <br />
  
  ![Recording 2022-07-19 at 23 26 28](https://user-images.githubusercontent.com/92532339/179774899-2edf8e59-977a-4fc6-ba25-06890b90bdcf.gif)

  
  <br />
  
  - 수면 시 피곤함 수치가 0이 됩니다.
  - 짧은 수면 사운드가 재생됩니다.
  - 피곤함 수치가 10이 되면 강제 수면에 빠지며, 이 경우 피곤함 수치는 절반만 줄어들고 즐거움 수치가 0이 됩니다.
  - 피곤함 수치가 낮은 경우 수면을 거부합니다.
  - 행복한 상태가 되기 위해서는 피곤함 수치가 일정 이하여야 합니다.

</div>
</details>


<details>
<summary>Growing up Animation</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 23 19 11](https://user-images.githubusercontent.com/92532339/179773227-c9953819-1680-4911-b07a-7c326b2a1a3d.gif)

  
  <br />
  
  - 경험치가 일정 수치 이상이 되면 다마고치가 성장합니다.
  - 짧은 성장 사운드가 재생됩니다.

</div>
</details>

<details>
<summary>Mood Emoji</summary>
<div markdown="1">
  <br />
  
  ![스크린샷 2022-07-19 오후 11 27 13](https://user-images.githubusercontent.com/92532339/179775633-abaa6cd4-28e7-423e-a628-fe6e154d1e5f.png)

  - 배고픔, 즐거움, 피곤함 수치가 좋다면 행복한 상태가 되고 위와 같이 하트가 화면 오른쪽 상단에 표시됩니다. 이 상태에서는 행복도와 경험치가 오릅니다.
  
  <br />
  
  ![스크린샷 2022-07-19 오후 11 27 18](https://user-images.githubusercontent.com/92532339/179775673-b54158a6-c770-4c4e-a252-7aa33facc346.png)

  
  - 행복한 상태가 아니면서 화난 상태도 아니라면 아무 표시도 뜨지 않습니다.
  
  <br />
  
  
  ![스크린샷 2022-07-19 오후 11 27 36](https://user-images.githubusercontent.com/92532339/179775697-f003bfbe-7d6e-41d2-aef9-2f0013bbdeda.png)

  - 배고픔, 즐거움, 피곤함 수치가 나쁘다면 화난 상태가 되고 위와 같이 화난 이모지가 화면 오른쪽 상단에 표시됩니다. 이 상태에서는 행복도와 경험치가 감소합니다.
  - 또한 현재 상태가 좋지 않음을 나타내는 사운드가 울립니다. 이 사운드는 시간이 흐르고 있을때만 들립니다. 
  
</div>
</details>

<details>
<summary>Profile Page</summary>
<div markdown="1">
  <br />
  
  ![스크린샷 2022-07-19 오후 10 33 21](https://user-images.githubusercontent.com/92532339/179776118-0986faec-1a09-439c-8b8d-830a9bd8acf7.png)
  

  ![스크린샷 2022-07-19 오후 11 31 19](https://user-images.githubusercontent.com/92532339/179776043-614847f5-262b-4037-b392-8e00b3d4adaa.png)

  
  ![스크린샷 2022-07-19 오후 11 32 23](https://user-images.githubusercontent.com/92532339/179776265-169d5d12-40ce-46b1-8266-bc2fef7f0482.png)
  
![스크린샷 2022-07-19 오후 11 32 35](https://user-images.githubusercontent.com/92532339/179776311-1cb36304-2636-4d4e-9890-68301a330cd1.png)

  <br />
  
 
  - 아이 상태일때부터는 프로필을 확인할 수 있습니다.
  - 편집 버튼을 눌러서 프로필을 편집할 수 있습니다. 이름, 자기소개 변경이 가능합니다.
  - 이름 하단에서 행복도를 확인할 수 있습니다.
  
  <br />

</div>
</details>


<details>
<summary>추가구현: Help Modal</summary>
<div markdown="1">
  <br />

![Recording 2022-07-28 at 23 13 49](https://user-images.githubusercontent.com/92532339/181529442-751424a8-122e-414b-9778-4bfd28bfad75.gif)


  <br />
  
 
  - 스탠드업 시연 중에 사용법을 어려워하시는 사용자 분들이 많아서 사용 설명서 모달을 추가했습니다.
  - 아이일때부터 활성화되며, 게임 조작법, 하는 방법 등의 내용이 포함되어 있습니다.
  - 백드랍을 누르거나 상단의 x버튼을 누르면 종료됩니다.
  
  <br />

</div>
</details>





---

### Log & Challenge

1. OOP, MVC + Observer 패턴을 선택한 이유
   - 이번 프로젝트는 다마고치의 상태(Model)가 실시간으로 변경되고, 변경된 사항을 바로 화면에 반영(View)해줘야 하는 특성이 있었습니다. 그렇기 때문에 모델을 다루는 로직과 렌더링을 다루는 로직이 섞여 있으면 에러나 버그가 발생했을 때 어떤 문제인지 파악하기가 매우 어려울 것으로 예상되었습니다. 그래서 Model과 View는 각각 상태 관리와 화면 렌더링이라는 본연의 업무에만 집중하고, 그 둘을 중간에서 연결하는 Controller를 사용하는 MVC 패턴을 사용했습니다.
   
   - 작업을 진행하면서 특정 페이지나 특정 다마고치의 상태에서만 사용되는 메소드, 프로퍼티들이 지속적으로 발견됨을 확인할 수 있었습니다. 이런 값들을 클래스로 한데 묶어 두면 문제가 발생했을 때 코드를 추적하기 쉬울 것이라고 생각되서 OOP를 적용하게 되었습니다.
   
   - 페이지가 바뀔때마다 새로 그려지는 DOM의 로딩이 끝나는 것을 추적하고 그 이후에 리스너를 다시 붙여주는 동작이 필요했는데, 이를 위해 DOM 렌더링을 지속적으로 추적하는 옵저버 패턴을 더했습니다.


2. Vanilla JS에서의 클라이언트 사이드 렌더링

   바닐라 JS에서의 SPA는 pushState로 route를 바꾼 뒤, 해당 route에 맞게 DOM을 다시 그리는 방식을 사용합니다. 뒤로 가기 등에는 popState를 사용해서 대응합니다. 단순한 텍스트, div 등을 렌더링하는 것은 크게 어렵지 않았지만, 화면이 복잡해지니까 다음과 같은 문제가 발생했습니다.

   - 문제 1 : DOM Tree가 사라질 때마다 완전히 새로운 DOM이 생성됩니다.
     - 클라이언트 사이드 렌더링은 이전의 DOM Tree를 지우고 새로운 DOM Tree를 넣는 작업을 반복합니다. 이 과정에서 이전에 달았던 리스너는 사라지게 됩니다. 또한 ES6 클래스 내부에 document.querySelector 등으로 DOM Element를 잡으면 클래스가 생성된 시점의 DOM을 클로저로 기억했습니다. 그래서 리렌더링이 발생해서 새로운 DOM이 생성되면 클래스 내부에서는 이전 DOM만 기억하고 있는다는 문제점이 발생했습니다. 



     - 문제 해결: 사용자가 직접 URL을 입력해서 들어오거나 새 DOM Tree가 렌더링 될 때 DOM Elements들을 다시 추적해서 클래스에 반영하고 리스너를 새로 달아주는 메소드들을 만들었습니다. 이 메소드들은 공통적으로 handleSetting-이라는 이름으로 시작합니다. 이 후 리렌더링이 발생할때마다 이 함수들이 실행되게 함으로써 모든 페이지가 항상 동일한 동작을 하도록 만들었습니다.
     
   - 문제 2: DOM Tree의 Mount, Unmount 순간을 캐치하기가 어려웠습니다.
     - 리액트의 경우 useEffect, componentDidMount, componentWillUnmount 등 DOM의 라이프사이클을 추적하는 작업을 지원하는 훅, 메소드들이 많이 있었습니다. 하지만 Vanilla JS에서는 간단한 방법이 존재하지 않았습니다. 가장 큰 문제가 innerHTML, insertAdjacentHTML 등의 HTML DOM을 생성하는 메소드들은 동기적으로 작동하지만 렌더링은 비동기적이라는 점이었습니다. 그래서 렌더링이 끝나기 전에 다음 코드들이 실행되서 에러가 나는 등 여러 문제가 발생했습니다. 
     - 또한 DOM Tree가 unmount 되는 순간이나 브라우저가 종료되는 순간 API를 보내고 싶은 경우에도 문제가 있었습니다. SPA이기 때문에 이벤트 리스너에 있는 beforeunload같은 이벤트들이 잘 추적이 되지 않았고, MDN에서 추천하는 visibilitychange의 경우 다마고치가 움직일때마다 지속적으로 콜백이 발동된다는 문제 때문에 제 프로젝트에 사용할 수 없었습니다.



     - 문제 해결: MutationObserver, Beacon API
       - 리서치 결과 과거에는 `setTimeout(callback, 0);`이나 `DomAttrModified Event`를 사용했다는 것을 찾을 수 있었습니다. 하지만 두 방법 모두 문제점이 있었습니다.
       - 우선 `setTimeout(callback, 0);`의 경우 콜백 함수가 콜백 큐에서 대기하다 실행되기 때문에 렌더링 완료 직후 시점에 콜백이 바로 실행된다는 보장이 없었습니다. 예를 들어, 버튼은 렌더링이 완료되서 화면에 나타나는데, addEventListener가 담긴 함수가 콜백 큐에서 밀려서 실행되지 않고, 이로 인해 버튼이 동작을 하지 않는 등의 문제가 발생할 수 있었습니다.
       - `DomAttrModified Event`는 타겟 DOM 객체에 변화가 발생하는 것을 감지하는 [Mutation Event](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent)의 일종입니다. 이 이벤트의 문제는 해당 이벤트가 발생할때마다 DOM에서 바뀐 점이 있는지 확인하기 위해 이벤트 타겟 DOM의 이전 정보를 복사해서 생성하는 구조를 가져 매우 느리다는 점이었습니다. 
       - 이후 더 좋은 방법이 없나 찾아보다가 [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)를 발견했습니다. Mutation Observer는 옵저빙하는 대상의 DOM에 변화가 감지되면, 그 변화가 완료된 이후 콜백 함수를 실행합니다. 이를 사용해서 렌더링이 끝나는 타이밍을 정확하게 캐치할 수 있게 되었습니다. 또한 Mutation Observer의 callback은 entries라는 매개변수를 가지는데, entries에는 removedNode와 addedNode의 값이 담겨져 있습니다. 이 점을 활용해서 componentWillUnmount와 componentDidMount를 구현할 수 있게 되었습니다. 현재 코드에서는 entries를 쓰지 않아도 되서 사용하고 있지 않지만, 특정 DOM 요소들이 mount, unmount되는 순간을 추적해야 한다면 entries를 활용할 수 있겠다는 생각이 들었습니다.


       - 브라우저를 종료하면서 데이터를 업데이트 하는 API를 보내는 로직은 [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)를 사용했습니다. Beacon API는 웹페이지가 종료 되기 이전에 POST HTTP Request를 서버로 보내는 것을 보장해주는 API입니다. 기존의 beforeunload, unload 이벤트만 사용했을 때는 API를 보내면 response 관련 문제로 인해서 제대로 동작하지 않았습니다. 하지만 beacon api는 response를 필요로 하지 않습니다. 그래서 beacon api를 사용함으로써 브라우저를 종료하는 시점에서도 확실하게 API를 보낼 수 있게 되었습니다.

3. 실시간 State 업데이트
   
   - 오리지널 다마고치는 실제 시간의 흐름에 따라 다마고치의 상태가 변합니다. 이 프로젝트에서는 일시 정지 기능을 넣고 싶어서 실제 시간과 일치하는 기능을 구현하지 않았습니다. 대신 다마고치가 움직이는 동안에는 시간의 흐름에 따라 상태가 변화할 필요가 있었습니다. 처음에는 setInterval을 사용하려고 했지만 setInterval은 콜백큐의 상황에 따라 콜백의 실행이 목표 시간보다 지연될 수 있다는 문제점이 있었습니다.
   - 그래서 리서치를 더 하다보니 [requestAnimationframe(rAf)](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) 메소드를 발견했습니다. rAf는 현재 사용하고 있는 출력기기가 표현할 수 있는 최대 FPS에 맞춰서 콜백 함수를 반복 실행하다가, 콜백 함수의 실행으로 인해 화면에서 시각적인 변경을 일으키는 코드가 실행되면 그 내용을 리플로우, 리페인트가 실행되기 바로 이전에 DOM에 반영할 수 있도록 해주는 함수입니다.
   - rAf의 가장 큰 특징은 콜백 큐가 아닌 별도의 애니메이션 프레임 큐에 콜백을 넣고 실행한다는 점입니다. 그렇기 때문에 rAf를 쓰면 setInterval보다 다른 비동기 콜백 함수들로 인한 지연 현상을 크게 줄일 수 있습니다. 그래서 state를 변경하는 메소드를 rAf를 사용해서 특정 시간마다 실행하도록 하고, 변경된 state에 기반해서 페이지 화면을 리페인팅 하도록 만들었습니다. rAf도 시간의 흐름을 완벽하게 추적하지는 못하지만, setInterval보다는 안정적으로 state를 변화시킬 수 있었습니다.

4. 관심사 분리의 부족함

   - 게임이라는 프로젝트 특성상 여러 정보가 얽히고 섥히는 경우가 많았습니다. 그래서 최대한 관심사를 분리하려고 노력해봤지만 부족한 부분이 많았던 것 같습니다. 가장 마음에 걸리는 점은 동시에 여러 개의 View 모듈과 Model 모듈을 불러오고 값을 변화시키다 보니 메인 Controller 모듈이 엄청나게 비대해진 것입니다. 나중에 분리를 하려고 해도 서로 엮여있는 정보가 너무 많아 섣불리 분리시키는 것도 어려웠습니다. 게임 프로젝트의 특성 상 어느 정도는 감수해야 하는 부분이라고 생각하지만, '조금 더 나은 방법이 있지 않았을까?' 하는 아쉬움이 계속 드는 부분입니다
---

### Key takeaways

- Vanilla JS의 기능에 대한 심도깊은 공부와 프론트엔드 라이브러리/프레임워크들의 유용성
  - 바닐라 자바스크립트가 정말 많은 기능을 가지고 있음을 알게 된 시간이었습니다. Beacon API, Mutation Observer, requestAnimationframe 등 많은 메소드들을 새로 배웠고, React 등 프론트엔드 라이브러리나 프레임워크가 어떤 식으로 SPA 등 편의 기능을 제공하는 지 새롭게 이해할 수 있는 시간이었습니다. 이 경험들이 리액트를 쓸 때 동작 원리에 입각해서 더 좋은 코드를 쓰는데 도움이 될 것이라고 생각합니다.

  - 그와 동시에 리액트와 같은 라이브러리가 왜 널리 사용되는지도 깨닫게 되었습니다. 상태 관리를 추적하는 것이나 리렌더링 시 실행되야 하는 모든 동작을 일일이 지정해서 리렌더링과 함께 실행되도록 코드를 작성하는 것은 쉽지 않았습니다. 또한 작은 기능을 추가하는데도 라이브러리를 사용할 때마다 훨씬 많은 것을 고려해야 했고, 버그도 많이 발생했습니다. 앞으로도 리액트, 자바스크립트의 원리에 대해 더 깊게 공부해야 하는 필요성을 체감할 수 있는 좋은 경험이었습니다.


- OOP와 MVC 패턴의 유용성에 대한 재발견
  - OOP와 MVC 패턴이 왜 널리 사용되고 있는가를 다시 되짚어 보게 되었습니다. 처음에는 리렌더링을 하거나 state를 바꿀 때마다 컨트롤러를 거쳐야 하는 점이 불편했습니다. 하지만 OOP로 작성하니 코드를 수정할 때 시간을 크게 줄일 수 있었습니다. 관련된 코드를 찾기도 편하고, 그 코드가 다른 역할을 하는 코드와 엮여있지 않아 수정 시 문제가 잘 발생하지 않았기 때문입니다. 또한 에러가 발생했을 때 에러 가능성이 있는 코드의 범위를 줄이는데도 큰 도움이 되었습니다. 객체 지향 설계가 아니더라도 연관된 코드끼리 하나의 모음으로 만들고 다른 모음과 서로 영향을 받지 않도록 설계하는 것의 중요성에 대해서 꺠달을 수 있었습니다.
