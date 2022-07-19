# Web Tamagotchi

---

![LOGO](https://i.pinimg.com/originals/7e/c0/39/7ec0399de0e72dc73388e9306d7c4745.png)


### Introduction

웹에서 플레이할 수 있는 다마고치입니다. 데스크탑 플레이를 기준으로 만들어졌습니다.

---


### Motivation

- **Vanilla JS 프로젝트를 기획한 이유**

아이디어를 찾기 위해 여러 컨퍼런스 영상을 참고하던 도중 제네레이터 함수를 기반으로 다마고치를 만드는 영상을 발견했습니다. 영상을 보면서 ES2017에 도입된 Async / Await가 어떤 원리로 비동기 코드를 동기적인 흐름처럼 보이도록 제어할 수 있는지 원리에 대해서 공부할 수 있게 되었습니다. 또한 Async / Await의 활용은 웹 개발에서 기초 중에 기초이지만 그 원리에 대해서는 깊게 생각해보지 않은 저 자신에 대해서도 반성하게 되었습니다.

그와 동시에, 제가 바닐라 자바스크립트에 대해서 얼마나 깊게 이해하고 있나에 대한 의문도 들었습니다. 그동안 제가 작성한 번들된 리액트 코드가 실제 브라우저에서 동작하는지에 대해서는 잘 알아보지 않았던 것 같습니다. 그래서 바닐라 자바스크립트만을 사용해서 리액트의 기능을 일부 모방하는 프로젝트를 기획해보자는 마음이 들었습니다.

- **다마고치를 선택한 이유**

웹 다마고치를 만들어 보는 것이 자바스크립트의 여러 기능들을 많이 활용해야 하는 프로젝트라는 생각이 들었기 때문입니다. 그래서 가능한 한 라이브러리의 활용을 최소화 하고 자바스크립트 내장 기능들만을 기반으로 프로젝트를 만들었습니다. 동시에 자바스크립트를 활용해서 리액트에서 지원하는 기초적인 기능(State 변화에 따른 화면 리렌더링, SPA)도 시도해보고자 했습니다.

---

### Tech Stack



- **Vanilla JS**

  다마고치 프로젝트의 경우 프로필 페이지로 이동하는 것 정도를 제외하면 잦은 화면 리렌더링이 발생하지 않습니다. 또한 프로젝트의 목적 중 하나가 리액트 코드가 어떤 원리로 동작하는지 이해하는 것이 목적이었기 때문에, 리액트에 의존하지 않고 모든 상태 변화와 페이지 전환을 관리해 보는 것이 좋다고 생각해서 바닐라 자바스크립트로 프로젝트를 진행했습니다.


- **Node.js / Express / MongoDB**

  이번 프로젝트에서 서버사이드 작업은 사용자의 다마고치 데이터를 보관하는 역할만 담당합니다. 데이터 구조나 서버에서의 작업이 복잡하지 않은데 반면에 실시간 업데이트는 자주 발생합니다. 이런 잦은 IO 처리에 node.js와 NoSQL을 쓰는게 적합하다고 여겨서 express와 MongoDB를 사용했습니다. 배포에는 AWS Elastic Beanstalk를 사용했습니다.


- **firebase, firebase-admin**

  사용자의 다마고치 정보를 저장하기 위해 파이어베이스 구글 로그인을 사용했습니다.


- **jsonwebtoken**

  구글 로그인 시, 서버는 브라우저가 보낸 accessToken을 기반으로 어떤 사용자가 로그인 요청을 했는지 파악합니다. 그 다음 브라우저에 해당 사용자의 MongoDB ObjectId를 담은 JWT를 리스폰스로 보냅니다. 이 서버 토큰은 이후 브라우저가 로그인한 사용자임을 인증하는데 사용됩니다.

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
- 기존 아이디어에서 부족한 점, 잘못된 점 보완, 수정
- Webpack 설정, 문제점 발생 시 추가 자료 수집
- 개발 진행

#### Week 3
- 디버깅, 테스트 코드 작성
- 리드미 작성
- Netlify, AWS 배포

---


### Feature


#### Basic Rules

- 다마고치가 배고프면 먹이를 주고, 심심해 하면 놀아주고, 피곤하면 재워주다 보면 성장합니다. 다마고치를 성장시키고 행복도를 증가시키는게 목표인 게임입니다.
- 간단한 프로필도 작성이 가능합니다.
- 사용자가 로그아웃이나 화면을 끈 후 다시 로그인 한다면, 이전의 수치가 그대로 유지되어 있습니다.
- 상세 설명은 아래 토글에서 GIF 파일과 함께 확인이 가능합니다.


#### Details

<details>
<summary>Login Page</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 21 06](https://user-images.githubusercontent.com/92532339/179760530-29e8ef2c-e39f-494e-8601-ab59ebb4c9e8.gif)

  <br />
    
  - 로그인을 하지 않았을 때 나오는 화면입니다.
  - 로그인을 하지 않았을 경우, 다른 url을 입력해도 로그인 페이지로 돌아옵니다.
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
  
  ![Recording 2022-07-19 at 22 35 21](https://user-images.githubusercontent.com/92532339/179763610-48f20e40-0f69-42a7-bae9-787e3aeb3f7b.gif)

  
  <br />
  
  - 게임 시작 상황에서 알을 누르면 알이 화면에 출력됩니다. 게임 시작 사운드도 출력됩니다
  - 아무 버튼이나 누르면 알이 흔들리면서 소리가 나옵니다. 
  - 일정 횟수 이상 누르면 알이 깨어나는 애니메이션과 함꼐 아이 상태의 다마고치가 나옵니다.
  
</div>
</details>

<details>
<summary>Child Phase</summary>
<div markdown="1">
  <br />
  
  ![Recording 2022-07-19 at 22 46 01](https://user-images.githubusercontent.com/92532339/179765842-d141d1ab-5cee-404f-ab45-e4aa0f1a7875.gif)

  
  <br />

  - 아이 상태가 되면서 메뉴에서 프로필 링크가 활성화됩니다. 
  - 아이 상태때부터 맨 왼쪽 버튼은 메뉴 키기 / (메뉴가 켜져 있는 상태에서는) 메뉴 변경하기 버튼이 됩니다.
  - 가운데 버튼은 메뉴 선택하기 버튼이 됩니다.
  - 오른쪽 버튼은 메뉴 취소 버튼이 됩니다.
  - 아이일때부터는 게임 페이지에서는 확인할 수 없지만 행복도, 경험치가 상태에 따라서 표시됩니다. 행복도는 프로필 페이지에서 확인할 수 있습니다.
  - 아이일때부터는 화면 왼쪽에 행복한 상태, 화난 상태가 표시됩니다. 행복한 상태일 때 행복도, 경험치가 올라갑니다.

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

  - 아이 상태일때부터는 메뉴에서 상태를 확인할 수 있습니다.
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
  - 행복한 상태가 되기 위해서는 즐거움 수치가 일정 이하여야 합니다.


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
  
  - 경험치가 일정 수치를 이루면 다마고치가 성장합니다.
  - 짧은 성장 사운드가 재생됩니다.

</div>
</details>

<details>
<summary>Mood Emoji</summary>
<div markdown="1">
  <br />
  
  ![스크린샷 2022-07-19 오후 11 27 13](https://user-images.githubusercontent.com/92532339/179775633-abaa6cd4-28e7-423e-a628-fe6e154d1e5f.png)

  - 배고픔, 즐거움, 피곤함 수치가 좋다면 행복한 상태가 되고 위와 같이 하트 표시가 표시됩니다. 이 상태에서는 행복도와 경험치가 오릅니다.
  
  <br />
  
  ![스크린샷 2022-07-19 오후 11 27 18](https://user-images.githubusercontent.com/92532339/179775673-b54158a6-c770-4c4e-a252-7aa33facc346.png)

  
  - 행복하지도 화가 나지도 않았다면, 아무 표시도 뜨지 않습니다.
  
  <br />
  
  
  ![스크린샷 2022-07-19 오후 11 27 36](https://user-images.githubusercontent.com/92532339/179775697-f003bfbe-7d6e-41d2-aef9-2f0013bbdeda.png)

  - 배고픔, 즐거움, 피곤함 수치가 나쁘다면 화난 상태가 되고 위와 같이 화난 이모지가 표시됩니다. 이 상태에서는 행복도와 경험치가 감소합니다.
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
  
 
  - 아이 상태일때부터는 프로필을 편집할 수 있습니다.
  - 편집 버튼을 눌러서 프로필을 편집할 수 있습니다.
  - 이름 하단에서 행복도를 확인할 수 있습니다.
  
  <br />

</div>
</details>




---

### Log & Challenge

1. OOP, MVC + Observer 패턴을 선택한 이유
   - 이번 프로젝트는 다마고치의 상태(Model)가 실시간으로 변경되고, 변경된 사항을 바로 화면에 반영(View)해줘야 하는 특성이 있었습니다. 그렇기 때문에 모델을 다루는 로직과 렌더링을 다루는 로직이 섞여 있으면 에러나 버그가 발생했을 때 어떤 문제인지 파악하기가 매우 어려울 것으로 예상되었습니다. 그래서 Model과 View는 각각 상태 관리와 화면 렌더링이라는 본연의 업무에만 집중하고, 그 둘을 중간에서 연결하는 Controller를 사용하는 MVC 패턴을 사용했습니다.
   
   - 작업을 진행하면서 특정 페이지나 특정 다마고치의 상태에서만 사용되는 메소드, 프로퍼티들이 지속적으로 발견됨을 확인할 수 있었습니다. 이런 값들을 클래스로 한데 묶어 두면 문제가 발생했을 때 코드를 추적하기 쉬울 것이라고 생각되서 OOP를 적용하게 되었습니다.
   
   - 후에 한번 더 서술하겠지만 페이지가 바뀔때마다 새로 그려지는 DOM의 로딩이 끝나는 지 추적하고 그 이후에 리스너를 붙여주는 동작이 필요했는데, 이를 위해서 MutationObserver를 생성해서 DOM 렌더링을 지속적으로 추적하는 옵저버 패턴을 더했습니다.


2. Vanilla JS에서의 클라이언트 사이드 렌더링

   바닐라 JS에서의 SPA는 pushState로 route를 바꾼 뒤, 해당 route에 맞게 DOM을 다시 그리는 방식을 사용합니다. 뒤로 가기 등에는 popState를 사용해서 대응합니다. 단순한 텍스트, div 등을 렌더링하는 것은 크게 어렵지 않았지만, 화면이 복잡해지니까 다음과 같은 문제가 발생했습니다.

   - 문제 1 : DOM Tree가 사라질 때마다 완전히 새로운 DOM이 생성됩니다.
     - 클라이언트 사이드 렌더링은 이전의 DOM Tree를 지우고 새로운 DOM Tree를 넣는 작업을 반복합니다. 이 과정에서 이전에 달았던 리스너는 사라지게 됩니다. 또한 클래스 내부에 document.querySelector 등으로 DOM Element를 잡으면 클래스가 생성된 시점의 DOM을 클로저로 기억하기 때문에, 다시 그려진 DOM Element가 같은 클래스나 속성을 이전 DOM에서 업데이트 되지 않았습니다.
     - 문제 해결: handleSetting-으로 시작하는 메소드들을 사용해서 사용자가 URL을 입력해서 들어오거나 새 DOM Tree가 렌더링 될 때 DOM Elements들을 다시 추적해서 클래스의 프로퍼티에 담고 리스너를 달아줍니다. 이후 프로퍼티에 담긴 값을 DOM 조작에 사용하는 구조를 만들었습니다.


   - 문제 2: DOM Tree의 Mount, Unmount 순간을 캐치하기가 어려웠습니다.
     - 리액트의 경우 useEffect, componentDidMount, componentWillUnmount 등 DOM의 라이프사이클을 추적하는 작업을 지원하는 훅, 메소드들이 많이 있었습니다만 Vanilla JS에서는 간단한 방법이 존재하지 않았습니다. 가장 큰 문제가 innerHTML, insertAdjacentHTML 등의 HTML DOM을 생성하는 메소드들은 동기적으로 작동하지만 그것이 렌더링까지 동기적으로 실행되는 점을 보장해주지 않는다는 것이었습니다. 그래서 렌더링이 끝나기 전에 다음 코드들이 실행되서 리스너를 아직 렌더링되지 않은 DOM element에 달려고 시도하다가 에러가 나는 등 여러 문제가 발생했습니다. 
     - 또한 DOM Tree가 unmount 되는 순간이나 브라우저가 종료되는 순간 API를 보내고 싶은 경우에도 문제가 있었습니다. SPA이기 때문에 이벤트 리스너에 있는 beforeunload같은 이벤트들이 잘 추적이 되지 않아고, MDN에서 추천하는 visibilitychange의 경우 다마고치가 움직일때마다 지속적으로 콜백이 발동된다는 문제 때문에 제 프로젝트에 사용할 수 없었습니다.
     - 문제 해결: MutationObserver, Beacon API
       - 리서치 결과 과거에는 `setTimeout(callback, 0);` 같은 방법이나 DomAttrModified Event 사용했다고 하지만 더 좋은 방법이 없나 찾아보다가 [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)를 발견했습니다. Mutation Observer는 옵저빙하는 대상의 DOM에 변화가 감지되면 콜백 함수를 실행하며, entries와 observer 두 개의 인자를 가집니다. entries에서는 removedNode와 addedNode를 추적할 수 있는데, 이 점을 활용해서 componentWillUnmount와 componentDidMount를 구현할 수 있게 되었습니다. 삭제된 노드에 특정 DOM이 있다면 그 DOM을 가진 페이지가 언마운트 될 때 발동되야 하는 함수가 발동되고, 추가된 NODE에 특정 DOM이 있다면 그 DOM이 추가된 이후에 발동되야 하는 함수가 발동되도록 설정했습니다.
       - 브라우저를 종료하면서 데이터를 업데이트 하는 API를 보내는 로직은 [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)를 사용했습니다. Beacon API는   response를 필요로 하지 않고 웹페이지가 종료 되기 이전에 POST HTTP Request를 서버로 보내는 것을 보장해주는 API입니다. 기존의 beforeunload, unload 이벤트만 사용했을 때는 비동기 API를 보내도 response 관련 문제로 인해서 제대로 동작하지 않았었는데, beacon api를 사용함으로써 브라우저를 종료하는 시점에서도 안전하게 데이터를 업데이트 할 수 있게 되었습니다.

3. 실시간 State 업데이트
   
   - 오리지널 다마고치는 실제 시간의 흐름에 따라 다마고치의 상태가 변합니다. 이 프로젝트에서는 실제 시간과 완전히 일치시키는 기능을 구현하지는 않았지만 다마고치의 메인 화면이 켜져 있는 동안에는 시간의 흐름에 따라 상태가 변하도록 했어야 했습니다. 처음에는 setInterval을 사용하려고 했지만 setInterval을 실행하는 시간, 다른 동기적 흐름의 코드들의 실행을 기다리는 시간 등이 setInterval의 실행 타이밍을 목표 시간보다 지연시킬 수 있다는 문제점이 있었습니다.

   - 그래서 리서치를 더 하다보니 requestAnimationframe(RAF) 함수라는 것이 있었습니다. RAF는 현재 사용하고 있는 출력기기가 표현할 수 있는 최대 FPS에 맞춰서 인자로 받은 콜백을 반복실행 시키는 함수입니다. (현재 모니터가 1초에 60프레임만큼 출력할 수 있다면 RAF는 대략 16ms에 한번 실행이 됩니다) 그리고 그 반복실행 될때 화면에 변경사항이 있다면 그 변경사항은 반영해서 리렌더링을 실행합니다. 이를 활용해서 특정 시간마다 state를 변경하는 메소드를 추가하였고, 그 메소드의 state에 기반해서 페이지 화면 스타일이 변동되도록 설정을 해서 업데이트된 값을 화면에 반영시켰습니다.
---

### Key takeaways

1. 바닐라 자바스크립트가 정말 많은 기능을 가지고 있음을 알게 된 시간이었습니다. 그와 동시에 리액트와 같은 라이브러리가 왜 널리 사용되는지도 깨닫게 되었습니다. 상태 관리를 추적하기 위해서 실시간으로 모니터링 하는 함수를 계속 실행해주는 것도 브라우저 상황에 의존해야 하고, 리렌더링이 발생할 때 일일히 리스너를 달아주고 데이터를 다시 불러오는 로직을 넣어주는 것 역시 쉽지 않았습니다. 기존에는 프로필 페이지에 소켓을 넣어서 프로필 공유 기능을 넣으려고 했는데, 클라이언트 사이드 렌더링과 실시간 state 업데이트 로직과 충돌이 발생하면서 React로 소켓을 사용하는 것보다 훨씬 난이도가 올라감을 느꼈습니다. 시간이 부족해서 끝까지 완성하지 못했지만, 개인적으로 리액트의 구조에 대해서 더 공부해서 차후에 다시 도전하고 싶다는 생각이 들었습니다.

2. OOP와 MVC 패턴이 왜 널리 사용되고 있는가를 다시 되짚어 보게 되었습니다. 처음에는 렌더링이나 state를 변동해야 할 때마다 컨트롤러를 거쳐야 하거나 새로운 클래스를 만들어야 하는 점이 불편했습니다. 하지만 값을 변동해야 할때나 코드를 수정해야 할 때 관련된 코드와 로직만 살펴보면 되서 시간을 크게 줄일 수 있었습니다. 또한 에러가 발생했을 때 에러가 발생했음 가능성이 있는 코드의 범위를 줄이는데도 큰 도움이 되었습니다. 굳이 객체 지향 설계를 하지 않더라도 연관된 코드끼리 하나의 모음으로 만들고 다른 모음과 서로 영향을 받지 않도록 설계하는 것을 고려해야 겠다는 생각도 들었습니다.
