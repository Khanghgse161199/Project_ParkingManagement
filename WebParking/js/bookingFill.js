// navbar js
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

// firebase js
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
var slot;
var ParkingLotList = [];
var ParkingSubList = [];
var ParkingSlotList = [];
var CustomerList = [];
var listOrderBooking = [];
var listOfSlotBooking = [];
var listAllBookingActive = [];

//Start js-project
window.onload = async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idParkingSlot = urlParams.get('id');

    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(10).once("value");

    snapshot.forEach((child) => {

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
        if (child.key == "listCustomer") {
            child.forEach(childSnapshot => {
                CustomerList.push(childSnapshot.val());
            });
        }
        if (child.key == "listOrderBooking") {
            child.forEach(childSnapshot => {
                listOrderBooking.push(childSnapshot.val());
            });
        }
    });

    listOrderBooking.forEach(element => {
        if (element.IdSlot == idParkingSlot && element.IsActive == true) {
            listOfSlotBooking.push(element);
        }
    });

    document.getElementById('divDateCome').style.display = 'none';
    document.getElementById("TimeComeSeleted").style.display = 'none';
    document.getElementById("divDateOut").style.display = 'none';
    document.getElementById("TimeOutSeleted").style.display = 'none';
    document.getElementById("divMonthOut").style.display = 'none';

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    for (var i = 0; i < listOfSlotBooking.length; i++) {
        var timeTmp = new Date(listOfSlotBooking[i].TimeCome);
        var timeTmp2 = new Date(listOfSlotBooking[i].TimeOut);
        if (listOfSlotBooking[i].IsActive == true && (timeTmp2.getDate() > currentDate.getDate()) && ((timeTmp2.getMonth() + 1) >= currentMonth) || listOfSlotBooking[i].IsActive == true && (timeTmp2.getDate() < currentDate.getDate()) && ((timeTmp2.getMonth() + 1) > currentMonth)) {
            if (timeTmp.getHours() >= 10) {
                if ((timeTmp.getMonth()) >= 10) {
                    if (timeTmp.getDate() >= 10) {
                        var AllstartDayAndMonthBooking = JSON.stringify(timeTmp.getDate()) + "/" + JSON.stringify(timeTmp.getMonth() + 1) + "/"+ JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    } else {
                        var AllstartDayAndMonthBooking = JSON.stringify("0" + timeTmp.getDate()) + "/" + JSON.stringify(timeTmp.getMonth() + 1)+ "/" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    }
                } else {
                    if (timeTmp.getDate() >= 10) {
                        var AllstartDayAndMonthBooking = JSON.stringify(timeTmp.getDate()) + "/0" + JSON.stringify(timeTmp.getMonth() + 1)+ "/" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    } else {
                        var AllstartDayAndMonthBooking = JSON.stringify("0" + timeTmp.getDate()) + "/0" + JSON.stringify(timeTmp.getMonth() + 1)+ "/" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    }
                }
            } else {
                if ((timeTmp.getMonth()) >= 10) {
                    if (timeTmp.getDate() >= 10) {
                        var AllstartDayAndMonthBooking = JSON.stringify(timeTmp.getDate()) + "/" + JSON.stringify(timeTmp.getMonth() + 1) + "/0"+ JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    } else {
                        var AllstartDayAndMonthBooking = JSON.stringify("0" + timeTmp.getDate()) + "/" + JSON.stringify(timeTmp.getMonth() + 1)+ "/0" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    }
                } else {
                    if (timeTmp.getDate() >= 10) {
                        var AllstartDayAndMonthBooking = JSON.stringify(timeTmp.getDate()) + "/0" + JSON.stringify(timeTmp.getMonth() + 1)+ "/0" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    } else {
                        var AllstartDayAndMonthBooking = JSON.stringify("0" + timeTmp.getDate()) + "/0" + JSON.stringify(timeTmp.getMonth() + 1)+ "/0" + JSON.stringify(timeTmp.getHours()) + ":00";
                        listAllBookingActive.push(AllstartDayAndMonthBooking);
                    }
                }
            }
        }
    }
    
    listAllBookingActive.sort(compareDates);
    document.getElementById("seletedTmp").style.display = "none";
    for (var i = currentMonth; i < (currentMonth + 2); i++) {
        document.getElementById("monthSeleted").innerHTML += "<option value=''>" + getMonthName(i) + "</option>";
    }
    
    ParkingSlotList.forEach(element => {
        if (element.Id == idParkingSlot) {
            slot = element;

        }
    });

    var Lot, Sub;
    ParkingLotList.forEach(element => {
        if (element.Id == slot.IdParkingLot) {

            Lot = element;
        }
    });
    ParkingSubList.forEach(element => {
        if (element.Id == slot.IdParkingSub) {
            Sub = element;
        }
    });
    document.getElementById("addrressParking").innerText = Lot.Address + "-" + Lot.Name + ", " + Sub.Name + ", " + slot.Name;
    document.getElementById("acreage").innerText = slot.Acreage + " square meters";
    document.getElementById("priceTime").innerText = slot.PriceDaytime + "-" + slot.PriceOverNight + " dollar/hour";
    var idCustomer = localStorage.getItem("idUser");
    if (!isNullOrEmpty(idCustomer)) {
        CustomerList.forEach(element => {
            if (element.Id == idCustomer) {
                console.log("yes");
                document.getElementById("nameCustomer").value = element.Name;
                document.getElementById("emailCustomer").value = element.Email;
                document.getElementById("phoneCustomer").value = element.Phone;
            }
        });
    } else {
        announceError("Id-Customer is null - Login again!");
    }
}
var listOrderOnMonth = [];
//Get Month-Come
function myNewFunction(sel) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();
    var cunrrentHour = currentDate.getHours();
    // console.log(sel.options[sel.selectedIndex].text);
    if (sel.options[sel.selectedIndex].text != null) {
        document.getElementById("divDateCome").style.display = 'block';
        document.getElementById("dayComeSeleted").innerHTML = "<option value='' id='seletedTmp2'>Select Day-Come</option>";
        document.getElementById('TimeComeSeleted').innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>"
        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
        document.getElementById('dayOutSeleted').innerHTML = " <option value='' id='seletedTmp5'>Select Day-Out</option>";
        document.getElementById('TimeOutSeleted').innerHTML = " <option value='' id='seletedTmp6'>Select Time-Out</option>";
        console.log(listOfSlotBooking);
        // case month = cunrrent 
        if (sel.options[sel.selectedIndex].text == getMonthName(currentMonth)) {
            var listDayComeBeRemove = [];
            listOrderOnMonth = [];
            listOfSlotBooking.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                if ((timeTmp.getMonth() + 1) == currentMonth) {
                    listOrderOnMonth.push(element);
                }
            });
            listOrderOnMonth.forEach(element => {
                var listTmp = getDaysBetween(element.TimeCome, element.TimeOut);
                if (listTmp.length > 2) {
                    for (var i = 1; i < (listTmp.length - 1); i++) {
                        if ((listTmp[i].getDate()) >= listTmp[0].getDate()) {
                            listDayComeBeRemove.push(listTmp[i].getDate());
                        }
                    }
                    var timeTmp = new Date(element.TimeCome);
                    if (timeTmp.getHours() == 0) listDayComeBeRemove.push(listTmp[0].getDate());
                }
                if (listTmp.length == 2) {
                    var timeTmp = new Date(element.TimeCome);
                    if (timeTmp.getHours() == 0) listDayComeBeRemove.push(listTmp[0].getDate());
                }
                var timeCheck = new Date(element.TimeCome);
                if (timeCheck.getDate() == currentDay && timeCheck.getHours() <= cunrrentHour) {
                    listDayComeBeRemove.push(timeCheck.getDate());
                }
            });
            if (document.getElementById("dayComeSeleted").options.length > 0) {
                document.getElementById("dayComeSeleted").innerHTML = null;
                document.getElementById("dayComeSeleted").innerHTML += "<option value='' id='seletedTmp'>Select Day-Come</option>";
                for (var i = currentDay; i <= getNumberOfDays(currentYear, currentMonth); i++) {
                    if (!listDayComeBeRemove.includes(i)) {
                        if (i >= currentDay) {
                            document.getElementById("dayComeSeleted").innerHTML += " <option value=''>" + i + "/" + currentMonth + "</option>";
                        }
                    }
                }
            } else {
                for (var i = currentDay; i <= getNumberOfDays(currentYear, currentMonth); i++) {
                    if (!listDayComeBeRemove.includes(i)) {
                        if (i >= currentDay) {
                            document.getElementById("dayComeSeleted").innerHTML += " <option value=''>" + i + "/" + currentMonth + "</option>";
                        }
                    }
                }
            }
            // case month = cunrrent + 1
        } else if (sel.options[sel.selectedIndex].text == getMonthName(currentMonth + 1)) {
            var listDayComeBeRemove = [];
            listOrderOnMonth = [];
            listOfSlotBooking.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                var timeTmp2 = new Date(element.TimeOut)
                if ((timeTmp.getMonth() + 1) == (currentMonth + 1) || (timeTmp2.getMonth() + 1) == (currentMonth + 1)) {
                    listOrderOnMonth.push(element);
                }
            });
            listOrderOnMonth.forEach(element => {
                var listTmp = getDaysBetween(element.TimeCome, element.TimeOut);
                if (listTmp.length > 2) {
                    for (var i = 1; i < (listTmp.length - 1); i++) {
                        listDayComeBeRemove.push(listTmp[i].getDate());
                    }
                    var timeTmp = new Date(element.TimeCome);
                    if (timeTmp.getHours() == 0) listDayComeBeRemove.push(listTmp[0].getDate());
                }
                if (listTmp.length == 2) {
                    var timeTmp = new Date(element.TimeCome);
                    if (timeTmp.getHours() == 0) listDayComeBeRemove.push(listTmp[0].getDate());
                }
            });
            if (document.getElementById("dayComeSeleted").options.length > 0) {
                document.getElementById("dayComeSeleted").innerHTML = null;
                document.getElementById("dayComeSeleted").innerHTML += "<option value='' id='seletedTmp'>Select Day-Come</option>";
                for (var i = 1; i <= getNumberOfDays(currentYear, (currentMonth + 1)); i++) {
                    if (!listDayComeBeRemove.includes(i)) {
                        document.getElementById("dayComeSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 1) + "</option>";
                    }
                }
            } else {
                for (var i = 1; i <= getNumberOfDays(currentYear, (currentMonth + 1)); i++) {
                    if (!listDayComeBeRemove.includes(i)) {
                        document.getElementById("dayComeSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 1) + "</option>";
                    }
                }
            }
        }
    }
}
var listDayBeingBook = [];
var listTimeToShow = [];
//Get Date-Come
function myNewFunction2(sel) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var cunrrentHour = currentDate.getHours();
    var chooseMonth = $("#monthSeleted option:selected").text();
    var chooseDate = $("#dayComeSeleted option:selected").text();
    var currenDayOnMonth = currentDay + "/" + currentMonth;
    if (sel.options[sel.selectedIndex].text != null) {
        document.getElementById("TimeComeSeleted").style.display = 'block';
        document.getElementById('TimeComeSeleted').innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>"
        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
        document.getElementById('dayOutSeleted').innerHTML = " <option value='' id='seletedTmp5'>Select Day-Out</option>";
        document.getElementById('TimeOutSeleted').innerHTML = " <option value='' id='seletedTmp6'>Select Time-Out</option>";
        var tmpCut = [] = chooseDate.split("/");
        if (chooseMonth == getMonthName((currentMonth))) {
            listTimeToShow = [];
            var listOrderOnMonth = [];
            listOfSlotBooking.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                var timeTmp2 = new Date(element.TimeOut)
                if ((timeTmp.getMonth() + 1) == currentMonth || (timeTmp2.getMonth() + 1) == currentMonth) {
                    listOrderOnMonth.push(element);
                }
            });
            listDayBeingBook = [];
            listOrderOnMonth.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                var timeTmp2 = new Date(element.TimeOut)
                if (timeTmp.getDate() == tmpCut[0] || timeTmp2.getDate() == tmpCut[0]) {
                    if (timeTmp.getDate() == tmpCut[0] && timeTmp2.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        dayBook = {
                            startDay: timeTmp.getDate(),
                            startTime: timeTmp.getHours(),
                            endDay: timeTmp2.getDate(),
                            endTime: timeTmp2.getHours(),
                            styleDay: "inDay",
                            styleOrder: 1,
                        }
                        listDayBeingBook.push(dayBook);
                    }
                    else if (timeTmp.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        var tmpCheckLength = getDaysBetween(element.TimeCome, element.TimeOut);
                        if (tmpCheckLength.length == 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "startDay",
                                styleOrder: 2,
                            }
                        } else if (tmpCheckLength.length > 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "startDay",
                                styleOrder: 3,
                            }
                        }
                        listDayBeingBook.push(dayBook);
                    } else if (timeTmp2.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        var tmpCheckLength = getDaysBetween(element.TimeCome, element.TimeOut);
                        if (tmpCheckLength.length == 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "endDay",
                                styleOrder: 2,
                            }
                        } else if (tmpCheckLength.length > 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "endDay",
                                styleOrder: 3,
                            }
                        }
                        listDayBeingBook.push(dayBook);
                    }
                }
            });
            listDayBeingBook.sort((a, b) => {
                return a.startDay - b.startDay;
            });
            listDayBeingBook.sort((a, b) => {
                return a.endDay - b.endDay;
            });
            listDayBeingBook.sort((a, b) => {
                return a.startTime - b.startTime;
            });
            // case chon ngay hien tai
            if (chooseDate == currenDayOnMonth) {
                // case khong ton tai trong order
                if (listDayBeingBook.length == 0) {
                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                    for (var i = 0; i <= 23; i++) {
                        if (i > cunrrentHour) {
                            if (i < 10) {
                                if (i > cunrrentHour) {
                                    document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    listTimeToShow.push("0" + i + ":00")
                                }
                            } else {
                                if (i > cunrrentHour) {
                                    document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    listTimeToShow.push(i + ":00")
                                }
                            }
                        }
                    }
                    // case chi co 1 order
                } else if (listDayBeingBook.length == 1) {
                    // case in day
                    if (listDayBeingBook[0].styleDay == "inDay") {
                        if (listDayBeingBook[0].styleOrder == 1) {
                            if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        }
                                    } else {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        }
                                    } else {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        }
                                    } else {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        }
                                    } else {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            }
                        }
                        // case start day
                    } else if (listDayBeingBook[0].styleDay == "startDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].startTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        }
                                    } else {
                                        if (i > cunrrentHour) {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                            }
                        }
                        // case end day
                    } else if (listDayBeingBook[0].styleDay == "endDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].endTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i > cunrrentHour) {
                                        if (i < 10) {
                                            listTimeToShow.push("0" + i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                        } else {
                                            listTimeToShow.push(i + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // case co nhieu order
                } else if (listDayBeingBook.length > 1) {
                    listDayBeingBook.sort((a, b) => {
                        return a.startDay - b.startDay;
                    });
                    var endToStartTime;
                    for (var i = 0; i < listDayBeingBook.length; i++) {
                        if (i == 0) {
                            // case bat dau = end-day
                            if (listDayBeingBook[0].styleDay == "endDay" && listDayBeingBook[i].styleOrder > 1) {
                                endToStartTime = listDayBeingBook[0].endTime;
                                // case bat dau = in-day
                            } else if (listDayBeingBook[0].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                if (listDayBeingBook[0].startTime == 0) {
                                    endToStartTime = listDayBeingBook[0].endTime;
                                } else {
                                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j > cunrrentHour) {
                                            if (j < 10) {
                                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                            } else {
                                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                            }
                                        }
                                    }
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j > cunrrentHour) {
                                            if (j < 10) {
                                                listTimeToShow.push("0" + j + ":00")
                                            } else {
                                                listTimeToShow.push(j + ":00")
                                            }
                                        }
                                    }
                                    endToStartTime = listDayBeingBook[0].endTime;
                                }
                            }
                        } else {
                            // case thu i la in-day
                            if (listDayBeingBook[i].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j > cunrrentHour) {
                                        if (j < 10) {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                }
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j > cunrrentHour) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                        }
                                    }
                                }
                                endToStartTime = listDayBeingBook[i].endTime;
                                if (i == (listDayBeingBook.length - 1) && listDayBeingBook[i].endTime != 23) {
                                    for (var j = endToStartTime; j <= 23; j++) {
                                        if (j > cunrrentHour) {
                                            if (j < 10) {
                                                listTimeToShow.push("0" + j + ":00")
                                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                            } else {
                                                listTimeToShow.push(j + ":00")
                                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                            }
                                        }
                                    }
                                }
                                // case thu i la start-day
                            } else if (listDayBeingBook[i].styleDay == "startDay" && listDayBeingBook[i].styleOrder > 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j > cunrrentHour) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // case khong ton tai trong order
                if (listDayBeingBook.length == 0) {
                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                    for (var i = 0; i <= 23; i++) {
                        if (i < 10) {
                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                            listTimeToShow.push("0" + i + ":00")
                        } else {
                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                            listTimeToShow.push(i + ":00")
                        }
                    }
                    // case chi co 1 order
                } else if (listDayBeingBook.length == 1) {
                    // case in day
                    if (listDayBeingBook[0].styleDay == "inDay") {
                        if (listDayBeingBook[0].styleOrder == 1) {
                            if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            }
                        }
                        // case start day
                    } else if (listDayBeingBook[0].styleDay == "startDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].startTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i < parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                        // case end day
                    } else if (listDayBeingBook[0].styleDay == "endDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].endTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                    // case co nhieu order
                } else if (listDayBeingBook.length > 1) {
                    listDayBeingBook.sort((a, b) => {
                        return a.startDay - b.startDay;
                    });
                    var endToStartTime;
                    for (var i = 0; i < listDayBeingBook.length; i++) {
                        if (i == 0) {
                            // case bat dau = end-day
                            if (listDayBeingBook[0].styleDay == "endDay" && listDayBeingBook[i].styleOrder > 1) {
                                endToStartTime = listDayBeingBook[0].endTime;
                                // case bat dau = in-day
                            } else if (listDayBeingBook[0].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                if (listDayBeingBook[0].startTime == 0) {
                                    endToStartTime = listDayBeingBook[0].endTime;
                                } else {
                                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                        }
                                    }
                                    endToStartTime = listDayBeingBook[0].endTime;
                                }
                            }
                        } else {
                            // case thu i la in-day
                            if (listDayBeingBook[i].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                    }
                                }
                                endToStartTime = listDayBeingBook[i].endTime;
                                if (i == (listDayBeingBook.length - 1) && listDayBeingBook[i].endTime != 23) {
                                    for (var j = endToStartTime; j <= 23; j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                }
                                // case thu i la start-day
                            } else if (listDayBeingBook[i].styleDay == "startDay" && listDayBeingBook[i].styleOrder > 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // case month = current + 1
        } else if (chooseMonth == getMonthName((currentMonth + 1))) {
            listTimeToShow = [];
            var listOrderOnMonth = [];
            listOfSlotBooking.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                var timeTmp2 = new Date(element.TimeOut)
                if ((timeTmp.getMonth() + 1) == (currentMonth + 1) || (timeTmp2.getMonth() + 1) == (currentMonth + 1)) {
                    listOrderOnMonth.push(element);
                }
            });
            listDayBeingBook = [];
            listOrderOnMonth.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                var timeTmp2 = new Date(element.TimeOut)
                if (timeTmp.getDate() == tmpCut[0] || timeTmp2.getDate() == tmpCut[0]) {
                    if (timeTmp.getDate() == tmpCut[0] && timeTmp2.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        dayBook = {
                            startDay: timeTmp.getDate(),
                            startTime: timeTmp.getHours(),
                            endDay: timeTmp2.getDate(),
                            endTime: timeTmp2.getHours(),
                            styleDay: "inDay",
                            styleOrder: 1,
                        }
                        listDayBeingBook.push(dayBook);
                    }
                    else if (timeTmp.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        var tmpCheckLength = getDaysBetween(element.TimeCome, element.TimeOut);
                        if (tmpCheckLength.length == 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "startDay",
                                styleOrder: 2,
                            }
                        } else if (tmpCheckLength.length > 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "startDay",
                                styleOrder: 3,
                            }
                        }
                        listDayBeingBook.push(dayBook);
                    } else if (timeTmp2.getDate() == tmpCut[0]) {
                        var dayBook = null;
                        var tmpCheckLength = getDaysBetween(element.TimeCome, element.TimeOut);
                        if (tmpCheckLength.length == 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "endDay",
                                styleOrder: 2,
                            }
                        } else if (tmpCheckLength.length > 2) {
                            dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                                endDay: timeTmp2.getDate(),
                                endTime: timeTmp2.getHours(),
                                styleDay: "endDay",
                                styleOrder: 3,
                            }
                        }
                        listDayBeingBook.push(dayBook);
                    }
                }
            });
            listDayBeingBook.sort((a, b) => {
                return a.startDay - b.startDay;
            });
            listDayBeingBook.sort((a, b) => {
                return a.endDay - b.endDay;
            });
            // case chon ngay hien tai
            if (chooseDate == currenDayOnMonth) {
                // case khong ton tai trong order
                if (listDayBeingBook.length == 0) {
                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                    for (var i = 0; i <= 23; i++) {
                        if (i > cunrrentHour) {
                            if (i < 10) {
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                listTimeToShow.push("0" + i + ":00")
                            } else {
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                listTimeToShow.push(i + ":00")
                            }
                        }
                    }
                    // case chi co 1 order
                } else if (listDayBeingBook.length == 1) {
                    // case in day
                    if (listDayBeingBook[0].styleDay == "inDay") {
                        if (listDayBeingBook[0].styleOrder == 1) {
                            if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            }
                        }
                        // case start day
                    } else if (listDayBeingBook[0].styleDay == "startDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].startTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                        // case end day
                    } else if (listDayBeingBook[0].styleDay == "endDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].endTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                    // case co nhieu order
                } else if (listDayBeingBook.length > 1) {
                    listDayBeingBook.sort((a, b) => {
                        return a.startDay - b.startDay;
                    });
                    var endToStartTime;
                    for (var i = 0; i < listDayBeingBook.length; i++) {
                        if (i == 0) {
                            // case bat dau = end-day
                            if (listDayBeingBook[0].styleDay == "endDay" && listDayBeingBook[i].styleOrder > 1) {
                                endToStartTime = listDayBeingBook[0].endTime;
                                // case bat dau = in-day
                            } else if (listDayBeingBook[0].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                if (listDayBeingBook[0].startTime == 0) {
                                    endToStartTime = listDayBeingBook[0].endTime;
                                } else {
                                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                        }
                                    }
                                    endToStartTime = listDayBeingBook[0].endTime;
                                }
                            }
                        } else {
                            // case thu i la in-day
                            if (listDayBeingBook[i].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                    }
                                }
                                endToStartTime = listDayBeingBook[i].endTime;
                                if (i == (listDayBeingBook.length - 1) && listDayBeingBook[i].endTime != 23) {
                                    for (var j = endToStartTime; j <= 23; j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                }
                                // case thu i la start-day
                            } else if (listDayBeingBook[i].styleDay == "startDay" && listDayBeingBook[i].styleOrder > 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // case khong ton tai trong order
                if (listDayBeingBook.length == 0) {
                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                    for (var i = 0; i <= 23; i++) {
                        if (i < 10) {
                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                            listTimeToShow.push("0" + i + ":00")
                        } else {
                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                            listTimeToShow.push(i + ":00")
                        }
                    }
                    // case chi co 1 order
                } else if (listDayBeingBook.length == 1) {
                    // case in day
                    if (listDayBeingBook[0].styleDay == "inDay") {
                        if (listDayBeingBook[0].styleOrder == 1) {
                            if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime == 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime < 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            } else if (listDayBeingBook[0].startTime > 0 && listDayBeingBook[0].endTime == 23) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                                document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "23" + ":00" + "</option>";
                                listTimeToShow.push("23" + ":00")
                            }
                        }
                        // case start day
                    } else if (listDayBeingBook[0].styleDay == "startDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].startTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = 0; i <= parseInt(listDayBeingBook[0].startTime); i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                        // case end day
                    } else if (listDayBeingBook[0].styleDay == "endDay") {
                        if (listDayBeingBook[0].styleOrder == 2 || listDayBeingBook[0].styleOrder == 3) {
                            if (listDayBeingBook[0].endTime > 0) {
                                document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                for (var i = parseInt(listDayBeingBook[0].endTime); i <= 23; i++) {
                                    if (i < 10) {
                                        listTimeToShow.push("0" + i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(i + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                    // case co nhieu order
                } else if (listDayBeingBook.length > 1) {
                    listDayBeingBook.sort((a, b) => {
                        return a.startDay - b.startDay;
                    });
                    var endToStartTime;
                    for (var i = 0; i < listDayBeingBook.length; i++) {
                        if (i == 0) {
                            // case bat dau = end-day
                            if (listDayBeingBook[0].styleDay == "endDay" && listDayBeingBook[i].styleOrder > 1) {
                                endToStartTime = listDayBeingBook[0].endTime;
                                // case bat dau = in-day
                            } else if (listDayBeingBook[0].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                if (listDayBeingBook[0].startTime == 0) {
                                    endToStartTime = listDayBeingBook[0].endTime;
                                } else {
                                    document.getElementById("TimeComeSeleted").innerHTML = "<option value='' id='seletedTmp3'>Select Time-Come</option>";
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                    for (var j = 0; j < parseInt(listDayBeingBook[0].startTime); j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                        }
                                    }
                                    endToStartTime = listDayBeingBook[0].endTime;
                                }
                            }
                        } else {
                            // case thu i la in-day
                            if (listDayBeingBook[i].styleDay == "inDay" && listDayBeingBook[i].styleOrder == 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                    }
                                }
                                endToStartTime = listDayBeingBook[i].endTime;
                                if (i == (listDayBeingBook.length - 1) && listDayBeingBook[i].endTime != 23) {
                                    for (var j = endToStartTime; j <= 23; j++) {
                                        if (j < 10) {
                                            listTimeToShow.push("0" + j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                        } else {
                                            listTimeToShow.push(j + ":00")
                                            document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                        }
                                    }
                                }
                                // case thu i la start-day
                            } else if (listDayBeingBook[i].styleDay == "startDay" && listDayBeingBook[i].styleOrder > 1) {
                                for (var j = endToStartTime; j < listDayBeingBook[i].startTime; j++) {
                                    if (j < 10) {
                                        listTimeToShow.push("0" + j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + "0" + j + ":00" + "</option>";
                                    } else {
                                        listTimeToShow.push(j + ":00")
                                        document.getElementById("TimeComeSeleted").innerHTML += " <option value=''>" + j + ":00" + "</option>";
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

//Get Month-Out
function myNewFunction3(sel) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var chooseHour = $("#TimeComeSeleted option:selected").text();
    var chooseMonthCome = $("#monthSeleted option:selected").text();
    var currentYear = currentDate.getFullYear();
    if (sel.options[sel.selectedIndex].text != null) {
        var chooseMonth = sel.options[sel.selectedIndex].text;
        var chooseDateCome = $("#dayComeSeleted option:selected").text();
        document.getElementById('divDateOut').style.display = 'block';
        document.getElementById('dayOutSeleted').innerHTML = " <option value='' id='seletedTmp5'>Select Day-Out</option>";
        document.getElementById('TimeOutSeleted').innerHTML = " <option value='' id='seletedTmp6'>Select Time-Out</option>";
        if (sel.options[sel.selectedIndex].text == getMonthName(currentMonth) && chooseMonthCome == getMonthName(currentMonth)) {
            // case 5 - 5
            var listDayComeBeRemove = [];
            listOrderOnMonth = [];
            listOfSlotBooking.forEach(element => {
                var timeTmp = new Date(element.TimeCome)
                if ((timeTmp.getMonth() + 1) == currentMonth) {
                    listOrderOnMonth.push(element);
                }
            });
            listOrderOnMonth.forEach(element => {
                var listTmp = getDaysBetween(element.TimeCome, element.TimeOut);
                if (listTmp.length > 2) {
                    for (var i = 1; i < (listTmp.length - 1); i++) {
                        listDayComeBeRemove.push(listTmp[i].getDate());
                        var timeTmp2 = new Date(listTmp[i].TimeOut);

                    }
                }
            });
            if (listAllBookingActive.length > 0) {
                for (var i = 0; i < listAllBookingActive.length; i++) {
                    var cutCheck = [] = listAllBookingActive[i].split("/");
                    if (cutCheck[1] == currentMonth) {
                        if (cutCheck[1] == currentMonth) {
                            var dayTimeToCompare;
                            var cutTmpToCheck = [] = chooseDateCome.split("/")
                            if (cutTmpToCheck[0] >= 10) {
                                if (cutTmpToCheck[1] >= 10) {
                                    dayTimeToCompare = chooseDateCome;
                                } else {
                                    dayTimeToCompare = cutTmpToCheck[0] + "/0" + cutTmpToCheck[1];
                                }
                            } else {
                                if (cutTmpToCheck[1] >= 10) {
                                    dayTimeToCompare = "0" + cutTmpToCheck[0] + cutTmpToCheck[1];;
                                } else {
                                    dayTimeToCompare = "0" + cutTmpToCheck[0] + "/0" + cutTmpToCheck[1];
                                }
                            }

                            const comparison = listAllBookingActive[i].localeCompare(dayTimeToCompare + "/" + chooseHour);
                            if (comparison == 0 || comparison > 0) {
                                var cutTmp = [] = listAllBookingActive[i].split("/");
                                var cutTmp2 = [] = chooseDateCome.split("/");
                                document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                for (var j = parseInt(cutTmp2[0]); j <= parseInt(cutTmp[0]); j++) {
                                    document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + currentMonth + "</option>";
                                    console.log(j);
                                }
                                break;
                            } else {
                                var cutTmp2 = [] = chooseDateCome.split("/");
                                document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                for (var j = parseInt(cutTmp2[0]); j <= getNumberOfDays(currentYear, currentMonth); j++) {
                                    document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + currentMonth + "</option>";
                                    console.log(j);
                                }
                            }
                        }
                    }
                }
            } else {
                var cutTmp2 = [] = chooseDateCome.split("/");
                document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                for (var j = 1; j <= getNumberOfDays(currentYear, currentMonth); j++) {
                    if (j >= parseInt(cutTmp2[0])) {
                        document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + currentMonth + "</option>";
                        console.log(j);
                    }
                }
            }
        } else if (sel.options[sel.selectedIndex].text == (getMonthName(currentMonth + 1))) {
            // case 5 - 6
            if (chooseMonthCome == getMonthName(currentMonth)) {
                var cutTmp = [] = chooseDateCome.split("/");
                if (cutTmp[1] == currentMonth) {
                    var listDayComeBeRemove = [];
                    listOrderOnMonth = [];
                    listOfSlotBooking.forEach(element => {
                        var timeTmp = new Date(element.TimeCome)
                        if ((timeTmp.getMonth() + 1) == (currentMonth + 1)) {
                            listOrderOnMonth.push(element);
                        }
                    });
                    listOrderOnMonth.forEach(element => {
                        var listTmp = getDaysBetween(element.TimeCome, element.TimeOut);
                        if (listTmp.length > 2) {
                            for (var i = 1; i < (listTmp.length - 1); i++) {
                                listDayComeBeRemove.push(listTmp[i].getDate());
                            }
                        }
                    });
                    if (listOrderOnMonth.length > 0) {
                        for (var i = 0; i < listAllBookingActive.length; i++) {
                            var cutCheck = [] = listAllBookingActive[i].split("/");
                            if (cutCheck[1] == (currentMonth + 1)) {
                                console.log(chooseDateCome + "/" + chooseHour);
                                const comparison = listAllBookingActive[i].localeCompare(chooseDateCome + "/" + chooseHour);
                                if (comparison == 0 || comparison > 0) {
                                    var cutTmp = [] = listAllBookingActive[i].split("/");
                                    var cutTmp2 = [] = chooseDateCome.split("/");
                                    document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                    for (var j = 1; j <= parseInt(cutTmp[0]); j++) {
                                        document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                                        console.log(j);
                                    }
                                    break;
                                } else {
                                    var cutTmp2 = [] = chooseDateCome.split("/");
                                    document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                    for (var j = 1; j <= getNumberOfDays(currentYear, (currentMonth + 1)); j++) {
                                        document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                                        console.log(j);
                                    }
                                }
                            }
                        }
                    } else {
                        document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                        for (var j = 1; j <= getNumberOfDays(currentYear, (currentMonth + 1)); j++) {
                            document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                        }
                    }
                }
                // case 6 - 6
            } else if (chooseMonthCome == getMonthName((currentMonth + 1))) {
                var listDayComeBeRemove = [];
                listOrderOnMonth = [];
                listOfSlotBooking.forEach(element => {
                    var timeTmp = new Date(element.TimeCome)
                    if ((timeTmp.getMonth() + 1) == (currentMonth + 1)) {
                        listOrderOnMonth.push(element);
                    }
                });
                listOrderOnMonth.forEach(element => {
                    var listTmp = getDaysBetween(element.TimeCome, element.TimeOut);
                    if (listTmp.length > 2) {
                        for (var i = 1; i < (listTmp.length - 1); i++) {
                            listDayComeBeRemove.push(listTmp[i].getDate());
                        }
                    }
                });
                var checkExist = false;
                for (var i = 0; i < listAllBookingActive.length; i++) {
                    var cutTmp4 = listAllBookingActive[i].split("/");
                    if (cutTmp4[1] == (currentMonth + 1)) {
                        checkExist = true;
                        break;
                    }
                }
                if (listAllBookingActive.length > 0 && checkExist == true) {
                    for (var i = 0; i < listAllBookingActive.length; i++) {
                        var cutCheck = [] = listAllBookingActive[i].split("/");
                        if (cutCheck[1] == (currentMonth + 1)) {
                            var blockDay = (chooseDateCome + "/" + chooseHour)
                            var timeTmp = new Date(blockDay);
                            var timeTmp2 = new Date(listAllBookingActive[i])
                            // const comparison = listAllBookingActive[i].localeCompare(chooseDateCome + "/" + chooseHour);
                            if (timeTmp == timeTmp2 || timeTmp < timeTmp2) {
                                var cutTmp = [] = listAllBookingActive[i].split("/");
                                var cutTmp2 = [] = chooseDateCome.split("/");
                                document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                for (var j = parseInt(cutTmp2[0]); j <= parseInt(cutTmp[0]); j++) {
                                    document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                                    console.log(j);
                                }
                                break;
                            } else {
                                var cutTmp2 = [] = chooseDateCome.split("/");
                                document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                                for (var j = parseInt(cutTmp2[0]); j <= getNumberOfDays(currentYear, (currentMonth + 1)); j++) {
                                    document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                                    console.log(j);
                                }
                            }
                        }
                    }
                } else {
                    var cutTmp2 = [] = chooseDateCome.split("/");
                    document.getElementById("dayOutSeleted").innerHTML = "<option value='' id='seletedTmp5'>Select Day-Out</option>";
                    for (var j = parseInt(cutTmp2[0]); j <= getNumberOfDays(currentYear, (currentMonth + 1)); j++) {
                        document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + j + "/" + (currentMonth + 1) + "</option>";
                        console.log(j);
                    }
                }
            }
            // case nay tam thoi pause
        } else if (sel.options[sel.selectedIndex].text == getMonthName(currentMonth + 2)) {
            chooseDateCome = [] = chooseDateCome.split("/");
            if (chooseDateCome[1] == (currentMonth + 2)) {
                var listOrderOnMonth = [];
                listOfSlotBooking.forEach(element => {
                    var timeTmp = new Date(element.TimeCome)
                    if (getMonthName((timeTmp.getMonth() + 1)) == chooseMonth) {
                        listOrderOnMonth.push(element);
                    }
                });
                if (listOrderOnMonth.length > 0) {
                    listDayBeingBook = [];
                    listOrderOnMonth.forEach(element => {
                        const date = new Date(element.TimeCome);
                        const day = date.getDate();
                        var hour = date.getHours();
                        const date2 = new Date(element.TimeOut);
                        const day2 = date2.getDate();
                        var hour2 = date2.getHours();
                        var dayBook = {
                            start: day,
                            startTime: hour,
                            end: day2,
                            endTime: hour2,
                        }
                        console.log(day);
                        console.log(day2);
                        listDayBeingBook.push(dayBook);
                    });
                    listDayBeingBook.sort((a, b) => {
                        return a.start - b.start;
                    });
                    console.log("test4");
                    console.log(listDayBeingBook)
                    var chooseDateCome = $("#dayComeSeleted option:selected").text();
                    chooseDateCome = [] = chooseDateCome.split("/");
                    document.getElementById("seletedTmp4").style.display = "none";
                    if (document.getElementById("dayOutSeleted").options.length > 0) {
                        var check = false;
                        listDayBeingBook.sort(function (a, b) {
                            return a.start - b.start;
                        });
                        for (var i = 0; i < listDayBeingBook.length; i++) {
                            var listTmp = getIntegersBetween(listDayBeingBook[i].start, listDayBeingBook[i].end);
                            console.log(listTmp);
                            listTmpCheckExist = [];
                            listDayBeingBook.forEach(element => {
                                listTmpCheckExist.push(element.start)
                            });
                            if (chooseDateCome[0] == listDayBeingBook[i].start && (listDayBeingBook[i].start + 1) == listDayBeingBook[i].end || chooseDateCome[0] == listDayBeingBook[i].start && listTmp.length >= 1 || chooseDateCome[0] == listDayBeingBook[i].start && listTmpCheckExist.includes((listDayBeingBook[i].start + 1))) {
                                console.log("you true");
                                document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + chooseDateCome[0] + "/" + (currentMonth + 2) + "</option>";
                                check = true;
                                break;
                            }
                            else if (chooseDateCome[0] < listDayBeingBook[i].start) {
                                console.log("you true2");
                                console.log(chooseDateCome[0])
                                var end = listDayBeingBook[i].start
                                for (var i = chooseDateCome[0]; i <= end; i++) {
                                    document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 2) + "</option>";
                                }
                                check = true;
                                break;
                            }
                        }
                        if (!check) {
                            for (var i = chooseDateCome[0]; i <= getNumberOfDays(currentYear, currentMonth); i++) {
                                document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 2) + "</option>";
                            }
                        }
                    } else {
                        for (var i = currentDay; i < getNumberOfDays(currentYear, currentMonth); i++) {
                            if (i <= listDayComeBeRemove[0] && i > JSON.parse(chooseDateCome[0])) {
                                document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 2) + "</option>";
                            }
                        }
                    }
                } else {
                    for (var i = 1; i <= getNumberOfDays(currentYear, (currentMonth + 1)); i++) {
                        document.getElementById("dayOutSeleted").innerHTML += " <option value=''>" + i + "/" + (currentMonth + 2) + "</option>";
                    }
                }
            }
        }
    }
}


//Get Date-Out
function myNewFunction4(sel) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var hour = currentDate.getHours() + 2;
    var chooseMonthOut = $("#monthSeletedOut option:selected").text();
    var chooseMonthCome = $("#monthSeleted option:selected").text();
    var chooseDateOut = $("#dayOutSeleted option:selected").text();
    var chooseDateCome = $("#dayComeSeleted option:selected").text();
    if (sel.options[sel.selectedIndex].text != null) {
        document.getElementById('TimeOutSeleted').style.display = 'block';
        document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
        // 5 - 5
        if (chooseMonthOut == getMonthName((currentMonth)) && chooseMonthCome == getMonthName((currentMonth))) {
            var listStoreTimeToOut = [];
            var listTimeZoneToShow = [];
            if (chooseDateOut == chooseDateCome) {
                var timeCome = $("#TimeComeSeleted option:selected").text();
                listTimeToShow.forEach(element => {
                    var cutTmp = element.split(":");
                    listStoreTimeToOut.push(parseInt(cutTmp[0]));
                });
                console.log(listStoreTimeToOut);
                var listzoneTime = getListTimeZone(listStoreTimeToOut);
                var timeComeCut = [] = timeCome.split(":");
                listzoneTime.forEach(element => {
                    if (element.includes(parseInt(timeComeCut[0]))) {
                        listTimeZoneToShow = element;
                    }
                });
                if ((listTimeZoneToShow[listTimeZoneToShow.length - 1]) != 23) {
                    listTimeZoneToShow.push(((listTimeZoneToShow[listTimeZoneToShow.length - 1]) + 1));
                }
                document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
                for (var i = 0; i < listTimeZoneToShow.length; i++) {
                    if (listTimeZoneToShow[i] > parseInt(timeComeCut[0])) {
                        if (listTimeZoneToShow[i] < 10) {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + listTimeZoneToShow[i] + ":00" + "</option>";
                        } else {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + listTimeZoneToShow[i] + ":00" + "</option>";
                        }
                    }
                }
            } else {
                listOrderOnMonth = [];
                listOfSlotBooking.forEach(element => {
                    var timeTmp = new Date(element.TimeCome)
                    if ((timeTmp.getMonth() + 1) == currentMonth) {
                        listOrderOnMonth.push(element);
                    }
                });
                var cutDayOutFirst = [] = chooseDateOut.split("/");
                var listAllTmp = [];
                listOrderOnMonth.forEach(element => {
                    var timeTmp = new Date(element.TimeCome);
                    if (parseInt(timeTmp.getDate()) == parseInt(cutDayOutFirst[0])) {
                        var dayBook = {
                            startDay: timeTmp.getDate(),
                            startTime: timeTmp.getHours(),
                        }
                        listAllTmp.push(dayBook);
                    }
                });
                if (listAllTmp.length > 0) {
                    listAllTmp.sort((a, b) => {
                        return a.startTime - b.startTime;
                    });
                    document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
                    if (listAllTmp[0].startTime == 0) {
                        document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "00" + ":00" + "</option>";
                    } else {
                        for (var i = 0; i <= listAllTmp[0].startTime; i++) {
                            if (i < 10) {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                            } else {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                            }
                        }
                    }
                } else {
                    for (var i = 0; i <= 23; i++) {
                        if (i < 10) {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                        } else {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                        }
                    }
                }
            }
        }
        else if (chooseMonthOut == getMonthName((currentMonth + 1))) {
            // case 5 - 6
            if (chooseMonthOut == getMonthName((currentMonth) + 1) && chooseMonthCome == getMonthName((currentMonth))) {
                var listStoreTimeToOut = [];
                var listTimeZoneToShow = [];
                if (chooseDateOut != chooseDateCome)
                    listOrderOnMonth = [];
                listOfSlotBooking.forEach(element => {
                    var timeTmp = new Date(element.TimeCome)
                    if ((timeTmp.getMonth() + 1) == (currentMonth + 1)) {
                        listOrderOnMonth.push(element);
                    }
                });
                var cutDayOutFirst = [] = chooseDateOut.split("/");
                var listAllTmp = [];
                listOrderOnMonth.forEach(element => {
                    var timeTmp = new Date(element.TimeCome);
                    if (parseInt(timeTmp.getDate()) == parseInt(cutDayOutFirst[0])) {
                        var dayBook = {
                            startDay: timeTmp.getDate(),
                            startTime: timeTmp.getHours(),
                        }
                        listAllTmp.push(dayBook);
                    }
                });
                if (listAllTmp.length > 0) {
                    listAllTmp.sort((a, b) => {
                        return a.startTime - b.startTime;
                    });
                    document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
                    if (listAllTmp[0].startTime == 0) {
                        document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "00" + ":00" + "</option>";
                    } else {
                        for (var i = 0; i <= listAllTmp[0].startTime; i++) {
                            if (i < 10) {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                            } else {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                            }
                        }
                    }
                } else {
                    for (var i = 0; i <= 23; i++) {
                        if (i < 10) {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                        } else {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                        }
                    }
                }
                // case 6 - 6
            } else if (chooseMonthOut == getMonthName((currentMonth) + 1) && chooseMonthCome == getMonthName(((currentMonth + 1)))) {
                var listStoreTimeToOut = [];
                var listTimeZoneToShow = [];
                if (chooseDateOut == chooseDateCome) {
                    var timeCome = $("#TimeComeSeleted option:selected").text();
                    listTimeToShow.forEach(element => {
                        var cutTmp = element.split(":");
                        listStoreTimeToOut.push(parseInt(cutTmp[0]));
                    });
                    console.log(listStoreTimeToOut);
                    var listzoneTime = getListTimeZone(listStoreTimeToOut);
                    var timeComeCut = [] = timeCome.split(":");
                    listzoneTime.forEach(element => {
                        if (element.includes(parseInt(timeComeCut[0]))) {
                            listTimeZoneToShow = element;
                        }
                    });
                    if ((listTimeZoneToShow[listTimeZoneToShow.length - 1]) != 23) {
                        listTimeZoneToShow.push(((listTimeZoneToShow[listTimeZoneToShow.length - 1]) + 1));
                    }
                    document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
                    for (var i = 0; i < listTimeZoneToShow.length; i++) {
                        if (listTimeZoneToShow[i] > parseInt(timeComeCut[0])) {
                            if (listTimeZoneToShow[i] < 10) {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + listTimeZoneToShow[i] + ":00" + "</option>";
                            } else {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + listTimeZoneToShow[i] + ":00" + "</option>";
                            }
                        }
                    }
                } else {
                    listOrderOnMonth = [];
                    listOfSlotBooking.forEach(element => {
                        var timeTmp = new Date(element.TimeCome)
                        if ((timeTmp.getMonth() + 1) == (currentMonth + 1)) {
                            listOrderOnMonth.push(element);
                        }
                    });
                    var cutDayOutFirst = [] = chooseDateOut.split("/");
                    var listAllTmp = [];
                    listOrderOnMonth.forEach(element => {
                        var timeTmp = new Date(element.TimeCome);
                        if (parseInt(timeTmp.getDate()) == parseInt(cutDayOutFirst[0])) {
                            var dayBook = {
                                startDay: timeTmp.getDate(),
                                startTime: timeTmp.getHours(),
                            }
                            listAllTmp.push(dayBook);
                        }
                    });
                    if (listAllTmp.length > 0) {
                        listAllTmp.sort((a, b) => {
                            return a.startTime - b.startTime;
                        });
                        document.getElementById('TimeOutSeleted').innerHTML = "<option value='' id='seletedTmp6'>Select Time-Out</option>";
                        if (listAllTmp[0].startTime == 0) {
                            document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "00" + ":00" + "</option>";
                        } else {
                            for (var i = 0; i <= listAllTmp[0].startTime; i++) {
                                if (i < 10) {
                                    document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                                } else {
                                    document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                                }
                            }
                        }
                    } else {
                        for (var i = 0; i <= 23; i++) {
                            if (i < 10) {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + "0" + i + ":00" + "</option>";
                            } else {
                                document.getElementById("TimeOutSeleted").innerHTML += " <option value=''>" + i + ":00" + "</option>";
                            }
                        }
                    }
                }
            }

        }
    }
}

//Get Time-Out
function myNewFunction5(sel) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;

    var chooseHour = $("#TimeComeSeleted option:selected").text();
    var chooseDate = $("#dayComeSeleted option:selected").text();
    var chooseMonthCome = $("#monthSeleted option:selected").text();
    console.log(sel.options[sel.selectedIndex].text);
    if (sel.options[sel.selectedIndex].text != null) {
        console.log((chooseDate + "/" + chooseHour));
        if (chooseMonthCome == getMonthName(currentMonth)) {
            if (listAllBookingActive.length > 0) {
                for (var i = 0; i < listAllBookingActive.length; i++) {
                    var dayTimeToCompare;
                    var cutTmpToCheck = [] = chooseDate.split("/")
                    if (cutTmpToCheck[0] >= 10) {
                        if (cutTmpToCheck[1] >= 10) {
                            dayTimeToCompare = chooseDate;
                        } else {
                            dayTimeToCompare = cutTmpToCheck[0] + "/0" + cutTmpToCheck[1];
                        }
                    } else {
                        if (cutTmpToCheck[1] >= 10) {
                            dayTimeToCompare = "0" + cutTmpToCheck[0] + cutTmpToCheck[1];;
                        } else {
                            dayTimeToCompare = "0" + cutTmpToCheck[0] + "/0" + cutTmpToCheck[1];
                        }
                    }
                    const comparison = listAllBookingActive[i].localeCompare((dayTimeToCompare + "/" + chooseHour));
                    if (comparison == 0 || comparison > 0) {
                        var getMonth = [] = listAllBookingActive[i].split("/");
                        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                        document.getElementById('dayOutSeleted').innerHTML = " <option value='' id='seletedTmp5'>Select Day-Out</option>";
                        document.getElementById('TimeOutSeleted').innerHTML = " <option value='' id='seletedTmp6'>Select Time-Out</option>";
                        for (var j = currentMonth; j <= parseInt(getMonth[1]); j++) {
                            document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                        }
                        break;
                    } else {
                        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                        for (var j = currentMonth; j < (currentMonth + 2); j++) {
                            document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                        }
                    }
                }
                document.getElementById("divMonthOut").style.display = 'block';
            } else {
                document.getElementById("divMonthOut").style.display = 'block';
                document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                for (var j = currentMonth; j < (currentMonth + 2); j++) {
                    document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                }
            }
        } else if (chooseMonthCome == getMonthName((currentMonth + 1))) {
            if (listAllBookingActive.length > 0) {
                for (var i = 0; i < listAllBookingActive.length; i++) {
                    var blockDay = (chooseDate + "/" + chooseHour);
                    var timeTmp = new Date(listAllBookingActive[i]);
                    var timeTmp2 = new Date(blockDay)
                    if (timeTmp2 <= timeTmp) {
                        var getMonth = [] = listAllBookingActive[i].split("/");
                        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                        for (var j = (currentMonth + 1); j <= parseInt(getMonth[1]); j++) {
                            document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                        }
                        break;
                    } else {
                        document.getElementById("divMonthOut").style.display = 'block';
                        document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                        for (var j = (currentMonth + 1); j < (currentMonth + 2); j++) {
                            document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                        }
                    }
                }
                document.getElementById("divMonthOut").style.display = 'block';
            } else {
                document.getElementById("monthSeletedOut").innerHTML = "<option value='' id='seletedTmp4'>Select Month-Out</option>";
                for (var j = (currentMonth + 1); j < (currentMonth + 2); j++) {
                    document.getElementById("monthSeletedOut").innerHTML += "<option value=''>" + getMonthName(j) + "</option>";
                }
            }
        }
    }
}
//Get Number day of month
function getNumberOfDays(year, month) {
    return new Date(year, month, 0).getDate();
}

//get number-name of month by name-month
function getMonthName(month) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (month >= 1 && month <= 12) {
        return monthNames[month - 1];
    } else {
        return "Invalid month";
    }
}

//Get number all number between 2 integer
function getIntegersBetween(a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }

    let integers = [];
    for (let num = a + 1; num < b; num++) {
        integers.push(num);
    }
    return integers;
}

//Caculate price flow the time of date-time or overnight
function getPriceTotal(daysBetween, startDate, endDate) {
    console.log(startDate);
    console.log(endDate);
    console.log(daysBetween.length);
    if (daysBetween.length == 1) {
        var Daytime = getTimeFromDateTime(startDate);
        var Overnight = getTimeFromDateTime(endDate);

        var tmp1 = [] = Daytime.split(":");
        var tmp2 = [] = Overnight.split(":");
        console.log(tmp1[0]);
        console.log(tmp2[0]);
        if (tmp1[0] < 20 && tmp2[0] >= 20) {
            if (tmp1[0] <= 6) {
                const dayBetween = new Date();
                dayBetween.setHours(20, 0, 0);
                var BetweenTime = getTimeFromDateTime(dayBetween);
                const dayStartBetween = new Date();
                dayStartBetween.setHours(6, 0, 0);
                var StartTimeBetween = getTimeFromDateTime(dayStartBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, StartTimeBetween);
                var hourOverNight = getDayTimeHourMin2(BetweenTime, Overnight);
                console.log("tien 1: " + ((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight));
                var totalFirst = ((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight) + (14 * slot.PriceDaytime) + ((hourOverNight.hour + (hourOverNight.min / 60)) * slot.PriceOverNight);
                console.log("tien: " + totalFirst);
                return totalFirst;
            } else {
                const dayBetween = new Date();
                dayBetween.setHours(20, 0, 0);
                var BetweenTime = getTimeFromDateTime(dayBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, BetweenTime);
                var hourOverNight = getDayTimeHourMin2(BetweenTime, Overnight);
                var totalHour = {
                    hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
                    hourOvernightTime: (hourOverNight.hour) + ((hourOverNight.min) / 60),
                }
                console.log("thoi gian: " + (totalHour.hourDayTime + totalHour.hourOvernightTime));
                console.log("tien: " + ((parseInt((totalHour.hourOvernightTime * slot.PriceOverNight).toFixed(2)) + (parseInt((totalHour.hourDayTime * slot.PriceDaytime).toFixed(2))))));
                return ((parseInt((totalHour.hourOvernightTime * slot.PriceOverNight)) + (parseInt((totalHour.hourDayTime * slot.PriceDaytime))))).toFixed(2);
            }
        } else if (tmp1[0] > 6 && tmp1[0] < 20 && tmp2[0] > 6 && tmp2[0] < 20) {
            console.log(tmp1[0]);
            var hourDayTime = getDayTimeHourMin2(Daytime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            console.log("thoi gian: " + totalHour.hourDayTime);
            console.log("tien: " + (totalHour.hourDayTime * slot.PriceDaytime).toFixed(2));
            return (totalHour.hourDayTime * slot.PriceDaytime).toFixed(2);
        } else if (tmp1[0] >= 20 && tmp2[0] > 20 || tmp1[0] >= 20 && tmp2[0] == 0) {
            var hourDayTime = getDayTimeHourMin2(Daytime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            console.log("thoi gian: " + totalHour.hourDayTime);
            console.log("tien: " + (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2));
            return (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2);
        } else if (tmp1[0] <= 6 && tmp2[0] <= 6) {
            var hourDayTime = getDayTimeHourMin2(Daytime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            console.log("thoi gian: " + totalHour.hourDayTime);
            console.log("tien: " + (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2));
            return (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2);
        } else if (tmp1[0] <= 6 && tmp2[0] > 6 && tmp2[0] < 20) {
            console.log("vao day chu");
            const dayBetween = new Date();
            dayBetween.setHours(6, 0, 0);
            var BetweenTime = getTimeFromDateTime(dayBetween);
            var hourDayTime = getDayTimeHourMin2(Daytime, BetweenTime);
            var hourOverNight = getDayTimeHourMin2(BetweenTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
                hourOvernight: (hourOverNight.hour) + ((hourOverNight.min) / 60)
            }
            console.log("thoi gian: " + (parseInt(totalHour.hourDayTime) + parseInt(totalHour.hourOvernight)));
            console.log("tien: " + (parseInt((totalHour.hourDayTime * slot.PriceOverNight).toFixed(2)) + parseInt((totalHour.hourOvernight * slot.PriceDaytime).toFixed(2))));
            return (parseInt((totalHour.hourDayTime * slot.PriceOverNight).toFixed(2)) + parseInt((totalHour.hourOvernight * slot.PriceDaytime).toFixed(2)));
        }


    } else if (daysBetween.length == 2) {
        console.log("case 2");
        // ngay thu 1
        var totalDayFirst = 0;
        var Daytime = getTimeFromDateTime(startDate);
        const TimeBetweenTS = new Date();
        TimeBetweenTS.setHours(0, 0, 0);
        var DaytimeEndOfDayTime = getTimeFromDateTime(TimeBetweenTS);
        var tmp1 = [] = Daytime.split(":");
        var tmp2 = [] = DaytimeEndOfDayTime.split(":");
        console.log(tmp1[0]);
        if (tmp1[0] < 20) {
            if (tmp1[0] <= 6) {
                const dayStartBetween = new Date();
                dayStartBetween.setHours(6, 0, 0);
                var StartTimeBetween = getTimeFromDateTime(dayStartBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, StartTimeBetween);

                // console.log("thoi gian ngay 1: " + ((hourDayTime.hour + (hourDayTime.min / 60)) * 1));
                console.log("tien cua ngay 1: " + (((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight)));
                totalDayFirst = (((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight));
            } else {
                const dayBetween = new Date();
                dayBetween.setHours(20, 0, 0);
                var BetweenTime = getTimeFromDateTime(dayBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, BetweenTime);
                // console.log("thoi gian ngay 1: " + JSON.stringify(((hourDayTime.hour) + (hourDayTime.min / 60) + 4)));
                console.log("tien cua ngay 1: " + ((((hourDayTime.hour) + (hourDayTime.min / 60)) * slot.PriceDaytime) + (4 * slot.PriceOverNight)))
                totalDayFirst = ((((hourDayTime.hour) + (hourDayTime.min / 60)) * slot.PriceDaytime) + (4 * slot.PriceOverNight));
            }
        } else if (tmp1[0] >= 20) {
            console.log("yeah");
            var hourDayTime = getDayTimeHourMin2(Daytime, DaytimeEndOfDayTime);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            console.log()
            console.log("thoi gian 1: " + totalHour.hourDayTime);
            console.log("tien cua ngay 1: " + (totalHour.hourDayTime * slot.PriceOverNight));
            totalDayFirst = (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2)
        }

        // ngay thu 2
        var totalDayTwo = 0;
        var Overnight = getTimeFromDateTime(endDate);
        var tmp3 = [] = Overnight.split(":");
        if (tmp3[0] <= 6) {
            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const EndOfDay = new Date();
            EndOfDay.setHours(0, 0, 0);
            var DaytimeEndOfDayTime = getTimeFromDateTime(EndOfDay);
            var hourDayTime = getDayTimeHourMin2(DaytimeEndOfDayTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2));
            totalDayTwo = (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2);
        } else if (tmp3[0] > 6 && tmp3[0] < 20) {

            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const dayBetween = new Date();
            dayBetween.setHours(20, 0, 0);
            var BetweenTime = getTimeFromDateTime(dayBetween);
            var hourDayTime = getDayTimeHourMin2(DaytimeStartOfDayTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + ((totalHour.hourDayTime * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2));
            totalDayTwo = ((totalHour.hourDayTime * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2);
        } else if (tmp3[0] >= 20) {
            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const dayBetween = new Date();
            dayBetween.setHours(20, 0, 0);
            var BetweenTime = getTimeFromDateTime(dayBetween);
            var hourDayTime = getDayTimeHourMin2(BetweenTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + ((totalHour.hourDayTime * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2));
            totalDayTwo = ((totalHour.hourDayTime * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2);
        }

        console.log("total price is: " + (parseInt(totalDayFirst) + parseInt(totalDayTwo)));
        return (parseInt(totalDayFirst) + parseInt(totalDayTwo));
    } else {
        // case multi-day
        // ngay thu 1
        var totalDayFirst;
        var Daytime = getTimeFromDateTime(startDate);
        const TimeBetweenTS = new Date();
        TimeBetweenTS.setHours(0, 0, 0);
        var DaytimeEndOfDayTime = getTimeFromDateTime(TimeBetweenTS);
        var tmp1 = [] = Daytime.split(":");
        var tmp2 = [] = DaytimeEndOfDayTime.split(":");
        if (tmp1[0] < 20) {
            if (tmp1[0] <= 6) {
                const dayStartBetween = new Date();
                dayStartBetween.setHours(6, 0, 0);
                var StartTimeBetween = getTimeFromDateTime(dayStartBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, StartTimeBetween);

                // console.log("thoi gian ngay 1: " + ((hourDayTime.hour + (hourDayTime.min / 60)) * 1));
                console.log("tien cua ngay 1: " + (((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight)));
                totalDayFirst = (((hourDayTime.hour + (hourDayTime.min / 60)) * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight))
            } else {
                const dayBetween = new Date();
                dayBetween.setHours(20, 0, 0);
                var BetweenTime = getTimeFromDateTime(dayBetween);
                var hourDayTime = getDayTimeHourMin2(Daytime, BetweenTime);
                // console.log("thoi gian ngay 1: " + JSON.stringify(((hourDayTime.hour) + (hourDayTime.min / 60) + 4)));
                console.log("tien cua ngay 1: " + ((((hourDayTime.hour) + (hourDayTime.min / 60)) * slot.PriceDaytime) + (4 * slot.PriceOverNight)))
                totalDayFirst = ((((hourDayTime.hour) + (hourDayTime.min / 60)) * slot.PriceDaytime) + (4 * slot.PriceOverNight));
            }
        } else if (tmp1[0] >= 20) {
            console.log("yeah");
            var hourDayTime = getDayTimeHourMin2(Daytime, DaytimeEndOfDayTime);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian 1: " + totalHour.hourDayTime);
            console.log("tien cua ngay 1: " + (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2));
            totalDayFirst = (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2)
        }

        // ngay thu 2
        var totalDayTwo;
        var Overnight = getTimeFromDateTime(endDate);
        var tmp3 = [] = Overnight.split(":");
        if (tmp3[0] <= 6) {
            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const EndOfDay = new Date();
            EndOfDay.setHours(0, 0, 0);
            var DaytimeEndOfDayTime = getTimeFromDateTime(EndOfDay);
            var hourDayTime = getDayTimeHourMin2(DaytimeEndOfDayTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2));
            totalDayTwo = (totalHour.hourDayTime * slot.PriceOverNight).toFixed(2);
        } else if (tmp3[0] > 6 && tmp3[0] < 20) {

            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const dayBetween = new Date();
            dayBetween.setHours(20, 0, 0);
            var BetweenTime = getTimeFromDateTime(dayBetween);
            var hourDayTime = getDayTimeHourMin2(DaytimeStartOfDayTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + ((totalHour.hourDayTime * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2));
            totalDayTwo = ((totalHour.hourDayTime * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2);
        } else if (tmp3[0] >= 20) {
            const TimeBetweenST = new Date();
            TimeBetweenST.setHours(6, 0, 0);
            var DaytimeStartOfDayTime = getTimeFromDateTime(TimeBetweenST);
            const dayBetween = new Date();
            dayBetween.setHours(20, 0, 0);
            var BetweenTime = getTimeFromDateTime(dayBetween);
            var hourDayTime = getDayTimeHourMin2(BetweenTime, Overnight);
            var totalHour = {
                hourDayTime: (hourDayTime.hour) + ((hourDayTime.min) / 60),
            }
            // console.log("thoi gian ngay 2: " + totalHour.hourDayTime);
            console.log("tien cua ngay 2: " + ((totalHour.hourDayTime * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2));
            totalDayTwo = ((totalHour.hourDayTime * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (6 * slot.PriceOverNight)).toFixed(2);
        }
        console.log(parseInt(totalDayFirst) + parseInt(totalDayTwo))
        console.log("total price is: " + ((parseInt(totalDayFirst) + parseInt(totalDayTwo)) + ((daysBetween.length - 2) * ((6 * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight)))));
        return ((parseInt(totalDayFirst) + parseInt(totalDayTwo)) + ((daysBetween.length - 2) * ((6 * slot.PriceOverNight) + (14 * slot.PriceDaytime) + (4 * slot.PriceOverNight))));

    }

}

//Get all date between two day
function getDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0);
    const days = [];
    let current = new Date(start);

    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return days;
}

//Get all time between two time
function getDayTimeHourMin2(startTime, endTime) {
    var HourMinStart = [] = startTime.split(":");
    var HourMinEnd = [] = endTime.split(":");
    if ((HourMinEnd[1]) - parseInt(HourMinStart[1]) < 0) {
        if (HourMinEnd[0] == 0) {
            var time = {
                hour: (24 - (parseInt(HourMinStart[0]) - parseInt(HourMinEnd[0]))) - 1,
                min: 60 - (parseInt(HourMinStart[1]) - parseInt(HourMinEnd[1])),
            }
            return time;
        } else {
            var time = {
                hour: (parseInt(HourMinEnd[0]) - parseInt(HourMinStart[0])) - 1,
                min: (60 - ((parseInt(HourMinStart[1])) - parseInt(HourMinEnd[1]))),
            }
            return time;
        }
    } else if ((HourMinEnd[1]) - parseInt(HourMinStart[1]) == 0) {
        var time = {
            hour: (parseInt(HourMinEnd[0]) - parseInt(HourMinStart[0])),
            min: 0
        }
        return time;
    } else {
        var time = {
            hour: (parseInt(HourMinEnd[0]) - parseInt(HourMinStart[0])),
            min: (parseInt(HourMinEnd[1]) - parseInt(HourMinStart[1])),
        }
        return time;
    }
}

//Create order
var orderBookingTmp;
function sendData() {
    var currentTime = new Date();
    // var monthCome = $("#monthSeleted option:selected").text();
    var dayCome = $("#dayComeSeleted option:selected").text();
    var cutDayCome = [] = dayCome.split("/");
    var timeComeSelected = $("#TimeComeSeleted option:selected").text();
    // var monthOut = $("#monthSeletedOut option:selected").text();
    var dayOut = $("#dayOutSeleted option:selected").text();
    var cutDayOut = [] = dayOut.split("/");
    var timeOutSelected = $("#TimeOutSeleted option:selected").text();
    var name = document.getElementById("nameCustomer").value;
    var email = document.getElementById("emailCustomer").value;
    var licensePlates = document.getElementById("licensePlatesCar").value;
    var phone = document.getElementById("phoneCustomer").value;
    if (cutDayCome[1] < 10) {
        if (cutDayCome[0] >= 10) {
            var timeCome = (currentTime.getFullYear() + "-0" + cutDayCome[1] + "-" + cutDayCome[0] + "T" + timeComeSelected); // "2023-05-29T10:00" //document.getElementById("timeCome").value;
        } else {
            var timeCome = (currentTime.getFullYear() + "-0" + cutDayCome[1] + "-0" + cutDayCome[0] + "T" + timeComeSelected); // "2023-05-29T10:00" //document.getElementById("timeCome").value;
        }
    } else {
        if (cutDayCome[0] > 10) {
            var timeCome = (currentTime.getFullYear() + "-" + cutDayCome[1] + "-" + cutDayCome[0] + "T" + timeComeSelected); // "2023-05-29T10:00" //document.getElementById("timeCome").value;
        } else {
            var timeCome = (currentTime.getFullYear() + "-" + cutDayCome[1] + "-0" + cutDayCome[0] + "T" + timeComeSelected); // "2023-05-29T10:00" //document.getElementById("timeCome").value;
        }
    }
    console.log("time on: " + timeCome);
    if (cutDayOut[1] < 10) {
        if (cutDayOut[0] >= 10) {
            var timeOut = (currentTime.getFullYear() + "-0" + cutDayOut[1] + "-" + cutDayOut[0] + "T" + timeOutSelected); // "2023-05-29T20:00" //document.getElementById("timeOut").value;
        } else {
            var timeOut = (currentTime.getFullYear() + "-0" + cutDayOut[1] + "-0" + cutDayOut[0] + "T" + timeOutSelected); // "2023-05-29T20:00" //document.getElementById("timeOut").value;
        }
    } else {
        if (cutDayOut[0] > 10) {
            var timeOut = (currentTime.getFullYear() + "-" + cutDayOut[1] + "-" + cutDayOut[0] + "T" + timeOutSelected); // "2023-05-29T20:00" //document.getElementById("timeOut").value;
        } else {
            var timeOut = (currentTime.getFullYear() + "-" + cutDayOut[1] + "-0" + cutDayOut[0] + "T" + timeOutSelected); // "2023-05-29T20:00" //document.getElementById("timeOut").value;

        }
    }
    var message = document.getElementById("messageCustomer").value;
    var currentDateTime = getCurrentDateTime();
    const daysBetween = getDaysBetween(timeCome, timeOut);
    var totalPrice = getPriceTotal(daysBetween, timeCome, timeOut);
    if (!isNullOrEmpty(name)) {
        if (!isNullOrEmpty(email) && isValidEmail(email)) {
            if (!isNullOrEmpty(phone) && isPhoneNumber(phone)) {
                if (!isNullOrEmpty(licensePlates)) {
                    var checkLicenseplates = checkExistLicensePlates(listOrderBooking, licensePlates);
                    if (checkLicenseplates) {
                        if (!isNullOrEmpty(timeCome)) {
                            if (!isNullOrEmpty(timeOut)) {
                                var idOrder = generateOrderId(12);
                                if (listOrderBooking != null || listOrderBooking.length > 0) {
                                    var check = false;
                                    while (true) {
                                        for (var i = 0; i < listOrderBooking.length; i++) {
                                            if (listOrderBooking[i].Id == idOrder) {
                                                check = true;
                                                break;
                                            }
                                        }
                                        if (check == false) {
                                            break;
                                        } else {
                                            idOrder = generateOrderId(12);
                                            check = false;
                                        }
                                    }
                                }
                                var idUser = localStorage.getItem("idUser");
                                var orderBooking = {
                                    Id: idOrder,
                                    IdSlot: slot.Id,
                                    IdUser: idUser,
                                    LicensePlates: licensePlates,
                                    NameCutomer: name,
                                    Phone: phone,
                                    Email: email,
                                    Message: message,
                                    TimeCome: timeCome,
                                    TimeOut: timeOut,
                                    DateTime: currentDateTime,
                                    ReservationFee: (totalPrice * 0.3).toFixed(2),
                                    status: 1,
                                    IsActive: true,
                                    Total: totalPrice,
                                    codeConfirm: "",
                                    IsActive: true,
                                    IsRating: false,
                                }
                                orderBookingTmp = orderBooking;
                                document.getElementById("wrapDefaut").classList = "wrap active";
                                document.getElementById("idOrder").value = orderBooking.Id;
                                document.getElementById("nameCustomerOder").value = orderBooking.NameCutomer;
                                document.getElementById("emailCustomerOder").value = orderBooking.Email;
                                document.getElementById("phoneCustomerOrder").value = orderBooking.Phone;
                                document.getElementById("messageCustomerOrder").value = orderBooking.Message;
                                document.getElementById("idSlotOrder").value = orderBooking.IdSlot;
                                document.getElementById("licensePlateOrder").value = orderBooking.LicensePlates;
                                document.getElementById("timeComeOrder").value = formatDateTime(orderBooking.TimeCome);
                                console.log("test2: " + orderBooking.TimeCome);
                                document.getElementById("timeOutOrder").value = formatDateTime(orderBooking.TimeOut);
                                console.log("test2: " + orderBooking.TimeOut);
                                document.getElementById("PriceOrder").innerText = orderBooking.Total + "$";
                                // } else {
                                //     announceError("Sr, TimeOut-Input must greater than TimeCome-Input!");
                                // }
                            } else {
                                announceError("Sr, TimeOut-Input is null!");
                            }
                        } else {
                            announceError("Sr, TimeCome-Input is null!");
                        }
                    } else {
                        announceError("Sr, this License-Plates-Input is booked!");
                    }

                } else {
                    announceError("Sr, License-Plates-Input is null!");
                }
            } else {
                announceError("Sr, Phone-Input is null or Un-Valid");
            }
        } else {
            announceError("Sr, Email-Input is null or Un-Valid!");
        }
    } else {
        announceError("Sr, Name-Input is null!");
    }
}

//Send order
function Send() {
    listOrderBooking.push(orderBookingTmp);
    database.ref('listOrderBooking/').update(
        listOrderBooking
    )
    for (var i = 0; i < ParkingSlotList.length; i++) {
        if (ParkingSlotList[i].Id == slot.Id) {
            ParkingSlotList[i].status = 1;
        }
    }
    database.ref('ListParkingSlot/').update(
        list = ParkingSlotList,
    )
    announceSuccess("Send reques success");
    location.reload();
}

//Fortmat datime to show in order
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

//Close order
function Back() {
    document.getElementById("wrapDefaut").classList = "wrap";
}

//Check duplicate LicensePlates
function checkExistLicensePlates(listOrderBooking, licensePlates) {
    var check = true;
    if (listOrderBooking != null || listOrderBooking.length > 0) {
        for (var i = 0; i < listOrderBooking.length; i++) {
            if (listOrderBooking[i].LicensePlates == licensePlates && listOrderBooking[i].IsActive == true) {
                check = false;
                break;
            }
        }
        return check;
    } else return true;
}

//Compare date in listOrderIsActive
function compareDates(date1, date2) {
    const [day1, month1] = date1.split('/');
    const [day2, month2] = date2.split('/');

    const dateObj1 = new Date(2000, parseInt(month1) - 1, parseInt(day1));
    const dateObj2 = new Date(2000, parseInt(month2) - 1, parseInt(day2));

    return dateObj1 - dateObj2;
}

//Get all continuous of time
function getListTimeZone(arr) {
    const result = [];
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === 0 || arr[i] === arr[i - 1] + 1) {
            temp.push(arr[i]);
        } else {
            result.push(temp);
            temp = [arr[i]];
        }
    }
    result.push(temp);
    return result;
}

// anounce-success izitoast
function announceSuccess(content) {
    iziToast.show({
        title: 'Success',
        message: content,
        timeout: 5000,
        onClosing: function () {
            console.log('close');
        }
    });
};

// anounce-error izitoast
function announceError(content) {
    iziToast.error({
        title: 'Error: ',
        message: content,
        position: 'topRight'
    });
};

//check string null or empty
function isNullOrEmpty(str) {
    return !str || str.length === 0;
}

//Check email ipunt
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Check phone input
function isPhoneNumber(input) {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(input);
}

//Create id for order
function generateOrderId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

//Get times and minutes
function getTimeFromDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute}`;
}

//Get date-time now and format date-time
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


//Function tmp
// function compareDateTime(dateTimeLocal) {
//     var inputDate = new Date(dateTimeLocal);
//     var currentDate = new Date();
//     currentDate.setMinutes(currentDate.getMinutes() + 15);
//     if (currentDate.getDate == inputDate.getDate) {
//         if (inputDate > currentDate) {
//             return true;
//         }
//     } else if (inputDate.getDate < currentDate.getDate) {
//         return false;
//     } else {
//         return true;
//     }
// }

//Function tmp
// function compareTwoDateTime(startTime, endTime) {
//     if (startTime.getDate < endTime.getDate) {
//         return true;
//     } else if (startTime.getDate == endTime.getDate) {
//         if (startTime < endTime) {
//             return true;
//         } else {
//             return false;
//         }
//     } else return false;
// }

//Function tmp
// function compareDay(dateStr1, dateStr2) {
//     const date1 = new Date(dateStr1);
//     const date2 = new Date(dateStr2);

//     if (date1 < date2) {
//         return true;
//     } else if (date1 > date2) {
//         return false;
//     } else {
//         return false;
//     }
// }