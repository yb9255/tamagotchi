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

<br>

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

### Feature

- **Login Page**
- **Game Start**
- **Egg Phase**
- **Child Phase**
- **Adult Phase**
- **State Screen**
- **Menu Screen**
- **Eating Animation**
- **Playing Animation**
- **Denying Animation**
- **Growing up Animation**
- **Mood Emoji**
- **Profile Page**

---

### Log

- OOP, MVC + Observer 패턴을 선택한 이유


  1) 이번 프로젝트는 다마고치의 상태(Model)가 실시간으로 변경되고, 변경된 사항을 바로 화면에 반영(View)해줘야 하는 특성이 있었습니다. 그렇기 때문에 모델을 다루는 로직과 렌더링을 다루는 로직이 섞여 있으면 에러나 버그가 발생했을 때 어떤 문제인지 파악하기가 매우 어려울 것으로 예상되었습니다. 그래서 Model과 View는 각각 상태 관리와 화면 렌더링이라는 본연의 업무에만 집중하고, 그 둘을 중간에서 연결하는 Controller를 사용하는 MVC 패턴을 사용했습니다.


  2) 작업을 진행하면서 특정 페이지나 특정 다마고치의 상태에서만 사용되는 메소드, 프로퍼티들이 지속적으로 발견됨을 확인할 수 있었습니다. 이런 값들을 클래스로 한데 묶어 두면 문제가 발생했을 때 코드를 추적하기 쉬울 것이라고 생각되서 OOP를 적용하게 되었습니다.


  3) 후에 한번 더 서술하겠지만 페이지가 바뀔때마다 새로 그려지는 DOM의 로딩이 끝나는 지 추적하고 그 이후에 리스너를 붙여주는 동작이 필요했는데, 이를 위해서 MutationObserver를 생성해서 DOM 렌더링을 지속적으로 추적하는 옵저버 패턴을 더했습니다.


- Vanilla JS에서의 클라이언트 사이드 렌더링
  바닐라 JS에서의 SPA는 pushState로 route를 바꾼 뒤, 해당 route에 맞게 DOM을 다시 그리는 방식을 사용합니다. 뒤로 가기 등에는 popState를 사용해서 대응합니다. 단순한 텍스트, div 등을 렌더링 하는 것은 크게 어렵지 않았지만, 화면이 복잡해지니까 다음과 같은 문제가 발생했습니다.


1. 문제 1 : DOM Tree가 사라질 때마다 완전히 새로운 DOM이 생성됩니다.
   - 클라이언트 사이드 렌더링은 이전의 DOM Tree를 지우고 새로운 DOM Tree를 넣는 작업을 반복합니다. 이 과정에서 이전에 달았던 리스너는 사라지게 됩니다. 또한 클래스 내부에 document.querySelector 등으로 DOM Element를 잡으면 클래스가 생성된 시점의 DOM을 클로저로 기억하기 때문에, 다시 그려진 DOM Element가 같은 클래스나 속성을 이전 DOM에서 업데이트 되지 않았습니다.
   - 문제 해결: handleSetting-으로 시작하는 메소드들을 사용해서 사용자가 URL을 입력해서 들어오거나 새 DOM Tree가 렌더링 될 때 DOM Elements들을 다시 추적해서 클래스의 프로퍼티에 담고 리스너를 달아줍니다. 이후 프로퍼티에 담긴 값을 DOM 조작에 사용하는 구조를 만들었습니다.


2. 문제 2: DOM Tree의 Mount, Unmount 순간을 캐치하기가 어려웠습니다.
   - 리액트의 경우 useEffect, componentDidMount, componentWillUnmount 등 DOM의 라이프사이클을 추적하는 작업을 지원하는 훅, 메소드들이 많이 있었습니다만 Vanilla JS에서는 간단한 방법이 존재하지 않았습니다. 가장 큰 문제가 innerHTML, insertAdjacentHTML 등의 HTML DOM을 생성하는 메소드들은 동기적으로 작동하지만 그것이 렌더링까지 동기적으로 실행되는 점을 보장해주지 않는다는 것이었습니다. 그래서 렌더링이 끝나기 전에 다음 코드들이 실행되서 리스너를 아직 렌더링되지 않은 DOM element에 달려고 시도하다가 에러가 나는 등 여러 문제가 발생했습니다. 
   - 또한 DOM Tree가 unmount 되는 순간이나 브라우저가 종료되는 순간 API를 보내고 싶은 경우에도 문제가 있었습니다. SPA이기 때문에 이벤트 리스너에 있는 beforeunload같은 이벤트들이 잘 추적이 되지 않아고, MDN에서 추천하는 visibilitychange의 경우 다마고치가 움직일때마다 지속적으로 콜백이 발동된다는 문제 때문에 제 프로젝트에 사용할 수 없었습니다.
   - 문제 해결: MutationObserver, Beacon API
     - 리서치 결과 과거에는 `setTimeout(callback, 0);` 같은 방법이나 DomAttrModified Event 사용했다고 하지만 더 좋은 방법이 없나 찾아보다가 [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)를 발견했습니다. Mutation Observer는 옵저빙하는 대상의 DOM에 변화가 감지되면 콜백 함수를 실행하며, entries와 observer 두 개의 인자를 가집니다. entries에서는 removedNode와 addedNode를 추적할 수 있는데, 이 점을 활용해서 componentWillUnmount와 componentDidMount를 구현할 수 있게 되었습니다. 삭제된 노드에 특정 DOM이 있다면 그 DOM을 가진 페이지가 언마운트 될 때 발동되야 하는 함수가 발동되고, 추가된 NODE에 특정 DOM이 있다면 그 DOM이 추가된 이후에 발동되야 하는 함수가 발동되도록 설정했습니다.
     - 브라우저를 종료하면서 데이터를 업데이트 하는 API를 보내는 로직은 [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)를 사용했습니다. Beacon API는   response를 필요로 하지 않고 웹페이지가 종료 되기 이전에 POST HTTP Request를 서버로 보내는 것을 보장해주는 API입니다. 기존의 beforeunload, unload 이벤트만 사용했을 때는 비동기 API를 보내도 response 관련 문제로 인해서 제대로 동작하지 않았었는데, beacon api를 사용함으로써 브라우저를 종료하는 시점에서도 안전하게 데이터를 업데이트 할 수 있게 되었습니다.

---

### Summary

