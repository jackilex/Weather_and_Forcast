$(document).ready(function(event){
//This click event is to add cities
$('#add').on('click',function(event){
    event.preventDefault();
    let inputV= $('#input').val();
    $('#addbuttons').children('button').remove()
    let newB= $('<button>');
    let newClass= newB.addClass("btn btn-success btn2");
    let text=newB.text(inputV);
    let valueT=newB.attr('value',inputV);
    $('#addbuttons').append(newB);
    // location = inputV;
    $('.all').empty();
    // buildQueryUrl();
    // getWeather();
    localStorage.setItem(inputV,inputV);
    
    $('#addbuttons').children('button').click(function(){
        $('.all').empty();
        $('#logo').children('img').remove();
        // event.preventDefault();
        // $('.all').empty();
        $('img').attr('src','');
        let thisB=$(this).text();
        location=localStorage.getItem(thisB);
        buildQueryUrl();
        getWeather();
    })


})
//starts cities click event
let location= "";

// setting my key variables and URL inputs
function buildQueryUrl(){
let key=`appid=04a7544cde188fba131a9fa347638501`;
// let location= "austin";
jqueryUrl= "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&"+key;   
}
let m= moment();

//making my promise to get weather data for current day
function getWeather(){
    $.ajax({
        type:"GET",
        url:jqueryUrl
    }).then(function(data){
    console.log(data);    
    let city= data.name;
    let description= data.weather[0].description;
    let temp=data.main.temp;
    let humidity= data.main.humidity;
    let speed= data.wind.speed;
    // let uV= data.main.humidity;
    let icon=data.weather[0].icon;
    let image=$('<img>');
    let pic= image.addClass('pic');
    let imageAtt= image.attr('src','https://openweathermap.org/img/wn/'+icon+'@4x.png');
    
    //show results starts here
    $('#location').text(city);
    $('#logo').append(image);
    $('#info').text(description);
    $('#temp').addClass('fas fa-thermometer-three-quarters ')
    $('#temp').text(temp);
    $('#humidity').addClass(' fas fa-tint ');
    $('#humidity').text(humidity);
    $('#speed').addClass(' fas fa-wind ');
    $('#speed').text(speed);
    $('#date').text(m.format("ddd, Do YYYY"))

    function longi(){
     long1= data.coord.lon;
    //  long.splice(0,1,long1);
    }

    function lati(){
    return lat1= data.coord.lat;
       }

    longi();
    lati();
     
    
    }).then(function getForecast(){

        $.ajax({
            type:"GET",
            url:"https://api.openweathermap.org/data/2.5/onecall?lat="+lat1+"&lon="+long1+"&exclude=hourly,minutely&units=imperial&appid=04a7544cde188fba131a9fa347638501"
        }).then(function(result){
        let uV= result.current.uvi;
        //this line is for the currrent UVI since the first API doesn't provide UVI
        $('#UV').text(uV);
        $('#UV').addClass('fas fa-radiation');
        
        for (let i=1;i<=5;i++){

         //day after forcast
         let date=moment().add(i,'days').format("L");
        let icon= result.daily[i].weather[0].icon;
        let temp= result.daily[i].temp.max;
        let humidity= result.daily[i].humidity;
        let image=$('<img>');
        let imageAtt= image.attr('src','https://openweathermap.org/img/wn/'+icon+'@2x.png')
        
        if (i === 1){
        $('#dat1').text(date);
        $('#logo1').append(image);
        $('#temp1').addClass('fas fa-thermometer-three-quarters ')
        $('#temp1').text(temp);
        $('#humidity1').addClass(' fas fa-tint ');
        $('#humidity1').text(humidity);
        }
        if (i === 2){
        $('#dat2').text(date);
        $('#logo2').append(image);
        $('#temp2').addClass('fas fa-thermometer-three-quarters ')
        $('#temp2').text(temp);
        $('#humidity2').addClass(' fas fa-tint ');
        $('#humidity2').text(humidity);
        }
        if (i === 3){
        $('#dat3').text(date);
        $('#logo3').append(image);
        $('#temp3').addClass('fas fa-thermometer-three-quarters ')
        $('#temp3').text(temp);
        $('#humidity3').addClass(' fas fa-tint ');
        $('#humidity3').text(humidity);
        }
        if (i === 4){
        $('#dat4').text(date);
        $('#logo4').append(image);
        $('#temp4').addClass('fas fa-thermometer-three-quarters ')
        $('#temp4').text(temp);
        $('#humidity4').addClass(' fas fa-tint ');
        $('#humidity4').text(humidity);
        }
        if (i === 5){
        $('#dat5').text(date);
        $('#logo5').append(image);
        $('#temp5').addClass('fas fa-thermometer-three-quarters ')
        $('#temp5').text(temp);
        $('#humidity5').addClass(' fas fa-tint ');
        $('#humidity5').text(humidity);
        }
        
        }

    
        
        console.log(result)
        console.log(result.daily[2].weather[0].icon)
    
        })
    })



}


})

