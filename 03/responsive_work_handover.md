# 이지벤처스 골프존 운영·계약 대시보드
## 반응형 전환 WORK 인수인계 / 작업 지시서

> 목적: 현재 완성도가 높은 Desktop 대시보드를 **Web / Tablet / Phone 반응형 구조로 확장**한다.  
> 핵심 원칙은 “반응형을 추가하면서 기존 CSS 공통화·토큰화·계산/기능 안정성을 훼손하지 않는 것”이다.  
> 이 문서와 **최신 ZIP**을 새 WORK 세션의 기준본으로 사용한다.

---

# 1. 최신 기준 구조

최신 파일 구조는 다음을 기준으로 한다.

```text
03/
├─ index.html
├─ style.css
├─ common.js
└─ data/
   ├─ 260301_260701_골프존운영위탁용역계약서및부속합의서(합본).pdf
   └─ 20260908_용역계약서_이지벤처스_힐링스토리_재계약v1_clean.pdf
```

중요:

- CSS는 root의 `style.css`
- JS는 root의 `common.js`
- PDF 2개는 `data/` 경로
- CSS/JS는 이미 단일 HTML에서 외부화 완료
- 현재 CSS는 공통화·토큰화 및 역할별 selector 정리가 매우 잘 된 상태
- `!important`는 0개 상태를 유지할 것
- 기존 구조를 무시하고 CSS 파일 맨 아래에 임시 override를 계속 쌓는 방식 금지
- 반응형 작업도 기존 책임 영역 안에서 정리할 것

---

# 2. 현재 Desktop 기준 상태

현재 화면은 원래 1920px Desktop 전용으로 완성된 상태다.

기존 Desktop 기준:

- sidebar width: 218px
- page X: 약 236px
- page Y: 18px
- page width: 1666px
- page header → 첫 영역 gap: 8px

1920×1080에서 아래 4개 화면은 위 기준선이 일치한다.

1. 재계약 검토
2. 사업성 분석
3. 용역비 정산 Overview
4. 월별 용역비 정산 상세

**반응형 전환 후에도 1920px 화면은 기존 기준본과 사실상 동일한 모습이어야 한다.**

반응형 작업은 “Desktop 디자인 변경”이 아니라 “더 작은 viewport에서 자연스럽게 구조를 전환하는 작업”이다.

---

# 3. 현재 반드시 보존해야 하는 기능

## 3-1. 재계약 검토

- 반영 현황
- 주요 변경 요약 8개
- Contract Diff 총 24개
  - 변경 17개
  - 동일 7개
- Diff 기본 접힘
- 전체 / 변경 항목만 필터
- semantic row alignment
- 종전계약 / 재계약안 / 반영내용 구조
- PDF 링크
- 계약 원문 번호를 임의 생성하지 않는 구조

## 3-2. 사업성 분석

계산 엔진은 현재 정상이며 **계산식 수정 금지**.

- Business Engine QA: 12/12 기준
- RS 7 ~ 12
- RS step 0.5
- Fixed / Share 두 분석안
- 초기화
- stepper
- tooltip
- RS column hover
- Fixed RS Header clone
- 숨김 `차이 2안-1안` 행
- 월 인건비 추정
- 업그레이드 비용
- 사업성 스냅샷 PNG 다운로드

### 스냅샷 범위

- 기본 설정
- 인건비 및 소모품비
- 산정 기준
- 사업성 분석 비교
  - 위탁운영 수수료
  - 공제항목 합계
  - 김형호 수익
  - 이지벤처스 수익까지
- `매출` 이하 제외
- 하단 참고자료 제외
- hover / focus / Fixed Header 상태는 PNG에 포함되지 않음

### 값 변경 포커스

설정값을 변경하여 실제 계산 결과 표시값이 달라진 셀만:

- 얇은 1px
- 오렌지
- 점선 outline
- 약 850ms 후 제거

현재 마우스 hover 셀 자체에는 별도 outline이 없다.

### RS Hover

- 같은 RS column 전체 배경 강조
- 원본 RS Header 강조
- Fixed RS Header 같은 RS 강조
- 일반 / 1안 / 2안 / subtotal / 음수 셀은 원래 의미색을 유지하면서 서로 다른 hover 톤 사용
- 실제 hover 셀에 별도 라인/outline은 **없음**

## 3-3. 용역비 정산

Settlement Overview QA 정상 기준.

6개월:

- 2026-03 ~ 2026-08

누계 기준값:

- 누계 매출액: 463,541,172원
- 누계 공제항목: 277,007,054원
- 누계 운영비: 17,039,571원
- 누계 용역비: 186,534,118원

2026-08 용역비:

- 34,980,988원

---

# 4. 반응형 설계의 핵심 원칙

이번 작업에서 가장 중요한 구조적 판단이다.

## 4-1. Viewport Responsive와 Component Responsive를 분리

반응형을 전부 `@media` breakpoint로 처리하지 않는다.

### Viewport Media Query가 담당

- Web / Tablet / Phone 구분
- sidebar / hamburger
- 전체 page padding
- 전체 typography scale
- 전체 compact spacing
- Phone 전용 기본 density

### Container Query 또는 실제 component width가 담당

- 주요 변경 요약 4열 → 3열 → 2열
- 사업성 설정 카드 3개 → 1 + 2 → 1열
- 월 인건비/업그레이드 2열 → 1열
- 실제 콘텐츠 공간에 따른 component 재배치

이유:

Desktop 1101px에서는 sidebar 218px 때문에 실제 content 폭이 작지만,
Tablet 1100px에서는 sidebar가 overlay가 되어 content 폭이 오히려 더 넓을 수 있다.

따라서 모든 component 전환을 viewport 숫자만으로 결정하면 1101↔1100 경계에서 레이아웃 역전 현상이 생길 수 있다.

---

# 5. 권장 viewport 구간

기본 구간은 아래를 사용한다.

| 구간 | 폭 | 역할 |
|---|---:|---|
| Wide Web | ≥ 1441px | 현재 Desktop 디자인 최대한 유지 |
| Compact Web | 1101 ~ 1440px | Web 구조 유지 + component fluid/reflow |
| Tablet | 761 ~ 1100px | sidebar overlay + Tablet 구조 |
| Phone | ≤ 760px | compact typography/spacing + Phone 구조 |

원칙:

- 반응형 구분은 width 기준
- orientation 때문에 Phone을 Tablet 규칙으로 바꾸지 말 것
- 실제 필요가 입증되지 않은 1170, 1230, 1290 같은 미세 breakpoint 남발 금지
- breakpoint는 “실기상 구조 전환이 필요한 이유”가 있을 때만 추가

---

# 6. Responsive Foundation

현재 CSS의 Desktop 고정 구조에는 다음과 같은 1920px contract가 있다.

```css
--dash-layout-w: 1920px;
--dash-sidebar-w: 218px;
--dash-content-w: calc(var(--dash-layout-w) - var(--dash-sidebar-w));
```

현재 `html`, `body.app-dashboard`, `.app-shell` 등의 `min-width` 때문에
작은 viewport에서는 component가 반응하기보다 1920px 페이지 전체가 좌우 스크롤되는 구조다.

## 반응형 1차에서 해야 할 핵심

- 1920 Desktop baseline은 유지
- 1920 고정 page contract를 fluid shell로 전환
- 전체 페이지 horizontal scroll 제거
- Web에서는 sidebar 218px 유지
- Tablet/Phone에서는 sidebar overlay 전환
- 기존 `dash-*` Foundation token을 최대한 활용
- Phone의 font/padding/gap은 selector마다 개별 수치를 뿌리지 말고 기존 token override 중심으로 처리

---

# 7. Sidebar / Hamburger

## Web

현재 sidebar 구조 유지.

- width 218px
- fixed left

## Tablet / Phone

현재 `.app-sidebar` DOM을 그대로 재사용한다.

별도 mobile menu DOM을 만들지 않는다.

기본 상태:

- sidebar 닫힘
- 우측 상단 hamburger 표시

hamburger 클릭:

- sidebar가 content 위로 overlay
- backdrop 표시
- content는 밀리지 않음

닫힘 조건:

- 메뉴 항목 클릭
- backdrop 클릭
- ESC

접근성:

- `aria-expanded`
- 적절한 `aria-controls`
- keyboard focus가 깨지지 않도록 처리

금지:

- Tablet에서 menu open 시 content가 오른쪽으로 밀리는 push menu
- Desktop menu와 Mobile menu DOM 이중화

---

# 8. 재계약 검토 Responsive

## 8-1. 반영 현황

### Web / Tablet

표 유지.

요구사항:

- viewport/content 폭이 줄어들면 표도 함께 줄어듦
- 전체 페이지 horizontal scroll 금지
- 이 표 자체 horizontal scroll도 금지
- `반영내용`은 필요하면 자연스럽게 줄바꿈 허용
- No. / 계약조항 / 상태는 가능한 compact하게 유지
- column 역할을 기준으로 width 배분

권장 방향:

- `table-layout: fixed`
- 반영내용 column을 가장 유연하게
- status는 nowrap
- 기존 inline width가 responsive를 방해하면 의미 기반 class로 정리할 것

### Phone

table을 카드형으로 전환.

행 하나가 카드 하나가 되도록 한다.

예:

```text
[01]
두 영업장을 계약범위에 반영

계약조항  제1·3·6조
반영내용  ...
상태      반영 완료
```

중요:

- Desktop table과 별도 Mobile card DOM을 중복 생성하지 않는다.
- 기존 table DOM을 CSS로 card화하는 방향 우선
- 필요한 경우 `data-label` 정도만 HTML에 추가

---

## 8-2. 주요 변경 요약

현재 8개 카드.

기본:

- Wide Web: 4열 → `4 + 4`

폭이 줄어들면:

- Compact Web: 3열 → `3 + 3 + 2`
- Tablet: 2열 → `2 × 4`
- Phone: 우선 2열 → `2 × 4`

Phone 1열 전환은 사용자가 실기 확인 후 결정한다.

처음부터 임의로 1열 breakpoint를 추가하지 말 것.

이 영역은 viewport보다 실제 container 폭 기반 전환을 우선 검토.

---

## 8-3. Contract Diff

### Wide Web

현재 3단 구조 유지:

```text
종전계약 | 재계약안 | 반영내용
```

### Compact Web

현재 반영내용 360px 고정 구조를 fluid하게 변경.

가로가 줄어들면:

```text
1fr | 1fr | 1fr
```

형태로 세 영역이 같은 비율로 함께 줄어든다.

- horizontal scroll 금지
- 계약 문장은 wrap 허용
- semantic alignment 유지

### Tablet / Phone

가로 3단을 억지로 유지하지 않는다.

한 조항을:

```text
[종전계약]
...

[재계약안]
...

[반영 내용 카드]
...
```

순서로 세로 배치한다.

즉:

- old
- new
- reflection card

Tablet과 Phone은 우선 동일 구조로 시작.

Phone 세부 여백/폰트만 compact token에 종속.

기존 Diff 24개, 17/7 상태, 필터, 접기 기능은 그대로 유지.

---

# 9. 사업성 분석 Responsive

# 9-1. 설정 카드 3개

현재 Web 기본 비율:

```text
기본 설정 : 인건비 및 소모품비 : 산정 기준
43 : 17 : 40
```

### Wide Web

현재 구조 그대로.

### Compact Web

가로 폭이 감소하면:

1. 우선 카드 구조는 유지
2. 카드 내부 input/control 폭을 공통 규칙으로 자연스럽게 감소
3. 값이 잘릴 위험이 생기기 전에 구조 전환

구조 전환 후:

```text
[              기본 설정               ]

[ 인건비 및 소모품비 ][     산정 기준     ]
```

즉 기본 설정 100%, 아래 2개 카드.

### Tablet

처음부터 위 구조를 기본으로 한다.

```text
1
2 + 3
```

### Phone

```text
[기본 설정]
[인건비 및 소모품비]
[산정 기준]
```

전부 100%.

그리고 field는:

Web/Tablet:

```text
라벨 | input
```

Phone:

```text
라벨
[input 100%]
```

로 전환.

주의:

- 현재 142px input / 168px step control 등 고정폭을 각 selector마다 제각각 줄이지 말 것
- 공통 control width contract로 정리할 것
- 이유 없는 1~2px 개별 예외를 만들지 말 것

---

# 9-2. 사업성 분석 비교 / RS Matrix

이 영역은 정보 비교 특성상 **카드화하지 않는다.**

## Web

RS 7 ~ 12, step 0.5 전체 표시 유지.

가로폭 감소:

- RS 각 column 폭도 같이 감소
- label/value 줄바꿈 금지
- 최소 안전폭 도달 이후에만 matrix 자체 horizontal scroll 허용

페이지 전체 horizontal scroll은 금지.

## Tablet 기본

RS .5 시나리오는 기본 숨김.

기본 표시:

```text
RS 7
RS 8
RS 9
RS 10
RS 11
RS 12
```

즉 계산은 계속 0.5 step 전체를 수행하되 view에서 1.0 단위만 보여준다.

RS Header 바로 위에 switch 추가:

```text
[ 1.0 단위 | 0.5 단위 ]
```

Tablet 기본값:

- 1.0 단위

0.5 선택:

- 전체 11개 RS column 표시
- matrix 내부 horizontal scroll

## Phone

Tablet RS switch 구조에 종속.

기본 1.0 단위.

matrix는 horizontal scroll 허용.

다만 **첫 번째 열(구분/metric label column)을 sticky left**로 고정한다.

사용자의 기존 표현 “첫번째 행 고정뷰잉”은 좌우 스크롤 문맥상 **첫 번째 열 고정**으로 해석한다.

주의:

현재 Fixed RS Header clone은 scrollLeft를 반영하여 track 전체를 이동시키는 구조이므로,
Phone 첫 label column sticky와 충돌할 수 있다.

CSS hack으로 억지 보정하지 말고 필요하면 `syncFixedRsHeader()`의 scroll offset 처리에서
label cell만 정확하게 상쇄하도록 구현한다.

반드시 실기 QA할 것.

---

# 9-3. 1안 / 2안 설명 카드

기존 CSS에는 설명 카드 폭이 크게 고정되어 있을 수 있으므로 responsive에서 반드시 같이 확인.

### Wide Web

현재 구조 유지.

### Compact Web / Tablet

실제 공간에 따라:

- 2개 equal width
또는
- 세로 1열

설명 문장은 wrap 허용.

### Phone

1안 / 2안 세로 1열 권장.

---

# 9-4. 월 인건비 추정 / 업그레이드 비용

### Wide Web

현재 2개 카드 1행 유지.

### Compact Web / Tablet

줄바꿈이 발생할 위험 전에:

```text
[월 인건비 추정]
[업그레이드 비용]
```

1열로 전환.

각 카드 width 100%.

### Phone

카드는 1열.

내부 표는:

- horizontal scroll 허용
- 첫 번째 label column sticky
- 값 nowrap
- column width는 값이 잘리지 않는 최소 크기 중심

필요하다면 scroll wrapper를 명시적으로 두되,
동일 역할 wrapper는 공통화할 것.

---

# 10. 사업성 분석 스냅샷과 Responsive

스냅샷은 보고용 결과물이다.

반응형 viewport와 직접 묶으면 Phone에서 390px짜리 좁은 PNG가 생성되어 활용성이 크게 떨어질 수 있다.

따라서 우선 구현 방향:

**스냅샷은 viewport와 독립된 canonical Desktop output 유지**

즉 Tablet/Phone에서 버튼을 눌러도 스냅샷 자체는:

- Desktop 기준 충분한 폭
- 설정 카드 정보 보존
- RS 0.5 전체
- 이지벤처스 수익까지

형태로 생성하는 것을 우선한다.

기존 스냅샷에서:

- hover
- 값 변경 focus
- Fixed Header

가 포함되지 않는 성질도 유지.

사용자가 실기 확인 후 다른 출력을 요구할 경우 별도 수정.

---

# 11. 용역비 정산 Responsive

# 11-1. KPI 4개

전체 월 Overview와 개별 년-월 화면 모두 공통.

### Web / Tablet

4개 카드 1행 유지.

각 카드가 같은 비율로 fluid하게 줄어듦.

### Phone

2 × 2.

개별 KPI selector마다 별도 크기를 넣지 말고
Phone Foundation font/padding/gap token에 종속.

---

# 11-2. 월별 정산 현황 Overview Matrix

### Web / Tablet

가로폭이 줄면 각 column도 먼저 함께 줄어든다.

- label/value 줄바꿈 금지
- 최소 안전폭 도달 이후 matrix 자체 horizontal scroll
- 페이지 전체 horizontal scroll 금지

column width는 의미별 소수 contract로 관리.

예:

- label
- month
- total/average

월별로 개별 width token을 만들지 않는다.

### Phone

horizontal scroll 허용.

첫 번째 `구분` column sticky left.

- 월
- 누계
- 평균
- 금액

모두 nowrap.

---

# 11-3. 년-월별 용역비 정산서

### Web / Tablet

현재 table 유지.

가로폭 감소 시 table 자체도 같이 줄어듦.

- horizontal scroll 금지
- `비고`는 필요하면 wrap
- `내역` / `금액`은 안정적인 최소폭 유지

### Phone

table 형태 유지.

비고 text는 좁은 화면에서 직접 표시하지 않고:

```text
내역 | 금액 | ⓘ
```

형태로 처리.

비고가 있는 row만 `ⓘ`.

`ⓘ` hover/click/focus 시 tooltip.

기존 Business tooltip CSS를 복붙하지 말고,
가능하면 범용 tooltip foundation을 만들어 기반 스타일을 공유하되
기존 `.ba-*` 동작을 깨지 말 것.

이 방식으로 Phone에서도 가능하면 horizontal scroll 없이 정산 상세를 유지.

---

# 12. CSS 구조 보존 규칙

이 프로젝트에서 가장 중요한 규칙이다.

## 반드시 유지

- `!important` = 0
- 기존 역할별 namespace
  - `--dash-*`
  - `--contract-*`
  - `--app-*`
  - `--ba-*`
- Foundation semantic token은 단순 single-use라는 이유로 제거하지 않음
- 기존 selector 책임구조 유지
- 이유 없는 1px 차이 신규 생성 금지
- 같은 역할의 font/padding/gap은 공통화
- responsive 상태도 가능한 기존 token을 override
- component-local 일회성 token 남발 금지
- dead selector / dead token을 새로 만들지 않음
- 새 override block을 CSS 맨 끝에 계속 누적하지 않음

## 금지

- 화면이 안 맞는다는 이유로 breakpoint를 계속 세분화
- Desktop용 DOM + Mobile용 DOM 이중 생성
- 계산 데이터 복제
- Fixed Header 별도 구현
- Business Engine 수정
- Settlement 계산 수정
- 기존 hover/focus 상태 구조 재작성
- Phone에서 모든 table을 무조건 card화
- 페이지 전체 horizontal scroll

---

# 13. 추천 작업 차수

한 번에 전체를 수정하지 않는다.

## 1차 — Responsive Foundation + Sidebar

범위:

- 1920 fixed shell 해제
- fluid content
- Web sidebar 유지
- Tablet/Phone overlay sidebar
- hamburger
- backdrop / ESC / menu click close
- Foundation responsive token
- page 전체 horizontal scroll 제거

이 차수에서는 개별 화면 component 구조를 과하게 수정하지 않는다.

QA:

- 1920 기존 baseline
- 1440
- 1101
- 1100
- 761
- 760
- 390
- sidebar open/close
- page X overflow

---

## 2차 — 재계약 검토 Responsive

- 반영 현황 fluid table
- Phone card
- 주요 변경 4→3→2
- Diff Web fluid 3단
- Tablet/Phone old→new→reflection

QA 후 다음 차수.

---

## 3차 — 사업성 일반 영역 Responsive

- 설정 카드
- input/control width
- 1안/2안 설명 카드
- 월 인건비 추정
- 업그레이드 비용

RS matrix는 이 차수에서 깊게 건드리지 않는다.

---

## 4차 — 사업성 RS Matrix Responsive

- 1.0 / 0.5 switch
- Tablet/Phone 기본 1.0
- 0.5 전체 보기
- horizontal scroll
- Phone first label column sticky
- Fixed RS Header clone 연동
- 기존 RS hover
- 값 변경 포커스
- 스냅샷 영향 검증

이 차수는 반응형 작업 중 가장 위험도가 높다.

---

## 5차 — Settlement Responsive

- KPI
- Overview Matrix
- Phone first column sticky
- 월 상세 fluid table
- Phone 비고 tooltip

---

## 6차 — 전체 통합 QA + CSS 마감

기능 수정 목적이 아니라 최종 회귀/구조 검증 목적.

확인:

- 불필요 breakpoint
- 중복 selector
- responsive override cascade
- unused token
- single-use 신규 token
- `!important`
- dead selector
- Desktop baseline
- Tablet
- Phone
- landscape Phone
- scroll seam
- sticky seam
- focus / hover / tooltip
- Print
- Snapshot
- Console

실제 감점 요소가 있으면 이 차수에서 최소 수정.

---

# 14. 필수 QA 기준

## 정적

- `common.js` → `node --check`
- duplicate ID = 0
- button `type` 누락 = 0
- broken `aria-controls` = 0
- duplicate selector = 0
- `!important` = 0
- unused custom property = 0
- dead responsive selector 점검
- 이유 없는 breakpoint 중복 점검

## Desktop 1920

현재 완성본과 비교.

기존 비대상 영역은 ideally:

```text
changed_pixels = 0
max_diff = 0
```

반응형 Foundation 때문에 의도된 변경이 없다면 1920은 반드시 pixel 0 목표.

기준:

- sidebar 218px
- page X ≈236
- page Y 18
- page width 1666
- header gap 8

## 권장 viewport 실기

최소:

```text
1920
1600
1440
1280
1101
1100
900
761
760
600
430
390
```

Phone landscape도 별도 확인.

## 페이지 전체 overflow

모든 Tablet/Phone 상태에서:

```text
document scrollWidth <= viewport width
```

가 기본.

단, 사용자가 명시적으로 허용한 matrix/table 내부 scroll은 예외.

---

# 15. 화면별 Horizontal Scroll 허용 여부

| 영역 | Web | Tablet | Phone |
|---|---|---|---|
| 반영 현황 | 금지 | 금지 | 카드 |
| 주요 변경 요약 | 금지 | 금지 | 금지 |
| Contract Diff | 금지 | 세로 구조 | 세로 구조 |
| 사업성 RS Matrix | 최소폭 이후 허용 | 0.5 보기 시 허용 | 허용 |
| 월 인건비/업그레이드 내부표 | 필요시 | 필요시 | 허용 |
| Settlement Overview | 최소폭 이후 허용 | 최소폭 이후 허용 | 허용 |
| 월 상세 정산 | 금지 | 금지 | 원칙적으로 금지 |

페이지 전체 horizontal scroll은 모든 viewport에서 금지.

---

# 16. 작업 보고 방식

사용자 선호:

- `작업방향` 요청 → 수정하지 말고 방향만 설명
- `1차`, `2차` 등 → 해당 차수만 바로 수정
- 다음 차수를 임의로 진행하지 않음
- 수정 후 “수정했으니 100점” 식 평가 금지
- 실제 A/B/C급 문제는 발견하면 감점
- 문제 없을 때만 문제 없음으로 판단
- 수정본이 많으면 수정한 파일만 ZIP 요청 가능
- GitHub용 summary 요청 시 짧게 별도 작성

각 차수 완료 보고에는 최소:

1. 무엇을 변경했는지
2. 기존 구조 중 무엇을 보존했는지
3. 정적 QA
4. 주요 viewport 실기 결과
5. 발견한 회귀/미해결 사항
6. 수정 파일 목록
7. ZIP

을 포함.

---

# 17. 새 WORK 시작 시 권장 요청문

```text
첨부한 responsive_work_handover.md와 최신 ZIP을 기준으로 작업해줘.

이 대시보드는 현재 Desktop 1920 기준으로 완성도가 높고,
CSS의 토큰화·공통화·책임 구조도 이미 정리된 상태야.

이번 작업은 기존 CSS 구조를 깨는 재설계가 아니라
Web / Tablet / Phone 반응형 확장이 목적이야.

responsive_work_handover.md의
- Responsive Foundation
- CSS 구조 보존 규칙
- 화면별 responsive contract
- 1~6차 작업 순서
- QA 기준
을 우선 기준으로 삼아.

특히
- !important 0 유지
- 1920 Desktop baseline 유지
- page 전체 horizontal scroll 금지
- 이유 없는 breakpoint 추가 금지
- Desktop/Mobile DOM 이중화 금지
- 계산 엔진 수정 금지
- 기존 Fixed RS Header / hover / 스냅샷 기능 보존
을 지켜줘.

먼저 최신 ZIP의 실제 CSS/JS/HTML 구조를 점검해서
이 문서의 방향과 충돌하거나 더 안전하게 조정할 부분이 있는지 분석해줘.

아직 수정하지 말고,
1차 Responsive Foundation + Sidebar 작업방향만
구체적으로 정리해서 보고해줘.
```

---

# 18. 최종 목표

최종 반응형은 단순히 미디어쿼리를 많이 붙인 형태가 되어서는 안 된다.

목표 구조:

```text
Viewport Responsive
  └─ Shell / Navigation / Foundation density

Component Responsive
  └─ 실제 확보 폭에 따라 grid / card / table 구조 전환

Shared Tokens
  └─ typography / spacing / radius / controls

Existing Functional Contracts
  └─ 계산 / Diff / Settlement / RS / Fixed Header / Snapshot 보존
```

최종적으로:

- 1920 Desktop은 현재 완성본 수준 유지
- Web 폭 감소 시 자연스러운 fluid layout
- Tablet은 overlay navigation + 구조적 재배치
- Phone은 compact density + 필요한 table만 내부 horizontal scroll
- CSS 유지보수성은 현재 수준 이상
- 반응형 추가 후에도 `!important` 0
- 불필요 breakpoint / override / token 찌꺼기 0

을 목표로 한다.
