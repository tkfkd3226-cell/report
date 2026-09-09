# 6차 통합 QA 결과

## 이번 마감 수정
1. CSS로 접힌 월 메뉴도 버튼의 client rect는 남을 수 있어 키보드 접근이 가능했던 문제: subnav inert와 aria-expanded를 함께 갱신하고 포커스 목록에서 inert 하위 요소를 제외.
2. 메뉴를 연 채 인쇄할 때 남는 접근 상태: beforeprint에서 메뉴 닫기.
3. 초기 print의 Diff header position:static이 뒤쪽 기본 position:sticky에 덮이는 문제: 최종 print 책임 영역으로 이동.
4. 인쇄 폭보다 큰 matrix 최소폭·설정/설명 카드 고정폭: business container 재배치를 print에도 적용, RS/Overview 인쇄 최소폭 조정과 scroller overflow 정리.
5. Fixed Header와 툴팁의 인쇄 제외를 최종 CSS에서 명시.

실제 변경은 style.css와 common.js. index.html은 5차와 동일하며 누적본에 함께 포함했다.

## 결과
정적 검사와 누적 동작 모의 검증 통과. 계약/계산/정산 데이터 보존. 자세한 최종 구조와 검증 범위는 responsive_maintenance_handover.md 참조.

## 제한
브라우저 실행 파일이 없어 viewport 실측, 화면별 horizontal overflow, 픽셀 일치, 실제 sticky/tooltip/Print/PNG는 미검증이다. 코드 적용 1~6차 완료와 전체 화면 실기 통과는 구분한다. 실제 감점 근거 없는 100점 평가를 부여하지 않았다.
