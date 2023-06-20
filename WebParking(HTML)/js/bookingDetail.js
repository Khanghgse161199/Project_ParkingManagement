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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
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
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

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
var listCusTomer = [];
var ParkingLotList = [];
var ParkingSubList = [];
var ParkingSlotList = [];
var listRating = [];
var listTmpRatingFilter = [];
window.onload = async function () {
    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(10).once("value");

    snapshot.forEach((child) => {
        if (child.key == "listCustomer") {

            child.forEach(childSnapshot => {
                listCusTomer.push(childSnapshot.val());
            });
        }
        if (child.key == "ListParkingLot") {

            child.forEach(childSnapshot => {
                ParkingLotList.push(childSnapshot.val());
            });
        }
        if (child.key == "ListParkingSub") {
            child.forEach(childSnapshot => {
                ParkingSubList.push(childSnapshot.val());
            });
        }
        if (child.key == "ListParkingSlot") {
            child.forEach(childSnapshot => {
                ParkingSlotList.push(childSnapshot.val());
            });
        }
        if (child.key == "ListRating") {
            child.forEach(childSnapshot => {
                listRating.push(childSnapshot.val());
            });
        }
    });
    localStorage.setItem("NameFirstItemMenu", ParkingLotList[0].Id);
    document.getElementById("tagParkingLot").innerText = ParkingLotList[0].Name + " - " + ParkingLotList[0].Address;
    document.getElementById("MapParkingLot").src = ParkingLotList[0].LocationCode;
    console.log(ParkingSlotList);

    var count = 0;
    ParkingSubList.forEach(element => {
        if (element.IdParkingLot == ParkingLotList[0].Id) {
            var idSlotDiv = "slotOfSub" + JSON.stringify(count);
            var percentDiv = "percentStage" + JSON.stringify(count);
            document.getElementById("subOfLot").innerHTML += "<div class='skills_content skills_close' id='clickSubParking'><div class='skills_header'><div><h1 class='skills_title' id='nameParkingSub'>" + element.Name + "</h1><div class='skills_bar'style='background-color: lightblue;'><span class='skills_percentage percent_slot' id='" + percentDiv + "'></span></div></div><i class='uil uil-angle-down skills_arrow' id='iconArrow'></i></div> <div id='" + idSlotDiv + "'></div></div>";
            var idSub = element.Id;
            var num = 0
            ParkingSlotList.forEach(item => {
                if (item.IdParkingSub == idSub && item.status == 0 || item.status == 1) {
                    console.log(item.Name);
                    document.getElementById(idSlotDiv).innerHTML += "<div class='skills_container container grid skills_list grid'  style='padding: 0 0;'><div class='skills_data'><div class='skills_titles'><div><div class='container-fluid'><div class='row'><div class='col-lg-10' style='padding: 0 0;'><table><tbody><tr><td><h5>ID : </h5></td><td><h5 id='idSlot'> " + item.Id + "</h5></td></tr><tr><td><p style='margin: 0 0 10px;'>Name :</p></td><td><p style='margin: 0 0 10px;' id='nameSlot'>" + item.Name + "</p></td></tr><tr><td><p style='margin: 0 0 10px;'>Acrea :</p></td><td><p style='margin: 0 0 10px;'><span id='acreaSlot'>" + item.Acreage + "</span><span>m²</span></p></td></tr><tr><td><p style='padding-bottom: 85%;'>Price :</p></td><td><table><tbody><tr><td><p>Daytime :</p></td><td><p><span id='priceDaytimeSlot'>" + item.PriceDaytime + "$</span> <span id='onlineText'>(Online <i class='bx bx-trending-up'></i> <span id='priceOnlineDaytimeSlot'>" + JSON.stringify(parseInt(item.PriceDaytime) + 3) + "$</span> )</span></p></td></tr><tr><td><p>Overnight :</p></td><td><p><span id='priceOvernightSlot'>" + item.PriceOverNight + "$</span> <span id='onlineText'>(Online <i class='bx bx-trending-up'></i> <span id='priceOnlineOvernightSlot'>" + JSON.stringify(parseInt(item.PriceOverNight) + 3) + "$</span></span>)</p></td></tr></tbody></table></td></tr></tbody></table></div><div class='col-lg-2' style='padding: 0 0;'><div id='btnBook'><button onclick='bookingPage(" + JSON.stringify(item.Id) + ")' class='btn btn-dark px-4'>Book</button></div></div></div></div><hr></div></div></div></div>";
                    num++;
                }
            });
            var newWidth = ((num / element.Ammount).toFixed(2)) * 100;
            console.log(JSON.stringify(newWidth) + "%");
            if (newWidth > 0) {
                document.getElementById(percentDiv).style.width = JSON.stringify(newWidth) + "%";
                document.getElementById(percentDiv).style.backgroundColor = "#2878EB"
                console.log(percentDiv);
            } else {
                document.getElementById(percentDiv).style.width = "0%";
                document.getElementById(percentDiv).style.backgroundColor = "#2878EB"
            }
            count++;
        }
    });

    const skillsContent = document.getElementsByClassName('skills_content'),
        skillsHeader = document.querySelectorAll('.skills_header')

    function toggleSkills() {
        let itemClass = this.parentNode.className

        for (i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills_content skills_close'
        }
        if (itemClass == 'skills_content skills_close') {
            this.parentNode.className = 'skills_content skills_open'
        }
    }

    skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills)
    })
    // show comment
    var star5 = 0;
    var star4 = 0;
    var star3 = 0;
    var star2 = 0;
    var star1 = 0;
    listRating.forEach(element => {
        if (element.IdParkingLot == ParkingLotList[0].Id) {
            listTmpRatingFilter.push(element);
            if (element.Start == 1) star1++;
            else if (element.Start == 2) star2++;
            else if (element.Start == 3) star3++;
            else if (element.Start == 4) star4++;
            else if (element.Start == 5) star5++;
        }
    });
    var percentFiveStar = ((star5 / listTmpRatingFilter.length) * 100);
    document.getElementById("percentRatingFiveStar").style.width = (percentFiveStar + "%");
    document.getElementById("percenFiveStar").innerText = parseInt(percentFiveStar) + "%";

    var percentFourStar = ((star4 / listTmpRatingFilter.length) * 100);
    document.getElementById("percentRatingFourStar").style.width = (percentFourStar + "%");
    document.getElementById("percenFourStar").innerText = parseInt(percentFourStar) + "%";

    var percentThreeStar = ((star3 / listTmpRatingFilter.length) * 100);
    document.getElementById("percentRatingThreeStar").style.width = (percentThreeStar + "%");
    document.getElementById("percenThreeStar").innerText = parseInt(percentThreeStar) + "%";

    var percentTwoStar = ((star2 / listTmpRatingFilter.length) * 100);
    document.getElementById("percentRatingTwoStar").style.width = (percentTwoStar + "%");
    document.getElementById("percenTwoStar").innerText = parseInt(percentTwoStar) + "%";

    var percentOneStar = ((star1 / listTmpRatingFilter.length) * 100);
    document.getElementById("percentRatingOneStar").style.width = (percentOneStar + "%");
    document.getElementById("percenOneStar").innerText = parseInt(percentOneStar) + "%";
    document.getElementById("numberOfRating").innerText = listTmpRatingFilter.length;
    listTmpRatingFilter.sort((a, b) => {
        return b.Start - a.Start;
    });
    listTmpRatingFilter.sort((a, b) => {
        // return new Date(b.time) - new Date(a.time)
        return b.numericalRating - a.numericalRating;
    });
    listTmpRatingFilter.forEach(element => {
        if (element.Start == 5) {
            if (!isNullOrEmpty(element.Content)) {
                var nameOnComment = getNameCustomer(element.IdCustomer);
                document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
            }
        }
    });
}
function getItemParkingLot(IdParkingLot) {
    ParkingLotList.forEach(element => {
        if (element.Id != IdParkingLot) {
            document.getElementById("menuDropdown").innerHTML += "<menuitem ><a id='menuItem' style='text-decoration: none;' onclick='getDataParking(" + JSON.stringify(element.Id) + ")'>" + element.Name + " - " + element.Address + "</a></menuitem>";
        }
    });
}
function myNewFunction(sel) {
    if (sel.options[sel.selectedIndex].text != null) {
        var starChoice = document.getElementById("starSeleted").value;
        listTmpRatingFilter.sort((a, b) => {
            // return new Date(b.time) - new Date(a.time)
            return b.numericalRating - a.numericalRating;
        });
        document.getElementById("divComment").innerHTML = null;
        if(starChoice == 5){
            listTmpRatingFilter.forEach(element => {
                if (element.Start == starChoice) {
                    if (!isNullOrEmpty(element.Content)) {
                        var nameOnComment = getNameCustomer(element.IdCustomer);
                        document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
                    }
                }
            });
        }else if(starChoice == 4){
            listTmpRatingFilter.forEach(element => {
                if (element.Start == starChoice) {
                    if (!isNullOrEmpty(element.Content)) {
                        var nameOnComment = getNameCustomer(element.IdCustomer);
                        document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
                    }
                }
            });
        }else if(starChoice == 3){
            listTmpRatingFilter.forEach(element => {
                if (element.Start == starChoice) {
                    if (!isNullOrEmpty(element.Content)) {
                        var nameOnComment = getNameCustomer(element.IdCustomer);
                        document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
                    }
                }
            });
        }else if(starChoice == 2){
            listTmpRatingFilter.forEach(element => {
                if (element.Start == starChoice) {
                    if (!isNullOrEmpty(element.Content)) {
                        var nameOnComment = getNameCustomer(element.IdCustomer);
                        document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
                    }
                }
            });
        }else if(starChoice == 1){
            listTmpRatingFilter.forEach(element => {
                if (element.Start == starChoice) {
                    if (!isNullOrEmpty(element.Content)) {
                        var nameOnComment = getNameCustomer(element.IdCustomer);
                        document.getElementById("divComment").innerHTML += "<div class='testimonial_content swiper-slide'><div class='testimonial_data'><div class='testimonial_header'><img src='img/avatarComment.png' id='avatarCommnent' alt='' class='testimonial_img'><div style='margin-top: 4px;'><h3 style='margin: 0 0 0;' class='testimonial_name'>" + nameOnComment + "</h3><span class='testimonial_client'>Cutomer</span></div></div><div><p>" + element.DateTime + "</p></div></div><div style='padding-left: 12px;'><i class='bx bxs-star' style='color:rgba(25,54,243,0.99)'></i></div><p style='padding-left: 12px;' class='testimonial_description'>" + element.Content + "</p><hr><br>";
                    }
                }
            });
        }

    }
}
function bookingPage(id) {
    location.replace("bookingFill.html?id=" + id);
}
function getNameCustomer(id) {
    for (var i = 0; i < listCusTomer.length; i++) {
        if (listCusTomer[i].Id == id) {
            return listCusTomer[i].Name;
        }
    }
}
function isNullOrEmpty(str) {
    return !str || str.length === 0;
}