'use strict';
{
  const btn = document.querySelector('button'); 
  const outArea = document.getElementById('outArea');
  const familyAges = [
    {
    'relation': '父親',
    'age':''
    },
    {
    'relation': '母親',
    'age':''
    },
    {
    'relation': '子供',
    'age':''
    },
  ];

  const createAgeSection = (year, month, date) => {

    const birthDate = new Date(year, month - 1, date);

    const inputYear = birthDate.getFullYear().toString().padStart(4, '0');
    const inputMonth = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const inputDate = birthDate.getDate().toString().padStart(2, '0');
  
    const today = new Date();
    const currentYear = today.getFullYear().toString().padStart(4, '0');
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const currentDate = today.getDate().toString().padStart(2, '0');

    const age = Math.floor((Number(currentYear + currentMonth + currentDate) - Number(inputYear + inputMonth + inputDate)) / 10000);
    return age;
  };


  btn.addEventListener('click', () => {
    const fatherYear = Number(document.getElementById('fatherYear').value);
    const fatherMonth = Number(document.getElementById('fatherMonth').value);
    const fatherDate = Number(document.getElementById('fatherDate').value);
    familyAges[0].age = createAgeSection(fatherYear, fatherMonth, fatherDate);

    const motherYear = Number(document.getElementById('motherYear').value);
    const motherMonth = Number(document.getElementById('motherMonth').value);
    const motherDate = Number(document.getElementById('motherDate').value);
    familyAges[1].age = createAgeSection(motherYear, motherMonth, motherDate);
    
    const childYear = Number(document.getElementById('childYear').value);
    const childMonth = Number(document.getElementById('childMonth').value);
    const childDate = Number(document.getElementById('childDate').value);
    familyAges[2].age = createAgeSection(childYear, childMonth, childDate);

    for(let i = 0; i < familyAges.length; i++) {
      const p = document.createElement('p');
      p.textContent = `${familyAges[i].relation}の年齢は${familyAges[i].age}歳です。`;
      outArea.appendChild(p);
    }
  });
}