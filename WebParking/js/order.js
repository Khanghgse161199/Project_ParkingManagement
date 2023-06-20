// rating
$(function () {

    $(document).on({
        mouseover: function (event) {
            $(this).find('.far').addClass('star-over');
            $(this).prevAll().find('.far').addClass('star-over');
        },
        mouseleave: function (event) {
            $(this).find('.far').removeClass('star-over');
            $(this).prevAll().find('.far').removeClass('star-over');
        }
    }, '.rate');


    $(document).on('click', '.rate', function () {
        if (!$(this).find('.star').hasClass('rate-active')) {
            $(this).siblings().find('.star').addClass('far').removeClass('fas rate-active');
            $(this).find('.star').addClass('rate-active fas').removeClass('far star-over');
            $(this).prevAll().find('.star').addClass('fas').removeClass('far star-over');
        } else {
            console.log('has');
        }
    });

});


// dropdown
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
var ListRating = [];
var listOrderBooking = [];
var listCustomer = [];
window.onload = async function () {
    
    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(10).once("value");
    snapshot.forEach((child) => {
        if (child.key == "listOrderBooking") {

            child.forEach(childSnapshot => {
                listOrderBooking.push(childSnapshot.val());
            });
        }
        if (child.key == "listCustomer") {

            child.forEach(childSnapshot => {
                listCustomer.push(childSnapshot.val());
            });
        }
        if (child.key == "ListRating") {

            child.forEach(childSnapshot => {
                ListRating.push(childSnapshot.val());
            });
        }
    });

    var userId = localStorage.getItem("idUser");
    listOrderBooking.forEach(element => {
        if(element.IdUser == userId)
        var check = compareDateTime(element.TimeOut);
        if (element.status == 1 && element.IsActive == true && element.IsRating == false) {
            document.getElementById("orderUnconfirm").innerHTML += " <tr><td class='text-center' style='color: black;'>" + element.Id + "</td><td class='text-center' style='color: black;'>" + element.IdSlot + "</td><td class='text-center' style='color: black;'>" + element.NameCutomer + "</td><td class='text-center' style='color: black;'>" + element.LicensePlates + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeCome) + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeOut) + "</td><td class='text-center' style='color: black;'>" + element.Total + "$" + "</td><td class='text-center' style='color: black;'>" + element.IsActive + "</td><td class='text-center' style='text-align: right;'><div class='wrapper'><a onclick='test(" + JSON.stringify(element.Id) + ")' href='#demo-modal'>View</a></div></td></tr>";
        } else if (element.status == 0  && element.IsActive == true && element.IsRating == false) {
            document.getElementById("orderconfirm").innerHTML += " <tr><td class='text-center' style='color: black;'>" + element.Id + "</td><td class='text-center' style='color: black;'>" + element.IdSlot + "</td><td class='text-center' style='color: black;'>" + element.NameCutomer + "</td><td class='text-center' style='color: black;'>" + element.LicensePlates + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeCome) + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeOut) + "</td><td class='text-center' style='color: black;'>" + element.Total + "$" + "</td><td class='text-center' style='color: black;'>" + element.IsActive + "</td><td class='text-center' style='text-align: right;'><div class='wrapper'><a onclick='test(" + JSON.stringify(element.Id) + ")' href='#demo-modal'>View</a></div></td></tr>";
        } else if(element.status == 0 && element.IsActive == false && element.IsRating == true){
            document.getElementById("orderconfirm2").innerHTML += " <tr><td class='text-center' style='color: black;'>" + element.Id + "</td><td class='text-center' style='color: black;'>" + element.IdSlot + "</td><td class='text-center' style='color: black;'>" + element.NameCutomer + "</td><td class='text-center' style='color: black;'>" + element.LicensePlates + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeCome) + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeOut) + "</td><td class='text-center' style='color: black;'>" + element.Total + "$" + "</td><td class='text-center' style='color: black;'>" + element.IsActive + "</td><td class='text-center' style='text-align: right;'><div class='wrapper'><a onclick='test(" + JSON.stringify(element.Id) + ")' href='#demo-modal'>View</a></div></td></tr>";
        }
        else if (element.status == 0 && element.IsActive == false && element.IsRating == false) {
            document.getElementById("orderExpired").innerHTML += " <tr><td class='text-center' style='color: black;'>" + element.Id + "</td><td class='text-center' style='color: black;'>" + element.IdSlot + "</td><td class='text-center' style='color: black;'>" + element.NameCutomer + "</td><td class='text-center' style='color: black;'>" + element.LicensePlates + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeCome) + "</td><td class='text-center' style='color: black;'>" + formatDateTime(element.TimeOut) + "</td><td class='text-center' style='color: black;'>" + element.DateTime + "</td><td class='text-center' style='color: black;'>" + element.Total + "$" + "</td><td class='text-center' style='text-align: right;'><p  id='PLabel'><label id='btnClickEva' class='btn btn--blue' for='modal-2'  onclick='ratingShow(" + JSON.stringify(element.IdSlot) + ',' + JSON.stringify(element.Id) + ")' >EVAL</label></p></td></tr>";
        }
    });
}

var IdLot;
var IdOrder;
function ratingShow(id, idOrder) {
    console.log(id);
    console.log(idOrder);
    var tmp = [] = id.split("-");
    IdLot = tmp[0];
    IdOrder = idOrder
}

function test(id) {
    listOrderBooking.forEach(element => {
        if (element.Id == id && element.status == 1) {
            document.getElementById("idOrder").innerText = element.Id;
            document.getElementById("idSlot").innerText = element.IdSlot;
            document.getElementById("timeCome").innerText = formatDateTime(element.TimeCome);
            document.getElementById("timeOut").innerText = formatDateTime(element.TimeOut);
            document.getElementById("nameCutomer").innerText = element.NameCutomer;
            document.getElementById("phoneCutomer").innerText = element.Phone;
            document.getElementById("emailCutomer").innerText = element.Email;
            document.getElementById("lpCar").innerText = element.LicensePlates;
            document.getElementById("messageCutomer").innerText = element.Message;
            document.getElementById("codeConfrim").innerText = element.codeConfirm;
            document.getElementById("dayCreateOder").innerText = element.DateTime;
            document.getElementById("total").innerText = element.Total + "$";
            localStorage.setItem("idOrder", element.Id);
            document.getElementById("divPopup").style.display = "block";
        }else{
            document.getElementById("idOrder").innerText = element.Id;
            document.getElementById("idSlot").innerText = element.IdSlot;
            document.getElementById("timeCome").innerText = formatDateTime(element.TimeCome);
            document.getElementById("timeOut").innerText = formatDateTime(element.TimeOut);
            document.getElementById("nameCutomer").innerText = element.NameCutomer;
            document.getElementById("phoneCutomer").innerText = element.Phone;
            document.getElementById("emailCutomer").innerText = element.Email;
            document.getElementById("lpCar").innerText = element.LicensePlates;
            document.getElementById("messageCutomer").innerText = element.Message;
            document.getElementById("codeConfrim").innerText = element.codeConfirm;
            document.getElementById("dayCreateOder").innerText = element.DateTime;
            document.getElementById("total").innerText = element.Total + "$";
            localStorage.setItem("idOrder", element.Id);
            document.getElementById("divPopup").style.display = "none";
        }
    });
}
function deleteOrder() {
    var idOrder = localStorage.getItem("idOrder");
    if (idOrder != null) {
        var userId = localStorage.getItem("idUser");
        var passwordConfirm = document.getElementById("inputCutom").value;
        if (passwordConfirm != null || passwordConfirm != "") {
            for (var i = 0; i < listCustomer.length; i++) {
                if (listCustomer[i].Password == passwordConfirm && userId == listCustomer[i].Id) {
                    for (var j = 0; j < listOrderBooking.length; j++) {
                        if (listOrderBooking[j].Id == idOrder) {
                            var position = j;
                            listOrderBooking.splice(position, 1);
                            check = true;
                            break;
                        }
                    }
                    if (check == true) {
                        console.log(listOrderBooking);
                        database.ref('listOrderBooking/').set(
                            listOrderBooking
                        );
                        announceSuccess("Delete success!");
                        break;
                    }
                }
            }           
            location.reload();
        } else {
            announceError("Password is empty!");
        }
    }
}
var vote = 0;
function star1() {
    vote = 1;
}
function star2() {
    vote = 2;
}
function star3() {
    vote = 3;
}
function star4() {
    vote = 4;
}
function star5() {
    vote = 5;
}
function sendRating() {
    var comment = document.getElementById("comment").value;
    var idUser = localStorage.getItem("idUser");
    if (!isNullOrEmpty(idUser)) {
        if (vote > 0 && vote < 6) {
            var currentTime = getCurrentDateTime();
            var rating = {
                numericalRating: ListRating.length,
                IdParkingLot: IdLot,
                IdCustomer: idUser,
                Start: vote,
                Content: comment,
                DateTime: currentTime,
                IsActive: true,
            }
            
            ListRating.push(rating);
            database.ref('ListRating/').set(
                ListRating
            );

            listOrderBooking.forEach(element => {
                if(element.Id == IdOrder){
                    element.IsRating = true;
                }
            });
            database.ref('listOrderBooking/').set(
                listOrderBooking
            );
            announceSuccess("Rating Success - thank you.");
            pause()
            location.reload();
        } else {
            announceError("let choose start my friend");
        }
    } else {
        announceError("Login Again!");
    }
}
function announceSuccess(content) {
    iziToast.success({
        title: 'Anounce: ',
        message: content,
        position: 'topRight'
    });
};
function announceError(content) {
    iziToast.error({
        title: 'Error: ',
        message: content,
        position: 'topRight'
    });
};

async function pause() {
    await delay(4000);
}

function formatDateTime(dateTimeLocal) {
    var inputDate = new Date(dateTimeLocal);
    var day = inputDate.getDate();
    var month = inputDate.getMonth() + 1;
    var year = inputDate.getFullYear();
    var hours = inputDate.getHours();
    var minutes = inputDate.getMinutes();
    var formattedDay = (day < 10 ? '0' : '') + day;
    var formattedMonth = (month < 10 ? '0' : '') + month;
    var formattedYear = year;
    var formattedHours = (hours < 10 ? '0' : '') + hours;
    var formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    return formattedDay + '-' + formattedMonth + '-' + formattedYear + ' ' + formattedHours + ':' + formattedMinutes;
}

function getCurrentDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();


    var formattedDate = (day < 10 ? '0' : '') + day;
    var formattedMonth = (month < 10 ? '0' : '') + month;
    var formattedYear = year;
    var formattedHours = (hours < 10 ? '0' : '') + hours;
    var formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

    return formattedDate + '-' + formattedMonth + '-' + formattedYear + ' ' + formattedHours + ':' + formattedMinutes;
}

function compareDateTime(dateTimeString) {
    var currentDateTime = new Date();
    var inputDateTime = new Date(dateTimeString);

    if (currentDateTime > inputDateTime) {
        return true;
    } else if (currentDateTime < inputDateTime) {
        return false;
    } else {
        return true;
    }
}

function isNullOrEmpty(str) {
    return !str || str.length === 0;
}


