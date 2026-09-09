# 반응형 4차 — RS Matrix

## 적용 파일
index.html, style.css, common.js. ZIP은 1~4차 누적 코드와 이 문서를 포함한다.

## 표시 정책
- Web: RS 7~12, 0.5 간격의 11개 시나리오 표시.
- Tablet/Phone: 최초 1.0 단위, RS 7/8/9/10/11/12의 6개 표시.
- RS Header 바로 위의 1.0/0.5 버튼으로 전환하며 aria-pressed와 aria-controls 적용.
- 작은 화면의 선택은 현재 페이지 실행 중 유지한다. Web으로 가면 11열 표시, 작은 화면으로 돌아오면 이전 선택 복원. 간격 전환/구간 전환 시 matrix scrollLeft는 0으로 정리.
- 계산은 두 분석안 모두 항상 기존 0.5 간격 전체를 수행한다. 생성된 셀은 삭제하지 않고 hidden 상태만 전환한다. 값 변경 포커스의 셀 인덱스도 유지한다.

## 스크롤 및 Fixed Header
- label 190px, RS 값 최소 88px를 공통 기준으로 사용. 기존 1290px 최소폭을 표시 열 수와 연동한 최소폭으로 변경.
- 넓은 화면에서는 동일한 비율로 RS 열이 확장된다. 최소폭 이후에는 matrix 내부만 스크롤한다.
- Phone에서 label 첫 열 sticky. 중간 matrix bundle의 overflow를 visible로 바꾸어 sticky 기준이 실제 matrix scroller에 연결되도록 처리.
- label 배경은 실제 행의 불투명 배경을 상속하여 1안/2안/소계 의미색을 유지하고 스크롤 중 값이 비치지 않게 구성.
- Fixed Header는 기존 복제 구현을 유지한다. Phone에서는 트랙 -scrollLeft 이동에 대해 label만 +scrollLeft로 상쇄한다. Tablet/Web 복귀 시 label transform을 none으로 복원한다.
- 재계산/표시 간격 변경 때 기존 Fixed Header 복제본을 비워, 새 원본의 표시 상태로 다시 만든다.

## 스냅샷/인쇄
- 스냅샷 clone은 항상 11열을 복원하고 간격 버튼을 제거한다. 현재 화면의 선택과 hidden 상태는 바꾸지 않는다.
- 기존 Desktop 출력 폭, 설정값, 이지벤처스 수익까지의 범위, hover/focus 제외 정책 유지.
- 인쇄 전에는 11열로 표시하고 Fixed Header는 숨긴다. 인쇄 후 현재 화면 구간과 선택한 간격으로 돌아온다.

## 검증
- node --check 통과.
- Business Engine 12/12, 정산 데이터 검증 통과. 엔진/데이터 원문 동일 확인.
- 실제 엔진으로 생성한 전체 matrix HTML은 RS 값 식별 속성 추가를 제외하고 3차와 동일: 모든 행과 계산 값 보존.
- 생성된 전체 셀을 대상으로 6열/11열 표시, Web 복귀, 재계산 후 표시 재적용, 인쇄 왕복 모의 실행 통과.
- 스냅샷 대상 11열 복원 및 live 표시 상태 불변 모의 실행 통과.
- 실제 syncFixedRsHeader 함수를 대상으로 scrollLeft=240px 시 트랙 -240px/label +240px, Tablet 복귀 시 label transform none 확인.
- 값 변경 포커스(850ms)와 RS hover 함수 원문 동일 확인.
- HTML 중복 ID 0, 버튼 type 누락 0, 잘못된 aria-controls 0.
- CSS !important 0, 미사용 custom property 0, 같은 조건 내 동일 selector 블록 중복 0, 중첩 구조 검사 통과.
- 기존 계약 문구/PDF 링크와 Diff 24=17+7 유지.

## 실기 미검증
브라우저 실행 파일이 없어 픽셀/스크롤/PNG/Print 실측은 수행하지 못했다. 모의 실행은 실기 통과를 의미하지 않는다.
- 1920px: 기존 11열 배치, RS hover와 값 변경 점선 확인.
- 1101↔1100px: 11열/선택한 작은 화면 간격 전환, 설정 변경 후 선택 유지 확인.
- 761px: 기본 6열의 값 잘림/스크롤 여부 확인.
- 760/390px: 0.5 전환 후 좌우 스크롤, 첫 label 고정과 불투명 배경/경계선 확인.
- Phone에서 세로로 내려 Fixed Header가 나타난 상태로 좌우 스크롤: label과 RS 열의 위치 일치 확인.
- Phone→Tablet/Web 전환: label 이동 보정 잔존 여부 확인.
- Phone 1.0 상태에서 PNG 다운로드: 11열과 Desktop 폭, hover/점선 제외 확인.
- 인쇄 전후 표시 간격과 버튼 선택 복원 확인.

다음: 5차 Settlement 반응형. 전체 페이지 overflow 최종 판정은 5~6차 이후.
