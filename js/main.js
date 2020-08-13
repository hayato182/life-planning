'use strict';
{
  // DOMの管理
  let yearBox = document.getElementsByClassName('year');
  let monthBox = document.getElementsByClassName('month');
  let dateBox = document.getElementsByClassName('date');
  yearBox = Array.from(yearBox);
  monthBox = Array.from(monthBox);
  dateBox = Array.from(dateBox);
  const addChild = document.getElementById('addChild');
  const signUp = document.getElementById('signUp');
  const inputForm = document.getElementById('inputForm');

  // 子供の人数カウント
  let childNumber = 0;

  // 日付データ
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;
  
  // 閏年チェッカー関数
  const isLeapYear = year => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
  const countDatesOfFeb = year => isLeapYear(year) ? 29 : 28;

  // 月ごとの最終日を配列化
  let datesOfYear= [31,countDatesOfFeb(thisYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // オプション作成関数
  const createOption = (id, key, startNum, endNum, current) => {
    const selectDom = document.getElementsByClassName(id);
    let option;
    let optionDom = '';
    for (let i = startNum; i <= endNum; i++) {
      if (i === current) {
        option = '<option value="' + i + '" selected>' + i + '</option>';
      } else {
        option = '<option value="' + i + '">' + i + '</option>';
      }
      optionDom += option;
    }
    selectDom[key].insertAdjacentHTML('beforeend', optionDom);
  }

  // 年毎、月毎で日数を変更する関数
  const optionReload = () =>{
    for(let i = 0; i < yearBox.length; i++){
      monthBox[i].addEventListener('change', (e) => {
        dateBox[i].innerHTML = '';
        const selectedMonth = e.target.value;
        createOption('date', i, 1, datesOfYear[selectedMonth - 1], 1);
      });
      yearBox[i].addEventListener('change', e => {
        monthBox[i].innerHTML = '';
        dateBox[i].innerHTML = '';
        const updatedYear = e.target.value;
        datesOfYear = [31,countDatesOfFeb(updatedYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        createOption('month', i, 1, 12, 1);
        createOption('date', i, 1, datesOfYear[0], 1);
      });
    }
  }

  // 「子供を追加」クリックイベント
  addChild.addEventListener('click', () => {
    const addP = document.createElement('p');//pを作成
    childNumber++;//子供人数カウントを更新
    addP.textContent = `${childNumber + 1}人目の子供の生年月日`;//テキストを追加
    // selectを作成
    const addYear = document.createElement('select');
    const addMonth = document.createElement('select');
    const addDate = document.createElement('select');
    // 各クラスを追加
    addYear.classList.add('year');
    addMonth.classList.add('month');
    addDate.classList.add('date');
    // 各配列にseletctを追加する
    yearBox.push(addYear);
    monthBox.push(addMonth);
    dateBox.push(addDate);
    // div.inputFormにappendChild
    inputForm.appendChild(addP);
    inputForm.appendChild(addYear);
    inputForm.appendChild(addMonth);
    inputForm.appendChild(addDate);
    // オプション作成関数を実行
    createOption('year', childNumber + 2, 1900, thisYear, thisYear);
    createOption('month',childNumber + 2,  1, 12, 1);
    createOption('date',childNumber + 2,  1, datesOfYear[thisMonth - 1], 1);
    // 日数変更関数を実行し追加分にも反映
    optionReload();
  })

  // ページ表示時(ファーストビュー)の日数変更関数
  optionReload();

    // ページ表示時(ファーストビュー)のオプション作成関数を実行
  for(let i = 0; i < yearBox.length; i++) {
    if(i < 2){
      createOption('year', i, 1900, thisYear, 1990);
    }else{
      createOption('year', i, 1900, thisYear, thisYear);
    }
    createOption('month',i,  1, 12, 1);
    createOption('date',i,  1, datesOfYear[thisMonth - 1], 1);
  }

}