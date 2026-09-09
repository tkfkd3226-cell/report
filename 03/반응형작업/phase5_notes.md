# 반응형 5차 — 용역비 정산

## 적용
index.html, style.css, common.js. ZIP은 1~5차 누적 코드다.

- Overview/월별 상세 KPI: Web·Tablet 4열 유지, Phone 2x2. Phone 글자/여백은 dash 토큰 사용.
- Overview Matrix: label/month/summary 역할별 너비 기준으로 정리. 넓은 화면의 label 220px·누계/평균 170px 유지. 월 열은 최소 110px, 누계/평균은 최소 120px까지 감소 후 내부 스크롤. 월 수 연동 유지.
- Phone Overview 첫 label 열 sticky. 행 배경을 상속하여 일반/소계/최종 행 의미색과 불투명 배경 유지. 모든 label/value nowrap.
- 월별 상세: 기존 grid의 강제 최소폭을 완화. Web·Tablet 내역/금액/비고 3열 유지, 비고 줄바꿈.
- Phone 상세: 내역 / 금액 / 비고 아이콘. 비고가 있는 행에만 버튼 생성. 원문 span은 유지하며 화면에서만 숨김. Phone 하단 합계 3개는 세로 배치.
- 비고 tooltip: hover/focus/click, 재클릭/ESC/외부 클릭/월 전환/화면 전환/resize/페이지 scroll/인쇄 시 정리. 동적으로 aria-describedby 연결. textContent로 표시하여 비고를 HTML로 해석하지 않음.
- 기존 사업성 tooltip과 위치·색·폰트·상태 기반 CSS를 그룹화하여 공유. tooltip 배경/화살표 token 이름을 dash namespace로 통일하고 기존 사업성 JS 참조도 갱신. 사업성 tooltip 동작 로직은 유지.
- 인쇄에서는 비고 원문을 그대로 표시하고 새 tooltip은 숨김.

## 검증
- node --check 통과.
- Business Engine 12/12, SettlementDataQA 통과.
- 실제 6개월 상세 Renderer 출력 비교: 금액/라벨/비고는 원본과 동일. 비고 있는 122개 행에만 버튼 생성.
- 상세 tooltip 모의 실행: focus 후 첫 click 유지, 재click 닫기, hover, ESC, 월 교체, resize 정리 통과.
- Overview 기존 Renderer 코드 동일. SettlementOverviewQA 통과.
  - 매출 463,541,172원
  - 공제항목 277,007,054원
  - 운영비 17,039,571원
  - 용역비 186,534,118원
- 누적 RS 간격/스냅샷/Fixed Header 모의 검증 통과.
- 중복 ID 0, 버튼 type 누락 0, 깨진 aria-controls 0.
- !important 0, 미사용 custom property 0, 같은 조건 내 동일 selector 블록 중복 0, CSS 중첩 구조 검사 통과.
- 기존 계약 텍스트/PDF 링크, Diff 24=17+7 유지.

## 실기 미검증
브라우저 실행 파일이 없어 viewport 실측과 실제 tooltip/sticky/Print 검증은 하지 못했다.
- 1920px: 기존 KPI 4열·Overview 열 배분·월별 상세 기준 모습 확인.
- 1101/1100/761px: KPI 금액 잘림, Overview 최소폭 이후 내부 스크롤, 상세 비고 줄바꿈 확인.
- 760/390px: KPI 2x2, Overview 좌우 스크롤 시 첫 열 배경/경계선, 월 상세 금액 잘림 확인.
- 6개월 비고 아이콘: 화면 위/아래에서 tooltip 위치, 터치 열기/재클릭 닫기, 월 변경/메뉴 이동 후 잔존 여부 확인.
- 키보드 Tab으로 비고 설명을 읽고 ESC로 닫을 수 있는지 확인.
- Phone 인쇄에서 비고 원문과 합계가 보존되는지 확인.

다음: 6차 전체 통합 QA와 CSS 마감. 1~5차 구현 완료를 전체 화면 실기 통과로 간주하지 않으며 전체 overflow/회귀 최종 판단은 다음 차수에서 수행한다.
