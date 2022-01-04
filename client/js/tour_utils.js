$.validator.addMethod("idExist", function(value, element) {  
  return  localStorage.getItem('tourIdArr').indexOf(value) == -1;
}, "tour id already exists");
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please"); 
$.validator.addMethod('greaterThan', function(value, element) {
  var expiryDate = value;
  var startDate = $('#startDate').val();
  return expiryDate >startDate ;
});
$.validator.addMethod('greaterThanTour', function(value, element) {
  return localStorage.getItem('startDateTour') > value;
});
$.validator.addMethod('percentageValid', function(value, element) {
  
  return value<=100&&value>=0 ;
});
$(document).ready(function () {

  $("form[name='create_tour_form']").validate({
   
    // Specify validation rules
    rules: {
      "id_field": {
        required: true,
        digits: true,
        idExist: true,

        
      },
      "start_date": {
        required: true,
        
      },
      "duration": {
        required: true,
        digits: true,
      },
      "cost": {
        required: true,
        digits: true,
      },
    },  
    // Specify validation error messages
    messages: {
      id_field: {
        digits: "Please enter only digits",
        idExist:"tour id exist, please enter a differnet id"
      },
      start_date:{
       
      },
      duration: {
        digits: "you must enter only digits",
      },
      cost: {
        digits: "you must enter only digits",
      },
    }
    
  });

  // process the form
  $('#create_tour_form').submit(function (event) {
   


    if (!$("#create_tour_form").valid())
      return;
     
 
    // process the form
    $.ajax({
      async: true,
      type: 'POST',
      url: '/tours',
      contentType: 'application/json',
      data: JSON.stringify({
        "id": $("#id_field").val(),
        "date": $("#start_date").val(),
        "duration": $("#duration").val(),
        "cost": $("#cost").val(),
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
        location.href = "/toursList";

      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      
   
    
  }
})
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
 
    $("form[name='update_tour_form']").validate({
    // Specify validation rules
    rules: {
      
      "date": {
        required:true
      },
      "duration": {      
        digits: true,
        required:true
      },
      "cost": {
        digits: true,
        required:true
      },
    },
    // Specify validation error messages
    messages: {  
      "date": {
        required:"date required"
      }, 
      duration: {
        
        digits: "you must enter only positive integer ",
        required:"duration required",
      },
      cost: {
        digits: "you must enter only positive integer",
        required:"cost required",
      },
    }
    
  });

  // process the form
  $('#update_tour_form').submit(function (event) {
    

    if (!$('#update_tour_form').valid())
       return;
  
  
    // process the form
    $.ajax({
      async: true,
      type: 'PUT',
      url: '/tours'+'/'+localStorage.getItem('tourId'),
      contentType: 'application/json',
      data: JSON.stringify({
        "date": $("#start_date").val(),
        "duration": $("#duration").val(),
        "cost": $("#cost").val(),
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
        localStorage.clear();///??
        window.location.reload();//?? location.href = "/turs";

      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

  $("form[name='add_site_form']").validate({
   
    // Specify validation rules
    rules: {
      
      "siteName": {
        required: true,
        lettersonly: true,
       
      },
      "countryName": {
        required: true,
        lettersonly: true,      
      },    
    },
    // Specify validation error messages
    messages: {
      siteName: {
        required:"field required",
        lettersonly:"Letters only and one word please"
      },
      countryName: {
        required:"field required",
        lettersonly:"Letters only and one word please"
      },
    
    }
    
  });
 
  // process the form
  $('#add_site_form').submit(function (event) {
   
    if (!$("#add_site_form").valid())
       return;

  
    // process the form
    $.ajax({
      async: true,
      type: 'POST',
      url: 'sites',
      contentType: 'application/json',
      data: JSON.stringify({
          "siteName": $("#siteName").val(),
          "countryName": $("#countryName").val()
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
        location.href = "/toursList";
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

  $("form[name='add_coupon_form']").validate({
   
    // Specify validation rules
    rules: {
      
      "codeCoupon": {
        required: true,
      },
      "startDate": {
        required: true,
        
      },
      "expiryDate": {
       required: true,
        greaterThan:true,
        greaterThanTour:true,
      },
      "discountPercentage": {
        required: true,
        percentageValid:true
       },
    },
    // Specify validation error messages
    messages: {
     
      codeCoupon: {
        required:"field required"
     
      },
      startDate: {
        required:"field required",
       
      },
      expiryDate: {
        required:"required field",
        greaterThan:"start date must be before expiry date",
        greaterThanTour:"expiry date can't be after the tour begins"
      },
      discountPercentage: {
        required:"field required",
        percentageValid:'not a valid percentage number'
      },
    }
    
  });

  // process the form
  $('#add_coupon_form').submit(function (event) {
    
    if (!$("#add_coupon_form").valid())
    {
      return;
    }
    
 
    $.ajax({
      async: true,
        type: 'PUT',
        url: 'tours/addCoupun'+'/'+localStorage.getItem('tourId'),
        contentType: 'application/json',
        data: JSON.stringify({
         
            "codeCoupon": $("#codeCoupon").val(),
            "startDate": $("#startDate").val(),
            "expiryDate": $("#expiryDate").val(),
            "discountPercentage": $("#discountPercentage").val()
         
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
       
          window.location.reload();
        },
          
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
        },
        
      }); 
        


    event.preventDefault();
  });
});

// $('#siteIndex').validate({
//   // Specify validation error messages
//   // messages: {
//   //   'index':{
//   //     required:'index requires',
//   //     digits: 'index must be positive intiger',
//   //    }
//   // }
//   // }
// })
$('input[type=text].siteIndex').on("input", function(e) {
  alert("Change to " + e);
});


      





