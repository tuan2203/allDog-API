let listAllDogURL = 'https://dog.ceo/api/breeds/list/all';
let dogImagesURL = 'https://dog.ceo/api/breed/affenpinscher/images/random';

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

        let divNodeCol = document.createElement('div');
        divNodeCol.className = 'col-sm border listAphabet';
        divNodeCol.id = `listAphabet${index}`
        divNodeCol.innerHTML = item;
        document.getElementsByClassName('rowList')[counter - 4].appendChild(divNodeCol);

        let divNodeRow2 = document.createElement('div');
        divNodeRow2.className = 'row '
        divNodeCol.appendChild(divNodeRow2);

        let divNodeCo2 = document.createElement('div');
        divNodeCo2.className = 'col-sm border containName';
        
        let divNodeCo3 = document.createElement('div');
        divNodeCo3.className = 'col-sm border containImage';
        divNodeCo3.innerHTML = "image";

        divNodeRow2.appendChild(divNodeCo2);
        divNodeRow2.appendChild(divNodeCo3);
      });
    let listAphabet = document.getElementsByClassName('listAphabet')
    let containName = document.getElementsByClassName('containName');

    // console.log(groupByAlphabetical()[listAphabet[0].textContent.charAt(0)]);

    const allDogName = (arr, element1, element2, i) => {

      arr[element1[i].textContent.charAt(0)].map(item => {
        let paragraph = document.createElement('p');
        paragraph.textContent = item;
        element2[i].appendChild(paragraph)
      })

    }

    let i = -1;
    while (i++ < containName.length - 1) {
      allDogName(groupByAlphabetical(), listAphabet, containName, i)
    }
















  });





  // fromAPI(dogImagesURL)
  // .then(dataDog =>{

  //   console.log(dataDog);

  // })