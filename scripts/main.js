$(function() {
  
    var list    = $(".state-info");
    var message = $(".m-message");
    var loader  = $(".loader");
    var framework;
    
    $(".states a").on("click", function(e) {
        e.preventDefault();
      framework = $(this).text();
      $.ajax({
        url: "scripts/states.json",
        dataType: "json",
        beforeSend: function() {
          loader.show();
        }
      }).done(success)
          .fail(fail)
          .always(always);
    });
      
    function success(data) {
      console.log("success");
      if(data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if(framework === data[i].State) {
            list.show();
            message.hide();
            list.find("li:nth-of-type(2)").text(framework);
            list.find("li:nth-of-type(4)").text(data[i].Capital);
            list.find("li:nth-of-type(6)").text(data[i].StateTree);
            list.find("li:nth-of-type(8)").text(data[i].StateFlower);
            list.find("li:nth-of-type(10)").text(data[i].StateBird);
            break;
          } else {
            list.hide();
            message.show().text("No data received.");
          }
        }
      } else {
        list.hide();
        message.test("No data received from your response.");
      }
    }
    
    function fail(request, textStatus, errorThrown) {
      console.log("fail");
      list.hide();
      message.text("An error occurred during your request: " + request.status + " " + textStatus + " " + errorThrown );
    }
    
    function always(data) {
      console.log("always");
      loader.hide();
    }
    
  });