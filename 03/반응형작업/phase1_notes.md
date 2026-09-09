# 반응형 1차 적용 결과

## 적용 파일
- index.html: 기존 사이드바를 재사용하는 햄버거와 배경막 추가.
- style.css: 1920 고정 Shell 해제, Web 218px 사이드바 유지, 1100px 이하 overlay, 760px 이하 공통 밀도 토큰 적용.
- common.js: 메뉴 상태/포커스/ESC/Tab/배경막/메뉴 선택/구간 복귀 처리, 스냅샷 기준 폭 분리.

## 보존 및 구조
- 계산 엔진과 정산 데이터 코드는 원본과 동일.
- 기존 계약 Diff, RS hover, Fixed Header 로직 변경 없음.
- 1920 CSS 가용폭 기준: sidebar 218px, 본문 시작 236px, 내부 폭 1666px. 실제 스크롤바가 차지하는 폭은 브라우저별 실기 확인 필요.
- 화면 Shell은 100% 유동폭. --dash-layout-w / --dash-content-w는 보고용 Desktop 기준 치수로 사용.
- 스냅샷 clone은 .is-ba-snapshot으로 식별하며, 화면용 페이지 밀도 토큰에서 제외. 출력 stage는 1702px(1920-218), 내부 내용은 1666px 기준.
- 후속 반응형 구현도 스냅샷에 화면용 규칙이 유입되지 않게 유지해야 함. RS 표시 간격 연동은 4차 대상.
- Print는 screen 전용 반응형 쿼리의 영향을 받지 않으며 메뉴 버튼과 배경막은 기본 숨김.

## 검증
- node --check 통과.
- Business Engine 12/12 통과.
- SettlementDataQA 통과.
- 메뉴 상태 모의 실행: 초기 닫힘, 열기, Tab/Shift+Tab 순환, ESC, 배경막, 메뉴 선택 닫기, Web/Compact 구간 복귀 통과.
- 중복 ID 0, button type 누락 0, 깨진 aria-controls 0.
- !important 0, 미사용 custom property 0(HTML/JS 참조 포함).
- CSS 중첩 블록 구조 및 동일 조건 내 동일 selector 블록 중복 0.

## 아직 검증하지 못한 항목
브라우저 실행 파일이 없어 viewport 실측, 픽셀 비교, 실제 터치/키보드/회전, Print 및 PNG 생성은 미검증. 정적 검사와 모의 실행을 실기 통과로 간주하지 않음.

## 다음 차수 및 남은 제한
1차에서 Shell의 고정폭만 해제했으므로 작은 화면의 기존 내부 고정폭으로 페이지 가로 넘침이 남을 수 있음. overflow-x:hidden으로 숨기지 않았음.
- 2차: 반영 현황, 주요 변경 요약, Contract Diff.
- 3차: 사업성 설정/설명/참고표의 고정폭.
- 4차: RS 간격 스위치, matrix 최소폭, sticky/Fixed Header/스냅샷 연동.
- 5차: 정산 KPI/Overview/월별 상세.
- 6차: 전체 가로 넘침, 실기 및 CSS 마감.

첨부 기준 ZIP에 PDF가 없으므로 기존 data/ PDF 파일은 사용 중인 폴더에 그대로 유지해야 함.
