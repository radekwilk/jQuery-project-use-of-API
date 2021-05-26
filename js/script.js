$(document).ready(function () {

    // Closing sidebar menu
    $('#close-sidebar').on('click', ()=> {
        $('#mobile-sidebar').fadeOut(600)
    });

    // Closing sidebar menu by clicking on sidebar itself
    $('#mobile-sidebar').on('click', ()=> {
        $('#mobile-sidebar').fadeOut(600)
    });
    
    // Showing sidebar menu
    $('.hamburger-menu').on('click', ()=> {
        $('#mobile-sidebar').fadeIn(600)
    });

  // laptop loading
  const $contentSectionTop = $('.projects-container').offset();
  const $contentSection = $('.projects-container');
  

  $(window).on('scroll', ()=> {

    if(window.pageYOffset + window.innerHeight >= $contentSectionTop.top + ($contentSection.outerHeight() / 2)) {
        $contentSection.addClass('change');
    }
  }); 
  
  
//   Move projects-info div to the top of the screen
    const $infoBtn = $('.info-btn');
    const orgBtnTxt = $infoBtn.text();
    const $infoContainer = $('.projects-info');
    const $projectsLinks = $('.projects-links');


    $infoBtn.on('click', function(e) {
        e.preventDefault()

        $infoContainer.toggleClass('active')

        if($infoBtn.text() === orgBtnTxt) {
            $infoBtn.text('Click to hide')
        } else {
            $infoBtn.text(orgBtnTxt)
        }
          
          setTimeout(() => {
              $projectsLinks.fadeToggle(1500)
          }, 1000);
          
    });   


    // Getting info for API projects
    let apiSelect; // variable to hold which API we are using. Need to select correct random number
    let jsonData; // variable to hold json data received from GET request 
    let imgUrl; // variable to hold  image URL from GET request
     //let rndNumber; variable to hold random number
    const catsArrNum = [100, 101, 102, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304,304, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426, 429, 431, 444, 450, 451, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 599];

    // set values for fields in Star Wars section
    const $starWarsBtn = $('.star-wars-btn');
    const $starWarsName = $('#name-sw');
    const $starWarsGender = $('#gender-sw');
    const $starWarsSpecies = $('#species-sw');
    const $starWarsHair = $('#hair-sw');
    const $starWarsSkin = $('#skin-sw');
    const $starWarsImage = $('#img-sw');
    const $starWarsImgWrapper = $('#img-wrapper-sw')

    $starWarsBtn.on('click', ()=> {
        let myRndNum = rndNumber('starwars');
        $starWarsImgWrapper.fadeIn(1000);
        
        $.get(`https://akabab.github.io/starwars-api/api/id/${myRndNum}.json`, function(data) {
            injectData($starWarsName, data['name']);
            injectData($starWarsGender, data['gender']);
            injectData($starWarsSpecies, data['species']);
            injectData($starWarsHair, data['hairColor']);
            injectData($starWarsSkin, data['skinColor']);
            imgUrl = data['image'];
            changeImgSrc($starWarsImage, imgUrl, data['name']);
        })
    })


    // set values for fields in Rick and Morty section
    const $rickMortyBtn = $('.rick-morty-btn');
    const $rickMortyName = $('#name-rm');
    const $rickMortyGender = $('#gender-rm');
    const $rickMortySpecies = $('#species-rm');
    const $rickMortyType = $('#type-rm');
    const $rickMortyStatus = $('#status-rm');
    const $rickMortyImage = $('#img-rm');
    const $rickMortyImgWrapper = $('#img-wrapper-rm')

    $rickMortyBtn.on('click', ()=> {
        let myRndNum = rndNumber('rickandmorty');
        $rickMortyImgWrapper.fadeIn(1000);
        
        $.get(`https://rickandmortyapi.com/api/character/${myRndNum}`, function(data) {
            injectData($rickMortyName, data['name']);
            injectData($rickMortyGender, data['gender']);
            injectData($rickMortySpecies, data['species']);
            injectData($rickMortyType, data['type']);
            injectData($rickMortyStatus, data['status']);
            imgUrl = data['image'];
            changeImgSrc($rickMortyImage, imgUrl, data['name']);
        })
    })

    // set values for fields in Dogs API section
    const $dogsSelectBreed = $('#select-breed');
    const $dogsName = $('#name-dog');
    const $dogsBredFor = $('#bred_for-dog');
    const $dogsBreedGroup = $('#breed_group-dog');
    const $dogsLifeSpan = $('#life_span-dog');
    const $dogsTemperament = $('#temperament-dog');
    const $dogsImage = $('#img-dog');
    const $dogsImgWrapper = $('#img-wrapper-dog')

    
    // When we select dog breed, getDogByBreed function will run and will get and then populate all the information
    $dogsSelectBreed.on('change',function() {
      let id = $(this).children(":selected").attr("id");
      
      $dogsImgWrapper.fadeIn(1000)
      getDogByBreed(id)
    });
        

// Function generating random number based on used API
    rndNumber = (option)=> {
        let rndNum = 1;
        //   if Star Wars API is clicked 1-88
        if(option === 'starwars') {
            rndNum = Math.ceil(Math.random() * 88);
        //   if Rick and Morty API random number 1-671
        } else if(option === 'rickandmorty') {
            rndNum = Math.ceil(Math.random() * 671);
        //  if Cats API button clicked, get  number from 0 to length of catsArrNum 
        } else if(option === 'cats') {
            rndNum = Math.floor(Math.random() * (catsArrNum.length))
        }
        return rndNum;
    }

// Function allocating data into selected field
function injectData(field, data) {
    setTimeout(() => {
        field.val(data);
    }, 1500);
    field.val("Loading...");
}

// Function src of img element
function changeImgSrc(imgID, url, altVal) {
    setTimeout(() => {
        imgID.attr({
            src: url,
            alt: `Picture of ${altVal}`
            });
    }, 1500);
    imgID.attr("src", '../img/loader.gif');
}

// Load all the Breeds
function getBreeds() {
  $.get('https://api.thedogapi.com/v1/breeds', function(data) {
    populateBreedsSelect(data)
  });
}

// Put the breeds in the Select control
function populateBreedsSelect(breeds) {
  $dogsSelectBreed.empty().append(function() {
    let output = '';
    $.each(breeds, function(key, value) {
      output += `<option id=${value.id}>${value.name}</option>`;
    });
    return output;
  });
}

// function for get data from thedogapi.com and populate it
function getDogByBreed(breed_id) {
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  $.get(`https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=${breed_id}`, function(data) {

    if (data.length == 0) {
      // if there are no images returned
      $dogsImage.attr('alt', 'No Image for that breed');
    } else {
      //else display the breed image and data
      changeImgSrc($dogsImage, data[0].url, data[0].breeds[0].name)
    //   displayBreed(data[0])
    }
    //    populate data based of selected breed
       injectData($dogsName, data[0].breeds[0].name);
       injectData($dogsBredFor, data[0].breeds[0].bred_for);
       injectData($dogsBreedGroup, data[0].breeds[0].breed_group);
       injectData($dogsLifeSpan, data[0].breeds[0].life_span);
       injectData($dogsTemperament, data[0].breeds[0].temperament);
  });
}

// Populate the select list by calling getBreeds function
getBreeds();


   // Set values for Cats API
    const $catsBtn = $('.cats-btn');
    const $catsImage = $('#img-cat');
    const $catsImgWrapper = $('#img-wrapper-cat');
    const catsApiUrl = 'https://http.cat/';

    $catsBtn.on('click', ()=> {

        let myRndNum = rndNumber('cats')
        $catsImgWrapper.fadeIn(1000)

        changeImgSrc($catsImage, `${catsApiUrl}${catsArrNum[myRndNum]}`, `Image of random car for status number ${catsArrNum[myRndNum]}` );
    })

    const $jokeBtn = $('.joke-btn');

    $jokeBtn.on('click', ()=> {
        $.get('https://icanhazdadjoke.com', function(data) {
        console.log(data)
      });
    })


    // Contack form - fields in focus
    const $contactSection = $('#contact');
    const $inputField = $('.contact-input-field');
    const $contactBtn = $('.contact-btn');
    const $contactName = $('#contact-name');
    const $contactEmail = $('#contact-email');
    const $contactMessage = $('#contact-message');
    const $contactAlert = $('#contact-alert');
    const $contactAlertField = $('#contact-alert-field');
    const $contactClose = $('.contact-close');

        $inputField.each(function() {
            $(this).on('focus', () => {
            $(this).next().css({
                transform: 'translateY(-3rem)',
                fontSize: '1.2rem',
                opacity: 0.5
               })
            $(this).css('border-bottom-style', 'solid')
            })

            $(this).on('blur',() => {
            if(!$(this).val()) {
                $(this).next().css({
                    transform: 'translateY(0)',
                    fontSize: '1.6rem'
                })
                $(this).css('border-bottom-style', 'dashed')
            } else {
                $(this).next().css({
                    transform: 'translateY(-3rem)',
                    fontSize: '1.2rem',
                    opacity: 0.5
                })
                $(this).css('border-bottom-style', 'solid')
               }
            })
        })

    // use POST method when Submit buttons is clicked
    $contactBtn.on('click', (e)=> {
        e.preventDefault;

        // Get form values
        const formName = $contactName.val();
        const formEmail = $contactEmail.val();
        const formMessage = $contactMessage.val();

        // This if statement will check if all fields are filled and e-mail address is correct

        if (formEmail.indexOf('@') === -1) {
            $contactAlert.fadeIn(1000, ()=> {
                $contactAlertField.text('Incorrect e-mail address. Please try it again!')
            })
        } else if(formName == "") {
            $contactAlert.fadeIn(1000, ()=> {
                $contactAlertField.text('Could you please enter your name?')
            })
        } else if (formMessage == "") {
            $contactAlert.fadeIn(1000, ()=> {
                $contactAlertField.text('Could you please enter your message')
            })
        } else {
            $.post(
            'https://httpbin.org/post', 
                {"name": formName,
                "email": formEmail,
                "message": formMessage
                },
                function(data) {
                    console.log("POST request was complete with this data: ")
                    console.log('Name:', data['form']['name'])
                    console.log('Email:', data['form']['email'])
                    console.log('Message:', data['form']['message'])
                    // Once it is sent, inform the user
                    $contactAlert.fadeIn(1000, ()=> {
                       $contactAlertField.text(`${data['form']['name']}, thank you for sending your message :-)`)

                       // And then clear the fields
                    $contactName.val('');
                    $contactEmail.val('');
                    $contactMessage.val('');
                    })
                }
            )
        }       

    })

    // close alert once close button is closed
    $contactClose.on('click', ()=> {
        $contactAlert.fadeOut(1000)
    })

    // close alert once close anywhere on alert
    $contactAlert.on('click',function() {
        $(this).fadeOut(1000);
    })



});



