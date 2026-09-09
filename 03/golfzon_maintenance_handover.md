# 골프존 운영·계약 대시보드 유지보수 기준

기준일: 2026-09-10
Release: v1.0.0
Git commit: cb227bd
기준 원본: 현재 프로젝트 root의 Release 기준본 (`index.html`, `style.css`, `common.js`, `data/`)
상태: 반응형·상호작용·접근성 마감과 코드·모의 검증, 사용자 실화면 QA를 완료한 Release 기준본.

## 1. 파일과 적용

- `index.html`: 재계약 검토·사업성 분석·용역비 정산서 화면 구조.
- `style.css`: root 공통 CSS와 화면별 반응형·인쇄 규칙.
- `common.js`: 메뉴, Diff DOM 이동, 정산 데이터·렌더링, 사업성 계산·입력·스냅샷.
- `data/`: 계약 PDF와 사용자 관리용 자료.
- `golfzon_maintenance_handover.md`: 현재 Release의 유지보수·평가 기준.

현재 프로젝트 root의 실제 코드가 Source of Truth다. 과거 패치 적용 순서나 phase notes를 현재 코드보다 우선하지 않으며, 문서와 코드가 다르면 최신 실제 코드를 먼저 확인한다. 새로운 디자인 추가보다 확정 UI의 회귀·중복·유지보수 문제 제거를 우선한다.

`data/260908_용역계약서_재계약.lnk`는 **원본 Word 파일들이 있는 관리 폴더로 이동하기 위한 사용자 관리용 바로가기**다. Runtime에서 참조되지 않는 것이 정상이며 Release ZIP에 포함하는 것도 의도된 상태다. 따라서 평가 시 이 파일의 존재, 미참조 상태, `.lnk` 확장자 자체를 감점 사유·불필요 파일·삭제 대상으로 판단하지 않는다. 사용자의 별도 삭제 지시가 없는 한 유지한다.

## 2. 반응형·Navigation

| 항목 | 현재 기준 |
| --- | --- |
| Web | 1101px 이상 |
| Tablet | 761~1100px |
| Phone | 760px 이하 |
| Dashboard 최대폭 | 1920px |
| Web Sidebar | 218px |
| Content 최대폭 | 1702px |
| Compact Drawer | 오른쪽, 최대폭 192px |

방향·기기종류 강제 판별 없이 viewport 폭으로 분기한다. 1920px 이하는 유동 축소하고 이를 초과하면 더 확장하지 않는다.

Tablet/Phone의 햄버거는 스냅샷·초기화와 같은 control 높이·radius·gap 계열을 사용한다. 3개 line transform으로 햄버거와 X를 전환한다. 별도의 X 문자나 버튼 DOM을 추가하지 않는다.

Drawer에서는 branding과 MENU 라벨을 숨기고 실제 메뉴만 표시한다. ESC, backdrop, aria-expanded, inert, 포커스 이동·복원과 Tab 순환을 유지한다.

- 용역비 정산서 부모 선택: Overview로 이동, 월별 하위메뉴 열기, Compact Drawer 유지.
- 실제 월 선택: 해당 월로 이동, Drawer 닫기.
- Web으로 전환: Drawer 상태를 닫고 Sidebar를 다시 사용 가능하게 한다.
- `aria-current="page"`는 현재 실제 페이지를 하나만 가리킨다. 정산 Overview에서는 부모 `용역비 정산서`가 current이고, 특정 월 화면에서는 해당 월 하위메뉴만 current다. 부모는 활성·확장 상태만 유지한다.

## 3. 재계약 검토

반영 현황의 Phone label/value 간격을 공통화한다. 반영사항만 별도 여백을 추가하지 않는다. 주요 변경 요약은 기존 grid를 유지한다.

Diff는 기존 셀 DOM을 이동하고 복제하지 않는다.

- Web: 종전계약·재계약안·반영내용 3열.
- Tablet: old/new를 원래 `.diff-row`에 유지해 같은 항의 위·아래 경계를 맞춘다. 반영내용은 아래 전체폭.
- Phone: 종전계약 문서 → 재계약안 문서 → 반영내용 순서의 stack.
- Phone을 벗어나면 원래 row로 복원한다. 인쇄 전후에도 화면 모드로 복원한다.

Tablet을 문서별 stack으로 되돌리지 않는다.

## 4. 사업성 설정 카드와 스냅샷

- Wide Web: 기본 설정 / 인건비 및 소모품비 / 산정 기준 = 43:17:40.
- business container가 1600px 이하: 기본 설정 전체폭, 하단 27:73.
- viewport 761~860px: 하단 50:50. 좁은 Tablet의 입력 잘림을 막기 위한 의도된 예외.
- Phone: 카드 3개를 세로로 배치하고 카드 내부 설정항목은 2열. 각 항목은 라벨 위·입력 아래.

761~860px의 50:50 규칙은 `.app-view-business:not(.is-ba-snapshot) .ba-settings`로 제한한다. **특수구간을 삭제하지 말고 스냅샷에 유입되지 않게 유지한다.**

스냅샷은 1702px stage에서 생성하며 Wide Web 배치를 기준으로 한다. 화면용 breakpoint 규칙을 추가할 때 스냅샷 제외 여부를 점검한다. RS는 전체 0.5 간격으로 출력하며 header·조작부·참고표·공통 계산 bundle은 현재 출력 구성에 따라 제외한다.

스냅샷 버튼은 `.ba-button-icon + span`의 텍스트만 변경한다. 아이콘을 포함하는 첫 span을 선택하지 않는다. 생성 중 중복 실행을 막고, 성공·실패 모두 finally에서 버튼 라벨·disabled·aria-busy를 복구한다.

SVG 렌더링 주소는 try 내부의 data URL 상수로 관리한다. object URL 해제가 필요한 대상은 PNG 다운로드용 `downloadUrl`이며, finally의 해제 및 버튼 복구를 유지한다.

## 5. RS 비교표·정산 현황 표

두 표 모두 폭이 충분하면 확장하고 최소 표시폭까지 축소한 후 표 내부에서만 가로 스크롤한다. 첫 라벨을 고정하고 데이터만 스크롤한다. 그룹 제목 전체 row를 sticky로 만들지 않는다. 첫 라벨 영역만 남기며 그룹 띠 오른쪽에 불필요한 세로선·그림자를 추가하지 않는다.

### RS 비교표

- Web은 전체 0.5 간격, Tablet/Phone은 기본 1.0 및 선택 가능한 0.5 간격.
- 계산 시리즈 자체는 0.5 간격을 유지하고 표시만 전환한다.
- live 라벨 track은 140px, 데이터 track 최소폭은 88px인 현재 코드 기준을 유지한다.
- 실제 column grid는 `.ba-unified-matrix .ba-matrix-head, .ba-unified-matrix .ba-metric-row`가 소유한다.
- 과거 `--ba-rs-col`을 사용하는 172px 기반 grid 선언은 제거했다. 다시 추가하지 않는다.
- Fixed RS Header는 실제 header의 grid track을 복사하고 matrixScroll.scrollLeft의 음수만큼 이동한다. 라벨은 같은 scrollLeft를 더해 왼쪽 위치를 유지한다.
- RS 간격 변경, 화면 전환, resize, scroll, 인쇄 전후의 동기화를 유지한다.
- hover와 변경값의 orange dashed 표시를 유지한다. 상단 설정 및 인건비 시간·인원 변경으로 비교표의 표시값이 달라지면 `renderAllWithValueFocus()`로 변경된 cell만 850ms 강조한다. 같은 값의 재입력·blur·증감 한계에서의 클릭은 matrix를 다시 만들지 않아 기존 강조를 유지한다.

### 월별 정산 현황

screen에서 부모 matrix의 intrinsic grid track과 row의 subgrid를 사용한다. 각 row에서 max-content를 별도로 계산하지 않는다. 월 header 버튼은 해당 월 정산서로 이동한다.

용역비 최종 row는 모든 월·누계·평균에 `--st-result-bg`를 사용한다. 상단 누계 용역비 카드와 같은 의미색이다. 평균만 분리하지 않는다. 최종 row의 cell 배경 선언은 한 규칙으로 유지한다.

### 공통 Typography

같은 역할의 header·group·row label·value는 공통 토큰과 line-height를 사용한다.

| 역할 | 기본 크기 | Phone live 크기 | line-height |
| --- | --- | --- | --- |
| Header | 11px | 11px | 1.48 |
| Group | 12px | 11.5px | 1.48 |
| Row label | 11.5px | 11px | 1.48 |
| Value | 12px | 11.5px | 1.15 |

Phone의 실제 크기는 현재 공통 토큰의 반응형 값을 따른다. 배경색·subtotal·final·의미색까지 두 표 사이에서 일괄 통합하지 않는다.

## 6. 인건비·업그레이드 표와 입력

Phone 참고표는 부모 grid와 row subgrid로 세로선을 맞춘다. 첫 라벨은 줄바꿈 없는 최소폭으로 고정한다. 최소 입력 track은 인건비 시간 58px·인원 54px, 업그레이드 단가 96px·수량 54px다. 이 한계부터 내부 가로 스크롤을 허용한다. 하위 항목 라벨의 좌측 padding을 임의로 늘리지 않는다.

### 입력값

`parseInput()`은 설정과 참고표 입력이 공유한다.

- 빈 값, 숫자가 아닌 값, 무한대, 음수는 계산 상태에 반영하지 않는다.
- percent 입력은 0~100% 범위만 반영한다.
- 무이자 개월은 0을 허용하지 않는다.
- 시간·인원·수량 등의 0 및 기존 소수 입력은 유지한다.
- 잘못된 편집 중에는 직전 유효 계산 상태를 유지한다. blur/focusout으로 확정할 때 마지막 유효값을 표시 형식으로 복원하고 사유를 안내한다. 입력 중 빈 값만으로는 새 안내를 띄우지 않는다.
- `.ba-input-notice`는 화면 하단 fixed 위치에서 5초 동안 표시한다. 레이아웃과 포커스를 이동하지 않으며 pointer-events:none으로 조작을 막지 않는다. 복원된 입력에 점선 표시와 aria-describedby를 연결하고 role=status/aria-live=polite로 안내한다. 값이 이미 유효값으로 복원되므로 aria-invalid=true를 남기지 않는다.
- 정상 입력, 안내 시간 만료, 다른 오류 안내, 초기화, 화면 전환, 인쇄, 스냅샷 시작 시 관련 안내·타이머·접근성 연결을 정리한다. 정상 입력에 의한 정리는 해당 오류 입력을 대상으로 하고 기존 aria-describedby 연결은 보존한다.
- 금액·단위별 기존 반올림 정책을 유지한다. 이자 반영 월비용 표시만 `Math.ceil()`로 1원 단위 올림한다.

### 참고표 갱신

`syncReferenceTable()`은 최초 DOM 생성 이후 기존 row와 input을 유지하고 cell 내용·계산값만 갱신한다. 현재 참고표는 고정된 행·열 구조다. 행 추가·삭제 기능을 새로 만들 경우 이 전제를 함께 검토해야 한다.

활성 입력칸의 편집 문자열은 렌더링으로 덮어쓰지 않는다. 참고표의 값 확정은 focusout에서 한 번 처리한다. 실제 유효값이 달라지면 인건비는 비교표 강조를 포함해 갱신하고 업그레이드는 참고표만 갱신한다. 값이 같거나 잘못된 경우에는 계산표를 재생성하지 않고 해당 입력의 표시를 정리한다. focusout마다 표 전체를 innerHTML로 재생성하거나 queueMicrotask로 지연 재생성하지 않는다. 다음 클릭·Tab 대상이 제거되기 때문이다.

참고표의 동적 input에는 시각적 column header만 의존하지 않고 항목·필드가 결합된 접근성 이름을 부여한다. 예: `평일 08:00 ~ 16:00 근무시간`, `시스템 업그레이드 단가`. input DOM을 보존하는 갱신 구조에서도 이 accessible name을 제거하지 않는다.

초기화는 설정·인건비·업그레이드 기본값 복원과 기존 matrix scroll·tooltip·강조 상태 정리 동작을 유지한다.

## 7. Tooltip

RS +1 식음료 증가 설명은 고정 금액 대신 “입력 금액만큼 증가, RS 0.5에서는 절반 적용”이라는 계산 원리를 안내한다. 입력값 변경 후에도 기본값 30만원·15만원을 현재 기준인 것처럼 표시하지 않는다.

사업성 tooltip은 `pinnedTooltip`으로 클릭 고정 상태를 별도 관리한다. focus/hover로 열린 상태를 첫 클릭의 닫기 조건으로 사용하지 않는다.

- 포커스 후 첫 클릭: 표시 유지 및 고정.
- 같은 버튼 두 번째 클릭: 닫기.
- 고정 상태 또는 버튼 포커스가 유지되는 동안 pointerout만으로 닫지 않는다.
- 다른 버튼으로 이동하면 이전 anchor의 상태를 정리한다.
- focusout, ESC, 외부 클릭, 기존 scroll·resize·화면 전환 경로에서 상태를 정리한다.

월별 정산 tooltip은 기존 `pinnedNote`를 유지한다.

## 8. 정리·유지보수 원칙

- `!important` 금지. 기존 규칙을 직접 수정하고 override 블록을 누적하지 않는다.
- 사용되지 않는 선언·주석을 정리하되 의도된 Web/Tablet/Phone·인쇄·스냅샷 분리를 중복으로 오인하지 않는다.
- 의미 없는 1~2px 차이를 별도 토큰으로 늘리지 않는다. 반대로 실제 역할이 다른 규칙을 점수 목적으로 억지 통합하지 않는다.
- 320px Drawer, Tablet 문서별 Diff stack, 과거 RS 고정폭 등 폐기된 규칙을 복구하지 않는다.
- 새 파일·새 토큰·새 breakpoint는 기존 구조로 해결할 수 없는 경우에만 추가한다.
- 현재 확정 UI를 유지하는 cleanup이 목적일 때는 디자인을 임의 변경하지 않는다.

## 9. `평가해줘`·`평가`·`점수` 요청 시 평가 기준

사용자가 별도 범위를 지정하지 않고 **“평가해줘”**, **“평가”**, **“점수”**라고 요청하면 현재 최신 Release 전체를 아래 기준으로 평가한다. 직전 대화에서 특정 화면·파일·기능만 평가 대상으로 명확히 좁힌 경우에만 그 범위로 제한한다.

평가 단계에서는 사용자가 동시에 수정을 요청하지 않는 한 **먼저 평가만 하고 코드를 수정하지 않는다.** 최신 첨부 ZIP 또는 현재 프로젝트 root를 Source of Truth로 사용하며, 과거 handover·phase notes의 오래된 설명으로 최신 코드를 감점하거나 되돌리지 않는다.

### 9.1 채점 원칙

- 총점은 100점이며 **100점을 예약하지 않는다.** 실제 감점 사유가 없을 때만 100점이다.
- 수정 직후라는 이유로 점수를 올리지 않는다. 반대로 사소한 차이를 억지로 문제화해 점수를 깎지도 않는다.
- 동일 원인의 반복 증상은 원칙적으로 하나의 구조적 이슈로 묶고, 서로 독립적인 회귀라면 별도 감점한다.
- 정적 검사로 확인한 사실, 계산 엔진 실행 결과, 실제 브라우저 실측 결과, 사용자 실기 완료 이력을 구분해 서술한다. 브라우저를 직접 실행하지 못한 환경에서는 “픽셀 QA 통과”, “모든 viewport 실화면 통과”라고 단정하지 않는다.
- `data/260908_용역계약서_재계약.lnk`는 사용자 관리용 원본 Word 폴더 바로가기이므로 **존재·미참조·확장자 자체를 감점하지 않는다.**
- 의도된 분리(Web/Tablet/Phone, screen/print, snapshot/live), 의도된 761~860px 50:50 특수구간, 의미색 차이는 중복·예외라는 이유만으로 감점하지 않는다.

### 9.2 심각도 등급

| 등급 | 판단 기준 | 대표 사례 | 일반적인 감점 범위 |
| --- | --- | --- | ---: |
| A | 핵심 기능·계산·데이터·접근 경로가 깨지거나 Release를 막는 문제 | 계산 오류, 월 정산 불일치, Diff 내용 소실, 메뉴/스냅샷/초기화 불능, page 전체 overflow로 사용 불가 | 건당 약 3~15점 이상 |
| B | 기능은 가능하지만 실제 사용성·반응형·상태관리·유지보수에 명확한 결함 | breakpoint 회귀, sticky/Fixed Header 불일치, 입력값 잘림, focus 소실, 중복 이벤트, 구조적 CSS 충돌 | 건당 약 0.5~3점 |
| C | Release를 막지는 않지만 구체적으로 고칠 가치가 있는 경미한 문제 | 접근성 이름 누락, 문서와 코드의 부분 불일치, 실제 dead selector, 의미 없는 중복 선언 | 건당 약 0.1~0.5점 |

감점 범위는 기계적으로 고정하지 않고 영향 범위·재현성·회귀 위험을 함께 본다. 같은 C급을 여러 개 찾았다고 무조건 B급으로 승격하지 않는다.

### 9.3 100점 세부 평가 항목

| 평가 영역 | 배점 | 반드시 확인할 내용 |
| --- | ---: | --- |
| 계약·데이터 정합성 | 10 | Diff 24건/변경17/유지7 구조, 계약 문구 대응, 정산 원천 데이터, PDF 링크, 월 데이터 누락 여부 |
| 사업성·정산 계산 | 15 | Business Engine 12개 기준, RS 0.5 계산, 인건비·업그레이드·이자 반영 월비용, 6개월 정산 합계·용역비 산식 |
| Web/Tablet/Phone 반응형 | 20 | 1920 max-width, Sidebar/Drawer 전환, 설정카드 43:17:40→1+2→특수 50:50→Phone, Diff, 표 scroll/sticky, page overflow |
| Navigation·상호작용·접근성 | 10 | 햄버거↔X, ESC/backdrop/focus/inert, 정산 부모/하위메뉴, aria-current, tooltip, input accessible name, keyboard 이동 |
| 사업성 분석 UI·RS 표 | 10 | RS 1.0/0.5 표시, shrink→scroll, 첫 컬럼 sticky, 그룹 라벨, Fixed RS Header sync, hover, orange dashed 변경 강조 |
| 용역비 정산 UI | 10 | KPI/월별표, shrink→scroll→sticky, subgrid 정렬, 용역비 결과색, 월 이동, 평균/누계 표시, 모바일 tooltip |
| Snapshot·Print | 5 | 1702px snapshot stage, Wide Web 카드 배치, RS 전체 0.5, transient state 제외, 버튼 아이콘/라벨 복구, print 회귀 |
| CSS 구조·토큰·공통화 | 10 | parse error, `!important`, 동일 scope duplicate, dead selector/property, 과토큰화, patch override, typography/table contract |
| JS 상태·회귀 안전성 | 7 | `node --check`, dead branch/listener, DOM 보존, focusout 확정, stale timer/state, Fixed Header sync, view/print cleanup |
| Release·문서 | 3 | 실제 파일 참조, 최신 handover와 코드 일치, 임시 산출물/과거 지시 오해 가능성. 단, 명시된 관리용 `.lnk`는 감점 제외 |
| **합계** | **100** |  |

### 9.4 반응형 필수 점검 폭

가능하면 아래 폭을 기준으로 확인하고, 최소한 breakpoint 직전·직후는 반드시 검토한다.

`2560, 1920, 1600, 1440, 1280, 1101, 1100, 920, 861, 860, 778, 761, 760, 600, 430, 390`

특히 다음 경계는 우선순위가 높다.

- `1101 ↔ 1100`: Web Sidebar ↔ Compact Drawer, Diff 3열 ↔ Tablet 2열, 콘텐츠 실제 가용폭 역전 여부.
- `861 ↔ 860`: 사업성 하단 27:73 ↔ 50:50 전환과 input 잘림.
- `761 ↔ 760`: Tablet ↔ Phone, Diff stack, 설정 카드 내부 2열, 표 sticky/scroll, 햄버거 위치.

브라우저 실측이 가능하면 화면 전체 horizontal overflow, sticky seam, 겹침, 잘림, 버튼 정렬, tooltip 위치를 함께 본다. 브라우저 실행이 불가능하면 CSS/DOM 계약과 계산된 track 구조를 확인하고 그 한계를 평가문에 명시한다.

### 9.5 화면·기능별 체크리스트

이 절은 **평가 관점만 정의**한다. 실제 수치·배치·상태 규칙은 앞선 유지보수 Contract를 Source of Truth로 사용하며, 여기에서 다시 중복 기재하지 않는다. 평가 시에는 아래 각 화면이 해당 Contract와 일치하는지 확인한다.

**재계약 검토 — §3 기준**
- 반영 현황과 주요 변경 요약의 반응형 배치가 §3의 현재 Contract와 일치하는지.
- Diff가 Web / Tablet / Phone에서 §3의 DOM 이동·복원 원칙을 지키는지.
- Tablet에서 old/new 같은 항이 동일 row 높이를 공유하고, Phone을 벗어나거나 인쇄가 끝난 뒤 원래 DOM으로 정확히 복원되는지.

**사업성 설정·참고표 — §4, §6 기준**
- 설정 카드의 Web / Tablet / Phone 배치가 §4의 확정 반응형 Contract와 일치하는지.
- Phone의 label/input 구조와 입력값·단위 표시가 잘리거나 겹치지 않는지.
- 인건비·업그레이드 참고표가 §6의 subgrid·최소 track·overflow 원칙을 지키는지.
- 잘못된 입력 복원, notice/aria-describedby 정리, Tab·클릭 시 input DOM/포커스 보존이 §6과 일치하는지.
- 동적 input의 accessible name이 항목과 필드를 식별할 수 있는지.

**사업성 비교표·RS — §5 기준**
- 비교표가 §5의 shrink → intrinsic minimum → internal scroll 원칙을 지키는지.
- scroll 시 첫 라벨과 그룹 제목의 첫 라벨만 sticky이고, 그룹 띠 전체가 sticky 되거나 별도 세로선이 생기지 않는지.
- RS 표시 간격 전환과 계산 series, Fixed RS Header 동기화가 §5의 기준과 일치하는지.
- RS hover와 변경값 강조가 의도된 상태에서만 동작하고, 동일값 재입력 등에서 불필요한 재렌더가 없는지.

**용역비 정산서 — §5 기준**
- 월별 원천 데이터와 매출·공제·운영비·용역비 합계 및 누계가 일치하는지.
- 월별 정산 현황이 §5의 공통 table contract와 subgrid 정렬 원칙을 지키는지.
- 용역비 최종 row의 의미색과 월 이동·정산 메뉴 상태가 §5 및 §2의 Navigation 기준과 일치하는지.
- Overview와 특정 월 화면의 `aria-current="page"`가 실제 현재 화면 하나만 가리키는지.

**Snapshot·Print·Tooltip — §4, §7 기준**
- 스냅샷의 출력 범위·stage·버튼 상태 복구가 §4의 기준과 일치하는지.
- snapshot/print에 화면용 transient hover·focus·tooltip이나 Compact 전용 규칙이 유입되지 않는지.
- tooltip의 focus→click 고정, 재클릭 닫기, ESC/외부 클릭/scroll/resize cleanup이 §7의 기준과 일치하는지.
- Print 전후 view·Diff·Fixed Header 상태가 원래 화면 상태로 복원되는지.

### 9.6 CSS·JS 정적 검사

CSS는 다음을 확인한다.

- CSS parse error 0.
- `!important` 0.
- 같은 media/container/scope에서 실질적으로 중복되는 selector·declaration이 없는지.
- 사용되지 않는 custom property, 폐기된 Drawer/Tablet Diff/RS 규칙, 마지막 임시 override 블록이 없는지.
- 공통 역할의 typography·control·table 규칙은 공통화되어 있고, 의미가 다른 상태까지 억지 통합하지 않았는지.
- sticky, `max-content`, `min-content`, `subgrid`, container query가 서로 덮어써 예상 밖의 page overflow를 만들지 않는지.

JS는 다음을 확인한다.

- `node --check` 통과.
- 중복 event listener, dead branch, 오래된 breakpoint/selector, 전역 bridge의 불필요한 증가가 없는지.
- view change, reset, print, snapshot, resize에서 timer·tooltip·focus·menu·Fixed Header 상태가 정리되는지.
- 참고표 갱신이 editable input 노드를 보존하는지.
- 동일값 입력/잘못된 입력에서 불필요한 matrix 재생성이나 stale focus 문제가 없는지.
- 접근성 상태(`aria-expanded`, `aria-current`, `aria-busy`, `aria-describedby`, accessible name)가 실제 UI 상태와 맞는지.

### 9.7 평가 결과 보고 형식

기본 평가 답변에는 다음을 포함한다.

1. **종합점수 / A·B·C 건수**.
2. 화면·기능·CSS·JS·데이터·문서 영역별 점수와 판단 근거.
3. 감점한 모든 항목의 등급, 재현 조건, 실제 원인, 영향 범위.
4. 직접 실행한 QA와 실행하지 못한 QA의 구분.
5. 수정 우선순위. 단, 사용자가 `수정해`라고 하기 전에는 평가 과정에서 파일을 변경하지 않는다.

점수만 요청한 경우에는 상세 분석을 내부적으로 수행하되 사용자에게는 종합점수와 A/B/C 건수 중심으로 간결하게 보고한다.

## 10. 검증 이력 및 Release 확정

완료한 검증:

- `node --check` JS 문법 검사.
- 실제 계산 엔진 실행: 6개월 정산 검산, 사업성 12개 시나리오, 참고 계산·0.5 RS 내장 기준값 대조 통과.
- 수정 코드에 대한 모의 DOM/이벤트 회귀 26건 통과: 빈 값·음수·0개월·백분율 경계, 입력 노드 보존·값 복원·참고 계산, tooltip focus→click·재클릭·ESC·외부 클릭 등.
- 원본과의 diff 및 CSS 반응형 규칙 변경 범위 점검.
- 기존 Release 기준본의 사용자 실화면 실기 QA 완료: 사용자가 이 채팅에서 “실화면 실기 완료함”으로 확인했다.
- 상호작용 보완 패치 적용 후 사용자 실화면 QA 성공: 사용자가 추가로 “실화면 qa성공”으로 확인했다. 이전 기준본의 실기 완료와 별개로 이번 패치에 대한 완료 보고를 반영한다.
- 이번 상호작용 보완은 갱신된 모의 검증 36건 통과: 기존 동작과 함께 동일값 렌더 생략, blur 확정, 입력 DOM 보존, 오류 복원·안내·타이머·기존 접근성 연결 보존 등을 검증했다. 이 검증은 실제 브라우저의 Enter·Tab 이벤트 순서와 시각적 표시를 직접 실측한 기록은 아니다.

모의 검증은 실제 브라우저의 렌더링이나 이벤트 전체를 대체하지 않는다. 원본 Excel 재대조도 수행하지 않았다.

검증 주체와 이력: Codex는 이번 환경에서 브라우저 실행 파일을 확보하지 못해 실화면 배치·좌표·PNG 출력을 직접 검증하지 못했다. 실화면 QA 완료는 사용자의 완료 보고에 근거한다. 폭별·항목별 상세 결과표를 별도로 제출받지는 않았으므로, 아래 목록을 Codex가 각각 실측하여 통과한 기록으로 해석하지 않는다.

다음 16개 폭은 이후 변경 시에도 유지할 반응형 회귀 점검 기준이다.

`2560, 1920, 1600, 1440, 1280, 1101, 1100, 920, 861, 860, 778, 761, 760, 600, 430, 390`

향후 관련 코드 변경 시에는 다음 항목을 회귀 점검한다.

1. 1101↔1100, 861↔860, 761↔760의 카드·Diff·메뉴 배치.
2. 778px 스냅샷이 Wide Web과 같은 카드 배치로 생성되고 버튼 아이콘이 유지되는지.
3. 참고표 입력칸을 클릭·Tab으로 연속 이동할 때 포커스가 유지되는지.
4. 터치 tooltip 첫 클릭·두 번째 클릭과 ESC 동작.
5. 비교표·정산표의 실제 글자 잘림, page overflow, sticky 경계 및 Fixed RS Header 가로 위치.

현재 상태: 코드·모의 검증 36건 통과와 상호작용 보완 후 사용자의 별도 실화면 QA 성공 보고를 근거로 현재 누적 패치 적용본을 Release 기준본으로 확정한다. 2026-09-10 최종 마감에서 참고표 동적 input의 accessible name을 보완하고, 정산 Overview/월 하위메뉴의 `aria-current`가 동시에 page가 되지 않도록 정리했으며, 평가 기준과 관리용 `.lnk` 예외를 본 문서에 명시했다. 이 변경은 계산·레이아웃·CSS 구조를 변경하지 않는다. Codex의 직접 브라우저 검증 한계와 사용자 실기 검증은 구분해 기록한다.
