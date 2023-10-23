function genRandomLink2()
{
    var comicID = [723,913,1052,1082,1194,1194,1388,1449,1611,1829,1874,1904,1991,2013,2058,2179,2187,2219,2242,2251,2307,2308,2325,2344,2411,2412,2466,2501,2616,2752,2760,2803,254,256,618,735,1079,1093,1159,1256,1294,1405,1472,1608,1611,1714,1732,1752,1895,1920,2004,2013,2179,2230,2261,2308,2344,2362,2466,2695,2754,2765]
    randIdx = Math.floor(Math.random() * comicID.length);
    console.log(comicID[randIdx])
    fetch ("../allComic.json")
    .then(response  => response.json())
    .then(response => {
    console.log(response)
    document.querySelector("#xkcdComic").setAttribute("src",response[comicID[randIdx]])
    })
}