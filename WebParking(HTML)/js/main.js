(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 15000,
        margin: 45,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

var listCustomer = [];
var firebaseConfig = {
    apiKey: "AIzaSyCZbOLUeJ7SrG1RIXNn5rJF3AMuSb-ubsM",
    authDomain: "fir-js-a0ffd.firebaseapp.com",
    databaseURL: "https://fir-js-a0ffd-default-rtdb.firebaseio.com",
    projectId: "fir-js-a0ffd",
    storageBucket: "fir-js-a0ffd.appspot.com",
    messagingSenderId: "431516565439",
    appId: "1:431516565439:web:0f442709b728d8856fab0a",
    measurementId: "G-376VVRGMHK"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database()

window.onload = async function () {
    console.log("Now");
    await CheckToken();
    var CustomerList = [];
    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(20).once("value");

    snapshot.forEach((child) => {

        if (child.key == "listCustomer") {

            child.forEach(childSnapshot => {
                CustomerList.push(childSnapshot.val());
            });
        }        
    });

    console.log(CustomerList);

    var idUser = localStorage.getItem("idUser");
    if(!isNullOrEmpty(idUser)){
        CustomerList.forEach(element => {
            if(element.Id == idUser){
                document.getElementById("profileLink").style.display = "flex";
                document.getElementById("orderLink").style.display = "flex";
                document.getElementById("LoginLink").style.display = "none";
                document.getElementById("LogOutLink").style.display = "flex";
            }
        });
    }else{
        document.getElementById("profileLink").style.display = "none";
        document.getElementById("orderLink").style.display = "none";
        document.getElementById("LoginLink").style.display = "flex";
        document.getElementById("LogOutLink").style.display = "none";
    }
}

function isNullOrEmpty(str) {
    return !str || str.length === 0;
}

