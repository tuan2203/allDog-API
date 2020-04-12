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

        let divNodeCol = document.createElement('div');
        divNodeCol.className = 'col-sm border listAphabet';
       
        divNodeCol.innerHTML = item;
        document.getElementsByClassName('rowList')[counter - 4].appendChild(divNodeCol);

        let divNodeRow2 = document.createElement('div');
        divNodeRow2.className = 'row';
        divNodeCol.appendChild(divNodeRow2);

        let divNodeCo2 = document.createElement('div');
        divNodeCo2.className = 'col-sm border containName';
        divNodeCo2.id = `containName${index}`

        let divNodeCo3 = document.createElement('div');
        divNodeCo3.className = 'col-sm border containImage';

        divNodeRow2.appendChild(divNodeCo2);
        divNodeRow2.appendChild(divNodeCo3);
      });


     //Add name to DOM 
    let listAphabet = document.getElementsByClassName('listAphabet')
    let containName = document.getElementsByClassName('containName');
    // console.log(groupByAlphabetical()[listAphabet[0].textContent.charAt(0)]);

    const allDogName = (arr, element1, element2, i) => {

      arr[element1[i].textContent.charAt(0)].map(item => {
        let paragraph = document.createElement('p');
        paragraph.textContent = item ? item.charAt(0).toUpperCase() + item.slice(1) :"";
        element2[i].appendChild(paragraph)
      })
    }

//Add image to DOM
let dogImagesURL = 'https://dog.ceo/api/breed/affenpinscher/images/random'; 
    listAphabet = document.getElementsByClassName('listAphabet');
    let containImage = document.getElementsByClassName('containImage');
//console.log($('#containName0').text().split(' '));

function getImageRandom(element_1,element_2,i){

  let selectImage = groupByAlphabetical()[element_1[i].textContent.charAt(0)];
  let numRandom = Math.floor(Math.random() * selectImage.length);
  let fetchPromise = fetch(`https://dog.ceo/api/breed/${selectImage[numRandom]}/images/random`);
     
 fetchPromise.then(response => response.json())
 .then(dataImage =>{
    
   let img = document.createElement('img')
       img.src = Object.values(dataImage)[0];
       img.className ='img img-thumbnail'
       element_2[i].appendChild(img) 
 })
}
let i = -1;
while (i++ < containName.length - 1) {

  allDogName(groupByAlphabetical(), listAphabet, containName, i); //thêm tên các giống dog
  getImageRandom(listAphabet,containImage,i)    //thêm ảnh các giống dog và chạy random mỗi khi load
}

  });

 // console.log($('#containName0').text());
  
   


  
  
  
  
  
  
