
let listAllDogURL = 'https://dog.ceo/api/breeds/list/all';

const fromAPI = (URL) => fetch(URL).then(res => res.json());

fromAPI(listAllDogURL)
  .then(data => {
    const allDogName = [];
    const alphabet = [];
    const groupName = [];
    Object.keys(data.message).map(item => {

      allDogName.push(item)
      !alphabet.includes(item.charAt(0)) ? alphabet.push(item.charAt(0)) : '';
    });
    const createDOM = counter => {
      counter === undefined ? counter = 3 : '';
      alphabet.map((item, index) => {

        if (index % 3 === 0) {
          let divNodeRow1 = document.createElement('div');
          divNodeRow1.className = 'row alphabet';
          document.getElementById('listAlphabet').appendChild(divNodeRow1)
          index > 0 && index % 3 === 0 ? counter++ : "";
        }

        let divNodeCol1 = document.createElement('div');
        divNodeCol1.className = 'col border pl-4';
        divNodeCol1.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        document.getElementsByClassName('alphabet')[counter - 3].appendChild(divNodeCol1)

        let divNodeRow2 = document.createElement('div');
        divNodeRow2.className = 'row containNameImage ';
        divNodeCol1.appendChild(divNodeRow2);

        let divNodeCo2 = document.createElement('div');
        divNodeCo2.className = 'col-sm border-top border-right containName';

        let divNodeCo3 = document.createElement('div');
        divNodeCo3.className = 'col-sm border-top containImage';

        divNodeRow2.appendChild(divNodeCo2);
        divNodeRow2.appendChild(divNodeCo3);
      });
    }
    createDOM();
    ///Add name to DOM 
    let containName = document.getElementsByClassName('containName');

    const addDogName = i => {

      groupName[i].map(item => {
        let paragraph = document.createElement('p')
        paragraph.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        paragraph.className = 'paragraph'
        containName[i].appendChild(paragraph);
      })
    }
    // //Add image to DOM
    let containImage = document.getElementsByClassName('containImage');
    const getImageRandom = i => {

      let numRandom = Math.floor(Math.random() * groupName[i].length);
      let fetchPromise = fetch(`https://dog.ceo/api/breed/${groupName[i][numRandom]}/images/random`);

      fetchPromise.then(response => response.json())
        .then(dataImage => {

          let img = document.createElement('img');
          img.src = Object.values(dataImage)[0];
          img.title = Object.values(dataImage)[0].slice(30).split('/')[0];
          img.className = 'img p-0 m-auto img-fluid mh-100 ';
          containImage[i].appendChild(img);
        });
    };

    function isGroupName(i) {
      return groupName.push(allDogName.reduce((acc, cur) => {
        cur.charAt(0) === alphabet[i] ? acc.push(cur) : "";
        return acc;
      }, []));
    }
    let i = -1;
    while (i++ < alphabet.length - 1) {

      isGroupName(i);
      addDogName(i); // thêm tên vào DOM
      getImageRandom(i) //Thêm ảnh vào DOM
    }
    $('.paragraph').mouseover(function () {

      $(this).css({
        'color': 'brown',
        'cursor': 'pointer',
        'font-size': '19px'
      });
      $(this).parent().children().length > 6 ? $(this).parent().css({ 'overflow-y': "scroll" }) : '';
    }).mouseout(function () {
      $(this).css({

        'color': 'black',
        'font-size': '16px'
      });
      $(this).parent().css({
        'overflow-y': "hidden"
      });
    });

    $('.paragraph').click(function () { //thay doi anh img

      let selectImage = fetch(`https://dog.ceo/api/breed/${$(this).text().toLowerCase()}/images/random`);
      selectImage.then(res => res.json())
        .then(dataSelectImage => {

          $(this).parent().parent().find('.img').attr('src', Object.values(dataSelectImage)[0]); // thay đổi ảnh mới
          $(this).parent().parent().find('.img').attr('title', Object.values(dataSelectImage)[0].slice(30).split('/')[0]); // thay đổi title cho image
        });
    });


  });





