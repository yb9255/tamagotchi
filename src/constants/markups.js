import navbarStyles from '../css/navbar.css';
import loginStyles from '../css/login.css';
import mainStyles from '../css/main.css';
import profileStyles from '../css/profile.css';

import {
  LOGO_IMAGE_PATH,
  TAMAGOTCHI_BUTTONS_IMAGE_PATH,
  MENU_IMAGE_PATH,
} from '../constants/imagePath';

export const loginMarkup = `
  <div class="${loginStyles.container}">
    <img src="${LOGO_IMAGE_PATH}" alt="logo" />
    <button class=${loginStyles['login-btn']}>Sign in with Google</button>
  </div>
`;

export const mainMarkup = `
  <div class="${mainStyles.container}">
    <nav>
      <img src="${LOGO_IMAGE_PATH}" alt="logo" />
      <div class="${navbarStyles['navbar-links']}">
        <a href="/" data-link>main</a>
        <a href="/profile" class="${navbarStyles.hidden}" data-link>profile</a>
        <a href="/" class="${navbarStyles.logout}" data-link>logout</a>
      </div>
    </nav>
    <div class="${mainStyles['help-modal-btn']} ${mainStyles.hidden}">Help</div> 
    <div class="${mainStyles['help-modal']} ${mainStyles.hidden}" >
      <h2>사용 설명서</h2>
      <div class="${mainStyles['help-modal-card']}">
        <h3>1. 버튼 기능</h3>
        <img src="${TAMAGOTCHI_BUTTONS_IMAGE_PATH}" alt="buttons image"/>
        <h4>1) 메뉴가 닫혀 있을 때</h4> 
        <div>왼쪽 버튼이 메뉴를 여는 버튼입니다. 기운데, 오른쪽 버튼은 아무런 기능을 하지 않습니다.</div>
        <div>
          <h4>2) 메뉴가 열려 있을 때</h4>
          <div>2-1) 왼쪽 버튼이 메뉴의 아이템을 변경하는 버튼입니다.</div>
          <div>2-2) 가운데 버튼은 해당 메뉴 아이템을 선택하는 버튼입니다.</div>
          <div>2-3) 오른쪽 버튼은 메뉴를 취소하는 버튼입니다.</div>
        </div>
      </div>
      <div class="${mainStyles['help-modal-card']}">
        <h3>2. 기본 화면과 상태 변화</h3>
        <div>
          <h4>1) 일반 상태</h4>
          <span>다마고치가 화면에서 반복적으로 움직입니다. 가만히 두면 즐거움이 떨어지고 피곤함, 배고픔이 올라갑니다.</span>
        </div>
        <div>
          <h4>2) 행복한 상태</h4>
          <span> 다마고치의 즐거움이 높고 배고픔, 피곤함이 낮으면 좌측 상단에 하트 표시가 뜬 상황에서는 다마고치의 행복도과 경험치가 올라갑니다. 아이 상태에서 일정 경험치 이상을 충족하면 어른으로 성장합니다. 행복도는 프로필 페이지에서 확인할 수 있습니다.</span>
        </div>
        <div>
          <h4>3) 화난 상태</h4>
          <span>다마고치의 즐거움이 낮고 배고픔, 피곤함이 높으면 좌측 상단에 화난 표시와 함께 경고음이 들립니다. 다마고치의 행복도와 경험치가 내려갑니다. </span>
        </div>
        <div>
          <h4>4) 메뉴, 프로필 페이지, 사용 설명서가 열린 경우</h4>
          <span>위의 세 경우에는 시간이 흐르지 않습니다. 즉, 다마고치에게 아무런 상태변화가 일어나지 않습니다.</span>
        </div>
      </div>
      <div class="${mainStyles['help-modal-card']}">
        <h3>3. 메뉴 선택지</h3>
        <img src="${MENU_IMAGE_PATH}" alt="menu image"/>
        <div>
          <h4>1) FEED</h4>
          <span>1-1) 다마고치한테 밥을 줍니다. 배고픔이 감소하며, 배고픔이 낮을 경우 거부할 수 있습니다.</span>
        </div>
        <div>
          <h4>2) PLAY</h4>
          <span>2-1) 다마고치와 놀이를 합니다. 즐거움이 올라가지만 피곤함도 같이 올라갑니다. 즐거움이 높을 경우 거부할 수 있습니다.</span>
        </div>
        <div>
          <h4>3) STATE</h4>
          <div>3-1) 다마고치의 상태를 보여줍니다. 즐거움, 배고픔, 피곤함 수치 확인이 가능합니다. </div>
          <div>3-2) 피곤함 수치가 10이 되면 강제로 수면에 빠집니다. 이 경우, 피곤함 수치는 절반만 줄어들고 즐거움 수치가 0이 됩니다.</div>
        </div>
        <div>
          <h4>4) SLEEP</h4>
          <span>4-1) 다마고치를 재워서 피곤함 수치를 줄입니다. 강제 수면 이전에 재워주는 경우 즐거움 수치가 유지됩니다. </span>
        </div>
      </div>
      <div class="${mainStyles['help-modal-card']}">
        <h3>4. 프로필 페이지</h3>
        <div>
          <h4>1) 프로필 수정</h4>
          <span>프로필 페이지에서는 다마고치의 이름과 자기소개를 변경할 수 있습니다.</span>
        </div>
        <div>
          <h4>2) 행복도 확인</h4>
          <span>다마고치의 이름 밑에 그동안 증가한 행복도를 확인할 수 있습니다. 행복도는 0 아래로 내려가지 않습니다.</span>
        </div>
      </div>
      <div class="${mainStyles['x-btn']}">&#10005;</div>
    </div>
    <div class="${mainStyles.backdrop} ${mainStyles.hidden}"></div>
    <div class="${mainStyles['tamagotchi-container']}">
      <canvas id="${mainStyles.frame}" width="900" height="900">Frame Canvas</canvas>
      <canvas id="${mainStyles.tablet}" width="400" height="400">Tablet Canvas</canvas>
      <div class="${mainStyles.btns}">
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--1']}"></button>
        </div>
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--2']}"></button>
        </div>
        <div class="${mainStyles['btn-container']}">
          <button class="${mainStyles.btn} ${mainStyles['btn--3']}"></button>
        </div>
      </div>
      <div class="${mainStyles.modal}"><span>파란색 버튼을 클릭해주세요!</span></div>
      <div class="${mainStyles.menu} ${mainStyles.hidden}">
        <div class="${mainStyles['menu-item']}">FEED</div>
        <div class="${mainStyles['menu-item']}">PLAY</div>
        <div class="${mainStyles['menu-item']}">STATE</div>
        <div class="${mainStyles['menu-item']}">SLEEP</div>
      </div>
      <img class="${mainStyles['mood-img']} ${mainStyles.hidden}" />
    </div>
  </div>
`;

export const profileMarkup = `
  <div class="${profileStyles.container}">
    <div class="${profileStyles.modal} ${profileStyles.hidden}" data-testid="modal">
      <form>
        <input class="${profileStyles['name-input']}" placeholder="Pet Name" maxlength="10"/>
        <textarea class="${profileStyles['description-text-area']}" placeholder="Description" maxlength="200"></textarea>
        <button>Submit New Profile!</button>
      </form>
      <div class="${profileStyles['x-btn']}">&#10005;</div>
    </div>
    <div class="${profileStyles.backdrop} ${profileStyles.hidden}"></div>
    <nav>
      <img src="${LOGO_IMAGE_PATH}" alt="logo" />
      <div class="${navbarStyles['navbar-links']}">
        <a href="/" data-link>main</a>
        <a href="/profile" data-link>profile</a>
        <a href="/" class="${navbarStyles.logout}" data-link>logout</a>
      </div>
    </nav>
    <div class="${profileStyles['profile-container']}">
      <button class="${profileStyles['edit-my-profile']}">Edit the Profile</button>
      <div class="${profileStyles['profile-body']}">
        <div class="${profileStyles['profile-heading']}"></div>
        <div class="${profileStyles['profile-left']}"></div>
        <div class="${profileStyles['profile-right']}">
          <h2>Description</h2>
          <span></span>
        </div>
        <img src="${LOGO_IMAGE_PATH}" alt="logo" />
      </div>
    </div>
  </div>
`;
