$(document).ready(function(){
    $(".button").click(function(){
        $("body").toggleClass("nightmode");
    });
    
    $('#btnSlide').on('click', function () {
        $('#divSectionInfo').toggleClass('width100');
        $('#NameAtTop').toggleClass('AtTop');
        $('.btn').toggleClass('image2');
    });
    
});



