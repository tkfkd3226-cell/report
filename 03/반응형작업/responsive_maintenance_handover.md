# 이지벤처스 골프존 대시보드 — 반응형 유지보수 기준

## 현재 상태
1~6차 코드 적용 및 정적/모의 실행 QA 완료. 브라우저 실행 파일이 없는 환경에서 작업했으므로 viewport 실측, 픽셀 비교, 실제 sticky/tooltip/Print/PNG 출력 검증은 미완료다. 전체 화면 반응형 실기 통과 또는 100점으로 간주하지 않는다.

## 배포 파일
- index.html
- style.css
- common.js
- 기존 data/ 아래 종전계약·재계약안 PDF 2개는 유지. 최초 첨부 ZIP에 PDF가 없었으므로 최종 ZIP에도 포함하지 않았다.

최종 ZIP의 코드 3개는 1~6차 누적본이다. 기존 같은 이름 파일에 적용한다. phase*_notes.md는 개발 중 기록이며 운영 의존성이 없다.

## 반응형 책임
- Web: 1101px 이상. 218px 사이드바 유지.
- Tablet: 761~1100px. 같은 사이드바 DOM을 overlay로 사용.
- Phone: 760px 이하. width 기준이며 orientation 조건을 추가하지 않았다.
- 1440px 이하에서 Contract 표/Diff가 compact하게 전환된다.
- component 컨테이너 기준: 변경 요약 1200/900px, 사업성 설정 1600px, 참고자료 1300px, 설정 카드 내부 600px. 화면 breakpoint와 구분한다.
- 1920px의 기존 치수 유지가 목표이며 실제 픽셀 일치는 미검증이다. 수직 스크롤바가 있는 환경에서는 CSS 가용폭 기준으로 Shell이 수축한다.

## 영역별 계약
| 영역 | Web | Tablet | Phone |
|---|---|---|---|
| 반영 현황 | 표, compact 구간 고정 열 배분 | 줄바꿈 표 | 기존 행을 카드로 표시 |
| 변경 요약 | 실제 폭에 따라 4/3/2열 | 2열 | 2열 |
| Contract Diff | 종전/재계약/반영내용 3단 | 종전 전체→재계약 전체→반영내용 | Tablet과 동일 |
| 사업성 설정 | 43:17:40 또는 기본설정+하단2개 | 기본설정+하단2개 | 카드/필드 모두 1열 |
| RS Matrix | 0.5 간격 11열 | 기본 1.0 간격 6열, 전환 가능 | Tablet 정책+첫 열 sticky |
| 참고자료 | 폭에 따라 2/1열 | 1열 | 1열, 표 내부 스크롤+첫 열 sticky |
| 정산 KPI | 4열 | 4열 | 2x2 |
| 정산 Overview | 최소폭 이후 내부 스크롤 | 동일 | 내부 스크롤+첫 열 sticky |
| 월 정산 상세 | 내역/금액/비고 | 동일 | 내역/금액/비고 ⓘ |

## 상태·기능 보존
- 계약 텍스트·PDF 링크·Diff 24개(변경 17/동일 7) 보존.
- 작은 화면에서 기존 Diff 노드를 이동하고 원래 row 참조로 복원한다. 계약 데이터/문단을 중복 생성하지 않는다.
- 메뉴는 backdrop/ESC/메뉴 선택으로 닫힌다. 닫힌 sidebar와 접힌 월 subnav는 inert이며 포커스 순환에서 제외한다. 인쇄 전에 메뉴를 닫는다.
- 사업성 계산은 0.5 간격 전체를 유지하고 RS 표시만 hidden으로 전환한다. 셀 순서와 값 변경 포커스의 인덱스가 유지되어야 한다.
- 작은 화면에서 선택한 RS 간격은 Web 왕복 후 복원한다. 간격/구간 변경 시 scrollLeft=0. 재계산은 선택을 유지한다.
- 기존 Fixed Header 복제 방식 유지. Phone에서 트랙 -scrollLeft, label +scrollLeft. Tablet/Web에서 label transform을 none으로 되돌린다.
- RS/참고표 sticky의 중간 ancestor에 overflow:hidden/auto를 무심코 추가하지 않는다.
- 비고 원문은 기존 span에 유지. Phone 툴팁만 textContent로 표시하며 월/화면 변경과 resize/scroll/ESC 때 닫는다.

## 스냅샷·Print
- --dash-layout-w(1920px), --dash-content-w(1702px)는 보고용 기준 치수. live Shell은 유동폭.
- snapshot clone은 .is-ba-snapshot. Phone 밀도/설정 규칙에서 제외하며 RS 11열 복원, 스위치 제거, 기존 범위와 hover/focus 제외를 유지한다.
- business container 규칙은 screen과 print에서 유효. A4 landscape에서 설정/설명/참고자료가 실제 출력 폭에 맞춰 재배치된다.
- 최종 print block이 Diff header position:static을 책임진다. 앞쪽 print 선언이 뒤쪽 기본 선언에 덮이지 않게 한다.
- print에서 RS/Overview 최소 열 폭을 줄이고 scroller는 overflow:visible. Fixed Header와 툴팁은 숨김.
- 인쇄 전 RS 11열·Diff 원래 DOM으로 전환, 인쇄 후 현재 화면 상태로 복원.
- 실제 PNG/인쇄 결과는 반드시 실기 확인해야 한다.

## CSS 규칙
!important 금지, 역할별 namespace 유지, 기존 책임 영역에서 수정. 같은 breakpoint가 기능별로 나뉘어 있는 것은 의도된 책임 분리이며 파일 끝에 임시 override를 누적하지 않는다. 사용자 상호작용용 폭과 보고용 폭을 혼용하지 않는다. 단일 용도라는 이유만으로 semantic Foundation token을 제거하지 않는다.

## 완료한 검증
- JS 구문 및 엔진/데이터 보존, Business Engine 12/12.
- 6개월 상세 금액/비고 동일. Overview 누계 매출 463,541,172 / 공제 277,007,054 / 운영비 17,039,571 / 용역비 186,534,118원.
- 메뉴/접힌 subnav 포커스, 인쇄 전 메뉴 닫기 모의 실행.
- Diff 159쌍, 24개 조항의 작은 화면/Web/Print 왕복 5회: 노드 동일성 및 순서 복원.
- RS 6/11열, 재계산/구간 복귀/인쇄/스냅샷, Fixed Header offset 모의 실행.
- 비고 focus/click/hover/ESC/월 변경/resize 모의 실행.
- 중복 ID 0, 버튼 type 누락 0, 잘못된 aria-controls 0, !important 0, 미사용 선언 custom property 0.
- CSS 중첩 블록 및 동일 조건 내 동일 selector 블록 중복 검사 통과. 이는 완전한 브라우저 CSS 파싱/레이아웃 검증을 대체하지 않는다.

## 남은 실기 확인
1. 1920/1600/1440/1280/1101/1100/900/761/760/600/430/390px에서 4개 화면을 전환하고 페이지 전체 좌우 스크롤/잘림 확인.
2. 1101↔1100px 왕복 시 메뉴·Diff 순서·RS 선택 복원. Phone 가로/세로 왕복도 확인.
3. Phone RS/참고표/정산 Overview를 좌우로 스크롤하여 첫 열 배경/경계선, Fixed Header 정렬 확인.
4. 비고 아이콘을 화면 위·아래에서 열고 닫기, 월 전환 후 잔존 여부 확인.
5. Phone에서 스냅샷이 Desktop 폭·11열로 출력되는지, A4 landscape 인쇄에서 설정/표/비고가 잘리지 않는지 확인.

실기에서 문제가 나오면 해당 영역의 원인과 적용 규칙을 확인한 뒤 최소 수정한다. 페이지 overflow-x:hidden으로 문제를 감추지 않는다.
