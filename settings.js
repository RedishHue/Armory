/* Formatting function for row details - modify as you need */
function format ( d ) {
    
    if (d.price === null) {
        var price = ""
    } else {
        var price = "Price: "+d.price+"gp"
    }

    // `d` is the original data object for the row
    return  "<div class='slider' style='max-width:70%;mind-width:700px;margin:auto;'>"+
            "<div class=bookmark></div>"+
            "<p><span style='font-family:SmallCaps;color:#58180D;font-size:30px;'>"+d.name+"</span></br>"+
            "<span style='font-family: Bookinsanity; color: black'><i>"+d.type+", "+d.rarity.display+" "+d.attunement.other+"</i>"+
            "<br>"+d.description+"</p></span><br>"+
    
            "<span style='font-family: Bookinsanity; color: black'><p>"+price+"</span>"+"<span style='float:right; font-family: bookinsanity; color: black'>"+d.source+"</span></p></div>";
}




$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('.input-filter').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );
 
    // DataTable
    var table = $('#example').DataTable( {
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
        }
    });
 
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
