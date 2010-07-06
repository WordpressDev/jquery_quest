function message(content, queue) {
    if (!state.is_message_used || queue) {
        state.is_message_used = true;
        feedback.text(content).animate({top:0}, 500).delay(2000).animate({top:'-4em'}, 250, function() {state.is_message_used = false});
    }
}

var state = {
        is_message_used: false
    };

var check = {
    
    is_jQuery: function(r) {
        return (r instanceof jQuery);
    },
    
    matched_elements: function(r) {
        return r.length;
    },
    
    found_selector: function(r) {
        return r.selector;
    }
    
}