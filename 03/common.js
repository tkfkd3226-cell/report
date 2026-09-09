
(()=>{
  'use strict';
  const button=document.querySelector('[data-contract-diff-toggle]');
  const panel=document.getElementById('contract-diff-collapsible');
  if(!button||!panel) return;

  const setExpanded=expanded=>{
    panel.hidden=!expanded;
    button.setAttribute('aria-expanded',String(expanded));
    button.textContent=expanded?'접기':'펼치기';
  };

  button.addEventListener('click',()=>{
    setExpanded(button.getAttribute('aria-expanded')!=='true');
  });

  setExpanded(false);
})();
(()=>{
 const buttons=[...document.querySelectorAll('.toggle-btn')];
 const sections=[...document.querySelectorAll('.diff-section')];
 const applyFilter=(filter)=>{
   buttons.forEach(b=>{
     const active=b.dataset.filter===filter;
     b.classList.toggle('active',active);
     b.setAttribute('aria-pressed',String(active));
   });
   sections.forEach(s=>s.classList.toggle('hidden-by-filter', filter==='changed' && s.dataset.changed!=='true'));
 };
 buttons.forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
 applyFilter('changed');
})();
(()=>{
  'use strict';
  // Keep paired old/new cells in the same .diff-row on Tablet so every clause remains aligned.
  // Only Phone stacks the two documents vertically; reflection moves below the pair on Tablet/Phone.
  const compact=window.matchMedia('(max-width:1100px)');
  const phone=window.matchMedia('(max-width:760px)');
  const print=window.matchMedia('print');
  const sections=[...document.querySelectorAll('.diff-section')].map(section=>{
    const body=section.querySelector('.diff-body');
    const titles=section.querySelector('.article-title-row');
    const oldTitle=titles.querySelector('.old-title');
    const newTitle=titles.querySelector('.new-title');
    const reflectionTitle=titles.querySelector('.reflection-title');
    const reflection=section.querySelector('.diff-reflection-cell');
    const rows=[...body.querySelectorAll(':scope > .diff-row')].map(row=>{
      const cells=[...row.children];
      cells.forEach(cell=>{
        cell.dataset.diffRow=row.classList.contains('changed-row')?'changed-row':
          row.classList.contains('same-row')?'same-row':'table-row';
      });
      return {row,cells};
    });
    return {body,titles,oldTitle,newTitle,reflectionTitle,reflection,rows,groups:null};
  });

  const restoreRows=item=>{
    if(!item.groups) return;
    item.titles.append(item.oldTitle,item.newTitle);
    item.rows.forEach(({row,cells})=>row.append(...cells));
    item.groups.forEach(group=>group.remove());
    item.groups=null;
  };

  const stackPhone=item=>{
    if(item.groups) return;
    const groups=['old','new'].map(kind=>{
      const group=document.createElement('div');
      group.className='diff-document';
      group.setAttribute('role','group');
      group.setAttribute('aria-label',kind==='old'?'종전계약':'재계약안');
      return group;
    });
    groups[0].append(item.oldTitle);
    groups[1].append(item.newTitle);
    item.rows.forEach(({cells})=>cells.forEach((cell,index)=>groups[index].append(cell)));
    item.body.append(...groups);
    item.groups=groups;
  };

  const arrange=mode=>sections.forEach(item=>{
    if(mode==='phone') stackPhone(item);
    else restoreRows(item);

    if(mode==='desktop') item.titles.append(item.reflectionTitle);
    else item.reflection.prepend(item.reflectionTitle);
  });

  const currentMode=()=>{
    if(print.matches) return 'desktop';
    if(phone.matches) return 'phone';
    if(compact.matches) return 'tablet';
    return 'desktop';
  };
  const sync=()=>arrange(currentMode());

  compact.addEventListener('change',sync);
  phone.addEventListener('change',sync);
  print.addEventListener('change',sync);
  window.addEventListener('beforeprint',()=>arrange('desktop'));
  window.addEventListener('afterprint',sync);
  sync();
})();

(()=>{
  'use strict';
  const DATA=Object.freeze({"2026-03":{"month":"2026-03","settlementMonth":"2026-03-01","settlementDate":"2026-04-03","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 03월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 25,727,129원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":82820020,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":381329,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, 골프존마일리지)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":82438691,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":74944264,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":28000000,"note":"2027년 1월 1일부터 30,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":833858,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":78878,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":367010,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":7666082,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":4657490,"note":"2026년 2월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린 유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":97000,"note":"CCTV, 보안 이용료"},{"excelRow":28,"category":null,"detail":null,"subdetail":"전화요금","amount":13590,"note":"매장 내 전화 이용료"},{"excelRow":29,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"광고비","amount":30000,"note":"광고비 충전 등"},{"excelRow":33,"category":null,"detail":null,"subdetail":"비즈몰 S-POINT","amount":6000000,"note":"비즈몰 S-POINT 750만 포인트 이용액"},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":7613817,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":49217135,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":25727129,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"},"2026-04":{"month":"2026-04","settlementMonth":"2026-04-01","settlementDate":"2026-05-08","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 04월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 23,404,178원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":71921800,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":205606,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, 골프존마일리지)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":71716194,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":65196540,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":28000000,"note":"2027년 1월 1일부터 30,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":726026,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":84737,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":19000,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":6867022,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":4220400,"note":"2026년 3월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린 유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":97000,"note":"CCTV, 보안 이용료"},{"excelRow":28,"category":null,"detail":null,"subdetail":"전화요금","amount":13182,"note":"매장 내 전화 이용료"},{"excelRow":29,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"광고비","amount":291768,"note":"광고비 충전 등"},{"excelRow":33,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":1875177,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":41792362,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":23404178,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"},"2026-05":{"month":"2026-05","settlementMonth":"2026-05-01","settlementDate":"2026-06-02","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 05월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 34,577,269원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":85477810,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":207022,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, 골프존마일리지)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":85270788,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":77518898,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":28000000,"note":"2027년 1월 1일부터 30,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":883734,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":75711,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":110,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":8133120,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":3955880,"note":"2026년 4월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":97000,"note":"CCTV, 보안 이용료"},{"excelRow":28,"category":null,"detail":null,"subdetail":"전화요금","amount":10782,"note":"매장 내 전화 이용료"},{"excelRow":29,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"광고비","amount":312065,"note":"광고비 충전 등"},{"excelRow":33,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":1893074,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":42941629,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":34577269,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"},"2026-06":{"month":"2026-06","settlementMonth":"2026-06-01","settlementDate":"2026-07-06","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 06월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 29,492,774원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":79523200,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":277222,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, G패스 포인트)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":79245978,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":72041798,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":28000000,"note":"2027년 1월 1일부터 30,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":807451,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":87794,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":0,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":7505060,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":4253850,"note":"2026년 5월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":97000,"note":"CCTV, 보안 이용료"},{"excelRow":28,"category":null,"detail":null,"subdetail":"전화요금","amount":11637,"note":"매장 내 전화 이용료"},{"excelRow":29,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"광고비","amount":313005,"note":"광고비 충전 등"},{"excelRow":33,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":1894869,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":42549024,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":29492774,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"},"2026-07":{"month":"2026-07","settlementMonth":"2026-07-01","settlementDate":"2026-08-04","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 07월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 38,351,780원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":97225010,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":169558,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, G패스 포인트)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":97055452,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":88232229,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":32000000,"note":"2027년 1월 1일부터 34,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":977983,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":105978,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":0,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":9387761,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":5488860,"note":"2026년 6월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":97000,"note":"CCTV, 보안 이용료"},{"excelRow":28,"category":null,"detail":null,"subdetail":"전화요금","amount":12128,"note":"매장 내 전화 이용료"},{"excelRow":29,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"광고비","amount":337512,"note":"광고비 충전 등"},{"excelRow":33,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":1919867,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":49880449,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":38351780,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"},"2026-08":{"month":"2026-08","settlementMonth":"2026-08-01","settlementDate":"2026-09-03","notice":"당사 간 체결한 위탁운영 계약에 따라 2026년 08월 정산기준월의 용역비를 아래와 같이 정산합니다.\n확정된 용역비 34,980,988원(VAT 별도)에 대한 세금계산서를 당사로 발행하여 주시기 바랍니다.","rows":[{"excelRow":12,"category":"월별 매출액","detail":"실제 매출","subdetail":null,"amount":94264850,"note":"GPM상 월별 매출(매출/라운드관리 > 매출 조회 > 월별 매출) 화면에 표시되는 “매출금액”과 “보조단말기 결제내역”을 합산한 금액에서 “할인금액”을 차감한 금액"},{"excelRow":13,"category":null,"detail":"차감액","subdetail":null,"amount":96662,"note":"정산서의 ‘할인 및 이용권’으로 차감되는 결제 항목(모바일이용권, 지류이용권, 상품권, G패스 포인트)의 표시 금액 합계"},{"excelRow":14,"category":null,"detail":"실제 매출 - 차감액","subdetail":null,"amount":94168188,"note":null},{"excelRow":15,"category":null,"detail":"월별 매출액","subdetail":null,"amount":85607443,"note":"(실제 매출 - 차감액) / 1.1"},{"excelRow":16,"category":"공제항목","detail":"위탁운영 수수료","subdetail":null,"amount":32000000,"note":"2027년 1월 1일부터 34,000,000원"},{"excelRow":17,"category":null,"detail":"카드수수료","subdetail":null,"amount":954878,"note":"월별 매출의 ‘신용카드’ 금액과 보조단말기 카드 승인 금액 x 1.15%"},{"excelRow":18,"category":null,"detail":"결제수단수수료","subdetail":null,"amount":80959,"note":"입금내역 조회상 '선결제', '골프존패스'의 정산기준월 수수료"},{"excelRow":19,"category":null,"detail":"현금 정산 차액","subdetail":null,"amount":0,"note":"GPM상 현금과 실정산 현금 차액"},{"excelRow":20,"category":null,"detail":"골프존 유지보수비","subdetail":null,"amount":8986601,"note":"GPM 정산서상 부가세를 제외한 금액"},{"excelRow":21,"category":null,"detail":"관리비","subdetail":null,"amount":6761250,"note":"2026년 7월분"},{"excelRow":22,"category":null,"detail":"운영비","subdetail":"서빙로봇","amount":549734,"note":"로봇 2대 이용료, 단말비 및 보험료"},{"excelRow":23,"category":null,"detail":null,"subdetail":"테이블오더","amount":187216,"note":"메뉴판 14대·알림판 이용료"},{"excelRow":24,"category":null,"detail":null,"subdetail":"롤스크린유지보수","amount":420000,"note":"롤스크린 14개 유지보수료"},{"excelRow":25,"category":null,"detail":null,"subdetail":"인터넷","amount":15000,"note":"1Gbps 인터넷 이용료"},{"excelRow":26,"category":null,"detail":null,"subdetail":"IPTV","amount":42000,"note":"IPTV 이용료"},{"excelRow":27,"category":null,"detail":null,"subdetail":"KT텔레캅","amount":581,"note":"CCTV, 보안 이용료 (26년 8월 이용료 면제, 알림서비스만 청구)"},{"excelRow":28,"category":null,"detail":null,"subdetail":"POS관리","amount":4000,"note":"POS 유지보수"},{"excelRow":29,"category":null,"detail":null,"subdetail":"전화요금","amount":16209,"note":"매장 내 전화 이용료"},{"excelRow":30,"category":null,"detail":null,"subdetail":"정수기 렌탈","amount":104093,"note":"청호나이스, 쿠쿠 정수기 이용료"},{"excelRow":31,"category":null,"detail":null,"subdetail":"공기청정기 렌탈","amount":130184,"note":"쿠쿠 공기청정기 이용료"},{"excelRow":32,"category":null,"detail":null,"subdetail":"도도포인트","amount":25000,"note":"포인트 적립 서비스 이용료"},{"excelRow":33,"category":null,"detail":null,"subdetail":"광고비","amount":348750,"note":"광고비 충전 등"},{"excelRow":34,"category":null,"detail":null,"subdetail":null,"amount":null,"note":null},{"excelRow":35,"category":null,"detail":null,"subdetail":"운영비 계","amount":1842767,"note":null},{"excelRow":36,"category":"공제항목 합계","detail":null,"subdetail":null,"amount":50626455,"note":null},{"excelRow":37,"category":"용역비","detail":null,"subdetail":null,"amount":34980988,"note":"(월별 매출액 - 공제항목 합계)"}],"stamp":"주식회사 이지벤처스 [직인 생략]"}});

  const byExcelRow=(month,row)=>DATA[month]?.rows?.find(item=>item.excelRow===row)||null;
  const amount=(month,row)=>Number(byExcelRow(month,row)?.amount||0);

  const verifyMonth=(month)=>{
    const operating=Array.from({length:13},(_,i)=>amount(month,22+i)).reduce((a,b)=>a+b,0);
    const deductions=Array.from({length:6},(_,i)=>amount(month,16+i)).reduce((a,b)=>a+b,0)+amount(month,35);
    const result=amount(month,15)-amount(month,36);
    return Object.freeze({
      operating:operating===amount(month,35),
      deductions:deductions===amount(month,36),
      result:result===amount(month,37)
    });
  };

  const verification=Object.fromEntries(
    Object.keys(DATA).map(month=>[month,verifyMonth(month)])
  );
  const passed=Object.values(verification).every(v=>Object.values(v).every(Boolean));

  window.SettlementData=DATA;
  window.SettlementDataQA=Object.freeze({passed,months:verification});

  if(!passed) console.error('[SettlementData] workbook parity QA failed',verification);
  else console.info('[SettlementData] workbook parity QA passed',verification);
})();

(()=>{
  'use strict';

  const DEFAULTS = Object.freeze({
    roomCount: 14,
    salePrice: 21500,
    gameFee: 2000,
    existingManagementFee: 34000000,
    upgradeFixedFee: 6000000,
    upgradeRevenueShareBaseFee: 5000000,
    additionalFeeThreshold: 85000000,
    additionalFeeRate: 0.20,
    hourlyWage: 13000,
    consumables: 4000000,

    operatingDays: 30,
    baseRs: 7,
    baseFoodSales: 2000000,
    foodSalesPerRs1: 300000,
    cardSalesRatio: 0.87,
    cardFeeRate: 0.0115,

    monthlyWeeks: 4.345,
    socialInsuranceRate: 0.11,

    upgradeInterestRate: 0.05,
    upgradeInterestYears: 3,
    upgradeInstallmentMonths: 36
  });

  const SETTLEMENT_MONTHS=['2026-03','2026-04','2026-05','2026-06','2026-07','2026-08'];
  const settlementRows=month=>window.SettlementData?.[month]?.rows||[];
  const settlementRow=(month,predicate)=>settlementRows(month).find(predicate)||null;

  const SETTLEMENT_REFERENCE = Object.freeze({
    managementFees:Object.freeze(
      SETTLEMENT_MONTHS.map(month=>
        Number(settlementRow(month,row=>row.detail==='관리비')?.amount||0)
      )
    ),
    recurringOperatingCostsFrom202607:Object.freeze(
      settlementRows('2026-07')
        .filter(row=>row.excelRow>=22&&row.excelRow<=34&&row.subdetail&& !['전화요금','광고비'].includes(row.subdetail))
        .map(row=>Number(row.amount||0))
    ),
    standardPosManagement:4000,
    standardTelephone:15000,
    standardAdvertising:350000
  });

  const UPGRADE_REFERENCE = Object.freeze([
    Object.freeze({ key:'system', label:'시스템 업그레이드', unitCost:10000000, qty:14 }),
    Object.freeze({ key:'ambidextrous', label:'양타 추가 비용', unitCost:4000000, qty:2 }),
    Object.freeze({ key:'projector', label:'프로젝트(이펀)', unitCost:4000000, qty:6 }),
    Object.freeze({ key:'projectorFloor', label:'프로젝트(바닥으로 변경)', unitCost:700000, qty:6 })
  ]);

  const LABOR_SHIFTS = Object.freeze([
    Object.freeze({key:'weekdayMorning',group:'weekday',label:'08:00 ~ 16:00',hours:8,daysPerWeek:5,people:1,benefits:true}),
    Object.freeze({key:'weekdayEvening',group:'weekday',label:'16:00 ~ 24:00',hours:8,daysPerWeek:5,people:2,benefits:true}),
    Object.freeze({key:'weekendMorning',group:'weekend',label:'08:00 ~ 16:00',hours:8,daysPerWeek:2,people:2,benefits:false}),
    Object.freeze({key:'weekendEvening',group:'weekend',label:'16:00 ~ 24:00',hours:8,daysPerWeek:2,people:2,benefits:false})
  ]);

  const EXPECTED = Object.freeze({"fixed":{"7":{"deduction":53341264.05,"operatorProfit":-9581321.049999997,"easyProfit":40000000},"8":{"deduction":54271609.2,"operatorProfit":-2002575.200000003,"easyProfit":40000000},"9":{"deduction":55201954.35,"operatorProfit":5576170.6499999985,"easyProfit":40000000},"10":{"deduction":56132299.5,"operatorProfit":13154916.5,"easyProfit":40000000},"11":{"deduction":57062644.65,"operatorProfit":20733662.35,"easyProfit":40000000},"12":{"deduction":57992989.8,"operatorProfit":28312407.200000003,"easyProfit":40000000}},"share":{"7":{"deduction":52341264.05,"operatorProfit":-8581321.049999997,"easyProfit":39000000},"8":{"deduction":53271609.2,"operatorProfit":-1002575.200000003,"easyProfit":39000000},"9":{"deduction":54201954.35,"operatorProfit":6576170.6499999985,"easyProfit":39000000},"10":{"deduction":55132299.5,"operatorProfit":14154916.5,"easyProfit":39000000},"11":{"deduction":57762644.65,"operatorProfit":20033662.35,"easyProfit":40700000},"12":{"deduction":60394807.8,"operatorProfit":25910589.200000003,"easyProfit":42401818}}});

  const mergeSettings = (overrides={})=>({...DEFAULTS,...overrides});

  // Excel ROUNDDOWN(number,0): 0 방향 절사
  const roundDown0 = value => value < 0 ? Math.ceil(value) : Math.floor(value);

  // Excel ROUNDUP(number,0): 0에서 멀어지는 방향 올림
  const roundUp0 = value => value < 0 ? Math.floor(value) : Math.ceil(value);

  const sum = values => values.reduce((acc,value)=>acc+Number(value||0),0);
  const average = values => values.length ? sum(values)/values.length : 0;

  const calculateManagementFee = (reference=SETTLEMENT_REFERENCE) =>
    roundDown0(average(reference.managementFees));

  const calculateOperatingFixedCost = (reference=SETTLEMENT_REFERENCE) =>
    sum(reference.recurringOperatingCostsFrom202607)
    + reference.standardPosManagement
    + reference.standardTelephone
    + reference.standardAdvertising;

  const calculateLabor = (overrides={})=>{
    const s=mergeSettings(overrides);
    const sourceShifts=Array.isArray(s.laborShifts)&&s.laborShifts.length?s.laborShifts:LABOR_SHIFTS;
    const shifts=sourceShifts.map(shift=>{
      const normalized={...shift,hours:Number(shift.hours),daysPerWeek:Number(shift.daysPerWeek),people:Number(shift.people)};
      const gross=s.hourlyWage*normalized.hours*normalized.daysPerWeek*normalized.people*s.monthlyWeeks;
      const socialInsurance=normalized.benefits ? gross*s.socialInsuranceRate : 0;
      const retirement=normalized.benefits ? roundUp0(gross/12) : 0;
      return {...normalized,gross,socialInsurance,retirement,total:gross+socialInsurance+retirement};
    });

    const gross=sum(shifts.map(v=>v.gross));
    const socialInsurance=sum(shifts.map(v=>v.socialInsurance));
    const retirement=sum(shifts.map(v=>v.retirement));
    return Object.freeze({
      shifts:Object.freeze(shifts),
      people:sum(shifts.map(v=>v.people)),
      gross,
      socialInsurance,
      retirement,
      total:gross+socialInsurance+retirement
    });
  };

  const calculateUpgradeReference = (items=UPGRADE_REFERENCE,overrides={})=>{
    const s=mergeSettings(overrides);
    const rows=items.map(item=>{
      const total=item.unitCost*item.qty;
      const monthlyInterestFree=roundUp0(total/s.upgradeInstallmentMonths);
      return Object.freeze({...item,total,monthlyInterestFree});
    });
    const total=sum(rows.map(v=>v.total));
    const monthlyInterestFree=sum(rows.map(v=>v.monthlyInterestFree));
    const interestFactor=1+s.upgradeInterestRate*s.upgradeInterestYears;
    return Object.freeze({
      rows:Object.freeze(rows),
      total,
      monthlyInterestFree,
      totalWithInterest:total*interestFactor,
      monthlyWithInterest:monthlyInterestFree*interestFactor
    });
  };

  const foodSalesForRs=(rs,s)=>s.baseFoodSales+(rs-s.baseRs)*s.foodSalesPerRs1;

  const calculateScenario=(rs,mode='fixed',overrides={})=>{
    const s=mergeSettings(overrides);
    if(!Number.isFinite(Number(rs))) throw new TypeError('RS는 숫자여야 합니다.');
    if(mode!=='fixed' && mode!=='share') throw new RangeError('mode는 fixed 또는 share여야 합니다.');

    rs=Number(rs);
    const golfSalesVatIncluded=rs*s.roomCount*s.salePrice*s.operatingDays;
    const golfSalesVatExcluded=roundDown0(golfSalesVatIncluded/1.1);
    const foodSalesVatExcluded=foodSalesForRs(rs,s);
    const totalSalesVatIncluded=golfSalesVatIncluded+foodSalesVatExcluded*1.1;
    const totalSalesVatExcluded=golfSalesVatExcluded+foodSalesVatExcluded;

    const managementFee = mode==='fixed'
      ? s.existingManagementFee+s.upgradeFixedFee
      : s.existingManagementFee
        + s.upgradeRevenueShareBaseFee
        + (totalSalesVatExcluded < s.additionalFeeThreshold
            ? 0
            : (totalSalesVatExcluded-s.additionalFeeThreshold)*s.additionalFeeRate);

    const cardFee=golfSalesVatIncluded*s.cardSalesRatio*s.cardFeeRate;
    const golfMaintenanceFee=rs*s.roomCount*s.gameFee*s.operatingDays;
    const buildingManagementFee=calculateManagementFee();
    const fixedOperatingCost=calculateOperatingFixedCost();
    const deductionsTotal=
      managementFee+cardFee+golfMaintenanceFee+buildingManagementFee+fixedOperatingCost;

    const labor=calculateLabor(s);
    const operatorExpensesTotal=labor.total+s.consumables;
    const operatorProfit=totalSalesVatExcluded-deductionsTotal-operatorExpensesTotal;
    const easyVenturesProfit=managementFee;

    return Object.freeze({
      rs,mode,
      sales:Object.freeze({
        golfVatIncluded:golfSalesVatIncluded,
        golfVatExcluded:golfSalesVatExcluded,
        foodVatExcluded:foodSalesVatExcluded,
        totalVatIncluded:totalSalesVatIncluded,
        totalVatExcluded:totalSalesVatExcluded
      }),
      deductions:Object.freeze({
        managementFee,
        cardFee,
        golfMaintenanceFee,
        buildingManagementFee,
        fixedOperatingCost,
        total:deductionsTotal
      }),
      operatorExpenses:Object.freeze({
        labor:labor.total,
        consumables:s.consumables,
        total:operatorExpensesTotal
      }),
      results:Object.freeze({
        operatorProfit,
        easyVenturesProfit
      })
    });
  };

  const generateRsSeries=(step=1,options={})=>{
    const start=Number(options.start ?? 7);
    const end=Number(options.end ?? 12);
    step=Number(step);
    if(!(step>0)) throw new RangeError('RS 간격은 0보다 커야 합니다.');
    const rows=[];
    const count=Math.floor(((end-start)/step)+1e-9);
    for(let i=0;i<=count;i++){
      rows.push(Number((start+i*step).toFixed(10)));
    }
    if(rows.length===0 || Math.abs(rows.at(-1)-end)>1e-9) rows.push(end);
    return Object.freeze(rows);
  };

  const calculateSeries=(mode='fixed',options={})=>{
    const step=Number(options.step ?? 1);
    const overrides=options.overrides ?? {};
    return Object.freeze(
      generateRsSeries(step,options).map(rs=>calculateScenario(rs,mode,overrides))
    );
  };

  const almostEqual=(a,b,tolerance=1e-6)=>Math.abs(a-b)<=tolerance;

  const verifyAgainstWorkbook=()=>{
    const details=[];
    for(const mode of ['fixed','share']){
      for(const rs of [7,8,9,10,11,12]){
        const actual=calculateScenario(rs,mode);
        const expected=EXPECTED[mode][String(rs)];
        const checks={
          deduction:almostEqual(actual.deductions.total,expected.deduction),
          operatorProfit:almostEqual(actual.results.operatorProfit,expected.operatorProfit),
          easyProfit:almostEqual(actual.results.easyVenturesProfit,expected.easyProfit)
        };
        details.push(Object.freeze({
          mode,rs,passed:Object.values(checks).every(Boolean),checks,
          actual:Object.freeze({
            deduction:actual.deductions.total,
            operatorProfit:actual.results.operatorProfit,
            easyProfit:actual.results.easyVenturesProfit
          }),
          expected
        }));
      }
    }

    const managementFee=calculateManagementFee();
    const fixedOperatingCost=calculateOperatingFixedCost();
    const labor=calculateLabor();
    const upgrade=calculateUpgradeReference();

    const referenceChecks={
      managementFee: managementFee===4889621,
      fixedOperatingCost: fixedOperatingCost===1939227,
      labor: labor.total===11703693,
      upgradeTotal: upgrade.total===176200000,
      upgradeMonthlyInterestFree: upgrade.monthlyInterestFree===4894446,
      upgradeTotalWithInterest: almostEqual(upgrade.totalWithInterest,202630000),
      upgradeMonthlyWithInterest: almostEqual(upgrade.monthlyWithInterest,5628612.9)
    };

    const halfStep=calculateScenario(7.5,'fixed');
    const halfStepChecks={
      series: JSON.stringify(generateRsSeries(0.5))===JSON.stringify([7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12]),
      foodSales: halfStep.sales.foodVatExcluded===2150000
    };

    return Object.freeze({
      passed:details.every(v=>v.passed)
        && Object.values(referenceChecks).every(Boolean)
        && Object.values(halfStepChecks).every(Boolean),
      scenarioPassed:details.filter(v=>v.passed).length,
      scenarioTotal:details.length,
      details:Object.freeze(details),
      referenceChecks:Object.freeze(referenceChecks),
      halfStepChecks:Object.freeze(halfStepChecks),
      references:Object.freeze({
        managementFee,
        fixedOperatingCost,
        labor:labor.total,
        upgrade
      })
    });
  };

  const API=Object.freeze({
    version:'2.0-excel-parity',
    defaults:DEFAULTS,
    settlementReference:SETTLEMENT_REFERENCE,
    upgradeReference:UPGRADE_REFERENCE,
    laborShifts:LABOR_SHIFTS,
    roundDown0,
    roundUp0,
    calculateManagementFee,
    calculateOperatingFixedCost,
    calculateLabor,
    calculateUpgradeReference,
    calculateScenario,
    generateRsSeries,
    calculateSeries,
    verifyAgainstWorkbook
  });

  window.BusinessAnalysisEngine=API;

  const qa=API.verifyAgainstWorkbook();
  window.BusinessAnalysisEngineQA=qa;

  if(!qa.passed){
    console.error('[BusinessAnalysisEngine] Excel parity QA failed',qa);
  }else{
    console.info('[BusinessAnalysisEngine] Excel parity QA passed',qa);
  }
})();

(()=>{
  'use strict';

  const views=[...document.querySelectorAll('[data-app-view]')];
  const topItems=[...document.querySelectorAll('.app-nav-item[data-view]')];
  const settlementParent=document.querySelector('.app-nav-parent[data-parent="settlement"]');
  const settlementSubnav=document.querySelector('[data-subnav="settlement"]');
  const monthItems=[...document.querySelectorAll('.app-subnav-item[data-month]')];

  // One sidebar DOM serves both fixed Web navigation and the small-screen overlay.
  const sidebar=document.getElementById('appSidebar');
  const menuToggle=document.getElementById('appMenuToggle');
  const menuBackdrop=document.getElementById('appMenuBackdrop');
  const content=document.querySelector('.app-content');
  const compactMenu=window.matchMedia('(max-width:1100px)');
  let menuOpen=false;
  const menuItems=()=>[...sidebar.querySelectorAll('button,a[href],[tabindex="0"]')]
    .filter(item=>!item.disabled&&!item.closest('[inert]')&&item.getClientRects().length);

  const setMenuOpen=(requested,{restoreFocus=true}={})=>{
    const wasOpen=menuOpen;
    menuOpen=compactMenu.matches&&requested;
    // Move focus before making its current subtree inert.
    if(!menuOpen&&compactMenu.matches&&(wasOpen||sidebar.contains(document.activeElement))&&restoreFocus){
      menuToggle.focus({preventScroll:true});
    }
    sidebar.inert=compactMenu.matches&&!menuOpen;
    content.inert=menuOpen;
    document.body.classList.toggle('app-menu-open',menuOpen);
    menuBackdrop.hidden=!menuOpen;
    menuToggle.setAttribute('aria-expanded',String(menuOpen));
    menuToggle.setAttribute('aria-label',menuOpen?'메뉴 닫기':'메뉴 열기');
    if(menuOpen) (menuItems()[0]||menuToggle).focus({preventScroll:true});
  };

  menuToggle.addEventListener('click',()=>setMenuOpen(!menuOpen));
  menuBackdrop.addEventListener('click',()=>setMenuOpen(false));
  document.addEventListener('keydown',event=>{
    if(!menuOpen) return;
    if(event.key==='Escape'){
      event.preventDefault();
      setMenuOpen(false);
    }else if(event.key==='Tab'){
      const items=[menuToggle,...menuItems()];
      const current=items.indexOf(document.activeElement);
      event.preventDefault();
      items[(current+(event.shiftKey?-1:1)+items.length)%items.length].focus();
    }
  });
  compactMenu.addEventListener('change',()=>{
    const toggleFocused=document.activeElement===menuToggle;
    setMenuOpen(false);
    if(!compactMenu.matches&&toggleFocused){
      (sidebar.querySelector('[aria-current="page"]')||menuItems()[0])?.focus({preventScroll:true});
    }
  });
  setMenuOpen(false,{restoreFocus:false});

  const setSettlementOpen=open=>{
    settlementParent?.setAttribute('aria-expanded',String(open));
    settlementSubnav?.classList.toggle('is-open',open);
    if(settlementSubnav) settlementSubnav.inert=!open;
  };

  setSettlementOpen(Boolean(settlementSubnav?.classList.contains('is-open')));
  window.addEventListener('beforeprint',()=>setMenuOpen(false));

  const setView=(view,{month=null,keepMenuOpen=false}={})=>{
    views.forEach(panel=>{
      panel.classList.toggle('is-active',panel.dataset.appView===view);
    });

    topItems.forEach(item=>{
      const active=item.dataset.view===view;
      item.classList.toggle('is-active',active);
      if(active) item.setAttribute('aria-current','page');
      else item.removeAttribute('aria-current');
    });

    const settlementActive=view==='settlement'||view==='settlement-overview';
    settlementParent?.classList.toggle('is-active',settlementActive);

    if(settlementParent){
      if(settlementActive) settlementParent.setAttribute('aria-current','page');
      else settlementParent.removeAttribute('aria-current');
    }

    if(settlementActive){
      setSettlementOpen(true);

      if(month){
        monthItems.forEach(item=>{
          const active=item.dataset.month===month;
          item.classList.toggle('is-active',active);
          if(active) item.setAttribute('aria-current','page');
          else item.removeAttribute('aria-current');
        });
      }else{
        monthItems.forEach(item=>{
          item.classList.remove('is-active');
          item.removeAttribute('aria-current');
        });
      }
    }else{
      monthItems.forEach(item=>{
        item.classList.remove('is-active');
        item.removeAttribute('aria-current');
      });
    }

    document.dispatchEvent(new CustomEvent('app:viewchange',{
      detail:Object.freeze({view,month})
    }));

    if(!keepMenuOpen) setMenuOpen(false);
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };

  topItems.forEach(item=>{
    item.addEventListener('click',()=>setView(item.dataset.view));
  });

  settlementParent?.addEventListener('click',()=>{
    setView('settlement-overview',{keepMenuOpen:compactMenu.matches});
  });

  monthItems.forEach(item=>{
    item.addEventListener('click',()=>{
      setView('settlement',{month:item.dataset.month});
    });
  });

  window.AppNavigation=Object.freeze({setView,setSettlementOpen});
})();

(()=>{
  'use strict';

  const root=document.querySelector('[data-app-view="settlement"]');
  const data=window.SettlementData;
  if(!root||!data) return;

  const formatWon=value=>new Intl.NumberFormat('ko-KR',{maximumFractionDigits:0}).format(Number(value||0))+'원';

  const formatDate=iso=>{
    if(!iso) return '—';
    const [y,m,d]=iso.split('-');
    return `${y}.${m}.${d}`;
  };

  const formatMonth=iso=>{
    if(!iso) return '—';
    const [y,m]=iso.split('-');
    return `${y}.${m}`;
  };

  const findRow=(month,row)=>data[month].rows.find(item=>item.excelRow===row);
  const amount=(month,row)=>Number(findRow(month,row)?.amount||0);

  const escapeHtml=value=>String(value??'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');

  const rowHtml=(item,{key=false,sub=false}={})=>{
    const classes=['st-row'];
    if(key) classes.push('is-key');
    if(Number(item.amount||0)===0) classes.push('is-zero');

    const label=item.subdetail||item.detail||item.category||'';
    const note=item.note||'';

    return `<div class="${classes.join(' ')}">
      <div class="st-row-label ${sub?'is-sub':''}">${escapeHtml(label)}</div>
      <div class="st-row-amount">${formatWon(item.amount)}</div>
      <div class="st-row-note"><span class="st-note-text">${escapeHtml(note)}</span>${note?`<button class="st-note-button" type="button" aria-label="${escapeHtml(label)} 비고 보기">ⓘ</button>`:''}</div>
    </div>`;
  };

  const noteTooltip=document.getElementById('stNoteTooltip');
  const phoneNotes=window.matchMedia('(max-width:760px)');
  let noteAnchor=null;
  let pinnedNote=null;
  const hideNote=()=>{
    noteAnchor?.removeAttribute('aria-describedby');
    noteTooltip.classList.remove('is-visible');
    noteTooltip.setAttribute('aria-hidden','true');
    noteAnchor=null;
    pinnedNote=null;
  };
  const showNote=button=>{
    if(!phoneNotes.matches) return;
    if(noteAnchor!==button) hideNote();
    noteAnchor=button;
    noteTooltip.textContent=button.parentElement.querySelector('.st-note-text').textContent;
    button.setAttribute('aria-describedby','stNoteTooltip');
    noteTooltip.setAttribute('aria-hidden','false');
    noteTooltip.classList.add('is-visible');
    noteTooltip.scrollTop=0;
    const rect=button.getBoundingClientRect();
    const gutter=12,gap=7;
    const width=noteTooltip.offsetWidth,height=noteTooltip.offsetHeight;
    const left=Math.max(gutter,Math.min(rect.left+rect.width/2-width/2,window.innerWidth-width-gutter));
    const below=rect.top-height-gap<gutter;
    const top=Math.max(gutter,Math.min(below?rect.bottom+gap:rect.top-height-gap,window.innerHeight-height-gutter));
    noteTooltip.style.left=`${left}px`;
    noteTooltip.style.top=`${top}px`;
    noteTooltip.style.setProperty('--dash-tooltip-arrow',`${Math.max(10,Math.min(width-10,rect.left+rect.width/2-left))}px`);
    noteTooltip.classList.toggle('is-below',below);
  };
  root.addEventListener('click',event=>{
    const button=event.target.closest('.st-note-button');
    if(!button) return;
    if(pinnedNote===button) hideNote();
    else {showNote(button);pinnedNote=button;}
  });
  root.addEventListener('focusin',event=>{
    const button=event.target.closest('.st-note-button');
    if(button) showNote(button);
  });
  root.addEventListener('focusout',event=>{
    if(event.target===noteAnchor) hideNote();
  });
  root.addEventListener('pointerover',event=>{
    const button=event.target.closest('.st-note-button');
    if(button&&event.pointerType!=='touch') showNote(button);
  });
  root.addEventListener('pointerout',event=>{
    if(event.target.closest('.st-note-button')!==noteAnchor||!noteAnchor) return;
    if(noteTooltip.contains(event.relatedTarget)||noteAnchor.contains(event.relatedTarget)) return;
    if(!pinnedNote&&document.activeElement!==noteAnchor) hideNote();
  });
  noteTooltip.addEventListener('pointerleave',()=>{
    if(!pinnedNote&&document.activeElement!==noteAnchor) hideNote();
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('.st-note-button')&&!noteTooltip.contains(event.target)) hideNote();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape') hideNote();});
  document.addEventListener('app:viewchange',hideNote);
  window.addEventListener('resize',hideNote,{passive:true});
  window.addEventListener('scroll',event=>{if(event.target!==noteTooltip) hideNote();},{capture:true,passive:true});
  window.addEventListener('beforeprint',hideNote);
  phoneNotes.addEventListener('change',hideNote);

  const render=(month)=>{
    hideNote();
    const d=data[month];
    if(!d) return;

    const salesRows=d.rows.filter(r=>r.excelRow>=12&&r.excelRow<=15);
    const deductionRows=d.rows.filter(r=>r.excelRow>=16&&r.excelRow<=21);
    const operatingRows=d.rows.filter(r=>r.excelRow>=22&&r.excelRow<=34&&r.subdetail&&r.amount!==null);

    const salesHost=root.querySelector('[data-st-sales-rows]');
    const deductionHost=root.querySelector('[data-st-deduction-rows]');
    const operatingHost=root.querySelector('[data-st-operating-rows]');

    salesHost.innerHTML=salesRows.map(r=>
      rowHtml(r,{key:r.excelRow===15})
    ).join('');

    deductionHost.innerHTML=deductionRows.map(r=>
      rowHtml(r,{key:r.excelRow===16})
    ).join('');

    operatingHost.innerHTML=operatingRows.map(r=>
      rowHtml(r,{sub:true})
    ).join('');

    const resultRow=findRow(month,37);
    const resultLabel=resultRow?.category||'용역비';

    const setText=(selector,text)=>{
      const el=root.querySelector(selector);
      if(el) el.textContent=text;
    };

    setText('[data-st-month]',month);
    setText('[data-st-doc-month]',month);
    setText('[data-st-settlement-month]',formatMonth(d.settlementMonth));
    setText('[data-st-settlement-date]',formatDate(d.settlementDate));

    setText('[data-st-sales]',formatWon(amount(month,15)));
    setText('[data-st-deductions]',formatWon(amount(month,36)));
    setText('[data-st-operating]',formatWon(amount(month,35)));
    setText('[data-st-result-label]',resultLabel);
    setText('[data-st-result]',formatWon(amount(month,37)));

    setText('[data-st-operating-total]',formatWon(amount(month,35)));
    setText('[data-st-deduction-total]',formatWon(amount(month,36)));
    setText('[data-st-final-label]',resultLabel);
    setText('[data-st-final-result]',formatWon(amount(month,37)));

    window.SettlementViewState=Object.freeze({month});
  };

  document.addEventListener('app:viewchange',event=>{
    const {view,month}=event.detail||{};
    if(view==='settlement'&&month) render(month);
  });

  render('2026-03');

  window.SettlementRenderer=Object.freeze({render});
})();

(()=>{
  'use strict';

  const root=document.querySelector('[data-app-view="settlement-overview"]');
  const data=window.SettlementData;
  if(!root||!data) return;

  const months=Object.keys(data).sort();
  const matrix=root.querySelector('[data-st-overview-matrix]');

  const normalizeLabel=value=>String(value??'')
    .replace(/롤스크린유지보수/g,'롤스크린 유지보수')
    .replace(/\s+/g,' ')
    .trim();

  const escapeHtml=value=>String(value??'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');

  const formatNumber=value=>{
    if(value===null||value===undefined) return '—';
    return new Intl.NumberFormat('ko-KR',{maximumFractionDigits:0}).format(Number(value));
  };

  const formatWon=value=>{
    if(value===null||value===undefined) return '—';
    return `${formatNumber(value)}원`;
  };

  const rowsFor=month=>data[month]?.rows||[];

  const findAmount=(month,field,label)=>{
    const target=normalizeLabel(label);
    const row=rowsFor(month).find(item=>
      normalizeLabel(item?.[field])===target
    );
    return row&&row.amount!==null&&row.amount!==undefined
      ? Number(row.amount)
      : null;
  };

  const amountBySpec=(month,spec)=>
    findAmount(month,spec.field,spec.source||spec.label);

  const totalValues=values=>{
    const present=values.filter(value=>value!==null&&value!==undefined);
    return present.length
      ? present.reduce((sum,value)=>sum+Number(value),0)
      : null;
  };

  const averageValues=values=>{
    if(!months.length) return null;
    const total=totalValues(values);
    return total===null ? null : total/months.length;
  };

  const operatingLabels=[];
  months.forEach(month=>{
    rowsFor(month).forEach(item=>{
      if(!item.subdetail||item.amount===null||item.amount===undefined) return;
      const label=normalizeLabel(item.subdetail);
      if(label==='운영비 계') return;
      if(!operatingLabels.includes(label)) operatingLabels.push(label);
    });
  });

  const groups=[
    {
      title:'매출',
      rows:[
        {label:'실제 매출',field:'detail'},
        {label:'차감액',field:'detail'},
        {label:'실제 매출 - 차감액',field:'detail'},
        {label:'월별 매출액',field:'detail',kind:'subtotal'}
      ]
    },
    {
      title:'공제항목',
      rows:[
        {label:'위탁운영 수수료',field:'detail'},
        {label:'카드수수료',field:'detail'},
        {label:'결제수단수수료',field:'detail'},
        {label:'현금 정산 차액',field:'detail'},
        {label:'골프존 유지보수비',field:'detail'},
        {label:'관리비',field:'detail'}
      ]
    },
    {
      title:'운영비',
      rows:[
        ...operatingLabels.map(label=>({label,field:'subdetail'})),
        {label:'운영비 계',field:'subdetail',kind:'subtotal'}
      ]
    },
    {
      title:'정산결과',
      rows:[
        {label:'공제항목 합계',field:'category',kind:'subtotal'},
        {label:'용역비',field:'category',kind:'final'}
      ]
    }
  ];

  const rowHtml=spec=>{
    const values=months.map(month=>amountBySpec(month,spec));
    const total=totalValues(values);
    const average=averageValues(values);
    const classes=['st-overview-row'];
    if(spec.kind==='subtotal') classes.push('is-subtotal');
    if(spec.kind==='final') classes.push('is-final');

    return `<div class="${classes.join(' ')}" data-st-overview-row="${escapeHtml(spec.label)}">
      <div class="st-overview-row-label">${escapeHtml(spec.label)}</div>
      ${values.map((value,index)=>`
        <div class="st-overview-cell ${value===null?'is-missing':''}"
             data-st-overview-value="${escapeHtml(months[index])}">
          ${value===null?'—':formatNumber(value)}
        </div>`).join('')}
      <div class="st-overview-cell is-total" data-st-overview-total>
        ${total===null?'—':formatNumber(total)}
      </div>
      <div class="st-overview-cell is-average" data-st-overview-average>
        ${average===null?'—':formatNumber(average)}
      </div>
    </div>`;
  };

  const render=()=>{
    if(!matrix||!months.length) return;

    matrix.style.setProperty('--st-overview-month-count',String(months.length));

    matrix.innerHTML=`
      <div class="st-overview-head">
        <div class="st-overview-label-head">구분</div>
        ${months.map(month=>`
          <button type="button"
                  class="st-overview-month-head"
                  data-st-overview-month="${escapeHtml(month)}"
                  title="${escapeHtml(month)} 상세 정산서 보기"
                  aria-label="${escapeHtml(month)} 상세 정산서 보기">
            ${escapeHtml(month)}
          </button>`).join('')}
        <div class="st-overview-total-head">누계</div>
        <div class="st-overview-average-head">평균</div>
      </div>
      ${groups.map(group=>`
        <div class="st-overview-group"><span class="st-overview-group-label">${escapeHtml(group.title)}</span></div>
        ${group.rows.map(rowHtml).join('')}
      `).join('')}
    `;

    const salesTotal=totalValues(
      months.map(month=>findAmount(month,'detail','월별 매출액'))
    );
    const deductionTotal=totalValues(
      months.map(month=>findAmount(month,'category','공제항목 합계'))
    );
    const operatingTotal=totalValues(
      months.map(month=>findAmount(month,'subdetail','운영비 계'))
    );
    const resultTotal=totalValues(
      months.map(month=>findAmount(month,'category','용역비'))
    );

    const setText=(selector,text)=>{
      const el=root.querySelector(selector);
      if(el) el.textContent=text;
    };

    const first=months[0];
    const last=months[months.length-1];
    setText('[data-st-overview-range]',`${first} ~ ${last}`);
    setText('[data-st-overview-period]',`${months.length}개월`);
    setText('[data-st-overview-sales]',formatWon(salesTotal));
    setText('[data-st-overview-deductions]',formatWon(deductionTotal));
    setText('[data-st-overview-operating]',formatWon(operatingTotal));
    setText('[data-st-overview-result]',formatWon(resultTotal));

    const monthlyIdentity=months.every(month=>{
      const sales=findAmount(month,'detail','월별 매출액');
      const deductions=findAmount(month,'category','공제항목 합계');
      const result=findAmount(month,'category','용역비');
      return sales!==null&&deductions!==null&&result!==null&&
        Math.abs((sales-deductions)-result)<0.5;
    });

    window.SettlementOverviewQA=Object.freeze({
      passed:
        monthlyIdentity&&
        salesTotal!==null&&deductionTotal!==null&&resultTotal!==null&&
        Math.abs((salesTotal-deductionTotal)-resultTotal)<0.5,
      months:Object.freeze([...months]),
      monthCount:months.length,
      matrixRowCount:groups.reduce((sum,group)=>sum+group.rows.length,0),
      operatingRowCount:operatingLabels.length,
      totals:Object.freeze({
        sales:salesTotal,
        deductions:deductionTotal,
        operating:operatingTotal,
        result:resultTotal
      }),
      averages:Object.freeze({
        sales:salesTotal/months.length,
        deductions:deductionTotal/months.length,
        operating:operatingTotal/months.length,
        result:resultTotal/months.length
      })
    });
  };

  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-st-overview-month]');
    if(!button||!root.contains(button)) return;
    window.AppNavigation?.setView('settlement',{
      month:button.dataset.stOverviewMonth
    });
  });

  render();
})();

(()=>{
  'use strict';

  const root=document.querySelector('[data-app-view="business"]');
  const engine=window.BusinessAnalysisEngine;
  if(!root||!engine) return;

  const RS_STEP=0.5;

  const state={
    settings:{...engine.defaults,laborShifts:engine.laborShifts.map(item=>({...item}))},
    upgradeItems:engine.upgradeReference.map(item=>({...item}))
  };

  const settingInputs=[...root.querySelectorAll('[data-ba-setting]')];
  const snapshotButton=root.querySelector('[data-ba-snapshot]');
  const resetButton=root.querySelector('[data-ba-reset]');
  const matrix=root.querySelector('[data-ba-matrix="comparison"]');
  const matrixScroll=root.querySelector('.ba-unified-scroll');
  const tooltip=document.getElementById('baFloatingTooltip');
  const rsStepButtons=[...root.querySelectorAll('[data-ba-rs-step]')];
  const compactRs=window.matchMedia('(max-width:1100px)');
  const printRs=window.matchMedia('print');
  let compactRsStep=1;
  let printingRs=false;


  const fixedRsHeader=document.createElement('div');
  fixedRsHeader.className='ba-rs-fixed-header';
  fixedRsHeader.setAttribute('aria-hidden','true');
  document.body.appendChild(fixedRsHeader);

  const hideFixedRsHeader=()=>{
    fixedRsHeader.classList.remove('is-visible');
    fixedRsHeader.replaceChildren();
  };

  let activeRsColumn=null;

  const paintRsColumn=index=>{
    const normalized=index===null||index===undefined?null:String(index);

    matrix?.querySelectorAll('.is-rs-column-hover')
      .forEach(el=>el.classList.remove('is-rs-column-hover'));
    fixedRsHeader.querySelectorAll('.is-rs-column-hover')
      .forEach(el=>el.classList.remove('is-rs-column-hover'));

    activeRsColumn=normalized;
    if(normalized===null) return;

    const selector=`[data-ba-rs-index="${normalized}"]`;
    matrix?.querySelectorAll(selector)
      .forEach(el=>el.classList.add('is-rs-column-hover'));
    fixedRsHeader.querySelectorAll(selector)
      .forEach(el=>el.classList.add('is-rs-column-hover'));
  };

  const syncRsColumnHoverFromPointer=event=>{
    const target=event.target.closest?.('[data-ba-rs-index]');
    const next=target?.dataset.baRsIndex??null;
    if(next!==activeRsColumn) paintRsColumn(next);
  };

  const syncFixedRsHeader=()=>{
    if(!matrix||!matrixScroll||printingRs||printRs.matches||!root.classList.contains('is-active')){
      hideFixedRsHeader();
      return;
    }

    const original=matrix.querySelector(':scope > .ba-matrix-head:first-child');
    if(!original){
      hideFixedRsHeader();
      return;
    }

    const originalRect=original.getBoundingClientRect();
    const matrixRect=matrix.getBoundingClientRect();
    const scrollRect=matrixScroll.getBoundingClientRect();
    const headerHeight=Math.ceil(originalRect.height);

    const shouldShow=
      originalRect.top<=0 &&
      matrixRect.bottom>headerHeight &&
      scrollRect.bottom>headerHeight;

    if(!shouldShow){
      hideFixedRsHeader();
      return;
    }

    let clone=fixedRsHeader.firstElementChild;
    if(!clone){
      clone=original.cloneNode(true);
      clone.classList.add('ba-rs-fixed-track');
      fixedRsHeader.appendChild(clone);
    }

    const matrixWidth=Math.max(matrix.scrollWidth,matrix.getBoundingClientRect().width);
    const computed=getComputedStyle(original);

    clone.style.position='static';
    clone.style.top='auto';
    clone.style.width=`${matrixWidth}px`;
    clone.style.minWidth=`${matrixWidth}px`;
    clone.style.maxWidth='none';
    clone.style.gridTemplateColumns=computed.gridTemplateColumns;
    clone.style.transform=`translateX(${-matrixScroll.scrollLeft}px)`;
    const label=clone.querySelector('.ba-matrix-label-head');
    if(label) label.style.transform=`translateX(${matrixScroll.scrollLeft}px)`;


    fixedRsHeader.style.left=`${Math.round(scrollRect.left)}px`;
    fixedRsHeader.style.width=`${Math.round(scrollRect.width)}px`;
    fixedRsHeader.style.height=`${headerHeight}px`;
    fixedRsHeader.classList.add('is-visible');

    if(activeRsColumn!==null){
      fixedRsHeader.querySelector(
        `[data-ba-rs-index="${activeRsColumn}"]`
      )?.classList.add('is-rs-column-hover');
    }
  };
  const setRsDisplay=(target,step)=>{
    if(!target) return;
    const headers=[...target.querySelectorAll(':scope > .ba-matrix-head > .ba-rs-head')];
    const visible=new Set(headers.filter(cell=>step===0.5||Number.isInteger(Number(cell.dataset.baRsValue)))
      .map(cell=>cell.dataset.baRsIndex));
    target.querySelectorAll('[data-ba-rs-index]').forEach(cell=>{
      cell.hidden=!visible.has(cell.dataset.baRsIndex);
    });
    target.style.setProperty('--ba-rs-count',String(visible.size));
  };

  const applyRsView=(resetScroll=false)=>{
    const step=compactRs.matches&&!printingRs&&!printRs.matches?compactRsStep:0.5;
    setRsDisplay(matrix,step);
    rsStepButtons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.baRsStep)===step)));
    paintRsColumn(null);
    hideFixedRsHeader();
    if(resetScroll&&matrixScroll) matrixScroll.scrollLeft=0;
    requestAnimationFrame(syncFixedRsHeader);
  };

  rsStepButtons.forEach(button=>button.addEventListener('click',()=>{
    if(!compactRs.matches) return;
    compactRsStep=Number(button.dataset.baRsStep);
    applyRsView(true);
  }));
  compactRs.addEventListener('change',()=>applyRsView(true));
  printRs.addEventListener('change',()=>applyRsView());
  window.addEventListener('beforeprint',()=>{
    printingRs=true;
    applyRsView();
  });
  window.addEventListener('afterprint',()=>{
    printingRs=false;
    applyRsView();
  });

  const laborTable=root.querySelector('[data-ba-labor-table]');
  const upgradeTable=root.querySelector('[data-ba-upgrade-table]');

  const formatNumber=(value,maximumFractionDigits=0)=>
    new Intl.NumberFormat('ko-KR',{maximumFractionDigits}).format(value);

  const formatMoney=value=>{
    if(!Number.isFinite(value)) return '—';
    return formatNumber(Math.round(value));
  };

  const formatManWon=value=>{
    const man=Number(value)/10000;
    if(!Number.isFinite(man)) return '—';
    return `${formatNumber(man,2)}만 원`;
  };

  const renderPlanLegend=()=>{
    const fixedText=root.querySelector('[data-ba-plan-fixed]');
    const shareText=root.querySelector('[data-ba-plan-share]');

    if(fixedText){
      fixedText.textContent=
        `기존 위탁운영 수수료 ${formatManWon(state.settings.existingManagementFee)} + ` +
        `업그레이드 고정비용 ${formatManWon(state.settings.upgradeFixedFee)}`;
    }

    if(shareText){
      shareText.textContent=
        `기존 위탁운영 수수료 ${formatManWon(state.settings.existingManagementFee)} + ` +
        `업그레이드 매출배분 기본비용 ${formatManWon(state.settings.upgradeRevenueShareBaseFee)} + ` +
        `기준매출 초과분 × 추가 수수료율`;
    }
  };

  // Invalid drafts stay in the input until blur; they never replace calculation state.
  const parseInput=input=>{
    const raw=String(input.value??'').replace(/,/g,'').trim();
    if(!raw) return null;
    const n=Number(raw);
    if(!Number.isFinite(n)) return null;
    const value=input.dataset.baMode==='percent'?n/100:n;
    if(value<0) return null;
    if(input.dataset.baMode==='percent'&&value>1) return null;
    if(input.dataset.baSetting==='upgradeInstallmentMonths'&&value===0) return null;
    return value;
  };

  const formatSettingInput=input=>{
    const key=input.dataset.baSetting;
    const val=state.settings[key];
    if(!Number.isFinite(Number(val))) return;
    if(input.dataset.baMode==='percent'){
      input.value=formatNumber(Number(val)*100,2).replace(/\.00$/,'');
    }else{
      input.value=formatNumber(Number(val),2).replace(/\.00$/,'');
    }
  };

  const commonGroups=[
    {
      title:'매출',
      rows:[
        {label:'골프존 매출(VAT포함)',value:r=>r.sales.golfVatIncluded},
        {label:'골프존 매출(VAT별도)',value:r=>r.sales.golfVatExcluded},
        {label:'식음료 매출(VAT별도)',value:r=>r.sales.foodVatExcluded},
        {label:'매출 합계(VAT포함)',value:r=>r.sales.totalVatIncluded},
        {label:'매출 합계(VAT별도)',value:r=>r.sales.totalVatExcluded,subtotal:true}
      ]
    },
    {
      title:'공통 비용',
      rows:[
        {label:'카드수수료',value:r=>r.deductions.cardFee},
        {label:'골프존 유지보수비',value:r=>r.deductions.golfMaintenanceFee},
        {label:'관리비',value:r=>r.deductions.buildingManagementFee},
        {label:'운영비(고정비)',value:r=>r.deductions.fixedOperatingCost},
        {label:'공통 비용 합계',value:r=>r.deductions.cardFee+r.deductions.golfMaintenanceFee+r.deductions.buildingManagementFee+r.deductions.fixedOperatingCost,subtotal:true}
      ]
    },
    {
      title:'힐링스토리 지출',
      rows:[
        {label:'인건비',value:r=>r.operatorExpenses.labor},
        {label:'소모품',value:r=>r.operatorExpenses.consumables},
        {label:'힐링스토리 지출 합계',value:r=>r.operatorExpenses.total,subtotal:true}
      ]
    }
  ];

  const compareGroups=[
    {
      title:'위탁운영 수수료',
      note:'',
      rows:[
        {kind:'fixed',label:'고정비용형',value:(f,s)=>f.deductions.managementFee},
        {kind:'share',label:'매출배분형',value:(f,s)=>s.deductions.managementFee},
        {kind:'diff',label:'2안 - 1안',value:(f,s)=>s.deductions.managementFee-f.deductions.managementFee}
      ]
    },
    {
      title:'공제항목 합계',
      note:'',
      rows:[
        {kind:'fixed',label:'고정비용형',value:(f,s)=>f.deductions.total},
        {kind:'share',label:'매출배분형',value:(f,s)=>s.deductions.total},
        {kind:'diff',label:'2안 - 1안',value:(f,s)=>s.deductions.total-f.deductions.total}
      ]
    },
    {
      title:'김형호 수익',
      note:'',
      rows:[
        {kind:'fixed',label:'고정비용형',value:(f,s)=>f.results.operatorProfit,profit:true},
        {kind:'share',label:'매출배분형',value:(f,s)=>s.results.operatorProfit,profit:true},
        {kind:'diff',label:'2안 - 1안',value:(f,s)=>s.results.operatorProfit-f.results.operatorProfit}
      ]
    },
    {
      title:'이지벤처스 수익',
      note:'',
      rows:[
        {kind:'fixed',label:'고정비용형',value:(f,s)=>f.results.easyVenturesProfit},
        {kind:'share',label:'매출배분형',value:(f,s)=>s.results.easyVenturesProfit},
        {kind:'diff',label:'2안 - 1안',value:(f,s)=>s.results.easyVenturesProfit-f.results.easyVenturesProfit}
      ]
    }
  ];

  const metricRowHtml=(metric,seriesFixed,seriesShare)=>{
    const rowClass=[
      'ba-metric-row',
      metric.subtotal?'is-subtotal':'',
      metric.kind?`is-plan-${metric.kind}`:''
    ].filter(Boolean).join(' ');

    let html=`<div class="${rowClass}">`;
    html+=`<div class="ba-metric-label"><strong>${metric.label}</strong></div>`;

    for(let i=0;i<seriesFixed.length;i++){
      const fixed=seriesFixed[i];
      const share=seriesShare[i];
      const source=metric.kind?metric.value(fixed,share):metric.value(fixed);
      const classes=['ba-metric-cell'];

      if(metric.profit){
        if(source<0) classes.push('is-negative');
        if(source>0) classes.push('is-positive-strong');
      }
      if(metric.kind==='diff'){
        if(source>0) classes.push('is-diff-positive');
        else if(source<0) classes.push('is-diff-negative');
        else classes.push('is-diff-zero');
      }

      html+=`<div class="${classes.join(' ')}" data-ba-rs-index="${i}">${formatMoney(source)}</div>`;
    }

    html+='</div>';
    return html;
  };

  const renderMatrix=()=>{
    if(!matrix) return;

    const fixed=engine.calculateSeries('fixed',{step:RS_STEP,overrides:state.settings});
    const share=engine.calculateSeries('share',{step:RS_STEP,overrides:state.settings});


    const rsHeader=()=>{
      let header='<div class="ba-matrix-head"><div class="ba-matrix-label-head">구분</div>';
      for(const [index,item] of fixed.entries()){
        header+=`<div class="ba-rs-head" data-ba-rs-index="${index}" data-ba-rs-value="${item.rs}">RS ${formatNumber(item.rs,1).replace(/\.0$/,'')}</div>`;
      }
      header+='</div>';
      return header;
    };

    let html=rsHeader();

    html+='<section class="ba-matrix-bundle is-compare">';

    for(const group of compareGroups){
      html+=`<div class="ba-compare-block">`;
      html+=`<div class="ba-compare-title"><span class="ba-matrix-section-label"><strong>${group.title}</strong>${group.note?`<small>${group.note}</small>`:''}</span></div>`;
      for(const metric of group.rows){
        html+=metricRowHtml(metric,fixed,share);
      }
      html+='</div>';
    }
    html+='</section>';

    // 공통 계산도 상단 RS 헤더와 동일한 컬럼을 사용한다.

    html+='<section class="ba-matrix-bundle is-common">';

    for(const group of commonGroups){
      html+=`<div class="ba-common-block">`;
      html+=`<div class="ba-group-title"><span class="ba-matrix-section-label">${group.title}</span></div>`;
      for(const metric of group.rows){
        html+=metricRowHtml(metric,fixed,share);
      }
      html+='</div>';
    }
    html+='</section>';

    matrix.innerHTML=html;
    applyRsView();
  };

  // Preserve editable nodes so change/blur cannot remove the next focus target.
  const syncReferenceTable=(table,html)=>{
    if(!table.firstElementChild){
      table.innerHTML=html;
      return;
    }
    const template=document.createElement('template');
    template.innerHTML=html;
    [...template.content.children].forEach((nextRow,rowIndex)=>{
      const row=table.children[rowIndex];
      [...nextRow.children].forEach((nextCell,cellIndex)=>{
        const cell=row.children[cellIndex];
        const input=cell.querySelector('.ba-ref-input');
        cell.className=nextCell.className;
        if(input){
          if(document.activeElement!==input) input.value=nextCell.querySelector('input').value;
        }else{
          cell.innerHTML=nextCell.innerHTML;
        }
      });
    });
  };

  const renderLaborReference=()=>{
    if(!laborTable) return;
    const result=engine.calculateLabor(state.settings);
    let html='<div class="ba-ref-head-row"><div>근무시간대</div><div>시간</div><div>인원</div><div>지급 총액</div><div>사회보험료</div><div>퇴직금</div></div>';

    result.shifts.forEach((shift,index)=>{
      const groupText=shift.group==='weekday'?'평일':'주말';
      html+=`<div class="ba-labor-row" data-ba-labor-index="${index}">
        <div class="ba-ref-label"><small>${groupText} · 주${shift.daysPerWeek}일</small><span>${shift.label}</span></div>
        <div class="ba-ref-input-shell"><input class="ba-ref-input dashboard-input" type="text" inputmode="decimal" data-ba-labor-field="hours" value="${formatNumber(shift.hours,2)}"><span class="ba-ref-input-unit">시간</span></div>
        <div class="ba-ref-input-shell"><input class="ba-ref-input dashboard-input" type="text" inputmode="decimal" data-ba-labor-field="people" value="${formatNumber(shift.people,2)}"><span class="ba-ref-input-unit">명</span></div>
        <div class="ba-ref-value">${formatMoney(shift.gross)}원</div>
        <div class="ba-ref-value ${shift.benefits?'':'is-muted'}">${shift.benefits?formatMoney(shift.socialInsurance)+'원':'—'}</div>
        <div class="ba-ref-value ${shift.benefits?'':'is-muted'}">${shift.benefits?formatMoney(shift.retirement)+'원':'—'}</div>
      </div>`;
    });

    syncReferenceTable(laborTable,html);

    const setText=(selector,text)=>{
      const el=root.querySelector(selector);
      if(el) el.textContent=text;
    };
    setText('[data-ba-labor-total]',formatMoney(result.total)+'원');
    setText('[data-ba-labor-gross]',formatMoney(result.gross)+'원');
    setText('[data-ba-labor-insurance]',formatMoney(result.socialInsurance)+'원');
    setText('[data-ba-labor-retirement]',formatMoney(result.retirement)+'원');
    setText('[data-ba-labor-grand]',formatMoney(result.total)+'원');
  };

  const renderUpgradeReference=()=>{
    if(!upgradeTable) return;
    const result=engine.calculateUpgradeReference(state.upgradeItems,state.settings);
    let html='<div class="ba-ref-head-row"><div>구분</div><div>단가</div><div>수량</div><div>합계</div><div>무이자 월비용</div></div>';

    result.rows.forEach((item,index)=>{
      const isSub=item.key==='ambidextrous'||item.key==='projectorFloor';
      html+=`<div class="ba-upgrade-row" data-ba-upgrade-index="${index}">
        <div class="ba-ref-label ${isSub?'is-sub':''}"><span>${item.label}</span></div>
        <div class="ba-ref-input-shell"><input class="ba-ref-input dashboard-input" type="text" inputmode="decimal" data-ba-upgrade-field="unitCost" value="${formatNumber(item.unitCost)}"><span class="ba-ref-input-unit">원</span></div>
        <div class="ba-ref-input-shell"><input class="ba-ref-input dashboard-input" type="text" inputmode="decimal" data-ba-upgrade-field="qty" value="${formatNumber(item.qty,2)}"></div>
        <div class="ba-ref-value">${formatMoney(item.total)}원</div>
        <div class="ba-ref-value">${formatMoney(item.monthlyInterestFree)}원</div>
      </div>`;
    });

    syncReferenceTable(upgradeTable,html);

    const setText=(selector,text)=>{
      const el=root.querySelector(selector);
      if(el) el.textContent=text;
    };
    setText('[data-ba-upgrade-total]',formatMoney(result.total)+'원');
    setText('[data-ba-upgrade-total-summary]',formatMoney(result.total)+'원');
    setText('[data-ba-upgrade-monthly]',formatMoney(result.monthlyInterestFree)+'원');
    setText('[data-ba-upgrade-interest-total]',formatMoney(result.totalWithInterest)+'원');
    setText('[data-ba-upgrade-interest-monthly]',formatNumber(Math.ceil(result.monthlyWithInterest))+'원');
  };

  const renderReferences=()=>{
    renderLaborReference();
    renderUpgradeReference();
  };

  const renderAll=()=>{
    renderPlanLegend();
    renderMatrix();
    renderReferences();
  };

  let valueChangeFocusTimer=null;

  const captureMatrixDisplayValues=()=>{
    const values=new Map();
    if(!matrix) return values;

    matrix.querySelectorAll('.ba-metric-row').forEach((row,rowIndex)=>{
      row.querySelectorAll('.ba-metric-cell').forEach((cell,cellIndex)=>{
        values.set(`${rowIndex}:${cellIndex}`,cell.textContent.trim());
      });
    });

    return values;
  };

  const focusChangedMatrixCells=before=>{
    if(!matrix||!before?.size) return;

    if(valueChangeFocusTimer!==null){
      clearTimeout(valueChangeFocusTimer);
      valueChangeFocusTimer=null;
    }

    const changed=[];
    matrix.querySelectorAll('.ba-metric-row').forEach((row,rowIndex)=>{
      row.querySelectorAll('.ba-metric-cell').forEach((cell,cellIndex)=>{
        const key=`${rowIndex}:${cellIndex}`;
        if(before.has(key)&&before.get(key)!==cell.textContent.trim()){
          cell.classList.add('is-ba-value-changed');
          changed.push(cell);
        }
      });
    });

    if(!changed.length) return;

    valueChangeFocusTimer=window.setTimeout(()=>{
      changed.forEach(cell=>{
        if(cell.isConnected) cell.classList.remove('is-ba-value-changed');
      });
      valueChangeFocusTimer=null;
    },850);
  };

  const renderAllWithValueFocus=()=>{
    const before=captureMatrixDisplayValues();
    renderAll();
    focusChangedMatrixCells(before);
  };

  const clearValueChangeFocus=()=>{
    if(valueChangeFocusTimer!==null){
      clearTimeout(valueChangeFocusTimer);
      valueChangeFocusTimer=null;
    }
    matrix?.querySelectorAll('.is-ba-value-changed')
      .forEach(cell=>cell.classList.remove('is-ba-value-changed'));
  };

  const syncSnapshotFormState=(source,clone)=>{
    const sourceInputs=[...source.querySelectorAll('input')];
    const cloneInputs=[...clone.querySelectorAll('input')];
    sourceInputs.forEach((input,index)=>{
      const target=cloneInputs[index];
      if(!target) return;
      target.setAttribute('value',input.value);
      if(input.checked) target.setAttribute('checked','');
      else target.removeAttribute('checked');
    });

    const sourceTextareas=[...source.querySelectorAll('textarea')];
    const cloneTextareas=[...clone.querySelectorAll('textarea')];
    sourceTextareas.forEach((textarea,index)=>{
      if(cloneTextareas[index]) cloneTextareas[index].textContent=textarea.value;
    });

    const sourceSelects=[...source.querySelectorAll('select')];
    const cloneSelects=[...clone.querySelectorAll('select')];
    sourceSelects.forEach((select,index)=>{
      const target=cloneSelects[index];
      if(!target) return;
      [...target.options].forEach(option=>{
        option.toggleAttribute('selected',option.value===select.value);
      });
    });
  };

  const collectSnapshotCss=()=>{
    let css='';
    for(const sheet of document.styleSheets){
      try{
        css+=[...sheet.cssRules].map(rule=>rule.cssText).join('\n')+'\n';
      }catch(error){
        console.warn('Snapshot stylesheet skipped:',error);
      }
    }
    return css;
  };

  const snapshotFileName=()=>{
    const now=new Date();
    const pad=value=>String(value).padStart(2,'0');
    const stamp=[
      now.getFullYear(),
      pad(now.getMonth()+1),
      pad(now.getDate()),
      '_',
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds())
    ].join('');
    return `사업성분석_스냅샷_${stamp}.png`;
  };

  const buildSnapshotClone=()=>{
    const clone=root.cloneNode(true);
    clone.classList.add('is-active','is-ba-snapshot');
    clone.querySelector('.ba-header')?.remove();
    clone.querySelector('.ba-rs-controls')?.remove();
    setRsDisplay(clone.querySelector('[data-ba-matrix="comparison"]'),0.5);
    clone.querySelector('.ba-reference-grid')?.remove();
    clone.querySelector('.ba-matrix-bundle.is-common')?.remove();
    clone.querySelectorAll('.is-rs-column-hover,.is-ba-value-changed,.is-open')
      .forEach(element=>element.classList.remove('is-rs-column-hover','is-ba-value-changed','is-open'));
    syncSnapshotFormState(root,clone);
    return clone;
  };

  const loadSnapshotImage=url=>new Promise((resolve,reject)=>{
    const image=new Image();
    image.onload=()=>resolve(image);
    image.onerror=()=>reject(new Error('스냅샷 이미지 렌더링에 실패했습니다.'));
    image.src=url;
  });

  const canvasToBlob=canvas=>new Promise((resolve,reject)=>{
    canvas.toBlob(blob=>{
      if(blob) resolve(blob);
      else reject(new Error('PNG 변환에 실패했습니다.'));
    },'image/png');
  });

  const downloadBusinessSnapshot=async()=>{
    if(!snapshotButton||snapshotButton.disabled) return;

    const label=snapshotButton.querySelector('.ba-button-icon + span');
    const originalLabel=label?.textContent||'스냅샷';
    snapshotButton.disabled=true;
    snapshotButton.setAttribute('aria-busy','true');
    if(label) label.textContent='생성 중…';

    let stage=null;
    let svgUrl=null;
    let downloadUrl=null;

    try{
      await document.fonts?.ready;

      // Fixed report width is independent of the current screen size.
      const clone=buildSnapshotClone();
      stage=document.createElement('div');
      stage.setAttribute('aria-hidden','true');
      Object.assign(stage.style,{
        position:'fixed',
        left:'-20000px',
        top:'0',
        width:'var(--dash-content-w)',
        margin:'0',
        padding:'0',
        pointerEvents:'none',
        zIndex:'-1'
      });
      stage.appendChild(clone);
      document.body.appendChild(stage);

      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));

      const width=Math.ceil(clone.scrollWidth);
      const height=Math.ceil(clone.scrollHeight);
      if(width<=0||height<=0) throw new Error('스냅샷 영역 크기를 확인할 수 없습니다.');

      const css=collectSnapshotCss();
      const serialized=new XMLSerializer().serializeToString(clone);
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style><![CDATA[${css.replace(/]]>/g,']]]]><![CDATA[>')}]]></style>${serialized}</div></foreignObject></svg>`;

      svgUrl=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      const image=await loadSnapshotImage(svgUrl);

      const scale=Math.min(2,Math.max(1,window.devicePixelRatio||1));
      const canvas=document.createElement('canvas');
      canvas.width=Math.round(width*scale);
      canvas.height=Math.round(height*scale);
      const context=canvas.getContext('2d');
      if(!context) throw new Error('Canvas를 초기화할 수 없습니다.');
      context.fillStyle='#eef2f6';
      context.fillRect(0,0,canvas.width,canvas.height);
      context.drawImage(image,0,0,canvas.width,canvas.height);

      const blob=await canvasToBlob(canvas);
      downloadUrl=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=downloadUrl;
      link.download=snapshotFileName();
      document.body.appendChild(link);
      link.click();
      link.remove();
    }catch(error){
      console.error('Business snapshot failed:',error);
      window.alert('사업성 분석 스냅샷을 생성하지 못했습니다. 다시 시도해 주세요.');
    }finally{
      stage?.remove();
      if(svgUrl?.startsWith('blob:')) URL.revokeObjectURL(svgUrl);
      if(downloadUrl) setTimeout(()=>URL.revokeObjectURL(downloadUrl),0);
      snapshotButton.disabled=false;
      snapshotButton.removeAttribute('aria-busy');
      if(label) label.textContent=originalLabel;
    }
  };

  snapshotButton?.addEventListener('click',downloadBusinessSnapshot);

  const resetAll=()=>{
    state.settings={
      ...engine.defaults,
      laborShifts:engine.laborShifts.map(item=>({...item}))
    };
    state.upgradeItems=engine.upgradeReference.map(item=>({...item}));

    settingInputs.forEach(input=>{
      const key=input.dataset.baSetting;
      if(key in state.settings) formatSettingInput(input);
    });

    if(matrixScroll) matrixScroll.scrollLeft=0;
    hideTooltip();
    hideFixedRsHeader();
    clearValueChangeFocus();
    renderAll();
  };

  resetButton?.addEventListener('click',resetAll);

  root.addEventListener('click',event=>{
    const button=event.target.closest('[data-ba-setting-step]');
    if(!button) return;

    const key=button.dataset.baSettingStep;
    const step=Number(button.dataset.baStep);
    const direction=Number(button.dataset.baStepDirection);

    if(!(key in state.settings)||!Number.isFinite(step)||!Number.isFinite(direction)) return;

    const current=Number(state.settings[key])||0;
    let next=current+(step*direction);
    next=Math.round(next*100000000)/100000000;

    if(key==='additionalFeeRate'){
      next=Math.max(0,Math.min(1,next));
    }else{
      next=Math.max(0,next);
    }

    state.settings[key]=next;

    const input=root.querySelector(`[data-ba-setting="${key}"]`);
    if(input) formatSettingInput(input);

    renderAllWithValueFocus();
  });

  settingInputs.forEach(input=>{
    const key=input.dataset.baSetting;
    if(key in state.settings) formatSettingInput(input);

    input.addEventListener('focus',()=>{
      const val=state.settings[key];
      if(!Number.isFinite(Number(val))) return;
      input.value=input.dataset.baMode==='percent'
        ? String(Number((Number(val)*100).toFixed(4)))
        : String(Number(val));
      input.select();
    });

    input.addEventListener('input',()=>{
      const parsed=parseInput(input);
      if(parsed===null) return;
      state.settings[key]=parsed;
      renderAllWithValueFocus();
    });

    input.addEventListener('blur',()=>{
      const parsed=parseInput(input);
      if(parsed!==null) state.settings[key]=parsed;
      formatSettingInput(input);
      renderAllWithValueFocus();
    });

    input.addEventListener('keydown',event=>{
      if(event.key==='Enter') input.blur();
    });
  });

  root.addEventListener('focusin',event=>{
    const input=event.target.closest('.ba-ref-input');
    if(!input) return;
    input.value=String(input.value).replace(/,/g,'');
    input.select();
  });

  root.addEventListener('focusout',event=>{
    const input=event.target.closest('.ba-ref-input');
    if(!input) return;
    const laborRow=input.closest('[data-ba-labor-index]');
    const upgradeRow=input.closest('[data-ba-upgrade-index]');
    const field=input.dataset.baLaborField||input.dataset.baUpgradeField;
    const item=laborRow?state.settings.laborShifts[Number(laborRow.dataset.baLaborIndex)]:
      state.upgradeItems[Number(upgradeRow?.dataset.baUpgradeIndex)];
    if(item&&field in item) input.value=formatNumber(item[field],field==='unitCost'?0:2);
  });

  root.addEventListener('keydown',event=>{
    const input=event.target.closest('.ba-ref-input');
    if(input&&event.key==='Enter') input.blur();
  });

  root.addEventListener('change',event=>{
    const laborInput=event.target.closest('.ba-ref-input[data-ba-labor-field]');
    if(laborInput){
      const row=laborInput.closest('[data-ba-labor-index]');
      const index=Number(row?.dataset.baLaborIndex);
      const field=laborInput.dataset.baLaborField;
      const value=parseInput(laborInput);

      if(Number.isInteger(index)&&value!==null&&['hours','people'].includes(field)&&state.settings.laborShifts[index]){
        state.settings.laborShifts[index]={...state.settings.laborShifts[index],[field]:value};
      }
      renderAll();
      return;
    }

    const upgradeInput=event.target.closest('.ba-ref-input[data-ba-upgrade-field]');
    if(upgradeInput){
      const row=upgradeInput.closest('[data-ba-upgrade-index]');
      const index=Number(row?.dataset.baUpgradeIndex);
      const field=upgradeInput.dataset.baUpgradeField;
      const value=parseInput(upgradeInput);

      if(Number.isInteger(index)&&value!==null&&['unitCost','qty'].includes(field)&&state.upgradeItems[index]){
        state.upgradeItems[index]={...state.upgradeItems[index],[field]:value};
      }
      renderReferences();
    }
  });


  let pinnedTooltip=null;
  const positionTooltip=button=>{
    if(!tooltip||!button) return;
    if(!button.classList.contains('is-open')) hideTooltip();
    tooltip.textContent=button.dataset.baTooltip||'';
    tooltip.classList.add('is-visible');
    tooltip.setAttribute('aria-hidden','false');

    const rect=button.getBoundingClientRect();
    const gutter=12;
    const gap=7;
    const width=tooltip.offsetWidth;
    const height=tooltip.offsetHeight;

    let left=rect.left+rect.width/2-width/2;
    left=Math.max(gutter,Math.min(left,window.innerWidth-width-gutter));

    let top=rect.top-height-gap;
    let below=false;
    if(top<gutter){
      top=rect.bottom+gap;
      below=true;
    }

    const arrow=rect.left+rect.width/2-left;
    tooltip.style.left=`${Math.round(left)}px`;
    tooltip.style.top=`${Math.round(top)}px`;
    tooltip.style.setProperty('--dash-tooltip-arrow',`${Math.max(10,Math.min(width-10,arrow))}px`);
    tooltip.classList.toggle('is-below',below);
    button.classList.add('is-open');
  };

  const hideTooltip=()=>{
    pinnedTooltip=null;
    if(!tooltip) return;
    tooltip.classList.remove('is-visible','is-below');
    tooltip.setAttribute('aria-hidden','true');
    root.querySelectorAll('.ba-info-button.is-open').forEach(b=>b.classList.remove('is-open'));
  };

  root.addEventListener('pointerover',event=>{
    const button=event.target.closest('.ba-info-button[data-ba-tooltip]');
    if(!button||event.pointerType==='touch') return;
    positionTooltip(button);
  });
  root.addEventListener('pointerout',event=>{
    const button=event.target.closest('.ba-info-button[data-ba-tooltip]');
    if(!button||event.pointerType==='touch') return;
    if(!button.contains(event.relatedTarget)&&pinnedTooltip!==button&&document.activeElement!==button) hideTooltip();
  });
  root.addEventListener('focusin',event=>{
    const button=event.target.closest('.ba-info-button[data-ba-tooltip]');
    if(button) positionTooltip(button);
  });
  root.addEventListener('focusout',event=>{
    if(event.target.closest('.ba-info-button[data-ba-tooltip]')) hideTooltip();
  });
  root.addEventListener('click',event=>{
    const button=event.target.closest('.ba-info-button[data-ba-tooltip]');
    if(!button) return;
    event.preventDefault();
    const wasPinned=pinnedTooltip===button;
    hideTooltip();
    if(!wasPinned){
      positionTooltip(button);
      pinnedTooltip=button;
    }
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('.ba-info-button[data-ba-tooltip]')) hideTooltip();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape') hideTooltip();
  });
  matrix?.addEventListener('pointerover',syncRsColumnHoverFromPointer);
  matrix?.addEventListener('pointerleave',()=>{
    paintRsColumn(null);
  });

  const onViewportChange=()=>{
    hideTooltip();
    syncFixedRsHeader();
  };

  window.addEventListener('scroll',onViewportChange,{passive:true});
  window.addEventListener('resize',onViewportChange,{passive:true});
  matrixScroll?.addEventListener('scroll',syncFixedRsHeader,{passive:true});

  document.addEventListener('app:viewchange',event=>{
    hideTooltip();
    if(event.detail?.view==='business'){
      requestAnimationFrame(syncFixedRsHeader);
    }else{
      hideFixedRsHeader();
    }
  });

  renderAll();

  window.BusinessAnalysisUI=Object.freeze({
    getState:()=>({
      rsStep:RS_STEP,
      settings:{...state.settings,laborShifts:state.settings.laborShifts.map(item=>({...item}))},
      upgradeItems:state.upgradeItems.map(item=>({...item}))
    }),
    render:renderAll,
    reset:resetAll
  });
})();
