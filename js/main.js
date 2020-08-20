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
  const d_none_first = document.getElementById('d_none_first');

  // 子供の人数カウント
  let childNumber = 1;

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
    if(childNumber === 10){
      alert('登録できる子供の数は10人までです。')
      return;
    }
    const addP = document.createElement('p');//pを作成
    childNumber++;//子供人数カウントを更新
    addP.textContent = `${childNumber}人目の子供の生年月日`;//テキストを追加
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
    createOption('year', childNumber + 1, 1900, 2040, thisYear);
    createOption('month',childNumber + 1,  1, 12, 1);
    createOption('date',childNumber + 1,  1, datesOfYear[thisMonth - 1], 1);
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
      createOption('year', i, 1900, 2040, thisYear);
    }
    createOption('month',i,  1, 12, 1);
    createOption('date',i,  1, datesOfYear[thisMonth - 1], 1);
  }

  const createrParentsOption = () => {
    for (let i = 0; i < 121; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i}歳`;
      if (i === 30) {
        option.selected = true;
      }
      when.appendChild(option);
    } 
  }

  const signUp = document.getElementById('signUp');
  const inputForm = document.getElementById('inputForm');
  const who = document.getElementById('who');
  const when = document.getElementById('when');
  const submit = document.getElementById('submit');
  const families = {};
  const familyArray = ['お父さん', 'お母さん' ,'1人目の子供'];


  //「年齢を登録する」を押下
  signUp.addEventListener('click', () => {
    d_none_first.classList.add('active');
    who.innerHTML = '';
    const birthdays = [];
    for (let i = 0; i < yearBox.length; i++){
      birthdays.push(Number(yearBox[i].value + monthBox[i].value.padStart(2, '0') + dateBox[i].value.padStart(2, '0')));
    }
    for (let i = 0; i < birthdays.length; i++){
      if (i > 2){
        families[`${i-1}人目の子供`] = birthdays[i];
      }else {
        families[familyArray[i]] = birthdays[i];
      }
    }

    Object.keys(families).forEach(key => {
      const addWho = document.createElement('option');
      addWho.value = key;
      addWho.textContent = key;
      who.appendChild(addWho);
    });
    createrParentsOption();
  });


  who.addEventListener('change', (e) =>{
    if (e.target.value === 'お父さん' || e.target.value === 'お母さん') {
      when.innerHTML = '';
      createrParentsOption();
    } else {
      when.innerHTML = '';
      const milestone = ['幼稚園卒業', '小学校入学', '小学校卒業', '中学校入学', '中学校卒業', '高校入学', '高校卒業', '四年制大学入学' ,'四年制大学卒業']
      for (let i = 0; i < milestone.length; i++) {
        const option = document.createElement('option');
        option.value = milestone[i];
        option.textContent = milestone[i];
        when.appendChild(option);
      }
      for (let i = 0; i < 121; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}歳`;
        when.appendChild(option);
      }
    }
  });

  const addmissionDate = '0401';
  const graduateDate = '0331'; 
  let keyBirthday;
  let lastFourDigits;
  let whoResult;
  let whenResult;
  const result = document.getElementById('result');
  const resultContent = document.getElementById('resultContent');
  const mask = document.getElementById('mask');

  const eventDate = (age, date) => {
    keyBirthday = String(families[whoResult] + (age * 10000));
    lastFourDigits = Number(keyBirthday.substring(4));
    if (lastFourDigits > 331) {
      keyBirthday = Number(keyBirthday);
      keyBirthday = String(Math.floor((keyBirthday + 10000) / 10000));
      keyBirthday = Number(keyBirthday + date);
    }else {
      keyBirthday = String(Math.floor(keyBirthday / 10000));
      keyBirthday = Number(keyBirthday + date);
    }
  };

  submit.addEventListener('click', () => {
    resultContent.innerHTML = '';
    whoResult = who.value;
    whenResult = when.value;
    const axisText = document.createElement('p');
    axisText.textContent = `${whoResult}が${whenResult}の時...`
    resultContent.appendChild(axisText);
    switch(whenResult) {
      case '幼稚園卒業':
        eventDate(6, graduateDate);
        break;
      case '小学校入学':
        eventDate(6, addmissionDate);
        break;
      case '小学校卒業':
        eventDate(12, graduateDate);
        break;
      case '中学校入学':
        eventDate(12, addmissionDate);
        break;
      case '中学校卒業':
        eventDate(15, graduateDate);
        break;
      case '高校入学':
        eventDate(15, addmissionDate);
        break;
      case '高校卒業':
        eventDate(18, graduateDate);
        break;
      case '四年制大学入学':
        eventDate(18, addmissionDate);
        break;
      case '四年制大学卒業':
        eventDate(22, addmissionDate);
        break;
      default:
        keyBirthday = families[whoResult] + (whenResult * 10000)
        break;
    }
    // =20300101
    let newFamilyArray = [];
    Object.keys(families).forEach(key => {
      newFamilyArray.push(key);
    });
    //家族全員がnewFamilyArrayに入った
    newFamilyArray = newFamilyArray.filter(n => n !== whoResult);
    //選択された家族以外がnewFamilyArrayに入った
    for (let i = 0; i < newFamilyArray.length; i++) {
      const ageResult = Math.floor((keyBirthday - families[newFamilyArray[i]])/10000);
      const resultText = document.createElement('p');
      if (ageResult < 0) {
        resultText.textContent = 'まだ生まれていません';
      } else {
        resultText.textContent = `${newFamilyArray[i]}は${ageResult}歳です。`;
      }
      resultContent.appendChild(resultText);
    }
    result.classList.add('active');
    mask.classList.add('active');
  });

  const modalClose = document.getElementById('modalClose');
  modalClose.addEventListener('click', () => {
    result.classList.remove('active');
    mask.classList.remove('active');
  });

  mask.addEventListener('click', () => {
    result.classList.remove('active');
    mask.classList.remove('active');
  });



}