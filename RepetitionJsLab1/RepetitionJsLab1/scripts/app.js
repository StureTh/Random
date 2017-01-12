$(document).ready(function () {


    var myApp = {}

    myApp.BtnshowPerson = $("#buttonshow");
    myApp.BtnSearchPerson = $("#buttonsearch");
    myApp.BtnAddPerson = $("#buttonadd");
    myApp.BtnGetLastPerson = $("#buttonlastsearch");
    myApp.ButtonSearchArray = $("#btnsearchpersonarray");
    myApp.ButtonAddPersonToArray = $("#add");

    myApp.ShowList = $("#showall");
    myApp.AddPersonInput = $("#addpersoninput");
    myApp.SearchInput = $("#searchinput");
    myApp.FoundPerson = $("#foundperson");
    myApp.fnameinput = $("#fname");
    myApp.lnameinput = $("#lname");
    myApp.cityinput = $("#city");
    myApp.ageinput = $("#age");
    myApp.promiseDiv = $("#promiseDiv");

    myApp.Persons = [
        {
            FirstName: "Sture",
            LastName: "Thuren",
            Age: "27",
            City: "Munka"
        },
        {
            FirstName: "Jacc",
            LastName: "Liden",
            Age: "27",
            City: "Penarp"
        },
        {
            FirstName: "Issa",
            LastName: "Simonsson",
            Age: "26",
            City: "Munka",
            FullName: ""
        }
    ];

    myApp.person = {

    }

    myApp.NameCombined = function (person) {

        return person.FirstName + "" + person.LastName;
    };


    myApp.BtnshowPerson.on("click", function () {
        myApp.ShowList.show();
        $.each(myApp.Persons, function (key, value) {

            var FullName = myApp.NameCombined(value);
            myApp.ShowList.append('<li>' + FullName + '</br>' + value.Age + '</br>' + value.City + '</li>');
        });

    });

    myApp.BtnSearchPerson.on("click", function () {

        $("#searchDiv").show();

    });

    myApp.ButtonSearchArray.on("click", function () {


        myApp.SearchPromise().then(
                function (promiseReturn) {
                    $.each(promiseReturn, function (key, value) {
                        myApp.promiseDiv.append(value);
                    });
                    myApp.promiseDiv.append(promiseReturn.length + "Persons Found");
                },
            function (promiseReject) {
                myApp.promiseDiv.append(promiseReject);
            });

        localStorage.setItem("LastSearch", myApp.SearchInput.val());
    });
    myApp.BtnGetLastPerson.on("click", function () {

        var value = localStorage.getItem("LastSearch");

        myApp.SearchInput.val(value);


    });

    myApp.BtnAddPerson.on("click", function () {
        myApp.AddPersonInput.show();

    });
    myApp.ButtonAddPersonToArray.on("click", function () {

        myApp.user = {};

        myApp.user.FirstName = myApp.fnameinput.val();
        myApp.user.LastName = myApp.lnameinput.val();
        myApp.user.Age = myApp.ageinput.val();
        myApp.user.City = myApp.cityinput.val();

        myApp.Persons.push(myApp.user);
    });

    myApp.SearchPromise = function () {
        var promise = $.Deferred();
        var personFound = false;

        var promiseArray = [];


        $.each(myApp.Persons, function (key, value) {

            if (myApp.SearchInput.val() === value.FirstName | value.LastName) {
                personFound = true;
                myApp.FoundPerson.show();
                var FullName = myApp.NameCombined(value);

                promiseArray.push('<li>' + FullName + '</br>' + value.Age + '</br>' + value.City + '</li>');


            };

        });
        if (personFound) {

            promise.resolve(promiseArray);
        } else {
            promise.reject("No Result Found");
        }
        return promise.promise();
    };
});

