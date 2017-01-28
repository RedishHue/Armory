$(document).ready(function() {
    
    $('.input-filter').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    
    
    
    $('#example').DataTable( {
        "order": [[0, "asc"]],
        "paging": false,
        "info": false,
        ajax: "data.txt",
        columns: [
            { data: "name" },
            { data: "type" },
            { data: {
                _:    "rarity.display",
                sort: "rarity.sort"
            } },
            { data: "attunement" },
            { data: "notes" },
            { data: "price" },
            { data: "source"}
        ],
        "columndefs": [],
        initComplete: function () {
            this.api().columns([1,2,3]).every( function () {
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
    } );
    
    table.columns().every(function () {
        var that = this;
 
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
    
} );

