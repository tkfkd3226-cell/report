# handover.md

## 프로젝트명
**이지벤처스 골프존 용역계약 검토 대시보드**

이 문서는 새 채팅창에서 작업을 즉시 이어가기 위한 인수인계 문서임.  
새 채팅에서는 이 문서와 **최신 HTML/ZIP**을 기준본으로 사용하고, 과거 버전은 참고용으로만 취급할 것.

---

# 1. 최신 기준본

현재 최종 기준본:

- HTML: `index_css_refactor_cgrade_final.html`
- ZIP: `03_index_css_refactor_cgrade_final.zip`
- ZIP 내부 경로: `03/index.html`

현재 구조는 아직 **단일 HTML 파일**임.

다음 작업 후보:
1. CSS 외부 파일 분리
2. JS 외부 파일 분리
3. 이후 필요 시 JS 모듈화 검토

권장 분리 구조:

```text
03/
├─ index.html
├─ css/
│  └─ dashboard.css
└─ js/
   └─ dashboard.js
```

중요:
- CSS/JS 분리는 **리팩토링이 아니라 파일 외부화 우선**
- 처음부터 여러 JS 파일로 잘게 나누지 말 것
- CSS 1개, JS 1개로 먼저 분리
- 각 단계마다 1920px 회귀 QA 후 다음 단계 진행

---

# 2. 현재 화면 구조

사이드바 제목:

**골프존 운영 위탁 용역계약 검토**

메뉴:

1. 재계약 검토
2. 사업성 분석
3. 용역비 정산서
   - 2026-03
   - 2026-04
   - 2026-05
   - 2026-06
   - 2026-07
   - 2026-08

전체는 **Desktop only** 기준임.

기준 viewport:
- 1920px
- 모바일/태블릿 반응형 없음
- sidebar fixed left 218px
- content width 1702px
- page x ≈ 236px
- page y = 18px
- page width = 1666px
- 페이지 헤더 → 첫 영역 gap = 8px

4개 화면 모두 아래 기준을 유지해야 함:

| 화면 | X | Y | Width | Header → 첫 영역 |
|---|---:|---:|---:|---:|
| 재계약 검토 | 236 | 18 | 1666 | 8px |
| 사업성 분석 | 236 | 18 | 1666 | 8px |
| 정산 Overview | 236 | 18 | 1666 | 8px |
| 월별 정산 상세 | 236 | 18 | 1666 | 8px |

---

# 3. 재계약 검토 화면

## 3-1. 반영 현황

패널 3개 구조:

1. `01 반영 현황`
2. `02 주요 변경 요약`
3. `03 종전계약 ↔ 재계약 조문 Diff`

01 반영 현황 항목:

1. 두 영업장을 계약범위에 반영 — 제1·3·6조 — 반영 완료
2. 위탁운영 수수료와 용역비 구분 — 제2·7조 — 반영 완료
3. 중대한 위반 즉시해지 구체화 — 제13조 — 반영 완료
4. 계약기간 재설정 — 제5조 — 확정 필요
5. 월별 매출액 정의 확대 — 제2조 제1호 — 반영 완료
6. 위탁운영 수수료 조건 개정 — 제7조 제1항 — 확정 필요
7. 힐링밥상 주류 매입비 정산 — 제7조 — 반영 완료
8. 비용 선공제·보증금 충당 — 제4·7·8·9조 — 반영 완료
9. 운영 점검·관리 범위 확대 — 제9조 — 반영 완료

02 주요 변경 요약 카드 8개:

- 사업구조
- 매출·정산
- 이행보증금
- 인사·노무
- 운영점검
- 계약종료
- 금전채무 회수
- 종전계약 대체

---

# 4. Contract Diff

Diff 총 24개.

- 변경 17개
- 동일 7개
- 기본 상태: 접힘
- 버튼: `펼치기 / 접기`
- 필터:
  - 전체 항목
  - 변경 항목만
- `type="button"` 적용
- `aria-pressed` 사용
- 반영의견 column 폭 360px
- 숨김 Business Diff 행은 그대로 유지

Diff 제목:

1. 계약서 서두
2. 제1조 목적
3. 제2조 용어의 정의
4. 제3조 시설 및 영업장의 표시
5. 제4조 계약 조건
6. 제5조 용역 기간
7. 제6조 수탁인의 업무 범위
8. 제7조 용역비 정산
9. 제8조 인력 관리 책임
10. 제9조 당사자의 의무
11. 제10조 비밀유지
12. 제11조 운영권한의 양도·재위탁
13. 제12조 영업권 및 권리금
14. 계약 종료 구조 통합
15. 통지
16. 손해배상
17. 지연손해금
18. 계약의 성격
19. 관할법원
20. 조항의 유지
21. 계약 체결 및 서명
22. 별첨1
23. 별첨2
24. 별첨3

## Diff 행 정렬 원칙

**번호가 아니라 내용의 대응관계가 우선**임.

- semantic/content correspondence 우선
- paragraph number shift는 후순위
- 상대방에 대응 문구가 정말 없을 때만 `—`

제3조 최종 정렬:

```text
old                          new
① 소재지...                  ① 본 계약의 대상 영업장은...
—                            1. 창릉 프리미어 골프존...
—                            2. 힐링밥상...
② 위탁 대상 시설물...        ② 위탁 대상 시설물...
③ ...                        ③ ...
```

제4조 최종 정렬:

```text
old                          new
① 이행보증금...              ① 이행보증금...
② 선급금 5천만 원...         ② 보증금 보충의무...
③ 잔액 1억 원...             —
```

중요:
계약서 원문에 없는 번호를 임의로 만들지 말 것.

---

# 5. 사업성 분석

1920 Desktop 기준.

## 설정값

- rooms: 14
- sale price: 21,500
- game fee: 2,000
- existing management fee: 34,000,000
- upgrade fixed fee: 6,000,000
- share base fee: 5,000,000
- threshold: 85,000,000
- additional fee: 20%
- hourly wage: 13,000
- consumables: 4,000,000
- operating days: 30
- base RS: 7
- RS7 food sales: 2,000,000
- +1 RS food increase: 300,000
- card ratio: 87%
- card fee: 1.15%
- social insurance: 11%
- upgrade interest: 5%
- period: 3 years / 36 months

RS:
- step = 0.5
- RS7 ~ RS12
- 총 11 columns
- 별도 step UI 없음

상단 설정 카드 비율:
- 43 : 17 : 40

## 분석안

1안 fixed:
- 기존 용역비 + 업그레이드 고정액

2안 share:
- 기존 용역비 + 기본 가산액 + 기준 초과 매출 × 추가 수수료율

Expected profit:

Fixed:
- RS7: -9,581,321.05
- RS8: -2,002,575.20
- RS9: 5,576,170.65
- RS10: 13,154,916.50
- RS11: 20,733,662.35
- RS12: 28,312,407.20

Share:
- RS7: -8,581,321.05
- RS8: -1,002,575.20
- RS9: 6,576,170.65
- RS10: 14,154,916.50
- RS11: 20,033,662.35
- RS12: 25,910,589.20

Labor total:
- 11,703,693

Upgrade total:
- 176,200,000

Upgrade interest total:
- 202,630,000

Business Engine QA:
- **12 / 12 통과**

Reset:
- upgrade fixed fee → `6,000,000`

---

# 6. RS Column Hover / Fixed Header

반드시 유지해야 하는 기능.

RS column hover:
- 아무 RS metric cell hover
- 같은 RS column 전체 세로 highlight
- 원본 header 포함
- metric cell 포함
- fixed cloned header 포함
- 좌측 label column 변경 없음
- pointerleave 시 해제
- 다른 column 영향 없음

관련 상태 class:
- `.is-rs-column-hover`

Fixed RS Header:
- scroll 시 cloned RS Header 표시
- `is-visible` class 사용
- clone 구조 때문에 main matrix와 일부 높이 규칙이 의도적으로 분리되어 있음
- 이 부분을 과도하게 공통화하지 말 것

중요:
`.ba-matrix-head` 일부 height/min-height는 Fixed Header clone이 실제 사용하므로 dead CSS처럼 보인다고 삭제하지 말 것.

---

# 7. 숨김 분석행

다음 행은 의도적으로 숨김.

```css
.ba-metric-row.is-plan-diff {
  display: none;
}
```

`차이 2안-1안` 행은 삭제하지 말 것.

---

# 8. 용역비 정산 Overview

부모 `용역비 정산서` 클릭 시 6개월 Overview.

기간:
- 2026-03 ~ 2026-08
- VAT 별도

KPI:
- 누계 매출액: 463,541,172원
- 누계 공제항목: 277,007,054원
- 누계 운영비: 17,039,571원
- 누계 용역비: 186,534,118원

Matrix columns:
- 구분
- 2026-03
- 2026-04
- 2026-05
- 2026-06
- 2026-07
- 2026-08
- 누계
- 평균

Groups:
- 매출
- 공제항목
- 운영비
- 정산결과

`window.SettlementData` 기반.

평균:
- 항상 6개월 divisor
- null은 0 취급

예:
- POS관리 total 4,000
- avg 667

Settlement Overview QA:
- 통과

---

# 9. 월별 정산 상세

월별 결과:

| 월 | 용역비 |
|---|---:|
| 2026-03 | 25,727,129원 |
| 2026-04 | 23,404,178원 |
| 2026-05 | 34,577,269원 |
| 2026-06 | 29,492,774원 |
| 2026-07 | 38,351,780원 |
| 2026-08 | 34,980,988원 |

2026-08:
- 매출: 85,607,443
- 공제: 50,626,455
- 운영비: 1,842,767
- 결과: 34,980,988
- 용역비 공제: 32,000,000

---

# 10. 최종 CSS 리팩토링 결과

최종 파일:
`index_css_refactor_cgrade_final.html`

현재 CSS 상태:

| 항목 | 최종 |
|---|---:|
| Rule | 406 |
| Unique selector | 406 |
| Duplicate selector | 0 |
| Duplicate rule instance | 0 |
| Declaration | 1,486 |
| `!important` | 0 |
| Custom property | 42 |
| Unused token | 0 |
| Comments | 6 |
| Single-use token | 14 |
| Component-local single-use token | 0 |

중요:
남아 있는 14개 single-use token은 모두 `dash-*` Foundation semantic contract임.
현재 참조가 1회라는 이유로 제거하지 말 것.

예:
- `--dash-page-pad-x`
- `--dash-page-pad-top`
- `--dash-page-pad-bottom`
- `--dash-section-gap`
- `--dash-color-muted`
- `--dash-panel-head-bg`
- `--dash-control-radius`
- `--dash-panel-shadow`
- `--dash-font-page-title`
- `--dash-font-kicker`
- `--dash-font-value`
- `--dash-font-label`
- `--dash-font-caption`
- `--dash-font-section`

Component-local one-off token은 최종 정리 완료.

---

# 11. Compact Button 구조

이전 감점 요소 정리 완료.

공통:
- `.dashboard-button`
- `.dashboard-button--compact`

역할 modifier:

PDF link:
```css
.dashboard-button--compact-link
```

Diff toggle:
```css
.dashboard-button--compact-toggle
```

실제 크기는 의도적으로 다름:

PDF:
- height ≈ 30.27px
- padding 6px 9px
- font 11px
- radius 6px

Diff Toggle:
- height 28px
- padding 0 11px
- font 11px
- radius 6px

이 차이는 우연한 차이가 아니라 역할별 modifier로 명시된 상태임.

---

# 12. Token namespace

초기 애매한 global token은 제거 완료.

제거된 이름 예:
- `--navy2`
- `--ink`
- `--muted`
- `--line`
- `--soft`
- `--green`
- `--green-bg`
- `--amber`
- `--amber-bg`
- `--add`
- `--add-strong`
- `--del`
- `--del-strong`
- `--ba-green`

현재는 책임별 namespace 사용:

- `--dash-*`
- `--contract-*`
- `--app-*`
- 일부 `--ba-*`

색상 canonical:
- `#17395f` → `--dash-color-title`
- `#137454` → `--dash-color-positive`

raw literal은 token 정의부에서만 1회 존재.

---

# 13. CSS Formatting

최종 정리 완료.

- 한 줄에 여러 CSS rule 없음
- 유지보수 가능한 multiline formatting 통일
- 과거 작업이력형 주석 제거
- 현재 책임 구조 설명용 주석 6개만 유지
- `h3` Dead selector 삭제 완료

주요 주석:
- Core tokens & reset
- Contract review & clause Diff
- App shell & navigation
- Business analysis
- Monthly settlement
- Shared dashboard foundation
- Print / Settlement overview 구분

---

# 14. CSS/JS 분리 권장 방향

다음 새 채팅에서 가장 자연스러운 작업.

## 1차
CSS만 외부화.

현재 `<style>` 내용을:

```text
03/css/dashboard.css
```

로 이동.

HTML:
```html
<link rel="stylesheet" href="./css/dashboard.css">
```

목표:
- CSS 내용 변경 금지
- selector 변경 금지
- token 변경 금지
- UI 0px regression

QA 통과 후 다음 단계.

## 2차
JS만 외부화.

현재 모든 inline script를 **실행 순서 그대로**:

```text
03/js/dashboard.js
```

로 이동.

HTML:
```html
<script src="./js/dashboard.js"></script>
```

주의:
- 현재 inline script가 여러 block이라면 단순 연결 순서가 중요
- 즉시실행 코드 / DOM ready / 전역 값 초기화 순서를 반드시 보존
- 처음부터 여러 JS 파일로 나누지 말 것

## 3차
전체 통합 회귀 QA.

이 단계까지 완료한 뒤 필요 시 JS 모듈화 여부 별도 평가.

---

# 15. JS 분리 시 반드시 유지할 것

현재 JS 기능:

- App navigation
- Contract Diff 펼치기/접기
- Diff filter
- Business calculation
- Business reset
- input formatting
- stepper
- tooltip
- RS hover
- Fixed RS Header clone
- Settlement Overview rendering
- Settlement detail rendering
- Settlement navigation
- QA objects

전역 QA:
- `window.BusinessAnalysisEngineQA`
- `window.SettlementOverviewQA`

이 객체들의 생성 시점과 값이 바뀌면 안 됨.

---

# 16. 회귀 QA 기준

HTML/CSS/JS 작업 후 반드시 아래 확인.

## 정적
- 전체 inline/external JS `node --check`
- duplicate ID = 0
- button type 누락 = 0
- duplicate selector = 0
- `!important` = 0
- unused token = 0
- broken `aria-controls` = 0

## 1920 실기
Viewport:
- 1920 × 1080

4개 화면:
- x = 236
- y = 18
- width = 1666
- header→first area gap = 8

## Contract
- Diff 기본 접기
- Diff 24개
- 변경 17개
- 전체/변경 필터 정상
- 제3조 행 대응 정상
- 제4조 행 대응 정상

## Business
- Engine QA 12/12
- reset 정상
- input/stepper 정상
- Tooltip 정상
- RS hover 정상
- Fixed RS Header 정상
- `차이 2안-1안` hidden 유지

## Settlement
- Overview QA 통과
- 6개월 표시 정상
- 누계/평균 정상
- 월 이동 정상
- 2026-08:
  - 34,980,988원

## Print
- sidebar display = none
- content margin-left = 0
- html/body min-width = 0

## Console
- console error = 0
- page error = 0

---

# 17. 픽셀 회귀 기준

CSS/JS 외부화는 **시각 변경 작업이 아님**.

따라서 아래 상태는 기준본 대비 ideally:

```text
changed_pixels = 0
max_diff = 0
```

확인할 것.

상태:
- contract
- contract_diff
- business
- setting_focus
- fixed_setting_focus
- reference_focus
- tooltip
- rs_hover
- fixed_header
- overview
- overview_focus
- settlement

---

# 18. 절대 건드리지 말아야 할 것

다음은 현재 의도된 구조.

- Desktop only
- sidebar width 218
- page 기준선 236 / 18 / 1666 / 8
- Fixed RS Header clone
- RS column hover
- hidden `차이 2안-1안`
- Diff 24개
- semantic row alignment
- Settlement Overview 누계/평균
- Print sidebar hidden
- Compact button의 link/toggle 역할 차이
- Foundation single-use `dash-*` token
- Contract source numbering
- 현재 계산 로직

---

# 19. GitHub/ZIP 산출물 규칙

현재까지 ZIP은:

```text
03/index.html
```

CSS/JS 분리 후 예상:

```text
03/index.html
03/css/dashboard.css
03/js/dashboard.js
```

사용자가 “수정한 파일만 압축”이라고 하면 실제 수정 파일만 넣을 것.

전체 산출물이 필요하면 위 구조 유지.

---

# 20. 작업 방식

사용자 선호:

- “수정해” → 바로 수정
- “작업방향 알려줘” → 방향 설명 후 대기
- 평가 시 수정했다는 이유로 100점 주지 말 것
- 실제 감점 사유가 없을 때만 100점
- A/B/C급 모두 실제 유지보수 문제면 감점
- UI 변화 없는 구조 작업은 반드시 pixel 0 검증
- 과공통화/과토큰화 금지
- 1px 차이라도 의도되었으면 유지
- 이유 없는 1px 차이만 정리
- 새 override block을 CSS 끝에 계속 붙이는 방식 금지
- 기존 구조 안에서 정리
- 브라우저 캡처 테스트 실패 경험 때문에 과거에는 미사용 지시가 있었으나, 현재 정적/Chromium 상태 QA는 내부 검증 용도로 수행 중
- 화면 실기는 1920 기준

---

# 21. 새 채팅 시작용 요청문

새 채팅에서 아래처럼 시작하면 됨.

```text
첨부한 handover.md를 기준으로 작업 이어서 진행해줘.

최신 기준본은 index_css_refactor_cgrade_final.html이고,
현재 CSS 리팩토링은 완료된 상태야.

이제 CSS/JS를 외부 파일로 분리하려고 해.

1차는 CSS만 ./css/dashboard.css로 외부화하고,
HTML에는 <link rel="stylesheet" href="./css/dashboard.css">로 연결해.

CSS 내용/selector/token/UI는 변경하지 말고,
작업 후 handover.md의 QA 기준대로
1920 화면, Contract Diff, Business Engine 12/12,
RS hover, Fixed RS Header, Settlement Overview,
Print, Console, pixel regression 0을 확인해.

ZIP 구조는:
03/index.html
03/css/dashboard.css

1차 완료 후 다음 JS 분리는 내가 지시할게.
```

---

# 22. 최종 상태 한 줄 요약

**현재는 CSS 리팩토링이 사실상 완료된 단일 HTML 기준본이며, 다음 안전한 작업은 CSS 1파일 외부화 → QA → JS 1파일 외부화 → QA 순서임.**
