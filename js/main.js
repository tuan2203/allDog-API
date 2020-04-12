let listAllDogURL = 'https://dog.ceo/api/breeds/list/all';

const fromAPI = (URL) => fetch(URL).then(res => res.json());
const coverToObject = (arr, cover) => cover(arr);

fromAPI(listAllDogURL)
  .then(data => {

    const groupByAlphabetical = () => coverToObject(data.message, Object.keys).sort() //nhom A B C ...
      .reduce((acc, cur) => {

        !acc[cur.charAt(0).toUpperCase()] ? acc[cur.charAt(0).toUpperCase()] = [] : "";
        acc[cur.charAt(0).toUpperCase()].push(cur);

        return acc;
      }, []);

    let counter = 4;
    coverToObject(groupByAlphabetical(), Object.keys)    //lay chu cai A B C....
      .map((item, index) => {

        if (index % counter === 0) {

          let divNodeRow = document.createElement('div');
          divNodeRow.className = `row rowList`;
          document.getElementById('list').appendChild(divNodeRow);
        };
        index !== 0 && index % 4 === 0 ? counter++ : "";

        let divNodeCol1 = document.createElement('div');
        divNodeCol1.className = 'col-sm border listAphabet';

        divNodeCol1.innerHTML = item;
        document.getElementsByClassName('rowList')[counter - 4].appendChild(divNodeCol1);

        let divNodeRow2 = document.createElement('div');
        divNodeRow2.className = 'row';
        divNodeCol1.appendChild(divNodeRow2);

        let divNodeCo2 = document.createElement('div');
        divNodeCo2.className = 'col-sm border-top containName';

        let divNodeCo3 = document.createElement('div');
        divNodeCo3.className = 'col-sm border-top containImage';

        divNodeRow2.appendChild(divNodeCo2);
        divNodeRow2.appendChild(divNodeCo3);

      });
    //Add name to DOM 
    let listAphabet = document.getElementsByClassName('listAphabet')
    let containName = document.getElementsByClassName('containName');
    // console.log(groupByAlphabetical()[listAphabet[0].textContent.charAt(0)]);

    const allDogName = i => {

      let selectName = groupByAlphabetical()[listAphabet[i].textContent.charAt(0)];
      selectName.map(item => {
        let paragraph = document.createElement('p');

        paragraph.addEventListener("mouseover", mouseOver);
        paragraph.addEventListener("mouseout", mouseOut);

        paragraph.textContent = item ? item.charAt(0).toUpperCase() + item.slice(1) : "";
        containName[i].appendChild(paragraph)
      })
    }

    //Add image to DOM
    let containImage = document.getElementsByClassName('containImage');
    const getImageRandom = i => {

      let selectImage = groupByAlphabetical()[listAphabet[i].textContent.charAt(0)];
      let numRandom = Math.floor(Math.random() * selectImage.length);
      let fetchPromise = fetch(`https://dog.ceo/api/breed/${selectImage[numRandom]}/images/random`);

      fetchPromise.then(response => response.json())
        .then(dataImage => {

          let img = document.createElement('img');
          img.src = Object.values(dataImage)[0];
          img.className = 'img img-thumbnail';
          containImage[i].appendChild(img);
        });
    }

    let i = -1;
    while (i++ < containName.length - 1) {

      allDogName(i); //thêm tên các giống dog
      getImageRandom(i)    //thêm ảnh các giống dog và chạy random mỗi khi load
    }

    function mouseOver() {
      this.style.color = 'brown';
      this.style.cursor ='pointer'
      this.style.fontSize = '19px';  
      this.parentNode.style.overflowY = "scroll";
    }
   

    function mouseOut() {
      this.style.color = 'black';
      this.style.fontSize = '16px';
      this.parentNode.style.overflowY = " hidden";
    }

   
  });










