$("#img_highQuality").off().on("load", function() {
    $("#div_whatever").css({
        "background-image" : "{{ include.image_path }}"
    });
});

// Side note: I usually define CSS arrays because
// I inevitably want to go back and add another 
// property at some point.