var arrResults = [];
var html = '';


function Result(title, snippet) {
    this.title = title;
    this.snippet = snippet;
  }

  function search() {
    // Use Ajax to handle things
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
      dataType: 'jsonp',
      type: 'POST',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
      success: function(data) {
  
        // First we clear the children from our class to make sure no previous results are showing.
        $('.results').empty();
  
        // Then we also clear the array with the results before providing new information.
        arrResults.length = 0;
        var resArr = data.query.search;
  
        //For each result, generate the html data.
        for (var result in resArr) {
          arrResults.push(new Result(resArr[result].title, resArr[result].snippet));
          html = '<div id="articles" class="card col s12 hoverable second-card"><div class="card-content"><a class="result-link" href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3 class="title-link">' + resArr[result].title + '</h3><p>' + resArr[result].snippet + '</p></a></div></div>';
          
          // Displays the elements to the page
          $('.results').append(html);
        }
      }
    });
  
    // This will handle when to display results based on the searc bar.
    if ($('#search').val().length > 0) {
      $('.articles').css('display', 'none');
      $('.all-height').css('height','auto');
  
    } else if ($('#search').val().length < 1) {
      // display everything again
      $('.articles').css('display', 'block');
      $('.all-height').css('height','100%');
    }
  
    // This make thigns tick with each key stroke
    $('#search').unbind('keyup');
    $('#search').keyup(function() {
      search();
    });
  }

$('#search').keyup(function() {
    search();
  });