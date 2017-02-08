/* Formatting function for row details - modify as you need */
function format ( d ) {
    
    if (d.price === null) {
        var price = ""
    } else {
        var price = "Price: " + d.price + "gp"
    }
    
    if (d.rarity.sort === 1) {
        var craftTime = 4
    } else if (d.rarity.sort === 2) {
        var craftTime = 20
    } else if (d.rarity.sort === 3) {
        var craftTime = 200
    } else if (d.rarity.sort === 4) {
        var craftTime = 2000
    } else if (d.rarity.sort === 5) {
        var craftTime = 20000
} 
    
    // start here
    
    
    
    
    document.getElementById("pc").addEventListener("input", function() {
        testFunction()
    }, false); 

    document.getElementById("skill").addEventListener("input", function() {
        testFunction()
    }, false); 

    document.getElementById("magic").addEventListener("input", function() {
        testFunction()
    }, false); 

    document.getElementById("scheme").addEventListener("change", function() {
        testFunction()
    }, false); 

    document.getElementById("price").addEventListener("input", function() {
        testFunction()
    }, false); 
    
    
    
    
var craftCost = d.price/2

function testFunction() {
    var x = document.getElementById("pc").value;
    var y = document.getElementById("skill").value * 2;
    var z = document.getElementById("magic").value * 5;
    var k = craftCost + y + z; 
    
	function costCalc() {
        
  		var p = document.getElementById("price").value;
        var z = (100 - p)/100;
        
        var dd = z * k;
        var dd = +dd.toFixed(2);
        return dd
  }
		
  function timeCalc() {
  		if (document.getElementById("scheme").checked === true) {
      	cTime = craftTime * 0.75
      } else {
      	cTime = craftTime
      }
      var x = document.getElementById("pc").value;
      var y = document.getElementById("skill").value;
      var z = document.getElementById("magic").value;
      var magicPC = Math.pow(x, 1) + Math.pow(z, 1);
      var math = Math.pow(0.5, magicPC);
      var mathS = Math.pow(0.75, y);
      var result = cTime*math
      var fMath = result * mathS;
      var roundTime = Math.round(fMath)
      
      if (roundTime < 1) {
      	roundTime = 1
      } else {
      	roundTime = roundTime
      }
      
      return roundTime
  }
  
  function costDaily() {
  		var x = costCalc();
        var y = timeCalc();
   	    var daily = x / y
        var daily = +daily.toFixed(2);
        return daily
   }
document.getElementById("totName").innerHTML = d.name;
document.getElementById("totCraft").innerHTML = timeCalc();
document.getElementById("totCost").innerHTML = costCalc();
document.getElementById("totDaily").innerHTML = costDaily();
}

var p = document.getElementById("price"),
    res = document.getElementById("result");

p.addEventListener("input", function() {
    res.innerHTML = p.value + "%";
}, false); 

testFunction();
    
    // end here

    // `d` is the original data object for the row
    return  "<div class='slider' style='max-width:70%;mind-width:700px;margin:auto;'>"+
            "<div class=bookmark></div>"+
            "<p><span style='font-family:SmallCaps;color:#58180D;font-size:30px;'>"+d.name+"</span></br>"+
            "<span style='font-family: Bookinsanity; color: black'><i>"+d.type+", "+d.rarity.display+" "+d.attunement.other+"</i>"+
            "<br>"+d.description+"</p></span><br>"+
    
            "<span style='font-family: Bookinsanity; color: black'><p>"+price+"</span>"+"<span style='float:right; font-family: bookinsanity; color: black'>"+d.source+"</span></div><br>"+"<div style='width: 70%; margin: auto;'></div>"        
    ;
    
    
}




$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('.input-filter').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="'+title+'" placeholder="Search '+title+'" />' );
    } );
    
    // DataTable
    var table = $('#example').DataTable( {
        "dom": 'lrtip',
        "order": [[1, "asc"]],
        "paging": false,
        "info": false,
        ajax: "data.txt",
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { data: "name" },
            { data: "type" },
            { data: {
                _:    "rarity.display",
                sort: "rarity.sort"
            } },
            { data: "attunement.display" },
            { data: "notes" },
            { data: "price" },
            { data: "source"},
            {
                "className":      'child-data',
                "orderable":      true,
                "searchable":     true,
                "data":           "description",
                "visible":        false,
            },
            
        ],
        "columnDefs": [
        {"className": "dt-center", "targets": [4,6,7]}
      ],
        initComplete: function () {
            this.api().columns([2,3,4]).every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        },
    });
    
    // Description Search
    $('#details').on( 'keyup change', function () { 
    table
        .columns( 8 )
        .search( this.value )
        .draw();
    } ); 
    // Description Seach End
    
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        
        if ( row.child.isShown() ) {
            // This row is already open - close it
            $('div.slider', row.child()).slideUp( function () {
                row.child.hide();
                tr.removeClass('shown');
            } );
        }
        else {
            // Open this row
            row.child( format(row.data()), "child" ).show();
            tr.addClass('shown');
            
            $('div.slider', row.child()).slideDown();
        }
        
    } );
    
} );
